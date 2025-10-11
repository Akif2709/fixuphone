// ==================== STATISTICS INTERFACES ====================

export interface DatabaseStats {
  brands: number;
  device_models: number;
  repair_services: number;
  repair_orders: number;
  total_revenue: number;
  orders_by_status: Record<string, number>;
  orders_by_brand: Record<string, number>;
}
