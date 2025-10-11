import { ContactInfoModel } from "../../db/models/ContactInfo";

/**
 * Initial contact data for FixUphone
 */
export const initialContactData = {
  businessName: "FixUphone",
  address: {
    street: "Larenseweg 30",
    postalCode: "1221CN",
    city: "Hilversum",
    country: "Netherlands",
    fullAddress: "Larenseweg 30, 1221CN Hilversum, Netherlands",
  },
  phone: "+31 6 87715368",
  whatsapp: "+31 6 87715368",
  email: "info@fixuphone.nl",
  businessHours: [
    {
      day: "Maandag",
      dayId: "monday",
      isOpen: true,
      openTime: "18:00",
      closeTime: "20:00",
    },
    {
      day: "Dinsdag",
      dayId: "tuesday",
      isOpen: true,
      openTime: "18:00",
      closeTime: "20:00",
    },
    {
      day: "Woensdag",
      dayId: "wednesday",
      isOpen: true,
      openTime: "10:00",
      closeTime: "17:00",
    },
    {
      day: "Donderdag",
      dayId: "thursday",
      isOpen: true,
      openTime: "18:00",
      closeTime: "20:00",
    },
    {
      day: "Vrijdag",
      dayId: "friday",
      isOpen: true,
      openTime: "18:00",
      closeTime: "20:00",
    },
    {
      day: "Zaterdag",
      dayId: "saturday",
      isOpen: true,
      openTime: "10:00",
      closeTime: "17:00",
    },
    {
      day: "Zondag",
      dayId: "sunday",
      isOpen: false,
      openTime: "00:00",
      closeTime: "00:00",
    },
  ],
  mapEmbed: {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.1234567890!2d5.1234567!3d52.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLarenseweg%2030%2C%201221CN%20Hilversum%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl",
    title: "FixUphone Locatie Kaart",
  },
};

/**
 * Migrate contact data to database
 * This function should be called during application setup
 */
export async function migrateContactDataToDatabase(): Promise<void> {
  try {
    console.log("🔄 Starting contact data migration...");

    // Check if contact info already exists
    const existingContactInfo = await ContactInfoModel.get();

    if (existingContactInfo) {
      console.log("✅ Contact info already exists, skipping migration");
      return;
    }

    // Initialize contact info with default data
    const contactInfo = await ContactInfoModel.initialize(initialContactData);

    console.log("✅ Contact data migrated successfully:", contactInfo._id);
  } catch (error) {
    console.error("❌ Error migrating contact data:", error);
    throw new Error(`Failed to migrate contact data: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Get contact info with fallback to static data
 * This provides a fallback mechanism if database is not available
 */
export async function getContactInfo(): Promise<typeof initialContactData> {
  try {
    const contactInfo = await ContactInfoModel.get();
    if (contactInfo) {
      return {
        businessName: contactInfo.businessName,
        address: contactInfo.address,
        phone: contactInfo.phone,
        whatsapp: contactInfo.whatsapp,
        email: contactInfo.email,
        businessHours: contactInfo.businessHours,
        mapEmbed: contactInfo.mapEmbed,
      };
    }

    // Fallback to static data if no database record exists
    console.warn("⚠️ No contact info found in database, using static fallback");
    return initialContactData;
  } catch (error) {
    console.error("❌ Error fetching contact info from database, using static fallback:", error);
    return initialContactData;
  }
}

/**
 * Update contact info in database
 */
export async function updateContactInfo(updateData: Partial<typeof initialContactData>): Promise<void> {
  try {
    const result = await ContactInfoModel.update(updateData);
    if (!result) {
      throw new Error("Contact info not found in database");
    }
    console.log("✅ Contact info updated successfully");
  } catch (error) {
    console.error("❌ Error updating contact info:", error);
    throw new Error(`Failed to update contact info: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
