import { getDatabase } from '../connection';
import { BrandModel } from '../models/Brand';
import { DeviceModelModel } from '../models/DeviceModel';
import { RepairTypeModel } from '../models/RepairType';
import { RepairServiceModel } from '../models/RepairService';
import { RepairOrderModel } from '../models/RepairOrder';
import { Db } from 'mongodb';

// Import all schemas
import {
  brandsSchema,
  brandsIndexes,
  deviceModelsSchema,
  deviceModelsIndexes,
  repairTypesSchema,
  repairTypesIndexes,
  repairServicesSchema,
  repairServicesIndexes,
  repairOrdersSchema,
  repairOrdersIndexes,
  contactInfoSchema,
  contactInfoIndexes,
  adminsSchema,
  adminsIndexes
} from './index';

/**
 * One-time schema setup script
 * This script creates collections, indexes, and sample data
 */

export async function setupDatabaseSchema() {
  try {
    console.log('🚀 Starting database schema setup...');
    
    const db = await getDatabase();
    
    // 1. Create collections with validation
    await createCollectionsWithValidation(db);
    
    // 2. Create indexes for performance
    await createIndexes(db);
    
    // 3. Insert sample data (optional)
    await insertSampleData();
    
    console.log('✅ Database schema setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database schema:', error);
    throw error;
  }
}

async function createCollectionsWithValidation(db: Db) {
  console.log('📋 Creating collections with validation...');
  
  // Create collections using imported schemas
  await db.createCollection('brands', brandsSchema);
  await db.createCollection('device_models', deviceModelsSchema);
  await db.createCollection('repair_types', repairTypesSchema);
  await db.createCollection('repair_services', repairServicesSchema);
  await db.createCollection('repair_orders', repairOrdersSchema);
  await db.createCollection('contact_info', contactInfoSchema);
  await db.createCollection('admins', adminsSchema);

  console.log('✅ Collections created with validation');
}

async function createIndexes(db: Db) {
  console.log('🔍 Creating indexes for performance...');
  
  // Create indexes using imported index definitions
  await db.collection('brands').createIndexes(brandsIndexes);
  await db.collection('device_models').createIndexes(deviceModelsIndexes);
  await db.collection('repair_types').createIndexes(repairTypesIndexes);
  await db.collection('repair_services').createIndexes(repairServicesIndexes);
  await db.collection('repair_orders').createIndexes(repairOrdersIndexes);
  await db.collection('contact_info').createIndexes(contactInfoIndexes);
  await db.collection('admins').createIndexes(adminsIndexes);
  
  console.log('✅ Indexes created successfully');
}

async function insertSampleData() {
  console.log('📝 Inserting sample data...');
  
  try {
    // Create sample brands
    const appleBrand = await BrandModel.create({
      name: 'Apple',
      logo_url: 'https://example.com/logos/apple.png'
    });
    
    const samsungBrand = await BrandModel.create({
      name: 'Samsung',
      logo_url: 'https://example.com/logos/samsung.png'
    });
    
    console.log('✅ Sample brands created');
    
    // Create sample repair types
    const screenRepair = await RepairTypeModel.create({
      name: 'Screen Repair',
      description: 'Fix cracked or broken screen',
      category: 'Display',
      isActive: true
    });
    
    const batteryReplacement = await RepairTypeModel.create({
      name: 'Battery Replacement',
      description: 'Replace old or faulty battery',
      category: 'Power',
      isActive: true
    });
    
    const waterDamage = await RepairTypeModel.create({
      name: 'Water Damage Repair',
      description: 'Fix water damage issues',
      category: 'General',
      isActive: true
    });
    
    const chargingPort = await RepairTypeModel.create({
      name: 'Charging Port Repair',
      description: 'Fix charging port issues',
      category: 'Power',
      isActive: true
    });
    
    const cameraRepair = await RepairTypeModel.create({
      name: 'Camera Repair',
      description: 'Fix camera functionality',
      category: 'Camera',
      isActive: true
    });
    
    console.log('✅ Sample repair types created');
    
    // Create sample device models
    const iphone14 = await DeviceModelModel.create({
      brandId: appleBrand._id!.toString(),
      name: 'iPhone 14 Pro',
      type: 'phone',
      specifications: 'A16 Bionic chip, 6.1-inch Super Retina XDR display, Pro camera system',
      releaseYear: 2022
    });
    
    const galaxyS23 = await DeviceModelModel.create({
      brandId: samsungBrand._id!.toString(),
      name: 'Galaxy S23',
      type: 'phone',
      specifications: 'Snapdragon 8 Gen 2, 6.1-inch Dynamic AMOLED 2X, Triple camera system',
      releaseYear: 2023
    });
    
    console.log('✅ Sample device models created');
    
    // Create sample repair services
    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: screenRepair._id!.toString(),
      description: 'Replace cracked or damaged screen',
      price: 299,
      estimatedTimeMinutes: 60,
      isActive: true
    });
    
    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: batteryReplacement._id!.toString(),
      description: 'Replace worn-out battery',
      price: 89,
      estimatedTimeMinutes: 30,
      isActive: true
    });
    
    await RepairServiceModel.create({
      deviceModelId: galaxyS23._id!.toString(),
      repairTypeId: screenRepair._id!.toString(),
      description: 'Replace cracked or damaged screen',
      price: 249,
      estimatedTimeMinutes: 45,
      isActive: true
    });
    
    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: waterDamage._id!.toString(),
      description: 'Fix water damage issues',
      price: 199,
      estimatedTimeMinutes: 90,
      isActive: true
    });
    
    await RepairServiceModel.create({
      deviceModelId: galaxyS23._id!.toString(),
      repairTypeId: chargingPort._id!.toString(),
      description: 'Fix charging port issues',
      price: 89,
      estimatedTimeMinutes: 30,
      isActive: true
    });
    
    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: cameraRepair._id!.toString(),
      description: 'Fix camera functionality',
      price: 149,
      estimatedTimeMinutes: 60,
      isActive: true
    });
    
    console.log('✅ Sample repair services created');
    
    // Create sample repair order
    const repairService = await RepairServiceModel.findByDeviceModelId(iphone14._id!.toString());
    
    if (repairService.length > 0) {
      await RepairOrderModel.create({
        orderNumber: 'RO-2024-001',
        deviceModelId: iphone14._id!.toString(),
        repairServiceId: repairService[0]._id!.toString(),
        customerName: 'John Doe',
        customerPhone: '+1234567890',
        customerEmail: 'john.doe@example.com',
        imeiOrSerial: '123456789012345',
        problemDescription: 'Screen is cracked and touch is not working properly',
        orderDate: new Date(),
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        repairCost: 299
      });
      
      console.log('✅ Sample repair order created');
    }
    
    // Create sample contact info using migration
    const { migrateContactDataToDatabase } = await import('../../lib/contact-migration');
    await migrateContactDataToDatabase();
    
    console.log('✅ Sample contact info created via migration');
    
    console.log('✅ Sample data insertion completed');
    
  } catch (error) {
    console.log('⚠️ Sample data insertion failed (this is optional):', error);
  }
}

// Export the setup function
export default setupDatabaseSchema;
