"use server";

import { RepairServiceModel } from "../../db/models/RepairService";
import { CreateRepairServiceRequest } from "../../types";
import { serializeRepairService, serializeRepairServices } from "../utils/serialization";

// ==================== REPAIR SERVICE OPERATIONS ====================

export async function getAllRepairServices() {
  try {
    const repairServices = await RepairServiceModel.findAll();
    return { success: true, data: serializeRepairServices(repairServices) };
  } catch (error) {
    console.error("Error fetching all repair services:", error);
    return { success: false, error: "Failed to fetch all repair services" };
  }
}

export async function createRepairService(data: CreateRepairServiceRequest) {
  try {
    const repairService = await RepairServiceModel.create(data);
    return { success: true, data: serializeRepairService(repairService) };
  } catch (error) {
    console.error("Error creating repair service:", error);
    return { success: false, error: "Failed to create repair service" };
  }
}

export async function getRepairServicesByDeviceModel(deviceModelId: string) {
  try {
    const repairServices = await RepairServiceModel.findByDeviceModelId(deviceModelId);
    return { success: true, data: serializeRepairServices(repairServices) };
  } catch (error) {
    console.error("Error fetching repair services by device model:", error);
    return { success: false, error: "Failed to fetch repair services by device model" };
  }
}

export async function getRepairServicesWithDeviceModels() {
  try {
    const repairServices = await RepairServiceModel.findAllWithDeviceModels();
    return { success: true, data: repairServices };
  } catch (error) {
    console.error("Error fetching repair services with device models:", error);
    return { success: false, error: "Failed to fetch repair services with device models" };
  }
}

export async function updateRepairService(id: string, updateData: Partial<CreateRepairServiceRequest>) {
  try {
    const repairService = await RepairServiceModel.updateById(id, updateData);
    if (!repairService) {
      return { success: false, error: "Repair service not found" };
    }
    return { success: true, data: serializeRepairService(repairService) };
  } catch (error) {
    console.error("Error updating repair service:", error);
    return { success: false, error: "Failed to update repair service" };
  }
}
