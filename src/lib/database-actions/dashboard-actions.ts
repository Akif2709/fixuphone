'use server';

import { RepairOrderModel } from '../../db/models/RepairOrder';
import { getAllBrands } from './brand-actions';
import { getDeviceModelsWithBrands } from './device-model-actions';
import { getRepairServicesWithDeviceModels } from './repair-service-actions';
import { getAllRepairOrdersWithRelations } from './repair-order-actions';

// ==================== STATISTICS ====================

export async function getRepairOrderStats() {
  try {
    const stats = await RepairOrderModel.getStats();
    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching repair order statistics:', error);
    return { success: false, error: 'Failed to fetch repair order statistics' };
  }
}

// ==================== DASHBOARD DATA ====================

export async function getDashboardData() {
  try {
    const [brandsResult, deviceModelsResult, repairServicesResult, repairOrdersResult, statsResult] = await Promise.all([
      getAllBrands(),
      getDeviceModelsWithBrands(),
      getRepairServicesWithDeviceModels(),
      getAllRepairOrdersWithRelations(),
      getRepairOrderStats()
    ]);

    return {
      success: true,
      data: {
        brands: brandsResult.success ? brandsResult.data : [],
        deviceModels: deviceModelsResult.success ? deviceModelsResult.data : [],
        repairServices: repairServicesResult.success ? repairServicesResult.data : [],
        repairOrders: repairOrdersResult.success ? repairOrdersResult.data : [],
        stats: statsResult.success ? statsResult.data : null
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { success: false, error: 'Failed to fetch dashboard data' };
  }
}
