# FixUPhone - Complete Documentation

## 📋 **Project Overview**

FixUPhone is a Next.js application for managing device repair services with a comprehensive MongoDB database schema based on ERD relationships.

## 🗄️ **Database Schema (ERD)**

### **Collections & Relationships:**

```
BRAND ||--o{ DEVICE_MODEL : "has"
DEVICE_MODEL ||--o{ REPAIR_SERVICE : "has"
DEVICE_MODEL ||--o{ REPAIR_ORDER : "for"
```

### **Collections:**

1. **`brands`** - Brand information (Apple, Samsung, etc.)
2. **`device_models`** - Device models with brand relationships
3. **`repair_services`** - Repair services linked to device models
4. **`repair_orders`** - Repair orders with customer and service information

## 🚀 **Quick Start**

### **1. Environment Setup**

Create `.env.local` file:

```bash
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB_NAME=fixuphone

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# Development Environment
NODE_ENV=development
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Setup Database**

```bash
npm run db:setup
```

### **4. Run Development Server**

```bash
npm run dev
```

## 🗄️ **Database Setup**

### **Setup Database Schema:**

```bash
# Run database setup (creates collections, indexes, sample data)
npm run db:setup

# Or reset database
npm run db:reset
```

### **What the Setup Does:**

- ✅ Creates 4 collections with validation rules
- ✅ Creates 15+ indexes for optimal performance
- ✅ Inserts sample data (Apple, Samsung, iPhone 14 Pro, Galaxy S23, repair services, sample order)
- ✅ Sets up proper relationships between collections

### **Sample Data Created:**

- **Brands**: Apple, Samsung
- **Device Models**: iPhone 14 Pro, Galaxy S23
- **Repair Services**: Screen Repair, Battery Replacement
- **Repair Order**: Complete sample order with customer info

## 📁 **Project Structure**

```
src/
├── types/                       # TypeScript interfaces for ERD schema
│   ├── core-types.ts           # Core entity interfaces (Brand, DeviceModel, etc.)
│   ├── contact-types.ts        # Contact-related interfaces
│   ├── request-types.ts        # Create request interfaces
│   ├── query-types.ts          # Query interfaces
│   ├── stats-types.ts          # Statistics interfaces
│   └── index.ts                # Exports all types
├── db/
│   ├── connection.ts           # MongoDB connection
│   ├── setup-schema.ts         # Database schema setup
│   ├── run-setup.ts            # Setup script runner
│   └── models/                 # Database models
│       ├── Brand.ts            # Brand management
│       ├── DeviceModel.ts      # Device model management
│       ├── RepairmentName.ts   # Repairment name management
│       ├── RepairService.ts    # Repair service management
│       ├── RepairOrder.ts      # Repair order management
│       ├── ContactInfo.ts      # Contact information management
│       └── index.ts            # Model exports
├── lib/
│   └── database-actions/       # Server actions for database operations
│       ├── brand-actions.ts    # Brand-related database operations
│       ├── device-model-actions.ts # Device model-related database operations
│       ├── repairment-name-actions.ts # Repairment name database operations
│       ├── repair-service-actions.ts # Repair service-related database operations
│       ├── repair-order-actions.ts # Repair order-related database operations
│       ├── contact-actions.ts  # Contact information database operations
│       ├── dashboard-actions.ts # Dashboard and statistics operations
│       └── index.ts            # Exports all database actions
├── components/
│   ├── ui/                     # Reusable UI components
│   └── device-stats.tsx        # Device statistics component
└── app/
    ├── admin/                  # Admin dashboard
    ├── book/                   # Booking pages
    └── contact/                # Contact pages
```

## 🔧 **Database Operations**

### **Server Actions Available:**

```typescript
// Brand operations
createBrand(data);
getAllBrands();
getBrandById(id);

// Device model operations
createDeviceModel(data);
getAllDeviceModels();
getDeviceModelsByBrand(brandId);
getDeviceModelsWithBrands();

// Repair service operations
createRepairService(data);
getAllRepairServices();
getRepairServicesByDeviceModel(deviceModelId);
getRepairServicesWithDeviceModels();

// Repair order operations
createRepairOrder(data);
getAllRepairOrdersWithRelations();
getRepairOrdersByStatus(status);
updateRepairOrderStatus(id, status);
```

### **Usage Examples:**

```typescript
// Create a repair order
const repairOrder = await createRepairOrder({
  device_model_id: "64f1a2b3c4d5e6f7g8h9i0j1",
  repair_service_id: "64f1a2b3c4d5e6f7g8h9i0j2",
  customer_name: "John Doe",
  customer_phone: "+1234567890",
  customer_email: "john@example.com",
  imei_serial_number: "123456789012345",
  device_color: "Space Gray",
  problem_description: "Screen is cracked",
  order_date: new Date(),
  estimated_completion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  repair_cost: 150,
});

// Get all repair orders with relations
const orders = await getAllRepairOrdersWithRelations();
// Returns: orders with device_model, repair_service, and brand information
```

## 🎯 **Key Features**

### **Database Features:**

- ✅ **ERD-based Schema** - Proper relationships between collections
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Validation** - MongoDB schema validation
- ✅ **Indexes** - Optimized for performance
- ✅ **Relationships** - Populated fields for joined data
- ✅ **Server Actions** - Direct database access from UI

### **Application Features:**

- ✅ **Admin Dashboard** - Manage repair orders
- ✅ **Booking System** - Customer booking interface
- ✅ **Email Integration** - EmailJS for notifications
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Modern UI** - Tailwind CSS with shadcn/ui components

## 🔒 **Security**

### **Environment Variables:**

- ✅ MongoDB credentials stored in environment variables
- ✅ Never commit `.env` files to version control
- ✅ Use `.env.local` for local development
- ✅ Set environment variables in production

### **Database Security:**

- ✅ Schema validation prevents invalid data
- ✅ Indexes optimize query performance
- ✅ Proper error handling and logging

## 🚀 **Deployment**

### **Environment Variables for Production:**

```bash
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
MONGODB_DB_NAME=fixuphone
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### **Build and Deploy:**

```bash
npm run build
npm start
```

## 📊 **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:setup     # Setup database schema
npm run db:reset     # Reset database
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
```

## 🎉 **Success!**

Your FixUPhone application is now ready with:

- ✅ **Complete ERD Database Schema**
- ✅ **Type-Safe MongoDB Operations**
- ✅ **Admin Dashboard**
- ✅ **Booking System**
- ✅ **Email Integration**
- ✅ **Production Ready**

The database is fully configured and ready for use! 🚀
