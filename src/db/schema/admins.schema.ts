import { CreateCollectionOptions, IndexDescription } from 'mongodb';

export const adminsSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'password', 'isActive', 'createdAt'],
      properties: {
        username: {
          bsonType: 'string',
          minLength: 3,
          maxLength: 50,
          description: 'Username is required and must be between 3 and 50 characters'
        },
        password: {
          bsonType: 'string',
          description: 'Password (hashed) is required and must be a string'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'Email is optional and must be a valid email'
        },
        isActive: {
          bsonType: 'bool',
          description: 'IsActive is required and must be a boolean'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Created date is required and must be a date'
        },
        lastLogin: {
          bsonType: 'date',
          description: 'Last login date is optional and must be a date'
        }
      }
    }
  }
};

export const adminsIndexes: IndexDescription[] = [
  { key: { username: 1 }, unique: true, name: 'admin_username_unique' },
  { key: { email: 1 }, sparse: true, name: 'admin_email_idx' },
  { key: { isActive: 1 }, name: 'admin_active_idx' },
  { key: { createdAt: -1 }, name: 'admin_created_at_idx' }
];
