import { Collection, ObjectId } from "mongodb";
import { getDatabase } from "../connection";
import { RepairService, CreateRepairServiceRequest, DeviceModel, Brand, RepairType } from "../../types";

export class RepairServiceModel {
  private static collectionName = "repair_services";

  private static async getCollection(): Promise<Collection<RepairService>> {
    const db = await getDatabase();
    return db.collection<RepairService>(this.collectionName);
  }

  static async create(data: CreateRepairServiceRequest): Promise<RepairService> {
    try {
      const collection = await this.getCollection();
      const now = new Date();

      const repairService: RepairService = {
        ...data,
        deviceModelId: new ObjectId(data.deviceModelId),
        repairTypeId: new ObjectId(data.repairTypeId),
        isActive: data.isActive ?? true, // Default to true if not provided
        createdAt: now,
      };

      const result = await collection.insertOne(repairService);
      if (!result.insertedId) {
        throw new Error("Failed to create repair service");
      }

      return { ...repairService, _id: result.insertedId };
    } catch (error) {
      console.error("Error creating repair service:", error);
      throw new Error(`Failed to create repair service: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async findAll(): Promise<RepairService[]> {
    const collection = await this.getCollection();
    return await collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  static async findByDeviceModelId(deviceModelId: string | ObjectId): Promise<RepairService[]> {
    const collection = await this.getCollection();
    const objectId = typeof deviceModelId === "string" ? new ObjectId(deviceModelId) : deviceModelId;
    return await collection.find({ deviceModelId: objectId }).sort({ createdAt: -1 }).toArray();
  }

  static async findAllWithRepairTypes(): Promise<Array<RepairService & { repairType: RepairType }>> {
    const collection = await this.getCollection();

    const results = await collection
      .aggregate([
        {
          $lookup: {
            from: "repair_types",
            localField: "repairTypeId",
            foreignField: "_id",
            as: "repairType",
          },
        },
        {
          $unwind: { path: "$repairType", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    return results as Array<RepairService & { repairType: RepairType }>;
  }

  static async findAllWithDeviceModels(): Promise<
    Array<RepairService & { deviceModel: DeviceModel; brand: Brand; repairType: RepairType }>
  > {
    const collection = await this.getCollection();

    const results = await collection
      .aggregate([
        {
          $lookup: {
            from: "device_models",
            localField: "deviceModelId",
            foreignField: "_id",
            as: "deviceModel",
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "deviceModel.brandId",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $lookup: {
            from: "repair_types",
            localField: "repairTypeId",
            foreignField: "_id",
            as: "repairType",
          },
        },
        {
          $unwind: { path: "$deviceModel", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$brand", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$repairType", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    return results as Array<RepairService & { deviceModel: DeviceModel; brand: Brand; repairType: RepairType }>;
  }

  static async updateById(id: string | ObjectId, updateData: Partial<CreateRepairServiceRequest>): Promise<RepairService | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const updateDoc: Record<string, unknown> = {
      ...updateData,
    };

    if (updateData.deviceModelId) {
      updateDoc.deviceModelId = new ObjectId(updateData.deviceModelId);
    }

    if (updateData.repairTypeId) {
      updateDoc.repairTypeId = new ObjectId(updateData.repairTypeId);
    }

    const result = await collection.findOneAndUpdate({ _id: objectId }, { $set: updateDoc }, { returnDocument: "after" });

    return result ?? null;
  }
}
