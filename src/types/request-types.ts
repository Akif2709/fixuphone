// ==================== REQUEST INTERFACES ====================

export interface CreateBrandRequest {
  name: string;
  logo_url: string;
}

export interface CreateDeviceModelRequest {
  brandId: string;
  name: string;
  type: string;
  specifications?: string;
  releaseYear: number;
}

export interface CreateRepairTypeRequest {
  name: string;
  description?: string;
  category: string;
  isActive?: boolean;
}

export interface CreateRepairServiceRequest {
  deviceModelId: string;
  repairTypeId: string;
  description?: string;
  price: number;
  estimatedTimeMinutes: number;
  isActive?: boolean;
}

export interface CreateRepairOrderRequest {
  orderNumber: string;
  deviceModelId: string;
  repairServiceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  imeiOrSerial: string;
  problemDescription: string;
  repairCost: number;
  orderDate: Date;
  estimatedCompletion: Date;
}
