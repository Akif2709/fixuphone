// ==================== QUERY INTERFACES ====================

export interface BrandQuery {
  name?: string;
}

export interface DeviceModelQuery {
  brandId?: string;
  type?: string;
  name?: string;
}

export interface RepairTypeQuery {
  name?: string;
  category?: string;
  isActive?: boolean;
}

export interface RepairServiceQuery {
  deviceModelId?: string;
  repairTypeId?: string;
  isActive?: boolean;
}

export interface RepairOrderQuery {
  status?: string;
  customerEmail?: string;
  deviceModelId?: string;
  repairServiceId?: string;
}
