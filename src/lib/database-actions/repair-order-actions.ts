"use server";

import { RepairOrderModel } from "../../db/models/RepairOrder";

// ==================== REPAIR ORDER OPERATIONS ====================

export async function getAllRepairOrdersWithRelations() {
  try {
    const repairOrders = await RepairOrderModel.findAllWithRelations();
    return { success: true, data: repairOrders };
  } catch (error) {
    console.error("Error fetching repair orders with relations:", error);
    return { success: false, error: "Failed to fetch repair orders with relations" };
  }
}
