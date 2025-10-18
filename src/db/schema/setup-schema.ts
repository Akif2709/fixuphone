import { getDatabase } from "../connection";
import { BrandModel } from "../models/Brand";
import { DeviceModelModel } from "../models/DeviceModel";
import { RepairTypeModel } from "../models/RepairType";
import { RepairServiceModel } from "../models/RepairService";
import { RepairOrderModel } from "../models/RepairOrder";
import { ContactInfoModel } from "../models/ContactInfo";
import { Db } from "mongodb";

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
  adminsIndexes,
} from "./index";

/**
 * One-time schema setup script
 * This script creates collections, indexes, and sample data
 */

export async function setupDatabaseSchema() {
  try {
    console.log("🚀 Starting database schema setup...");

    const db = await getDatabase();

    // 1. Create collections with validation
    await createCollectionsWithValidation(db);

    // 2. Create indexes for performance
    await createIndexes(db);

    // 3. Insert sample data (optional)
    await insertSampleData();

    console.log("✅ Database schema setup completed successfully!");
  } catch (error) {
    console.error("❌ Error setting up database schema:", error);
    throw error;
  }
}

async function createCollectionsWithValidation(db: Db) {
  console.log("📋 Creating collections with validation...");

  // Create collections using imported schemas
  await db.createCollection("brands", brandsSchema);
  await db.createCollection("device_models", deviceModelsSchema);
  await db.createCollection("repair_types", repairTypesSchema);
  await db.createCollection("repair_services", repairServicesSchema);
  await db.createCollection("repair_orders", repairOrdersSchema);
  await db.createCollection("contact_info", contactInfoSchema);
  await db.createCollection("admins", adminsSchema);

  console.log("✅ Collections created with validation");
}

async function createIndexes(db: Db) {
  console.log("🔍 Creating indexes for performance...");

  // Create indexes using imported index definitions
  await db.collection("brands").createIndexes(brandsIndexes);
  await db.collection("device_models").createIndexes(deviceModelsIndexes);
  await db.collection("repair_types").createIndexes(repairTypesIndexes);
  await db.collection("repair_services").createIndexes(repairServicesIndexes);
  await db.collection("repair_orders").createIndexes(repairOrdersIndexes);
  await db.collection("contact_info").createIndexes(contactInfoIndexes);
  await db.collection("admins").createIndexes(adminsIndexes);

  console.log("✅ Indexes created successfully");
}

