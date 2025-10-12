import { Collection } from "mongodb";
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
}
