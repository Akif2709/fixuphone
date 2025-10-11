"use server";

import { RepairOrderModel } from "../../db/models/RepairOrder";
import { CreateRepairOrderRequest, RepairOrderQuery, RepairOrderStatus } from "../../types";

// ==================== REPAIR ORDER OPERATIONS ====================

export async function createRepairOrder(data: CreateRepairOrderRequest) {
  try {
    const repairOrder = await RepairOrderModel.create(data);
    return { success: true, data: repairOrder };
  } catch (error) {
    console.error("Error creating repair order:", error);
    return { success: false, error: "Failed to create repair order" };
  }
}

export async function getAllRepairOrders() {
  try {
    const repairOrders = await RepairOrderModel.findAll();
    return { success: true, data: repairOrders };
  } catch (error) {
    console.error("Error fetching repair orders:", error);
    return { success: false, error: "Failed to fetch repair orders" };
  }
}

export async function getAllRepairOrdersWithRelations() {
  try {
    const repairOrders = await RepairOrderModel.findAllWithRelations();
    return { success: true, data: repairOrders };
  } catch (error) {
    console.error("Error fetching repair orders with relations:", error);
    return { success: false, error: "Failed to fetch repair orders with relations" };
  }
}

export async function getRepairOrderById(id: string) {
  try {
    const repairOrder = await RepairOrderModel.findById(id);
    if (!repairOrder) {
      return { success: false, error: "Repair order not found" };
    }
    return { success: true, data: repairOrder };
  } catch (error) {
    console.error("Error fetching repair order:", error);
    return { success: false, error: "Failed to fetch repair order" };
  }
}

export async function getRepairOrderByOrderNumber(orderNumber: string) {
  try {
    const repairOrder = await RepairOrderModel.findByOrderNumber(orderNumber);
    if (!repairOrder) {
      return { success: false, error: "Repair order not found" };
    }
    return { success: true, data: repairOrder };
  } catch (error) {
    console.error("Error fetching repair order by order number:", error);
    return { success: false, error: "Failed to fetch repair order" };
  }
}

export async function getRepairOrdersByStatus(status: RepairOrderStatus) {
  try {
    const repairOrders = await RepairOrderModel.findByStatus(status);
    return { success: true, data: repairOrders };
  } catch (error) {
    console.error("Error fetching repair orders by status:", error);
    return { success: false, error: "Failed to fetch repair orders by status" };
  }
}

export async function getRepairOrdersByCustomerEmail(email: string) {
  try {
    const repairOrders = await RepairOrderModel.findByCustomerEmail(email);
    return { success: true, data: repairOrders };
  } catch (error) {
    console.error("Error fetching repair orders by customer email:", error);
    return { success: false, error: "Failed to fetch repair orders by customer email" };
  }
}

export async function getRepairOrdersByQuery(query: RepairOrderQuery) {
  try {
    const repairOrders = await RepairOrderModel.findByQuery(query);
    return { success: true, data: repairOrders };
  } catch (error) {
    console.error("Error fetching repair orders by query:", error);
    return { success: false, error: "Failed to fetch repair orders" };
  }
}

export async function updateRepairOrderStatus(id: string, status: string, technicianNotes?: string) {
  try {
    const repairOrder = await RepairOrderModel.updateStatus(id, status, technicianNotes);
    if (!repairOrder) {
      return { success: false, error: "Repair order not found" };
    }
    return { success: true, data: repairOrder };
  } catch (error) {
    console.error("Error updating repair order status:", error);
    return { success: false, error: "Failed to update repair order status" };
  }
}
