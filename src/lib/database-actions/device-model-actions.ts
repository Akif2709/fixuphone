"use server";

import { DeviceModelModel } from "../../db/models/DeviceModel";
import { CreateDeviceModelRequest, SerializedDeviceModel } from "../../types";

// ==================== DEVICE MODEL CRUD OPERATIONS ====================

export async function createDeviceModel(data: CreateDeviceModelRequest): Promise<{
  success: boolean;
  data?: SerializedDeviceModel;
  error?: string;
}> {
  try {
    const deviceModel = await DeviceModelModel.create(data);
    // Serialize ObjectIds to strings for client components
    const serialized: SerializedDeviceModel = {
      _id: deviceModel._id?.toString(),
      brandId: deviceModel.brandId.toString(),
      name: deviceModel.name,
      type: deviceModel.type,
      specifications: deviceModel.specifications,
      releaseYear: deviceModel.releaseYear,
      createdAt: deviceModel.createdAt.toISOString(),
    };
    return { success: true, data: serialized };
  } catch (error) {
    console.error("Error creating device model:", error);
    return { success: false, error: "Failed to create device model" };
  }
}

export async function deleteDeviceModel(id: string) {
  try {
    const deleted = await DeviceModelModel.deleteById(id);
    if (!deleted) {
      return { success: false, error: "Device model not found" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting device model:", error);
    return { success: false, error: "Failed to delete device model" };
  }
}

export async function getAllDeviceModels(): Promise<{
  success: boolean;
  data?: SerializedDeviceModel[];
  error?: string;
}> {
  try {
    const deviceModels = await DeviceModelModel.findAll();
    // Serialize ObjectIds to strings for client components
    const serialized: SerializedDeviceModel[] = deviceModels.map((model) => ({
      _id: model._id?.toString(),
      brandId: model.brandId.toString(),
      name: model.name,
      type: model.type,
      specifications: model.specifications,
      releaseYear: model.releaseYear,
      createdAt: model.createdAt.toISOString(),
      ...(model.brand && {
        brand: {
          _id: model.brand._id?.toString(),
          name: model.brand.name,
          logo_url: model.brand.logo_url,
          created_at: model.brand.created_at.toISOString(),
        },
      }),
    }));
    return { success: true, data: serialized };
  } catch (error) {
    console.error("Error fetching device models:", error);
    return { success: false, error: "Failed to fetch device models" };
  }
}

export async function getDeviceModelsWithBrands() {
  try {
    const deviceModels = await DeviceModelModel.findAllWithBrands();
    return { success: true, data: deviceModels };
  } catch (error) {
    console.error("Error fetching device models with brands:", error);
    return { success: false, error: "Failed to fetch device models with brands" };
  }
}
