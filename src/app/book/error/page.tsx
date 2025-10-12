"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Phone, Mail, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface BookingData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceBrand: string;
  deviceModel: string;
  service: string;
  issue?: string;
  preferredDate: string;
  preferredTime: string;
}

function BookingErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    // Get booking data from URL parameters
    const bookingId = searchParams?.get("bookingId");
    const customerName = searchParams?.get("customerName");
    const customerEmail = searchParams?.get("customerEmail");
    const customerPhone = searchParams?.get("customerPhone");
    const deviceBrand = searchParams?.get("deviceBrand");
    const deviceModel = searchParams?.get("deviceModel");
    const service = searchParams?.get("service");
    const issue = searchParams?.get("issue");
    const preferredDate = searchParams?.get("preferredDate");
    const preferredTime = searchParams?.get("preferredTime");

    if (
      bookingId &&
      customerName &&
      customerEmail &&
      customerPhone &&
      deviceBrand &&
      deviceModel &&
      service &&
      preferredDate &&
      preferredTime
    ) {
      setBookingData({
        bookingId,
        customerName,
        customerEmail,
        customerPhone,
        deviceBrand,
        deviceModel,
        service,
        issue: issue || undefined,
        preferredDate,
        preferredTime,
      });
    } else {
      // If no booking data is found, redirect to booking page
      router.push("/book");
    }
  }, [searchParams, router]);

  const getDeviceDisplayName = () => {
    if (!bookingData) return "";

    const brand = bookingData.deviceBrand || "";
    const model = bookingData.deviceModel || "";
    return `${brand} ${model}`.trim();
  };

  const getServiceDisplayName = (serviceId: string) => {
    const serviceMap: { [key: string]: string } = {
      "screen-repair": "Scherm Reparatie",
      "battery-replacement": "Batterij Vervanging",
      "water-damage": "Water Schade Reparatie",
      "charging-port": "Oplaadpoort Reparatie",
      "camera-repair": "Camera Reparatie",
      "speaker-repair": "Speaker Reparatie",
      "button-repair": "Knop Reparatie",
      "software-issue": "Software Problemen",
      other: "Andere Reparatie",
    };
    return serviceMap[serviceId] || serviceId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Laden of geen boekingsgegevens gevonden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Error Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Boeking Mislukt</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Er is een technisch probleem opgetreden. Uw afspraak kon niet worden aangemaakt.
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-red-500">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-red-600" />
              Ingevulde Gegevens
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Boeking Informatie</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Boeking ID:</span>
                      <span className="font-medium text-gray-900">{bookingData.bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Datum:</span>
                      <span className="font-medium text-gray-900">{formatDate(bookingData.preferredDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tijd:</span>
                      <span className="font-medium text-gray-900">{bookingData.preferredTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Apparaat Informatie</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Apparaat:</span>
                      <span className="font-medium text-gray-900">{getDeviceDisplayName()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium text-gray-900">{getServiceDisplayName(bookingData.service)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Informatie</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{bookingData.customerPhone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{bookingData.customerEmail}</span>
                    </div>
                  </div>
                </div>

                {bookingData.issue && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Probleem Beschrijving</h3>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{bookingData.issue}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Information */}
          <div className="bg-red-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Wat is er gebeurd?</h3>
            <ul className="space-y-2 text-red-800">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Er is een technisch probleem opgetreden tijdens het verwerken van uw boeking
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Uw afspraak is niet aangemaakt in ons systeem
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Neem contact met ons op via WhatsApp om uw afspraak alsnog in te plannen
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-900 mb-3">💬 Neem Contact Op via WhatsApp</h3>
            <p className="text-green-800 mb-4">Stuur ons een WhatsApp bericht met uw reparatie verzoek. Wij helpen u graag verder!</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/316687715368?text=${encodeURIComponent(
                  `Hallo! Ik heb een vraag over telefoonreparatie. Mijn gegevens:
Naam: ${bookingData?.customerName || "N/A"}
Email: ${bookingData?.customerEmail || "N/A"}
Telefoon: ${bookingData?.customerPhone || "N/A"}
Apparaat: ${getDeviceDisplayName()}
Service: ${getServiceDisplayName(bookingData?.service || "")}
Gewenste datum: ${bookingData?.preferredDate || "N/A"}
Gewenste tijd: ${bookingData?.preferredTime || "N/A"}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp Contact
              </a>
              <p className="text-sm text-green-700">Klik op de knop om direct contact op te nemen via WhatsApp</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Terug naar Home
              </Button>
            </Link>
            <Link href="/book">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 flex items-center">
                <RefreshCw className="h-5 w-5 mr-2" />
                Nieuwe Boeking
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 flex items-center"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Probeer Opnieuw
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Laden...</p>
          </div>
        </div>
      }
    >
      <BookingErrorContent />
    </Suspense>
  );
}
