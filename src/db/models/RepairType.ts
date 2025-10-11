import { Collection, ObjectId } from "mongodb";
import { getDatabase } from "../connection";
import { RepairType, CreateRepairTypeRequest, RepairTypeQuery } from "../../types";

export class RepairTypeModel {
  private static collectionName = "repair_types";

  private static async getCollection(): Promise<Collection<RepairType>> {
    const db = await getDatabase();
    return db.collection<RepairType>(this.collectionName);
  }

  static async create(data: CreateRepairTypeRequest): Promise<RepairType> {
    try {
      const collection = await this.getCollection();
      const now = new Date();

      const repairType: RepairType = {
        ...data,
        isActive: data.isActive ?? true, // Default to active
        createdAt: now,
      };

      const result = await collection.insertOne(repairType);
      if (!result.insertedId) {
        throw new Error("Failed to create repair type");
      }

      return { ...repairType, _id: result.insertedId };
    } catch (error) {
      console.error("Error creating repair type:", error);
      throw new Error(`Failed to create repair type: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async findById(id: string | ObjectId): Promise<RepairType | null> {
    try {
      const collection = await this.getCollection();
      const objectId = typeof id === "string" ? new ObjectId(id) : id;
      return await collection.findOne({ _id: objectId });
    } catch (error) {
      console.error("Error finding repair type by ID:", error);
      throw new Error(`Failed to find repair type: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async findAll(): Promise<RepairType[]> {
    try {
      const collection = await this.getCollection();
      return await collection.find().sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error fetching all repair types:", error);
      throw new Error(`Failed to fetch repair types: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async findActive(): Promise<RepairType[]> {
    try {
      const collection = await this.getCollection();
      return await collection.find({ isActive: true }).sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error fetching active repair types:", error);
      throw new Error(`Failed to fetch active repair types: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async findByCategory(category: string): Promise<RepairType[]> {
    try {
      const collection = await this.getCollection();
      return await collection.find({ category }).sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error fetching repair types by category:", error);
      throw new Error(`Failed to fetch repair types by category: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async findByQuery(query: RepairTypeQuery): Promise<RepairType[]> {
    try {
      const collection = await this.getCollection();
      const filter: Record<string, unknown> = {};

      if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
      }

      if (query.category) {
        filter.category = { $regex: query.category, $options: "i" };
      }

      if (query.isActive !== undefined) {
        filter.isActive = query.isActive;
      }

      return await collection.find(filter).sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error fetching repair types by query:", error);
      throw new Error(`Failed to fetch repair types: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async updateById(id: string | ObjectId, updateData: Partial<CreateRepairTypeRequest>): Promise<RepairType | null> {
    try {
      const collection = await this.getCollection();
      const objectId = typeof id === "string" ? new ObjectId(id) : id;

      const result = await collection.findOneAndUpdate({ _id: objectId }, { $set: updateData }, { returnDocument: "after" });

      return result ?? null;
    } catch (error) {
      console.error("Error updating repair type:", error);
      throw new Error(`Failed to update repair type: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async toggleActiveStatus(id: string | ObjectId): Promise<RepairType | null> {
    try {
      const collection = await this.getCollection();
      const objectId = typeof id === "string" ? new ObjectId(id) : id;

      // First get the current status
      const current = await collection.findOne({ _id: objectId });
      if (!current) {
        return null;
      }

      const result = await collection.findOneAndUpdate(
        { _id: objectId },
        { $set: { isActive: !current.isActive } },
        { returnDocument: "after" }
      );

      return result ?? null;
    } catch (error) {
      console.error("Error toggling repair type active status:", error);
      throw new Error(`Failed to toggle repair type active status: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async deleteById(id: string | ObjectId): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const objectId = typeof id === "string" ? new ObjectId(id) : id;

      const result = await collection.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting repair type:", error);
      throw new Error(`Failed to delete repair type: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const collection = await this.getCollection();
      const categories = await collection.distinct("category");
      return categories.sort();
    } catch (error) {
      console.error("Error fetching repair type categories:", error);
      throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
