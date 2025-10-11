'use server';

import { DeviceModelModel } from '../../db/models/DeviceModel';
import { 
  CreateDeviceModelRequest,
  DeviceModelQuery
} from '../../types';

// ==================== DEVICE MODEL OPERATIONS ====================

export async function createDeviceModel(data: CreateDeviceModelRequest) {
  try {
    const deviceModel = await DeviceModelModel.create(data);
    return { success: true, data: deviceModel };
  } catch (error) {
    console.error('Error creating device model:', error);
    return { success: false, error: 'Failed to create device model' };
  }
}

export async function getAllDeviceModels() {
  try {
    const deviceModels = await DeviceModelModel.findAll();
    return { success: true, data: deviceModels };
  } catch (error) {
    console.error('Error fetching device models:', error);
    return { success: false, error: 'Failed to fetch device models' };
  }
}

export async function getDeviceModelById(id: string) {
  try {
    const deviceModel = await DeviceModelModel.findById(id);
    if (!deviceModel) {
      return { success: false, error: 'Device model not found' };
    }
    return { success: true, data: deviceModel };
  } catch (error) {
    console.error('Error fetching device model:', error);
    return { success: false, error: 'Failed to fetch device model' };
  }
}

export async function getDeviceModelsByBrand(brandId: string) {
  try {
    const deviceModels = await DeviceModelModel.findByBrandId(brandId);
    return { success: true, data: deviceModels };
  } catch (error) {
    console.error('Error fetching device models by brand:', error);
    return { success: false, error: 'Failed to fetch device models by brand' };
  }
}

export async function getDeviceModelsByQuery(query: DeviceModelQuery) {
  try {
    const deviceModels = await DeviceModelModel.findByQuery(query);
    return { success: true, data: deviceModels };
  } catch (error) {
    console.error('Error fetching device models by query:', error);
    return { success: false, error: 'Failed to fetch device models' };
  }
}

export async function getDeviceModelsWithBrands() {
  try {
    const deviceModels = await DeviceModelModel.findAllWithBrands();
    return { success: true, data: deviceModels };
  } catch (error) {
    console.error('Error fetching device models with brands:', error);
    return { success: false, error: 'Failed to fetch device models with brands' };
  }
}
