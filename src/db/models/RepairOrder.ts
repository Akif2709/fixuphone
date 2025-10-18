import { Collection, ObjectId } from "mongodb";
import { getDatabase } from "../connection";
import { RepairOrder, CreateRepairOrderRequest, DeviceModel, RepairService, Brand } from "../../types";

// Interface for repair orders with populated relations
interface RepairOrderWithRelations extends RepairOrder {
  device_model: DeviceModel;
  repair_service: RepairService;
  brand: Brand;
}

// Interface for status aggregation result
interface StatusAggregationResult {
  _id: string;
  count: number;
}

// Interface for brand aggregation result
interface BrandAggregationResult {
  _id: string;
  count: number;
}

// Interface for revenue aggregation result
interface RevenueAggregationResult {
  _id: null;
  total_revenue: number;
}

export class RepairOrderModel {
  private static collectionName = "repair_orders";

  private static async getCollection(): Promise<Collection<RepairOrder>> {
    const db = await getDatabase();
    return db.collection<RepairOrder>(this.collectionName);
  }

  static async create(data: CreateRepairOrderRequest): Promise<RepairOrder> {
    try {
      const collection = await this.getCollection();
      const now = new Date();

      const repairOrder: RepairOrder = {
        ...data,
        deviceModelId: new ObjectId(data.deviceModelId),
        repairServiceId: new ObjectId(data.repairServiceId),
        orderNumber: this.generateOrderNumber(),
        status: "pending", // Initialize with pending status
        technicianNotes: "", // Initialize empty technician notes
        createdAt: now,
        updatedAt: now,
      };

      const result = await collection.insertOne(repairOrder);
      if (!result.insertedId) {
        throw new Error("Failed to create repair order");
      }

      return { ...repairOrder, _id: result.insertedId };
    } catch (error) {
      console.error("Error creating repair order:", error);
      throw new Error(`Failed to create repair order: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async findAllWithRelations(): Promise<RepairOrderWithRelations[]> {
    const collection = await this.getCollection();

    return await collection
      .aggregate<RepairOrderWithRelations>([
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
            from: "repair_services",
            localField: "repairServiceId",
            foreignField: "_id",
            as: "repairService",
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
          $unwind: { path: "$deviceModel", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$repairService", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$brand", preserveNullAndEmptyArrays: true },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();
  }

  static async getStats(): Promise<{
    total_orders: number;
    orders_by_status: Record<string, number>;
    orders_by_brand: Record<string, number>;
    total_revenue: number;
  }> {
    try {
      const collection = await this.getCollection();

      const [totalOrders, statusStats, brandStats, revenueStats] = await Promise.all([
        collection.countDocuments(),
        collection.aggregate<StatusAggregationResult>([{ $group: { _id: "$status", count: { $sum: 1 } } }]).toArray(),
        collection
          .aggregate<BrandAggregationResult>([
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
              $unwind: "$brand",
            },
            {
              $group: { _id: "$brand.name", count: { $sum: 1 } },
            },
          ])
          .toArray(),
        collection.aggregate<RevenueAggregationResult>([{ $group: { _id: null, total_revenue: { $sum: "$repairCost" } } }]).toArray(),
      ]);

      return {
        total_orders: totalOrders,
        orders_by_status: statusStats.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {}),
        orders_by_brand: brandStats.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {}),
        total_revenue: revenueStats[0]?.total_revenue || 0,
      };
    } catch (error) {
      console.error("Error getting repair order stats:", error);
      throw new Error(`Failed to get repair order stats: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  private static generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RO-${timestamp}-${random}`;
  }
}
