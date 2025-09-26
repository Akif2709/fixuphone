import emailjs from '@emailjs/browser';
import { contactData } from './contact-data';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_79rn7rj';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

export interface BookingEmailData {
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
  bookingId: string;
}

export const sendBookingConfirmationEmail = async (bookingData: BookingEmailData): Promise<boolean> => {
  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Prepare template parameters
    const templateParams = {
      to_email: bookingData.customerEmail,
      customer_name: bookingData.customerName,
      customer_phone: bookingData.customerPhone,
      device_type: bookingData.deviceType,
      device_brand: bookingData.deviceBrand || 'N/A',
      device_model: bookingData.deviceModel || 'N/A',
      device_description: bookingData.deviceDescription || 'N/A',
      service: bookingData.service,
      issue: bookingData.issue || 'Geen beschrijving opgegeven',
      preferred_date: bookingData.preferredDate,
      preferred_time: bookingData.preferredTime,
      booking_id: bookingData.bookingId,
      business_name: contactData.businessName,
      business_email: contactData.email,
      business_phone: contactData.phone,
      business_address: contactData.address.fullAddress
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Generate a simple booking ID
export const generateBookingId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `FUP-${timestamp}-${random}`.toUpperCase();
};
