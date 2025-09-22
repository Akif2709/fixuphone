export interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface ContactInfo {
  businessName: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    fullAddress: string;
  };
  phone: string;
  email: string;
  businessHours: BusinessHours[];
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }[];
  gettingHere: {
    id: string;
    description: string;
  }[];
  mapEmbed: {
    src: string;
    title: string;
  };
}

export const contactData: ContactInfo = {
  businessName: "FixUphone",
  address: {
    street: "Wirixstraat 54",
    postalCode: "1222 NS",
    city: "Hilversum",
    country: "Netherlands",
    fullAddress: "Wirixstraat 54, 1222 NS Hilversum, Netherlands"
  },
  phone: "+31 123 456 7890",
  email: "info@fixuphone.nl",
  businessHours: [
    {
      day: "Monday - Friday",
      hours: "9:00 AM - 6:00 PM",
      isOpen: true
    },
    {
      day: "Saturday",
      hours: "10:00 AM - 4:00 PM",
      isOpen: true
    },
    {
      day: "Sunday",
      hours: "Closed",
      isOpen: false
    }
  ],

  mapEmbed: {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.1234567890!2d5.1234567!3d52.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWirixstraat%2054%2C%201222%20NS%20Hilversum!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl",
    title: "FixUphone Location Map"
  }
};
