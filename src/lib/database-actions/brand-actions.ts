'use server';

import { BrandModel } from '../../db/models/Brand';
import { 
  CreateBrandRequest
} from '../../types';

// ==================== BRAND OPERATIONS ====================

export async function createBrand(data: CreateBrandRequest) {
  try {
    const brand = await BrandModel.create(data);
    return { success: true, data: brand };
  } catch (error) {
    console.error('Error creating brand:', error);
    return { success: false, error: 'Failed to create brand' };
  }
}

export async function getAllBrands() {
  try {
    const brands = await BrandModel.findAll();
    return { success: true, data: brands };
  } catch (error) {
    console.error('Error fetching brands:', error);
    return { success: false, error: 'Failed to fetch brands' };
  }
}

