"use server";

import { RepairOrderModel } from "../../db/models/RepairOrder";

// ==================== STATISTICS ====================

export async function getRepairOrderStats() {
  try {
    const stats = await RepairOrderModel.getStats();
    return { success: true, data: stats };
  } catch (error) {
    console.error("Error fetching repair order statistics:", error);
    return { success: false, error: "Failed to fetch repair order statistics" };
  }
}
