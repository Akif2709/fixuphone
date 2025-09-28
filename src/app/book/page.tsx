"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { phoneBrands, tabletBrands, deviceTypes, repairServices } from "@/lib/phone-data";
import { sendBookingConfirmationEmail, generateBookingId, type BookingEmailData } from "@/lib/email-service";
import { getAvailableTimeSlotsForDay } from "@/lib/timeslot-data";
import { Calendar, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";

const bookingSchema = z
  .object({
    name: z.string().min(2, "Naam moet minimaal 2 karakters bevatten"),
    email: z.email("Voer een geldig e-mailadres in"),
    phone: z.string().min(10, "Voer een geldig telefoonnummer in"),
    deviceType: z.string().min(1, "Selecteer een apparaat type"),
    brand: z.string().optional(),
    model: z.string().optional(),
    deviceDescription: z.string().optional(),
    service: z.string().min(1, "Selecteer een reparatie service"),
    issue: z.string().optional(),
    preferredDate: z.string().min(1, "Selecteer een gewenste datum"),
    preferredTime: z.string().min(1, "Selecteer een gewenste tijd"),
  })
  .refine(
    (data) => {
      if (data.deviceType === "other") {
        return data.deviceDescription && data.deviceDescription.length >= 5;
      } else {
        return data.brand && data.model;
      }
    },
    {
      message: "Geef volledige apparaat informatie op",
      path: ["deviceType"],
    }
  );

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookPage() {
  const router = useRouter();
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [, setSelectedModel] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateObj, setSelectedDateObj] = useState<{
    date: string;
    dayId: string;
    dayName: string;
    dateFormatted: string;
  } | null>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      deviceType: "",
      brand: "",
      model: "",
      deviceDescription: "",
      service: "",
      issue: "",
      preferredDate: "",
      preferredTime: "",
    },
  });

  const selectedBrandData =
    selectedDeviceType === "phone"
      ? phoneBrands.find((brand) => brand.id === selectedBrand)
      : tabletBrands.find((brand) => brand.id === selectedBrand);
  const availableModels = selectedBrandData?.models || [];

  // Check if device section is complete
  const isDeviceSectionComplete = () => {
    const deviceType = form.getValues("deviceType");
    const service = form.getValues("service");

    if (deviceType === "other") {
      const description = form.getValues("deviceDescription");
      const result = !!(description && description.length >= 5 && service);
      return result;
    } else {
      const brand = form.getValues("brand");
      const model = form.getValues("model");
      const result = !!(deviceType && brand && model && service);
      return result;
    }
  };

  // Check if scheduling section is complete
  const isSchedulingSectionComplete = () => {
    return selectedDate && form.getValues("preferredTime");
  };

  // Watch form values to trigger re-renders when validation state changes
  form.watch();

  // Auto-scroll to step 2 when it becomes visible
  useEffect(() => {
    if (currentStep >= 2 && step2Ref.current) {
      setTimeout(() => {
        step2Ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep >= 3 && step3Ref.current) {
      setTimeout(() => {
        step3Ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [currentStep]);

  // Get available time slots for the selected day
  const getTimeSlotsForSelectedDay = () => {
    if (!selectedDateObj) return [];
    return getAvailableTimeSlotsForDay(selectedDateObj.dayId);
  };

  // Get available days (next 14 days)
  const getAvailableDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayOfWeek = date.getDay();
      const dayMapping = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      const dayId = dayMapping[dayOfWeek];

      const timeSlots = getAvailableTimeSlotsForDay(dayId);
      if (timeSlots.length > 0) {
        days.push({
          date: date.toISOString().split("T")[0],
          dayId,
          dayName: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"][dayOfWeek],
          dateFormatted: (() => {
            const weekday = date.toLocaleDateString("nl-NL", {
              weekday: "long",
            });
            const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
            const datePart = date.toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
            });
            return `${capitalizedWeekday} - ${datePart}`;
          })(),
        });
      }
    }

    return days;
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // Generate booking ID
      const bookingId = generateBookingId();

      // Prepare email data
      const emailData: BookingEmailData = {
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        deviceType: data.deviceType,
        deviceBrand: data.brand,
        deviceModel: data.model,
        deviceDescription: data.deviceDescription,
        service: data.service,
        issue: data.issue,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        bookingId: bookingId,
      };

      // Send confirmation email
      const emailSent = await sendBookingConfirmationEmail(emailData);

      // Prepare URL parameters
      const params = new URLSearchParams({
        bookingId,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        deviceType: data.deviceType,
        service: data.service,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        emailSent: emailSent.toString(),
      });

      // Add optional parameters if they exist
      if (data.brand) params.append("deviceBrand", data.brand);
      if (data.model) params.append("deviceModel", data.model);
      if (data.deviceDescription) params.append("deviceDescription", data.deviceDescription);
      if (data.issue) params.append("issue", data.issue);

      // Redirect based on email sending result
      if (emailSent) {
        router.push(`/book/success?${params.toString()}`);
      } else {
        router.push(`/book/error?${params.toString()}`);
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("Er is een fout opgetreden bij het indienen van uw boeking. Probeer het opnieuw of neem direct contact met ons op.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Boek Uw Apparaat Reparatie</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Laat uw apparaat repareren door onze expert technici. Vul het onderstaande formulier in en wij nemen binnen 24 uur contact met
              u op.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Device Information */}
                {currentStep >= 1 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Phone className="h-6 w-6 mr-3 text-blue-600" />
                      Stap 1: Apparaat Informatie
                    </h3>

                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="deviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apparaat Type *</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedDeviceType(value);
                                setSelectedBrand("");
                                setSelectedModel("");
                                form.setValue("brand", "");
                                form.setValue("model", "");
                                form.setValue("deviceDescription", "");
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecteer apparaat type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {deviceTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id}>
                                    <div>
                                      <div className="font-medium">{type.name}</div>
                                      <div className="text-sm text-gray-500">{type.description}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedDeviceType === "other" ? (
                        <FormField
                          control={form.control}
                          name="deviceDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Apparaat Beschrijving *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Beschrijf uw apparaat (bijv. MacBook Pro 13-inch, Apple Watch Series 8, etc.)"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        selectedDeviceType && (
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="brand"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{selectedDeviceType === "phone" ? "Telefoon" : "Tablet"} Merk *</FormLabel>
                                  <Select
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      setSelectedBrand(value);
                                      setSelectedModel("");
                                      form.setValue("model", "");
                                    }}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecteer merk" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {(selectedDeviceType === "phone" ? phoneBrands : tabletBrands).map((brand) => (
                                        <SelectItem key={brand.id} value={brand.id}>
                                          {brand.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="model"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{selectedDeviceType === "phone" ? "Telefoon" : "Tablet"} Model *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedBrand}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecteer model" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {availableModels.map((model) => (
                                        <SelectItem key={model.id} value={model.id}>
                                          {model.name} ({model.year})
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )
                      )}

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Benodigde Reparatie Service *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecteer service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {repairServices.map((service) => (
                                  <SelectItem key={service.id} value={service.id}>
                                    <div>
                                      <div className="font-medium">{service.name}</div>
                                      <div className="text-sm text-gray-500">{service.description}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="issue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Beschrijf het Probleem</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Beschrijf wat er mis is met uw apparaat in detail (optioneel - wij kunnen het probleem beoordelen tijdens uw bezoek)..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={!isDeviceSectionComplete()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                      >
                        Volgende: Afspraak Inplannen
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Schedule Appointment */}
                {currentStep >= 2 && (
                  <div ref={step2Ref} className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                      Stap 2: Afspraak Inplannen
                    </h3>

                    {/* Day Selection */}
                    <div className="mb-8">
                      <FormLabel className="text-lg font-semibold mb-4 block">Selecteer een dag *</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getAvailableDays().map((day) => (
                          <button
                            key={day.date}
                            type="button"
                            onClick={() => {
                              setSelectedDate(day.date);
                              setSelectedDateObj(day);
                              form.setValue("preferredDate", day.date);
                              form.setValue("preferredTime", ""); // Reset time when changing day
                            }}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              selectedDate === day.date
                                ? "border-blue-500 bg-blue-50 text-blue-900 shadow-md"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="font-bold text-gray-900">{day.dateFormatted}</div>
                          </button>
                        ))}
                      </div>
                      {!selectedDateObj && <p className="text-sm text-gray-500 mt-2">Kies een dag om beschikbare tijden te zien</p>}
                    </div>

                    {/* Time Selection */}
                    {selectedDateObj && (
                      <div>
                        <FormLabel className="text-lg font-semibold mb-4 block">Selecteer een tijd *</FormLabel>
                        <FormField
                          control={form.control}
                          name="preferredTime"
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecteer tijd" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {getTimeSlotsForSelectedDay().map((slot) => (
                                    <SelectItem key={slot.id} value={slot.time}>
                                      {slot.display}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <p className="text-sm text-gray-500 mt-2">Elke tijdslot is 30 minuten. Kies een tijd die het beste bij u past.</p>
                      </div>
                    )}

                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        disabled={!isSchedulingSectionComplete()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                      >
                        Volgende: Persoonlijke Info
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Personal Information */}
                {currentStep >= 3 && (
                  <div ref={step3Ref} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <User className="h-6 w-6 mr-3 text-blue-600" />
                      Stap 3: Persoonlijke Informatie
                    </h3>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Volledige Naam *</FormLabel>
                              <FormControl>
                                <Input placeholder="Jan de Vries" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mailadres *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="jan@voorbeeld.nl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefoonnummer *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+31 123 456 7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8" disabled={isSubmitting}>
                        {isSubmitting ? "Bezig met verzenden..." : "Boek Reparatie Afspraak"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
