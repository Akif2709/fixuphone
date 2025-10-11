"use server";

import { ContactInfoModel } from "../../db/models/ContactInfo";
import { CreateContactInfoRequest, SerializedContactInfo } from "../../types";
import { revalidatePath } from "next/cache";

// ==================== CONTACT INFO OPERATIONS ====================

/**
 * Get the single contact info record
 */
export async function getContactInfo(): Promise<{ success: true; data: SerializedContactInfo } | { success: false; error: string }> {
  try {
    const contactInfo = await ContactInfoModel.get();
    if (!contactInfo) {
      return { success: false, error: "Contact info not found" };
    }

    // Serialize the data to convert ObjectId to string
    const serializedData = {
      ...contactInfo,
      _id: contactInfo._id?.toString(),
    };

    return { success: true, data: serializedData };
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return { success: false, error: "Failed to fetch contact info" };
  }
}

/**
 * Update the single contact info record
 */
export async function updateContactInfo(
  updateData: Partial<CreateContactInfoRequest>
): Promise<{ success: true; data: SerializedContactInfo } | { success: false; error: string }> {
  try {
    const contactInfo = await ContactInfoModel.update(updateData);
    if (!contactInfo) {
      return { success: false, error: "Contact info not found" };
    }

    // Serialize the data to convert ObjectId to string
    const serializedData = {
      ...contactInfo,
      _id: contactInfo._id?.toString(),
    };

    revalidatePath("/contact");
    return { success: true, data: serializedData };
  } catch (error) {
    console.error("Error updating contact info:", error);
    return { success: false, error: "Failed to update contact info" };
  }
}

/**
 * Create or update the single contact info record
 */
export async function upsertContactInfo(
  data: CreateContactInfoRequest
): Promise<{ success: true; data: SerializedContactInfo } | { success: false; error: string }> {
  try {
    const contactInfo = await ContactInfoModel.upsert(data);

    // Serialize the data to convert ObjectId to string
    const serializedData = {
      ...contactInfo,
      _id: contactInfo._id?.toString(),
    };

    revalidatePath("/contact");
    return { success: true, data: serializedData };
  } catch (error) {
    console.error("Error upserting contact info:", error);
    return { success: false, error: "Failed to upsert contact info" };
  }
}
