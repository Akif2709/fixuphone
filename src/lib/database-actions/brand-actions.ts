"use server";

import { BrandModel } from "../../db/models/Brand";
import { SerializedBrand } from "../../types";

// ==================== BRAND OPERATIONS ====================

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
