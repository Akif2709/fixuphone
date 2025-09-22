"use client";

import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car, 
  Wifi, 
  Shield, 
  Star
} from "lucide-react";

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with our expert team. We&apos;re here to help with all your phone repair needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Info */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Our Store</h3>
                      <p className="text-gray-600">
                        Wirixstraat 54<br />
                        1222 NS Hilversum<br />
                        Netherlands
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600">+31 123 456 7890</p>
                      <p className="text-sm text-gray-500 mt-1">Available during business hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600">info@fixuphone.nl</p>
                      <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Us?</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-green-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">1-Year Warranty</h3>
                      <p className="text-sm text-gray-600">All repairs come with our comprehensive warranty</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Star className="h-5 w-5 text-yellow-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Expert Technicians</h3>
                      <p className="text-sm text-gray-600">Certified professionals with years of experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Car className="h-5 w-5 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Free Parking</h3>
                      <p className="text-sm text-gray-600">Convenient parking available right outside</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Wifi className="h-5 w-5 text-purple-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Free WiFi</h3>
                      <p className="text-sm text-gray-600">Stay connected while you wait</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find Us</h2>
                
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.1234567890!2d5.1234567!3d52.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWirixstraat%2054%2C%201222%20NS%20Hilversum!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FixUphone Location Map"
                  />
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Getting Here</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 5 minutes walk from Hilversum Central Station</li>
                    <li>• Free parking available on-site</li>
                    <li>• Accessible by public transport (bus lines 1, 2, 3)</li>
                    <li>• Wheelchair accessible entrance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
