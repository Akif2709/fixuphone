import { ObjectId } from "mongodb";
import { BusinessHours } from "./timeslot-types";

// ==================== CONTACT INTERFACES ====================

export interface ContactInfo {
  _id?: ObjectId;
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
  createdAt: Date;
}

// Serialized version for client components (ObjectId converted to string)
export interface SerializedContactInfo {
  _id?: string;
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
  createdAt: Date;
}

export interface CreateContactInfoRequest {
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

export interface ContactInfoQuery {
  businessName?: string;
  email?: string;
  phone?: string;
}
