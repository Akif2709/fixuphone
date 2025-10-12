import { Collection, ObjectId } from "mongodb";
import { getDatabase } from "../connection";
import { DeviceModel, CreateDeviceModelRequest, DeviceModelQuery, Brand } from "../../types";

export class DeviceModelModel {
  private static collectionName = "device_models";

  private static async getCollection(): Promise<Collection<DeviceModel>> {
    const db = await getDatabase();
    return db.collection<DeviceModel>(this.collectionName);
  }

  static async create(data: CreateDeviceModelRequest): Promise<DeviceModel> {
    const collection = await this.getCollection();
    const now = new Date();

    const deviceModel: DeviceModel = {
      ...data,
      brandId: new ObjectId(data.brandId),
      createdAt: now,
    };

    const result = await collection.insertOne(deviceModel);
    return { ...deviceModel, _id: result.insertedId };
  }

  static async findById(id: string | ObjectId): Promise<DeviceModel | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }

  static async findAll(): Promise<DeviceModel[]> {
    const collection = await this.getCollection();
    return await collection.find().sort({ releaseYear: -1, name: 1 }).toArray();
  }

  static async findByBrandId(brandId: string | ObjectId): Promise<DeviceModel[]> {
    const collection = await this.getCollection();
    const objectId = typeof brandId === "string" ? new ObjectId(brandId) : brandId;
    return await collection.find({ brandId: objectId }).sort({ releaseYear: -1, name: 1 }).toArray();
  }

  static async findByQuery(query: DeviceModelQuery): Promise<DeviceModel[]> {
    const collection = await this.getCollection();
    const filter: Record<string, unknown> = {};

    if (query.brandId) {
      filter.brandId = new ObjectId(query.brandId);
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }

    return await collection.find(filter).sort({ name: 1 }).toArray();
  }

  static async findAllWithBrands(): Promise<Array<DeviceModel & { brand: Brand }>> {
    const collection = await this.getCollection();

    const results = await collection
      .aggregate([
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $unwind: { path: "$brand", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: { releaseYear: -1, name: 1 },
        },
      ])
      .toArray();

    return results as Array<DeviceModel & { brand: Brand }>;
  }

  static async deleteById(id: string | ObjectId): Promise<boolean> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }
}
