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
  whatsapp: string;
  email: string;
  businessHours: BusinessHours[];
  mapEmbed: {
    src: string;
    title: string;
  };
}

export const contactData: ContactInfo = {
  businessName: "FixUphone",
  address: {
    street: "Larenseweg 30",
    postalCode: "1221CN",
    city: "Hilversum",
    country: "Netherlands",
    fullAddress: "Larenseweg 30, 1221CN Hilversum, Netherlands"
  },
  phone: "+31 6 687715368",
  whatsapp: "+31 6 687715368",
  email: "info@fixuphone.nl",
  businessHours: [
    {
      day: "Maandag, Dinsdag, Donderdag, Vrijdag",
      hours: "18:00 - 20:00",
      isOpen: true
    },
    {
      day: "Zaterdag",
      hours: "10:00 - 16:00",
      isOpen: true
    },
    {
      day: "Zondag",
      hours: "Gesloten",
      isOpen: false
    }
  ],

  mapEmbed: {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.1234567890!2d5.1234567!3d52.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLarenseweg%2030%2C%201221CN%20Hilversum%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl",
    title: "FixUphone Locatie Kaart"
  }
};
