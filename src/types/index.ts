// ==================== CORE TYPES ====================
export {
  Brand,
  DeviceModel,
  RepairType,
  RepairService,
  RepairOrder,
  RepairOrderStatus
} from './core-types';

export type { RepairOrderStatus } from './core-types';

// ==================== CONTACT TYPES ====================
export {
  ContactInfo,
  SerializedContactInfo,
  CreateContactInfoRequest,
  ContactInfoQuery
} from './contact-types';

// ==================== REQUEST TYPES ====================
export {
  CreateBrandRequest,
  CreateDeviceModelRequest,
  CreateRepairTypeRequest,
  CreateRepairServiceRequest,
  CreateRepairOrderRequest
} from './request-types';

// ==================== QUERY TYPES ====================
export {
  BrandQuery,
  DeviceModelQuery,
  RepairTypeQuery,
  RepairServiceQuery,
  RepairOrderQuery
} from './query-types';

// ==================== STATISTICS TYPES ====================
export {
  DatabaseStats
} from './stats-types';

// ==================== TIMESLOT TYPES ====================
export {
  TimeSlot,
  DayTimeSlots,
  BusinessHours
} from './timeslot-types';
