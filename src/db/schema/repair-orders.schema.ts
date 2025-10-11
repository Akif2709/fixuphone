import { CreateCollectionOptions, IndexDescription } from 'mongodb';

export const repairOrdersSchema: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orderNumber', 'deviceModelId', 'repairServiceId', 'customerName', 'customerPhone', 'status', 'problemDescription', 'repairCost', 'orderDate', 'estimatedCompletion', 'createdAt', 'updatedAt'],
      properties: {
        orderNumber: {
          bsonType: 'string',
          description: 'Order number is required and must be a string'
        },
        deviceModelId: {
          bsonType: 'objectId',
          description: 'Device model ID is required and must be an ObjectId'
        },
        repairServiceId: {
          bsonType: 'objectId',
          description: 'Repair service ID is required and must be an ObjectId'
        },
        customerName: {
          bsonType: 'string',
          description: 'Customer name is required and must be a string'
        },
        customerPhone: {
          bsonType: 'string',
          description: 'Customer phone is required and must be a string'
        },
        customerEmail: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'Customer email is optional and must be a valid email'
        },
        status: {
          enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
          description: 'Status is required and must be one of the allowed values'
        },
        imeiOrSerial: {
          bsonType: 'string',
          description: 'IMEI/Serial number is required and must be a string'
        },
        problemDescription: {
          bsonType: 'string',
          description: 'Problem description is required and must be a string'
        },
        technicianNotes: {
          bsonType: 'string',
          description: 'Technician notes is optional and must be a string'
        },
        repairCost: {
          bsonType: 'number',
          minimum: 0,
          description: 'Repair cost is required and must be a positive number'
        },
        orderDate: {
          bsonType: 'date',
          description: 'Order date is required and must be a date'
        },
        estimatedCompletion: {
          bsonType: 'date',
          description: 'Estimated completion must be a date'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Created date is required and must be a date'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Updated date is required and must be a date'
        }
      }
    }
  }
};

export const repairOrdersIndexes: IndexDescription[] = [
  { key: { orderNumber: 1 }, unique: true, name: 'repair_order_number_unique' },
  { key: { deviceModelId: 1 }, name: 'repair_order_deviceModelIdx' },
  { key: { repairServiceId: 1 }, name: 'repair_order_repair_service_idx' },
  { key: { status: 1 }, name: 'repair_order_status_idx' },
  { key: { customerEmail: 1 }, name: 'repair_order_customer_email_idx' },
  { key: { orderDate: -1 }, name: 'repair_order_date_idx' },
  { key: { createdAt: -1 }, name: 'repair_order_created_at_idx' },
  // Compound indexes for common queries
  { key: { status: 1, orderDate: -1 }, name: 'repair_order_status_date_idx' },
  { key: { customerEmail: 1, createdAt: -1 }, name: 'repair_order_customer_date_idx' }
];
