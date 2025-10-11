import { CreateCollectionOptions, IndexDescription } from 'mongodb';

export const contactInfoSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['businessName', 'address', 'phone', 'whatsapp', 'email', 'businessHours', 'mapEmbed', 'createdAt'],
      properties: {
        businessName: {
          bsonType: 'string',
          description: 'Business name is required and must be a string'
        },
        address: {
          bsonType: 'object',
          required: ['street', 'postalCode', 'city', 'country', 'fullAddress'],
          properties: {
            street: {
              bsonType: 'string',
              description: 'Street address is required and must be a string'
            },
            postalCode: {
              bsonType: 'string',
              description: 'Postal code is required and must be a string'
            },
            city: {
              bsonType: 'string',
              description: 'City is required and must be a string'
            },
            country: {
              bsonType: 'string',
              description: 'Country is required and must be a string'
            },
            fullAddress: {
              bsonType: 'string',
              description: 'Full address is required and must be a string'
            }
          }
        },
        phone: {
          bsonType: 'string',
          description: 'Phone number is required and must be a string'
        },
        whatsapp: {
          bsonType: 'string',
          description: 'WhatsApp number is required and must be a string'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'Email is required and must be a valid email'
        },
        businessHours: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['day', 'dayId', 'isOpen', 'openTime', 'closeTime'],
            properties: {
              day: {
                bsonType: 'string',
                description: 'Day is required and must be a string'
              },
              dayId: {
                bsonType: 'string',
                description: 'DayId is required and must be a string'
              },
              isOpen: {
                bsonType: 'bool',
                description: 'IsOpen is required and must be a boolean'
              },
              openTime: {
                bsonType: 'string',
                description: 'OpenTime is required and must be a string'
              },
              closeTime: {
                bsonType: 'string',
                description: 'CloseTime is required and must be a string'
              }
            }
          }
        },
        mapEmbed: {
          bsonType: 'object',
          required: ['src', 'title'],
          properties: {
            src: {
              bsonType: 'string',
              description: 'Map embed source is required and must be a string'
            },
            title: {
              bsonType: 'string',
              description: 'Map embed title is required and must be a string'
            }
          }
        },
        createdAt: {
          bsonType: 'date',
          description: 'Created date is required and must be a date'
        }
      }
    }
  }
};

export const contactInfoIndexes: IndexDescription[] = [
  { key: { businessName: 1 }, name: 'contact_info_business_name_idx' },
  { key: { email: 1 }, name: 'contact_info_email_idx' },
  { key: { phone: 1 }, name: 'contact_info_phone_idx' },
  { key: { createdAt: -1 }, name: 'contact_info_created_at_idx' }
];
