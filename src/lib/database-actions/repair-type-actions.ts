'use server';

import { RepairTypeModel } from '../../db/models/RepairType';
import { 
  CreateRepairTypeRequest,
  RepairTypeQuery
} from '../../types';

// ==================== REPAIR TYPE OPERATIONS ====================

export async function createRepairType(data: CreateRepairTypeRequest) {
  try {
    const repairType = await RepairTypeModel.create(data);
    return { success: true, data: repairType };
  } catch (error) {
    console.error('Error creating repair type:', error);
    return { success: false, error: 'Failed to create repair type' };
  }
}

export async function getAllRepairTypes() {
  try {
    const repairTypes = await RepairTypeModel.findAll();
    return { success: true, data: repairTypes };
  } catch (error) {
    console.error('Error fetching repair types:', error);
    return { success: false, error: 'Failed to fetch repair types' };
  }
}

export async function getActiveRepairTypes() {
  try {
    const repairTypes = await RepairTypeModel.findActive();
    return { success: true, data: repairTypes };
  } catch (error) {
    console.error('Error fetching active repair types:', error);
    return { success: false, error: 'Failed to fetch active repair types' };
  }
}

export async function getRepairTypeById(id: string) {
  try {
    const repairType = await RepairTypeModel.findById(id);
    if (!repairType) {
      return { success: false, error: 'Repair type not found' };
    }
    return { success: true, data: repairType };
  } catch (error) {
    console.error('Error fetching repair type:', error);
    return { success: false, error: 'Failed to fetch repair type' };
  }
}

export async function getRepairTypesByCategory(category: string) {
  try {
    const repairTypes = await RepairTypeModel.findByCategory(category);
    return { success: true, data: repairTypes };
  } catch (error) {
    console.error('Error fetching repair types by category:', error);
    return { success: false, error: 'Failed to fetch repair types by category' };
  }
}

export async function getRepairTypesByQuery(query: RepairTypeQuery) {
  try {
    const repairTypes = await RepairTypeModel.findByQuery(query);
    return { success: true, data: repairTypes };
  } catch (error) {
    console.error('Error fetching repair types by query:', error);
    return { success: false, error: 'Failed to fetch repair types' };
  }
}

export async function updateRepairType(id: string, updateData: Partial<CreateRepairTypeRequest>) {
  try {
    const repairType = await RepairTypeModel.updateById(id, updateData);
    if (!repairType) {
      return { success: false, error: 'Repair type not found' };
    }
    return { success: true, data: repairType };
  } catch (error) {
    console.error('Error updating repair type:', error);
    return { success: false, error: 'Failed to update repair type' };
  }
}

export async function toggleRepairTypeActiveStatus(id: string) {
  try {
    const repairType = await RepairTypeModel.toggleActiveStatus(id);
    if (!repairType) {
      return { success: false, error: 'Repair type not found' };
    }
    return { success: true, data: repairType };
  } catch (error) {
    console.error('Error toggling repair type active status:', error);
    return { success: false, error: 'Failed to toggle repair type active status' };
  }
}

export async function deleteRepairType(id: string) {
  try {
    const success = await RepairTypeModel.deleteById(id);
    if (!success) {
      return { success: false, error: 'Repair type not found' };
    }
    return { success: true, data: { deleted: true } };
  } catch (error) {
    console.error('Error deleting repair type:', error);
    return { success: false, error: 'Failed to delete repair type' };
  }
}

export async function getRepairTypeCategories() {
  try {
    const categories = await RepairTypeModel.getCategories();
    return { success: true, data: categories };
  } catch (error) {
    console.error('Error fetching repair type categories:', error);
    return { success: false, error: 'Failed to fetch categories' };
  }
}
