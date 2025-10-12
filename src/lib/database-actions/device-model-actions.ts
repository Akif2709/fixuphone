"use server";

import { BrandModel } from "../../db/models/Brand";
import { DeviceModelModel } from "../../db/models/DeviceModel";
import { CreateDeviceModelRequest, DeviceModelQuery, DeviceModel, SerializedDeviceModel } from "../../types";

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

export async function getDeviceModelById(id: string) {
  try {
    const deviceModel = await DeviceModelModel.findById(id);
    if (!deviceModel) {
      return { success: false, error: "Device model not found" };
    }
    return { success: true, data: deviceModel };
  } catch (error) {
    console.error("Error fetching device model:", error);
    return { success: false, error: "Failed to fetch device model" };
  }
}

export async function getDeviceModelsByQuery(query: DeviceModelQuery) {
  try {
    const deviceModels = await DeviceModelModel.findByQuery(query);
    return { success: true, data: deviceModels };
  } catch (error) {
    console.error("Error fetching device models by query:", error);
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

// ==================== BRAND-SPECIFIC QUERIES ====================

/**
 * Get device models by brand ID (sorted by release year descending at database level)
 */
export async function getDeviceModelsByBrandId(brandId: string): Promise<{ success: boolean; data?: DeviceModel[]; error?: string }> {
  try {
    // Sorting is done at database level for better performance
    const models = await DeviceModelModel.findByBrandId(brandId);
    return { success: true, data: models };
  } catch (error) {
    console.error("Error fetching device models by brand:", error);
    return { success: false, error: "Failed to fetch device models by brand" };
  }
}

/**
 * Get device models by brand name (helper for easier use in booking form)
 */
export async function getDeviceModelsByBrandName(brandName: string): Promise<{ success: boolean; data?: DeviceModel[]; error?: string }> {
  try {
    const brands = await BrandModel.findByQuery({ name: brandName });
    if (brands.length === 0) {
      return { success: true, data: [] };
    }

    const brandId = brands[0]._id?.toString();
    if (!brandId) {
      return { success: true, data: [] };
    }

    return await getDeviceModelsByBrandId(brandId);
  } catch (error) {
    console.error("Error fetching device models by brand name:", error);
    return { success: false, error: "Failed to fetch device models" };
  }
}

// ==================== TYPE-SPECIFIC QUERIES ====================

/**
 * Get all device models grouped by type (phone/tablet)
 * Useful for booking forms that need separate lists
 */
export async function getDeviceModelsByType(): Promise<{
  success: boolean;
  data?: { phones: DeviceModel[]; tablets: DeviceModel[] };
  error?: string;
}> {
  try {
    const allModels = await DeviceModelModel.findAll();
    const phones = allModels.filter((model) => model.type === "phone");
    const tablets = allModels.filter((model) => model.type === "tablet");

    // Sort both by release year descending
    phones.sort((a, b) => b.releaseYear - a.releaseYear);
    tablets.sort((a, b) => b.releaseYear - a.releaseYear);

    return { success: true, data: { phones, tablets } };
  } catch (error) {
    console.error("Error fetching device models by type:", error);
    return { success: false, error: "Failed to fetch device models" };
  }
}

// Deprecated: Use getDeviceModelsByBrandId instead
export async function getDeviceModelsByBrand(brandId: string) {
  return getDeviceModelsByBrandId(brandId);
}
