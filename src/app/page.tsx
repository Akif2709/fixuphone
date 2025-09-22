
"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Phone, Shield, Clock, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Professional phone repair technician working on iPhone",
      title: "Expert Phone Repairs",
      description: "Professional technicians with years of experience"
    },
    {
      src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "High-quality phone screen replacement",
      title: "Quality Parts & Service",
      description: "Original parts and comprehensive warranty"
    },
    {
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
      alt: "Fast and reliable phone repair service",
      title: "Quick & Reliable",
      description: "Same-day repairs available for most issues"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <div className="text-center text-white p-8">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4">
                              {image.title}
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                              {image.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Uw Betrouwbare Telefoonreparatie Partner in Hilversum
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Bij FixUphone specialiseren wij ons in professionele telefoonreparaties voor alle grote merken. 
              Onze gecertificeerde technici gebruiken alleen originele onderdelen en bieden een uitgebreide 
              1-jarige garantie op alle reparaties. Van gebarsten schermen tot batterijvervangingen, 
              wij zorgen voor snelle en betrouwbare service.
            </p>
            
            {/* CTA Button */}
            <div className="space-y-4 mb-12">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <Link href="/book">
                  Boek Nu Uw Reparatie
                </Link>
              </Button>
              <p className="text-sm text-gray-500">
                Gratis diagnose • Geen verplichting • Snelle service
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
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
                <h3 className="font-semibold text-gray-900 mb-2">1-Jaar Garantie</h3>
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
                <h3 className="font-semibold text-gray-900 mb-2">Expert Technici</h3>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Gevestigd in het Hart van Hilversum
            </h3>
            <p className="text-gray-600 mb-6">
              Bezoek onze winkel aan Wirixstraat 54, slechts 5 minuten lopen vanaf Hilversum Centraal. 
              Gratis parkeren beschikbaar en gemakkelijk bereikbaar met het openbaar vervoer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact">
                  Bezoek Onze Winkel
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="tel:+311234567890">
                  Bel +31 123 456 7890
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
