"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { phoneBrands, tabletBrands, deviceTypes, repairServices } from "@/lib/phone-data";
import { sendBookingConfirmationEmail, generateBookingId, type BookingEmailData } from "@/lib/email-service";
import { Calendar, Phone, User } from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  deviceType: z.string().min(1, "Please select a device type"),
  brand: z.string().optional(),
  model: z.string().optional(),
  deviceDescription: z.string().optional(),
  service: z.string().min(1, "Please select a repair service"),
  issue: z.string().optional(),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
}).refine((data) => {
  if (data.deviceType === "other") {
    return data.deviceDescription && data.deviceDescription.length >= 5;
  } else {
    return data.brand && data.model;
  }
}, {
  message: "Please provide complete device information",
  path: ["deviceType"]
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookPage() {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const step2Ref = useRef<HTMLDivElement>(null);

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

  const selectedBrandData = selectedDeviceType === "phone" 
    ? phoneBrands.find(brand => brand.id === selectedBrand)
    : tabletBrands.find(brand => brand.id === selectedBrand);
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
    return form.getValues("preferredDate") && form.getValues("preferredTime");
  };

  // Watch form values to trigger re-renders when validation state changes
  const watchedValues = form.watch();

  // Auto-scroll to step 2 when it becomes visible
  useEffect(() => {
    if (currentStep >= 2 && step2Ref.current) {
      setTimeout(() => {
        step2Ref.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [currentStep]);

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

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
        bookingId: bookingId
      };

      // Send confirmation email
      const emailSent = await sendBookingConfirmationEmail(emailData);
      
      if (emailSent) {
        alert(`Booking confirmed! Booking ID: ${bookingId}\n\nA confirmation email has been sent to ${data.email}. We'll contact you soon to confirm your appointment.`);
      } else {
        alert(`Booking submitted! Booking ID: ${bookingId}\n\nWe'll contact you soon to confirm your appointment.`);
      }
      
      // Reset form
      form.reset();
      setSelectedDeviceType("");
      setSelectedBrand("");
      setSelectedModel("");
      setCurrentStep(1);
      
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("There was an error submitting your booking. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your Device Repair
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your device fixed by our expert technicians. Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Step 1: Device Information */}
                {currentStep >= 1 && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Phone className="h-6 w-6 mr-3 text-blue-600" />
                      Step 1: Device Information
                    </h3>
                    
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="deviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Device Type *</FormLabel>
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
                                  <SelectValue placeholder="Select device type" />
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
                              <FormLabel>Device Description *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please describe your device (e.g., MacBook Pro 13-inch, Apple Watch Series 8, etc.)"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : selectedDeviceType && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{selectedDeviceType === "phone" ? "Phone" : "Tablet"} Brand *</FormLabel>
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
                                      <SelectValue placeholder="Select brand" />
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
                                <FormLabel>{selectedDeviceType === "phone" ? "Phone" : "Tablet"} Model *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={!selectedBrand}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select model" />
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
                      )}

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repair Service Needed *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select service" />
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
                            <FormLabel>Describe the Issue</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe what's wrong with your device in detail (optional - we can assess the issue during your visit)..."
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
                        Next: Schedule Appointment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Schedule Appointment */}
                {currentStep >= 2 && (
                  <div ref={step2Ref} className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                      Step 2: Schedule Appointment
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        disabled={!isSchedulingSectionComplete()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                      >
                        Next: Personal Info
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Personal Information */}
                {currentStep >= 3 && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <User className="h-6 w-6 mr-3 text-blue-600" />
                      Step 3: Personal Information
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
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
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+31 123 456 7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Book Repair Appointment"}
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
