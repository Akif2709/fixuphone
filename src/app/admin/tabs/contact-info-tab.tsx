"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContactInfo, updateContactInfo } from "@/lib/database-actions";
import { Save, Loader2 } from "lucide-react";
import type { BusinessHours } from "@/types";

interface ContactInfoFormData {
  businessName: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapEmbedSrc: string;
  mapEmbedTitle: string;
  businessHours: BusinessHours[];
}

export function ContactInfoTab() {
  const [formData, setFormData] = useState<ContactInfoFormData>({
    businessName: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
    whatsapp: "",
    email: "",
    mapEmbedSrc: "",
    mapEmbedTitle: "",
    businessHours: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const result = await getContactInfo();
        if (result.success && result.data) {
          setFormData({
            businessName: result.data.businessName,
            street: result.data.address.street,
            postalCode: result.data.address.postalCode,
            city: result.data.address.city,
            country: result.data.address.country,
            phone: result.data.phone,
            whatsapp: result.data.whatsapp,
            email: result.data.email,
            mapEmbedSrc: result.data.mapEmbed.src,
            mapEmbedTitle: result.data.mapEmbed.title,
            businessHours: result.data.businessHours,
          });
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
        setMessage({ type: "error", text: "Failed to load contact information" });
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusinessHourChange = (index: number, field: "openTime" | "closeTime", value: string) => {
    const updatedHours = [...formData.businessHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setFormData((prev) => ({ ...prev, businessHours: updatedHours }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const result = await updateContactInfo({
        businessName: formData.businessName,
        address: {
          street: formData.street,
          postalCode: formData.postalCode,
          city: formData.city,
          country: formData.country,
          fullAddress: `${formData.street}, ${formData.postalCode} ${formData.city}, ${formData.country}`,
        },
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        mapEmbed: {
          src: formData.mapEmbedSrc,
          title: formData.mapEmbedTitle,
        },
        businessHours: formData.businessHours,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Contact information updated successfully!" });
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update contact information" });
      }
    } catch {
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Update your business contact details and opening hours</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" name="businessName" value={formData.businessName} onChange={handleInputChange} required />
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" name="street" value={formData.street} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <div className="space-y-3">
              {formData.businessHours.map((hours, index) => (
                <div key={hours.dayId} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-32">
                    <p className="font-medium">{hours.day}</p>
                  </div>
                  {hours.isOpen ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        value={hours.openTime}
                        onChange={(e) => handleBusinessHourChange(index, "openTime", e.target.value)}
                        className="w-32"
                      />
                      <span>-</span>
                      <Input
                        type="time"
                        value={hours.closeTime}
                        onChange={(e) => handleBusinessHourChange(index, "closeTime", e.target.value)}
                        className="w-32"
                      />
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className="text-gray-500">Gesloten</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map Embed */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Map Embed</h3>
            <div className="space-y-2">
              <Label htmlFor="mapEmbedSrc">Map Embed URL</Label>
              <Input
                id="mapEmbedSrc"
                name="mapEmbedSrc"
                value={formData.mapEmbedSrc}
                onChange={handleInputChange}
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mapEmbedTitle">Map Title</Label>
              <Input
                id="mapEmbedTitle"
                name="mapEmbedTitle"
                value={formData.mapEmbedTitle}
                onChange={handleInputChange}
                placeholder="FixUphone Locatie Kaart"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Contact Information
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
