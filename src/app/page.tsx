"use client";

import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContactInfo } from "@/hooks/use-contact-info";

export default function Home() {
  const { contactInfo } = useContactInfo();

  // Brand boxes data
  const brandBoxes = [
    {
      id: "apple",
      title: "iPhone / iPad",
      description: "Apple apparaten",
      brandParam: "Apple",
      logo: "/apple-logo.svg",
    },
    {
      id: "samsung",
      title: "Samsung",
      description: "Galaxy smartphones & tablets",
      brandParam: "Samsung",
      logo: "/samsung-logo.svg",
    },
    {
      id: "other",
      title: "Andere Merken",
      description: "Google, Huawei, OnePlus & meer",
      brandParam: "Other",
      logo: null, // No logo for other brands
    },
  ];

  return (
    <div className="">
      {/* Combined Hero and Brand Selection Section with Background Image */}
      <section className="relative">
        {/* Background Image with Gradient Overlay - Covers both sections */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/carousel-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(3px)",
          }}
        >
          {/* Gradient Overlay - Top to Bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-900/70 to-gray-800/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Expert Telefoonreparaties in Hilversum</h1>
          </div>

          {/* Brand Selection */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-lg text-white/90 drop-shadow">Selecteer het merk van uw apparaat om te beginnen:</p>
            </div>

            {/* Brand Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandBoxes.map((brand) => (
                <Link key={brand.id} href={`/book?brand=${brand.brandParam}`} className="group">
                  <div className="relative rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden md:h-64 h-48 border-2 border-white/20 hover:border-white/40 bg-white/10 backdrop-blur-md">
                    <div className="relative h-full flex flex-col justify-center items-center p-8 space-y-4">
                      {/* Brand Logo */}
                      {brand.logo && (
                        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative">
                          <Image
                            src={brand.logo}
                            alt={`${brand.title} logo`}
                            fill
                            className="object-contain filter brightness-0 invert"
                            sizes="(max-width: 768px) 96px, 128px"
                          />
                        </div>
                      )}
                      {/* Brand Text */}
                      <div className="text-center">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg">{brand.title}</h3>
                        <p className="text-sm md:text-base text-white/90 drop-shadow">{brand.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Uw Betrouwbare Telefoonreparatie Partner in Hilversum</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Bij FixUphone specialiseren wij ons in professionele telefoonreparaties voor alle grote merken. Onze ervaren technici
              gebruiken originele én hoogwaardige after-market onderdelen en bieden 3 maanden garantie op alle reparaties. Van gebarsten
              schermen tot batterijvervangingen, wij zorgen voor snelle en betrouwbare service.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-4 gap-1 md:gap-6 md:mb-12">
              <div className="flex flex-col items-center p-6">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Alle Merken</h3>
                <p className="text-sm text-gray-600 text-center">iPhone, Samsung, Google en meer</p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3-Maanden Garantie</h3>
                <p className="text-sm text-gray-600 text-center">Uitgebreide dekking op alle reparaties</p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Service Op Dezelfde Dag</h3>
                <p className="text-sm text-gray-600 text-center">De meeste reparaties binnen enkele uren</p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ervaren Specialisten</h3>
                <p className="text-sm text-gray-600 text-center">Gecertificeerde professionals met ervaring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Gevestigd in het Hart van Hilversum</h3>
            <p className="text-gray-600 mb-6">
              {contactInfo ? (
                <>
                  Bezoek onze winkel aan {contactInfo.address.street}, slechts 5 minuten lopen vanaf Hilversum Centraal. Gratis parkeren
                  beschikbaar en gemakkelijk bereikbaar met het openbaar vervoer.
                </>
              ) : (
                "Bezoek onze winkel in het hart van Hilversum. Gratis parkeren beschikbaar en gemakkelijk bereikbaar met het openbaar vervoer."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact">Bezoek Onze Winkel</Link>
              </Button>
              {contactInfo?.phone && (
                <Button asChild variant="outline">
                  <Link href={`tel:${contactInfo.phone}`}>Bel {contactInfo.phone}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
