import { CreateCollectionOptions, IndexDescription } from 'mongodb';

export const repairTypesSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'category', 'isActive', 'createdAt'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Repair type name is required and must be a string'
        },
        description: {
          bsonType: 'string',
          description: 'Description is optional and must be a string'
        },
        category: {
          bsonType: 'string',
          description: 'Category is required and must be a string'
        },
        isActive: {
          bsonType: 'bool',
          description: 'IsActive is required and must be a boolean'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Created date is required and must be a date'
        }
      }
    }
  }
};

export const repairTypesIndexes: IndexDescription[] = [
  { key: { name: 1 }, unique: true, name: 'repair_type_unique' },
  { key: { category: 1 }, name: 'repair_type_category_idx' },
  { key: { isActive: 1 }, name: 'repair_type_active_idx' },
  { key: { createdAt: -1 }, name: 'repair_type_created_at_idx' }
];
