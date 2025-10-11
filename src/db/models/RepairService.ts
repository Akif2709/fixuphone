import { Collection, ObjectId } from "mongodb";
import { getDatabase } from "../connection";
import { RepairService, CreateRepairServiceRequest, RepairServiceQuery, DeviceModel, Brand, RepairType } from "../../types";

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

  static async findById(id: string | ObjectId): Promise<RepairService | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }

  static async findAll(): Promise<RepairService[]> {
    const collection = await this.getCollection();
    return await collection.find().sort({ issue_name: 1 }).toArray();
  }

  static async findActive(): Promise<RepairService[]> {
    const collection = await this.getCollection();
    return await collection.find({ is_active: true }).sort({ issue_name: 1 }).toArray();
  }

  static async findByDeviceModelId(deviceModelId: string | ObjectId): Promise<RepairService[]> {
    const collection = await this.getCollection();
    const objectId = typeof deviceModelId === "string" ? new ObjectId(deviceModelId) : deviceModelId;
    return await collection.find({ device_model_id: objectId }).sort({ issue_name: 1 }).toArray();
  }

  static async findActiveByDeviceModelId(deviceModelId: string | ObjectId): Promise<RepairService[]> {
    const collection = await this.getCollection();
    const objectId = typeof deviceModelId === "string" ? new ObjectId(deviceModelId) : deviceModelId;
    return await collection
      .find({
        device_model_id: objectId,
        is_active: true,
      })
      .sort({ issue_name: 1 })
      .toArray();
  }

  static async findByQuery(query: RepairServiceQuery): Promise<RepairService[]> {
    const collection = await this.getCollection();
    const filter: Record<string, unknown> = {};

    if (query.deviceModelId) {
      filter.deviceModelId = new ObjectId(query.deviceModelId);
    }

    if (query.repairTypeId) {
      filter.repairTypeId = new ObjectId(query.repairTypeId);
    }

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive;
    }

    return await collection.find(filter).sort({ createdAt: -1 }).toArray();
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

  static async toggleActiveStatus(id: string | ObjectId): Promise<RepairService | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const repairService = await collection.findOne({ _id: objectId });
    if (!repairService) return null;

    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          isActive: !repairService.isActive,
        },
      },
      { returnDocument: "after" }
    );

    return result ?? null;
  }

  static async deleteById(id: string | ObjectId): Promise<boolean> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }
}
