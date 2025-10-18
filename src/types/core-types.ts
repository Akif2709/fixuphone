import { ObjectId } from "mongodb";

// ==================== CORE TYPES ====================

export type RepairOrderStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export type DeviceType = "phone" | "tablet";

// ==================== CORE INTERFACES ====================

export interface Brand {
  _id?: ObjectId;
  name: string;
  logo_url: string;
  created_at: Date;
}

export interface DeviceModel {
  _id?: ObjectId;
  brandId: ObjectId;
  name: string; // "model_name" → just "name"
  type: DeviceType; // "device_type" → just "type" (enum: "phone" | "tablet")
  specifications?: string; // optional
  releaseYear: number;
  createdAt: Date;
  // Populated
  brand?: Brand;
}

export interface RepairType {
  _id?: ObjectId;
  name: string;
  description?: string; // optional
  createdAt: Date;
}

export interface RepairService {
  _id?: ObjectId;
  deviceModelId: ObjectId;
  repairTypeId: ObjectId;
  description?: string; // optional
  price: number;
  estimatedTimeMinutes: number; // shorter name
  isActive: boolean;
  createdAt: Date;
  // Populated
  deviceModel?: DeviceModel;
  repairType?: RepairType;
}

export interface RepairOrder {
  _id?: ObjectId;
  orderNumber: string;
  deviceModelId: ObjectId;
  repairServiceId: ObjectId;

  // Customer info
  customerName: string;
  customerPhone: string;
  customerEmail?: string; // optional

  // Device info
  imeiOrSerial: string; // combined field name
  problemDescription: string;
  status: RepairOrderStatus;
  technicianNotes?: string; // optional
  repairCost: number;
  orderDate: Date;
  estimatedCompletion: Date;
  createdAt: Date;
  updatedAt: Date;

  // Populated
  deviceModel?: DeviceModel;
  repairService?: RepairService;
}
