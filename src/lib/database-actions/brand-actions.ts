"use server";

import { BrandModel } from "../../db/models/Brand";
import { CreateBrandRequest, SerializedBrand } from "../../types";

// ==================== BRAND OPERATIONS ====================

export async function createBrand(data: CreateBrandRequest) {
  try {
    const brand = await BrandModel.create(data);
    return { success: true, data: brand };
  } catch (error) {
    console.error("Error creating brand:", error);
    return { success: false, error: "Failed to create brand" };
  }
}

export async function getAllBrands(): Promise<{
  success: boolean;
  data?: SerializedBrand[];
  error?: string;
}> {
  try {
    const brands = await BrandModel.findAll();
    // Serialize ObjectIds and Dates to strings for client components
    const serialized: SerializedBrand[] = brands.map((brand) => ({
      _id: brand._id?.toString(),
      name: brand.name,
      logo_url: brand.logo_url,
      created_at: brand.created_at.toISOString(),
    }));
    return { success: true, data: serialized };
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { success: false, error: "Failed to fetch brands" };
  }
}
