import { CreateCollectionOptions, IndexDescription } from "mongodb";

export const repairServicesSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceModelId", "repairTypeId", "price", "estimatedTimeMinutes", "createdAt"],
      properties: {
        deviceModelId: {
          bsonType: "objectId",
          description: "Device model ID is required and must be an ObjectId",
        },
        repairTypeId: {
          bsonType: "objectId",
          description: "Repair type ID is required and must be an ObjectId",
        },
        description: {
          bsonType: "string",
          description: "Description is optional and must be a string",
        },
        price: {
          bsonType: "number",
          minimum: 0,
          description: "Price is required and must be a positive number",
        },
        estimatedTimeMinutes: {
          bsonType: "int",
          minimum: 1,
          description: "Estimated time is required and must be at least 1 minute",
        },
        createdAt: {
          bsonType: "date",
          description: "Created date is required and must be a date",
        },
      },
    },
  },
};

export const repairServicesIndexes: IndexDescription[] = [
  { key: { deviceModelId: 1 }, name: "repair_service_deviceModelIdx" },
  { key: { repairTypeId: 1 }, name: "repair_service_repair_type_idx" },
];
