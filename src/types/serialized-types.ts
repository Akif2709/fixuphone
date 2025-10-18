import { DeviceType, RepairOrderStatus } from "./core-types";

/**
 * Serialized types for passing data from Server Components to Client Components
 * These types convert ObjectId and Date to string for JSON serialization
 */

// ==================== SERIALIZED TYPES ====================

export interface SerializedBrand {
  _id?: string;
  name: string;
  logo_url: string;
  created_at: string;
}

export interface SerializedDeviceModel {
  _id?: string;
  brandId: string;
  name: string;
  type: DeviceType;
  specifications?: string;
  releaseYear: number;
  createdAt: string;
  brand?: SerializedBrand;
}

export interface SerializedRepairType {
  _id?: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface SerializedRepairService {
  _id?: string;
  deviceModelId: string;
  repairTypeId: string;
  description?: string;
  price: number;
  estimatedTimeMinutes: number;
  isActive: boolean;
  createdAt: string;
  deviceModel?: SerializedDeviceModel;
  repairType?: SerializedRepairType;
}

export interface SerializedRepairOrder {
  _id?: string;
  orderNumber: string;
  deviceModelId: string;
  repairServiceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  imeiOrSerial: string;
  problemDescription: string;
  status: RepairOrderStatus;
  technicianNotes?: string;
  repairCost: number;
  orderDate: string;
  estimatedCompletion: string;
  createdAt: string;
  updatedAt: string;
  deviceModel?: SerializedDeviceModel;
  repairService?: SerializedRepairService;
}
