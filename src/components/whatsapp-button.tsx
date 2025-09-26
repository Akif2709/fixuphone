"use client";

import { MessageCircle } from "lucide-react";
import { contactData } from "@/lib/contact-data";

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Remove spaces and + from the WhatsApp number for the URL
    const phoneNumber = contactData.whatsapp.replace(/\s+/g, '').replace('+', '');
    const message = "Hallo! Ik heb een vraag over telefoonreparatie.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 border-2 border-white"
      aria-label="Neem contact op via WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999
      }}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
