"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { repairServices } from "@/lib/repair-data";
import { sendBookingConfirmationEmail, generateBookingId, type BookingEmailData } from "@/lib/services/email-service";
import { getAvailableTimeSlotsForDay } from "@/lib/utils/timeslot-utils";
import { useContactInfo } from "@/hooks/use-contact-info";
import { Calendar, Phone, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllBrands, getAllDeviceModels } from "@/lib/database-actions";
import { SerializedDeviceModel, SerializedBrand } from "@/types";

const bookingSchema = z
  .object({
    name: z.string().min(2, "Naam moet minimaal 2 karakters bevatten"),
    email: z.email("Voer een geldig e-mailadres in"),
    phone: z.string().min(10, "Voer een geldig telefoonnummer in"),
    brand: z.string().min(1, "Merk is vereist"),
    model: z.string().optional(),
    service: z.string().min(1, "Selecteer een reparatie service"),
    issue: z.string().optional(),
    preferredDate: z.string().min(1, "Selecteer een gewenste datum"),
    preferredTime: z.string().min(1, "Selecteer een gewenste tijd"),
  })
  .refine(
    (data) => {
      // Model is required unless brand is "other"
      if (data.brand !== "other" && !data.model) {
        return false;
      }
      return true;
    },
    {
      message: "Selecteer een apparaat model",
      path: ["model"],
    }
  );

type BookingFormData = z.infer<typeof bookingSchema>;

function BookPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandParam = searchParams?.get("brand") || "";
  const { contactInfo, loading: contactLoading } = useContactInfo();
  const [brands, setBrands] = useState<SerializedBrand[]>([]);
  const [allDeviceModels, setAllDeviceModels] = useState<SerializedDeviceModel[]>([]);
  const [loadingData, setLoadingData] = useState(true);
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
      brand: "",
      model: "",
      service: "",
      issue: "",
      preferredDate: "",
      preferredTime: "",
    },
  });

  // Fetch brands and device models on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [brandsResult, modelsResult] = await Promise.all([getAllBrands(), getAllDeviceModels()]);

        if (brandsResult.success && brandsResult.data) {
          setBrands(brandsResult.data);
        } else {
          console.error("Failed to fetch brands:", brandsResult.error);
        }

        if (modelsResult.success && modelsResult.data) {
          setAllDeviceModels(modelsResult.data);
        } else {
          console.error("Failed to fetch device models:", modelsResult.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, []);

  // Set brand from URL parameter on mount
  useEffect(() => {
    if (brandParam && brands.length > 0) {
      // Find brand by name from URL param
      const brand = brands.find((b) => b.name.toLowerCase() === brandParam.toLowerCase());
      if (brand && brand._id) {
        setSelectedBrand(brand._id);
        form.setValue("brand", brand._id);
      }
    }
  }, [brandParam, brands, form]);

  // Get both phone and tablet models for the selected brand (filtered on FE)
  const getAvailableModels = () => {
    if (!selectedBrand || selectedBrand === "other") {
      return { phones: [], tablets: [] };
    }

    // Filter models by selected brand ID (brandId is already a string in SerializedDeviceModel)
    const brandModels = allDeviceModels.filter((model) => model.brandId === selectedBrand);

    const phones = brandModels.filter((model) => model.type === "phone");
    const tablets = brandModels.filter((model) => model.type === "tablet");

    return { phones, tablets };
  };

  const availableModels = getAvailableModels();

  // Check if device section is complete
  const isDeviceSectionComplete = () => {
    const brand = form.getValues("brand");
    const model = form.getValues("model");
    const service = form.getValues("service");

    // For "other" brand, model is not required
    if (brand === "other") {
      return !!(brand && service);
    }

    return !!(brand && model && service);
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
    if (!selectedDateObj || !contactInfo?.businessHours) return [];
    return getAvailableTimeSlotsForDay(selectedDateObj.dayId, contactInfo.businessHours);
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

      const timeSlots = contactInfo?.businessHours ? getAvailableTimeSlotsForDay(dayId, contactInfo.businessHours) : [];
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

      // Get brand name from brand ID
      const selectedBrandObj = brands.find((b) => b._id === data.brand);
      const brandName = selectedBrandObj?.name || data.brand;

      // Get device model name from model ID
      let deviceModelName = "Geen specifiek model";
      if (data.model) {
        const selectedModelObj = allDeviceModels.find((m) => m._id === data.model);
        deviceModelName = selectedModelObj ? `${selectedModelObj.name} (${selectedModelObj.releaseYear})` : data.model;
      } else if (data.brand === "other") {
        deviceModelName = "Andere merken";
      }

      // Prepare email data
      const emailData: BookingEmailData = {
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        deviceBrand: brandName,
        deviceModel: deviceModelName,
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
        deviceBrand: brandName,
        deviceModel: deviceModelName,
        service: data.service,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        emailSent: emailSent.toString(),
      });

      // Add optional parameters if they exist
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

  // Show loading state while contact info is being fetched
  if (contactLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto pb-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading booking system...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                      {/* Brand Selection Dropdown */}
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Merk *</FormLabel>
                            <Select
                              onValueChange={(value:string) => {
                                field.onChange(value);
                                setSelectedBrand(value);
                                setSelectedModel("");
                                form.setValue("model", "");
                              }}
                              value={field.value}
                              disabled={loadingData}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={loadingData ? "Laden..." : "Selecteer merk"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {brands.map((brand) => (
                                  <SelectItem key={brand._id} value={brand._id || ""}>
                                    <div className="flex items-center">
                                      <span>{brand.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                                <SelectItem value="other">
                                  <div className="flex items-center">
                                    <span>Andere Merken</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Device Model Dropdown with Categories - Hidden for "other" brand */}
                      {selectedBrand !== "other" && (
                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Apparaat Model *</FormLabel>
                              <Select
                                onValueChange={(value:string) => {
                                  field.onChange(value);
                                  setSelectedModel(value);
                                }}
                                value={field.value}
                                disabled={!selectedBrand || loadingData}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecteer uw apparaat model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-[300px]">
                                  {availableModels.phones.length > 0 && (
                                    <>
                                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-100">Telefoons</div>
                                      {availableModels.phones.map((model) => (
                                        <SelectItem key={`phone-${model._id}`} value={model._id?.toString() || ""}>
                                          {model.name} ({model.releaseYear})
                                        </SelectItem>
                                      ))}
                                    </>
                                  )}
                                  {availableModels.tablets.length > 0 && (
                                    <>
                                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-100 mt-1">Tablets</div>
                                      {availableModels.tablets.map((model) => (
                                        <SelectItem key={`tablet-${model._id}`} value={model._id?.toString() || ""}>
                                          {model.name} ({model.releaseYear})
                                        </SelectItem>
                                      ))}
                                    </>
                                  )}
                                  {availableModels.phones.length === 0 && availableModels.tablets.length === 0 && (
                                    <div className="px-2 py-4 text-sm text-gray-500 text-center">
                                      Geen modellen beschikbaar voor dit merk
                                    </div>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                            <FormLabel>Beschrijf het Probleem (Optioneel)</FormLabel>
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

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto pb-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading booking system...</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}
