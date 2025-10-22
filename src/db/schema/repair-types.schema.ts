import { CreateCollectionOptions, IndexDescription } from "mongodb";

export const repairTypesSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "Repair type name is required and must be a string",
        },
        description: {
          bsonType: "string",
          description: "Description is optional and must be a string",
        },
        createdAt: {
          bsonType: "date",
          description: "Created date is required and must be a date",
        },
      },
    },
  },
};

export const repairTypesIndexes: IndexDescription[] = [{ key: { name: 1 }, unique: true, name: "repair_type_name_idx" }];
