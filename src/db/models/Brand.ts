import { Collection, ObjectId } from "mongodb";
import { getDatabase } from "../connection";
import { Brand, CreateBrandRequest, BrandQuery } from "../../types";

export class BrandModel {
  private static collectionName = "brands";

  private static async getCollection(): Promise<Collection<Brand>> {
    const db = await getDatabase();
    return db.collection<Brand>(this.collectionName);
  }

  static async create(data: CreateBrandRequest): Promise<Brand> {
    const collection = await this.getCollection();
    const now = new Date();

    const brand: Brand = {
      ...data,
      created_at: now,
    };

    const result = await collection.insertOne(brand);
    return { ...brand, _id: result.insertedId };
  }

  static async findById(id: string | ObjectId): Promise<Brand | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }

  static async findAll(): Promise<Brand[]> {
    const collection = await this.getCollection();
    return await collection.find().sort({ name: 1 }).toArray();
  }

  static async findByQuery(query: BrandQuery): Promise<Brand[]> {
    const collection = await this.getCollection();
    const filter: Record<string, unknown> = {};

    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }

    return await collection.find(filter).sort({ name: 1 }).toArray();
  }

  static async updateById(id: string | ObjectId, updateData: Partial<CreateBrandRequest>): Promise<Brand | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const result = await collection.findOneAndUpdate({ _id: objectId }, { $set: updateData }, { returnDocument: "after" });

    return result ?? null;
  }

  static async deleteById(id: string | ObjectId): Promise<boolean> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }
}
