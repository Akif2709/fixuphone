import { CreateCollectionOptions, IndexDescription } from "mongodb";

export const deviceModelsSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["brandId", "name", "type", "releaseYear", "createdAt"],
      properties: {
        brandId: {
          bsonType: "objectId",
          description: "Brand ID is required and must be an ObjectId",
        },
        name: {
          bsonType: "string",
          description: "Model name is required and must be a string",
        },
        type: {
          bsonType: "string",
          enum: ["phone", "tablet"],
          description: "Device type is required and must be either 'phone' or 'tablet'",
        },
        specifications: {
          bsonType: "string",
          description: "Specifications is optional and must be a string",
        },
        releaseYear: {
          bsonType: "int",
          minimum: 2000,
          maximum: 2030,
          description: "Release year is required and must be between 2000 and 2030",
        },
        createdAt: {
          bsonType: "date",
          description: "Created date is required and must be a date",
        },
      },
    },
  },
};

export const deviceModelsIndexes: IndexDescription[] = [
  { key: { brandId: 1 }, name: "device_model_brand_idx" },
  { key: { name: 1 }, name: "device_model_name_idx" },
  { key: { type: 1 }, name: "device_model_type_idx" },
  { key: { releaseYear: -1 }, name: "device_model_year_idx" },
  { key: { brandId: 1, name: 1 }, unique: true, name: "device_model_brand_name_unique" },
];
