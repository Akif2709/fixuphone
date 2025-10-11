import { CreateCollectionOptions, IndexDescription } from 'mongodb';

export const brandsSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'logo_url', 'created_at'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Brand name is required and must be a string'
        },
        logo_url: {
          bsonType: 'string',
          description: 'Logo URL is required and must be a string'
        },
        created_at: {
          bsonType: 'date',
          description: 'Created date is required and must be a date'
        }
      }
    }
  }
};

export const brandsIndexes: IndexDescription[] = [
  { key: { name: 1 }, unique: true, name: 'brand_name_unique' },
  { key: { created_at: -1 }, name: 'brand_created_at_idx' }
];
