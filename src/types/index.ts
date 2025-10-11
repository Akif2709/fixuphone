// ==================== CORE TYPES ====================
export type { Brand, DeviceModel, RepairType, RepairService, RepairOrder, RepairOrderStatus } from "./core-types";

// ==================== CONTACT TYPES ====================
export type { ContactInfo, SerializedContactInfo, CreateContactInfoRequest, ContactInfoQuery } from "./contact-types";

// ==================== REQUEST TYPES ====================
export type {
  CreateBrandRequest,
  CreateDeviceModelRequest,
  CreateRepairTypeRequest,
  CreateRepairServiceRequest,
  CreateRepairOrderRequest,
} from "./request-types";

// ==================== QUERY TYPES ====================
export type { BrandQuery, DeviceModelQuery, RepairTypeQuery, RepairServiceQuery, RepairOrderQuery } from "./query-types";

// ==================== STATISTICS TYPES ====================
export type { DatabaseStats } from "./stats-types";

// ==================== TIMESLOT TYPES ====================
export type { TimeSlot, DayTimeSlots, BusinessHours } from "./timeslot-types";
