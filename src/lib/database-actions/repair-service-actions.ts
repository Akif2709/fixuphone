'use server';

import { RepairServiceModel } from '../../db/models/RepairService';
import { 
  CreateRepairServiceRequest,
  RepairServiceQuery
} from '../../types';

// ==================== REPAIR SERVICE OPERATIONS ====================

export async function createRepairService(data: CreateRepairServiceRequest) {
  try {
    const repairService = await RepairServiceModel.create(data);
    return { success: true, data: repairService };
  } catch (error) {
    console.error('Error creating repair service:', error);
    return { success: false, error: 'Failed to create repair service' };
  }
}

export async function getAllRepairServices() {
  try {
    const repairServices = await RepairServiceModel.findAll();
    return { success: true, data: repairServices };
  } catch (error) {
    console.error('Error fetching repair services:', error);
    return { success: false, error: 'Failed to fetch repair services' };
  }
}

export async function getActiveRepairServices() {
  try {
    const repairServices = await RepairServiceModel.findActive();
    return { success: true, data: repairServices };
  } catch (error) {
    console.error('Error fetching active repair services:', error);
    return { success: false, error: 'Failed to fetch active repair services' };
  }
}

export async function getRepairServiceById(id: string) {
  try {
    const repairService = await RepairServiceModel.findById(id);
    if (!repairService) {
      return { success: false, error: 'Repair service not found' };
    }
    return { success: true, data: repairService };
  } catch (error) {
    console.error('Error fetching repair service:', error);
    return { success: false, error: 'Failed to fetch repair service' };
  }
}

export async function getRepairServicesByDeviceModel(deviceModelId: string) {
  try {
    const repairServices = await RepairServiceModel.findByDeviceModelId(deviceModelId);
    return { success: true, data: repairServices };
  } catch (error) {
    console.error('Error fetching repair services by device model:', error);
    return { success: false, error: 'Failed to fetch repair services by device model' };
  }
}

export async function getActiveRepairServicesByDeviceModel(deviceModelId: string) {
  try {
    const repairServices = await RepairServiceModel.findActiveByDeviceModelId(deviceModelId);
    return { success: true, data: repairServices };
  } catch (error) {
    console.error('Error fetching active repair services by device model:', error);
    return { success: false, error: 'Failed to fetch active repair services by device model' };
  }
}

export async function getRepairServicesByQuery(query: RepairServiceQuery) {
  try {
    const repairServices = await RepairServiceModel.findByQuery(query);
    return { success: true, data: repairServices };
  } catch (error) {
    console.error('Error fetching repair services by query:', error);
    return { success: false, error: 'Failed to fetch repair services' };
  }
}

export async function getRepairServicesWithDeviceModels() {
  try {
    const repairServices = await RepairServiceModel.findAllWithDeviceModels();
    return { success: true, data: repairServices };
  } catch (error) {
    console.error('Error fetching repair services with device models:', error);
    return { success: false, error: 'Failed to fetch repair services with device models' };
  }
}

export async function toggleRepairServiceActiveStatus(id: string) {
  try {
    const repairService = await RepairServiceModel.toggleActiveStatus(id);
    if (!repairService) {
      return { success: false, error: 'Repair service not found' };
    }
    return { success: true, data: repairService };
  } catch (error) {
    console.error('Error toggling repair service active status:', error);
    return { success: false, error: 'Failed to toggle repair service active status' };
  }
}
