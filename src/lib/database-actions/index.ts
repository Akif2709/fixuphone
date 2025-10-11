// Brand Actions
export {
  createBrand,
  getAllBrands,
} from './brand-actions';

// Device Model Actions
export {
  createDeviceModel,
  getAllDeviceModels,
  getDeviceModelsWithBrands
} from './device-model-actions';

// Repair Type Actions
export {
  createRepairType,
  getAllRepairTypes,
  getActiveRepairTypes,
  getRepairTypeById,
  getRepairTypesByCategory,
  getRepairTypesByQuery,
  updateRepairType,
  toggleRepairTypeActiveStatus,
  deleteRepairType,
  getRepairTypeCategories
} from './repair-type-actions';

// Repair Service Actions
export {
  createRepairService,
  getAllRepairServices,
  getActiveRepairServices,
  getRepairServiceById,
  getRepairServicesByDeviceModel,
  getActiveRepairServicesByDeviceModel,
  getRepairServicesByQuery,
  getRepairServicesWithDeviceModels,
  toggleRepairServiceActiveStatus
} from './repair-service-actions';

// Repair Order Actions
export {
  createRepairOrder,
  getAllRepairOrders,
  getAllRepairOrdersWithRelations,
  getRepairOrderById,
  getRepairOrderByOrderNumber,
  getRepairOrdersByStatus,
  getRepairOrdersByCustomerEmail,
  getRepairOrdersByQuery,
  updateRepairOrderStatus
} from './repair-order-actions';

// Contact Info Actions
export {
  getContactInfo,
  updateContactInfo,
  upsertContactInfo
} from './contact-actions';

// Dashboard Actions
export {
  getRepairOrderStats,
  getDashboardData
} from './dashboard-actions';

// Admin Actions
export {
  loginAdmin,
  logoutAdmin,
  verifyAdminAuth,
  createAdmin,
  changeAdminPassword
} from './admin-actions';
