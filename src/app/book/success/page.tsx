"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Phone, Mail, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

interface BookingData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceType: string;
  deviceBrand?: string;
  deviceModel?: string;
  deviceDescription?: string;
  service: string;
  issue?: string;
  preferredDate: string;
  preferredTime: string;
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    // Get booking data from URL parameters
    const bookingId = searchParams?.get('bookingId');
    const customerName = searchParams?.get('customerName');
    const customerEmail = searchParams?.get('customerEmail');
    const customerPhone = searchParams?.get('customerPhone');
    const deviceType = searchParams?.get('deviceType');
    const deviceBrand = searchParams?.get('deviceBrand');
    const deviceModel = searchParams?.get('deviceModel');
    const deviceDescription = searchParams?.get('deviceDescription');
    const service = searchParams?.get('service');
    const issue = searchParams?.get('issue');
    const preferredDate = searchParams?.get('preferredDate');
    const preferredTime = searchParams?.get('preferredTime');

    if (bookingId && customerName && customerEmail && customerPhone && deviceType && service && preferredDate && preferredTime) {
      setBookingData({
        bookingId,
        customerName,
        customerEmail,
        customerPhone,
        deviceType,
        deviceBrand: deviceBrand || undefined,
        deviceModel: deviceModel || undefined,
        deviceDescription: deviceDescription || undefined,
        service,
        issue: issue || undefined,
        preferredDate,
        preferredTime
      });
    } else {
      // If no booking data is found, redirect to booking page
      router.push('/book');
    }
  }, [searchParams, router]);

  const getDeviceDisplayName = () => {
    if (!bookingData) return "";
    
    if (bookingData.deviceType === "other") {
      return bookingData.deviceDescription || "Ander apparaat";
    } else {
      const brand = bookingData.deviceBrand || "";
      const model = bookingData.deviceModel || "";
      return `${brand} ${model}`.trim();
    }
  };

  const getServiceDisplayName = (serviceId: string) => {
    const serviceMap: { [key: string]: string } = {
      "screen_repair": "Scherm Reparatie",
      "battery_replacement": "Batterij Vervanging",
      "water_damage": "Water Schade Reparatie",
      "charging_port": "Oplaadpoort Reparatie",
      "camera_repair": "Camera Reparatie",
      "software_issue": "Software Probleem",
      "other": "Andere Reparatie"
    };
    return serviceMap[serviceId] || serviceId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Boeking Succesvol!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uw reparatie afspraak is succesvol ingepland. Wij nemen binnen 24 uur contact met u op om de details te bevestigen.
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-blue-600" />
              Boeking Details
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
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 capitalize">{bookingData.deviceType}</span>
                    </div>
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
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {bookingData.issue}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Wat gebeurt er nu?</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Wij nemen binnen 24 uur contact met u op om uw afspraak te bevestigen
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                U ontvangt een bevestigingsmail met alle details
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Wij beoordelen uw apparaat en geven u een prijsopgave
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Reparatie wordt uitgevoerd door onze expert technici
              </li>
            </ul>
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
                <ArrowLeft className="h-5 w-5 mr-2" />
                Nieuwe Boeking
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
