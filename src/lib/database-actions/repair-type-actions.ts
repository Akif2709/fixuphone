"use server";

import { RepairTypeModel } from "../../db/models/RepairType";
import { serializeRepairTypes } from "../utils/serialization";

// ==================== REPAIR TYPE OPERATIONS ====================

export async function getAllRepairTypes() {
  try {
    const repairTypes = await RepairTypeModel.findAll();
    return { success: true, data: serializeRepairTypes(repairTypes) };
  } catch (error) {
    console.error("Error fetching repair types:", error);
    return { success: false, error: "Failed to fetch repair types" };
  }
}
