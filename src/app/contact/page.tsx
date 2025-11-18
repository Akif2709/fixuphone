"use client";

import { MapPin, Phone, Mail, Clock, Car, Wifi, Shield, Star } from "lucide-react";
import { useContactInfo } from "@/hooks/use-contact-info";

export default function ContactPage() {
  const { contactInfo, loading, error } = useContactInfo();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading contact information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !contactInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Information Unavailable</h1>
              <p className="text-xl text-gray-600">{error || "Unable to load contact information. Please try again later."}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Neem Contact Op</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Neem contact op met ons expert team. Wij zijn er om u te helpen met al uw telefoonreparatie behoeften.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Info */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Neem Contact Op</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Bezoek Onze Winkel</h3>
                      <p className="text-gray-600">
                        {contactInfo.address.street}
                        <br />
                        {contactInfo.address.postalCode} {contactInfo.address.city}
                        <br />
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Bel Ons</h3>
                      <p className="text-gray-600">{contactInfo.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">Beschikbaar tijdens openingstijden</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-mail Ons</h3>
                      <p className="text-gray-600">{contactInfo.email}</p>
                      <p className="text-sm text-gray-500 mt-1">Wij reageren binnen 24 uur</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Openingstijden</h3>
                      <div className="text-gray-600 space-y-1">
                        {contactInfo.businessHours.map((schedule, index) => (
                          <p key={index}>
                            {schedule.day}: {schedule.isOpen ? `${schedule.openTime} - ${schedule.closeTime}` : "Gesloten"}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-blue-600 font-medium mt-3 italic">* Reservering is verplicht</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Waarom Kiezen Voor Ons?</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-green-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">3-Maanden Garantie</h3>
                      <p className="text-sm text-gray-600">Alle reparaties komen met onze uitgebreide garantie</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Star className="h-5 w-5 text-yellow-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ervaren Specialisten</h3>
                      <p className="text-sm text-gray-600">Gecertificeerde professionals met jaren ervaring</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Car className="h-5 w-5 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Gratis Parkeren</h3>
                      <p className="text-sm text-gray-600">Handig parkeren direct buiten beschikbaar</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Wifi className="h-5 w-5 text-purple-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Gratis WiFi</h3>
                      <p className="text-sm text-gray-600">Blijf verbonden terwijl u wacht</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vind Ons</h2>

              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={contactInfo.mapEmbed.src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={contactInfo.mapEmbed.title}
                />
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Hoe Hier Te Komen</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 5 minuten lopen vanaf Hilversum Centraal</li>
                  <li>• Gratis parkeren beschikbaar op locatie</li>
                  <li>• Bereikbaar met openbaar vervoer (buslijnen 1, 2, 3)</li>
                  <li>• Rolstoeltoegankelijke ingang</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