async function insertSampleData() {
  console.log("📝 Inserting sample data...");

  try {
    // Create sample brands
    const appleBrand = await BrandModel.create({
      name: "Apple",
      logo_url: "https://example.com/logos/apple.png",
    });

    const samsungBrand = await BrandModel.create({
      name: "Samsung",
      logo_url: "https://example.com/logos/samsung.png",
    });

    console.log("✅ Sample brands created");

    // Create sample repair types
    const screenRepair = await RepairTypeModel.create({
      name: "Screen Repair",
      description: "Fix cracked or broken screen",
    });

    const batteryReplacement = await RepairTypeModel.create({
      name: "Battery Replacement",
      description: "Replace old or faulty battery",
    });

    const waterDamage = await RepairTypeModel.create({
      name: "Water Damage Repair",
      description: "Fix water damage issues",
    });

    const chargingPort = await RepairTypeModel.create({
      name: "Charging Port Repair",
      description: "Fix charging port issues",
    });

    const cameraRepair = await RepairTypeModel.create({
      name: "Camera Repair",
      description: "Fix camera functionality",
    });

    console.log("✅ Sample repair types created");

    // Create sample device models
    const iphone14 = await DeviceModelModel.create({
      brandId: appleBrand._id!.toString(),
      name: "iPhone 14 Pro",
      type: "phone",
      specifications: "A16 Bionic chip, 6.1-inch Super Retina XDR display, Pro camera system",
      releaseYear: 2022,
    });

    const galaxyS23 = await DeviceModelModel.create({
      brandId: samsungBrand._id!.toString(),
      name: "Galaxy S23",
      type: "phone",
      specifications: "Snapdragon 8 Gen 2, 6.1-inch Dynamic AMOLED 2X, Triple camera system",
      releaseYear: 2023,
    });

    console.log("✅ Sample device models created");

    // Create sample repair services
    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: screenRepair._id!.toString(),
      description: "Replace cracked or damaged screen",
      price: 299,
      estimatedTimeMinutes: 60,
      isActive: true,
    });

    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: batteryReplacement._id!.toString(),
      description: "Replace worn-out battery",
      price: 89,
      estimatedTimeMinutes: 30,
      isActive: true,
    });

    await RepairServiceModel.create({
      deviceModelId: galaxyS23._id!.toString(),
      repairTypeId: screenRepair._id!.toString(),
      description: "Replace cracked or damaged screen",
      price: 249,
      estimatedTimeMinutes: 45,
      isActive: true,
    });

    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: waterDamage._id!.toString(),
      description: "Fix water damage issues",
      price: 199,
      estimatedTimeMinutes: 90,
      isActive: true,
    });

    await RepairServiceModel.create({
      deviceModelId: galaxyS23._id!.toString(),
      repairTypeId: chargingPort._id!.toString(),
      description: "Fix charging port issues",
      price: 89,
      estimatedTimeMinutes: 30,
      isActive: true,
    });

    await RepairServiceModel.create({
      deviceModelId: iphone14._id!.toString(),
      repairTypeId: cameraRepair._id!.toString(),
      description: "Fix camera functionality",
      price: 149,
      estimatedTimeMinutes: 60,
      isActive: true,
    });

    console.log("✅ Sample repair services created");

    // Create sample repair order
    const repairService = await RepairServiceModel.findByDeviceModelId(iphone14._id!.toString());

    if (repairService.length > 0) {
      await RepairOrderModel.create({
        orderNumber: "RO-2024-001",
        deviceModelId: iphone14._id!.toString(),
        repairServiceId: repairService[0]._id!.toString(),
        customerName: "John Doe",
        customerPhone: "+1234567890",
        customerEmail: "john.doe@example.com",
        imeiOrSerial: "123456789012345",
        problemDescription: "Screen is cracked and touch is not working properly",
        orderDate: new Date(),
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        repairCost: 299,
      });

      console.log("✅ Sample repair order created");
    }

    // Create sample contact info
    await ContactInfoModel.initialize({
      businessName: "fixUphone",
      phone: "+31 6 12345678",
      whatsapp: "+31612345678",
      email: "info@fixuphone.nl",
      address: {
        street: "Kalverstraat 1",
        postalCode: "1012 NX",
        city: "Amsterdam",
        country: "Nederland",
        fullAddress: "Kalverstraat 1, 1012 NX Amsterdam, Nederland",
      },
      mapEmbed: {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.7267897374716!2d4.891682615743!3d52.37239997978741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c8c3e8c7e5%3A0x4e1f6d8a3d8d8d8d!2sKalverstraat%201%2C%201012%20NX%20Amsterdam!5e0!3m2!1sen!2snl!4v1234567890",
        title: "fixUphone Location",
      },
      businessHours: [
        { day: "Monday", dayId: "mon", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Tuesday", dayId: "tue", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Wednesday", dayId: "wed", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Thursday", dayId: "thu", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Friday", dayId: "fri", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Saturday", dayId: "sat", isOpen: true, openTime: "10:00", closeTime: "17:00" },
        { day: "Sunday", dayId: "sun", isOpen: false, openTime: "00:00", closeTime: "00:00" },
      ],
    });

    console.log("✅ Sample contact info created");

    console.log("✅ Sample data insertion completed");
  } catch (error) {
    console.log("⚠️ Sample data insertion failed (this is optional):", error);
  }
}

// Export the setup function
export default setupDatabaseSchema;
