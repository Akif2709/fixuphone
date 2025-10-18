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

  static async findByQuery(query: RepairTypeQuery): Promise<RepairType[]> {
    try {
      const collection = await this.getCollection();
      const filter: Record<string, unknown> = {};

      if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
      }

      return await collection.find(filter).sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error fetching repair types by query:", error);
      throw new Error(`Failed to fetch repair types: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
