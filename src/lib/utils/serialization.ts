import { ObjectId } from "mongodb";
import type { RepairType, RepairService } from "@/types/core-types";
import type { SerializedRepairType, SerializedRepairService } from "@/types/serialized-types";

/**
 * Serialize MongoDB ObjectId to string for client components
 * This prevents the "Only plain objects can be passed to Client Components" error
 */
export function serializeObjectId<T extends { _id?: ObjectId }>(obj: T): Omit<T, "_id"> & { _id?: string } {
  return {
    ...obj,
    _id: obj._id?.toString(),
  };
}

/**
 * Serialize an array of objects with ObjectId fields
 */
export function serializeObjectIdArray<T extends { _id?: ObjectId }>(arr: T[]): Array<Omit<T, "_id"> & { _id?: string }> {
  return arr.map((item) => serializeObjectId(item));
}

/**
 * Serialize RepairType for client components
 */
export function serializeRepairType(repairType: RepairType): SerializedRepairType {
  return {
    _id: repairType._id?.toString(),
    name: repairType.name,
    description: repairType.description,
    createdAt: repairType.createdAt?.toISOString() || "",
  };
}

/**
 * Serialize array of RepairType objects
 */
export function serializeRepairTypes(repairTypes: RepairType[]): SerializedRepairType[] {
  return repairTypes.map(serializeRepairType);
}

/**
 * Serialize RepairService for client components
 */
export function serializeRepairService(service: RepairService): SerializedRepairService {
  return {
    _id: service._id?.toString(),
    deviceModelId: service.deviceModelId.toString(),
    repairTypeId: service.repairTypeId.toString(),
    description: service.description,
    price: service.price,
    estimatedTimeMinutes: service.estimatedTimeMinutes,
    isActive: service.isActive,
    createdAt: service.createdAt.toISOString(),
  };
}

/**
 * Serialize array of RepairService objects
 */
export function serializeRepairServices(services: RepairService[]): SerializedRepairService[] {
  return services.map(serializeRepairService);
}

/**
 * Serialize RepairService with RepairType for client components
 */
export function serializeRepairServiceWithType(
  service: RepairService & { repairType: RepairType }
): SerializedRepairService & { repairType: SerializedRepairType } {
  return {
    ...serializeRepairService(service),
    repairType: serializeRepairType(service.repairType),
  };
}

/**
 * Serialize array of RepairService objects with RepairType
 */
export function serializeRepairServicesWithTypes(
  services: Array<RepairService & { repairType: RepairType }>
): Array<SerializedRepairService & { repairType: SerializedRepairType }> {
  return services.map(serializeRepairServiceWithType);
}
