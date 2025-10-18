import { Collection } from "mongodb";
import { getDatabase } from "../connection";
import { ContactInfo, CreateContactInfoRequest } from "../../types";

export class ContactInfoModel {
  private static collectionName = "contact_info";

  private static async getCollection(): Promise<Collection<ContactInfo>> {
    const db = await getDatabase();
    return db.collection<ContactInfo>(this.collectionName);
  }

  /**
   * Get the single contact info record
   * Since there's only one contact info record, we get the first one
   */
  static async get(): Promise<ContactInfo | null> {
    try {
      const collection = await this.getCollection();
      return await collection.findOne({});
    } catch (error) {
      console.error("Error fetching contact info:", error);
      throw new Error(`Failed to fetch contact info: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Update the single contact info record
   * Since there's only one contact info record, we update the first one
   */
  static async update(updateData: Partial<CreateContactInfoRequest>): Promise<ContactInfo | null> {
    try {
      const collection = await this.getCollection();

      const result = await collection.findOneAndUpdate({}, { $set: updateData }, { returnDocument: "after" });

      return result ?? null;
    } catch (error) {
      console.error("Error updating contact info:", error);
      throw new Error(`Failed to update contact info: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Initialize contact info with default data
   * This should only be called during migration/setup
   */
  static async initialize(data: CreateContactInfoRequest): Promise<ContactInfo> {
    try {
      const collection = await this.getCollection();
      const now = new Date();

      const contactInfo: ContactInfo = {
        ...data,
        createdAt: now,
      };

      const result = await collection.insertOne(contactInfo);
      return { ...contactInfo, _id: result.insertedId };
    } catch (error) {
      console.error("Error initializing contact info:", error);
      throw new Error(`Failed to initialize contact info: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
