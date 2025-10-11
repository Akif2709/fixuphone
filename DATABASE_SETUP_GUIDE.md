# Database Schema Setup Guide

## 🚀 **How to Run Database Schema Setup**

This guide shows you how to initialize your MongoDB database with the proper schema, indexes, and sample data.

## 📋 **Prerequisites**

1. **MongoDB Connection**: Make sure your `.env.local` file has the correct MongoDB URI
2. **Dependencies**: Ensure `tsx` is available (it's included in your dev dependencies)

## 🛠️ **Setup Methods**

### **Method 1: Using npm Scripts (Recommended)**

```bash
# Run the database setup
npm run db:setup

# Or reset the database (same command)
npm run db:reset
```

### **Method 2: Direct TypeScript Execution**

```bash
# Run the setup script directly
npx tsx src/db/run-setup.ts
```

### **Method 3: Using Node.js Script**

```bash
# Run the Node.js wrapper script
node scripts/setup-database.js
```

### **Method 4: Manual Execution**

```bash
# Navigate to your project directory
cd /Users/akif.bugday/repos/personal/fixuphone

# Run the setup script
npx tsx src/db/setup-schema.ts
```

## 📊 **What the Setup Script Does**

### **1. Creates Collections with Validation**

- ✅ **brands** - Brand information with validation
- ✅ **device_models** - Device models with brand relationships
- ✅ **repair_services** - Repair services linked to device models
- ✅ **repair_orders** - Repair orders with full customer information

### **2. Creates Performance Indexes**

- ✅ **Unique indexes** for brand names, order numbers
- ✅ **Performance indexes** for common queries
- ✅ **Compound indexes** for complex queries
- ✅ **Foreign key indexes** for relationships

### **3. Inserts Sample Data**

- ✅ **Sample brands** (Apple, Samsung)
- ✅ **Sample device models** (iPhone 14 Pro, Galaxy S23)
- ✅ **Sample repair services** (Screen repair, Battery replacement)
- ✅ **Sample repair order** (Complete order with customer info)

## 🔧 **Environment Variables Required**

Make sure your `.env.local` file contains:

```bash
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB_NAME=fixuphone

# Other environment variables...
NODE_ENV=development
```

## 🎯 **Expected Output**

When you run the setup, you should see:

```
🚀 Starting database schema setup...
📋 This will create collections, indexes, and sample data

📋 Creating collections with validation...
✅ Collections created with validation
🔍 Creating indexes for performance...
✅ Indexes created successfully
📝 Inserting sample data...
✅ Sample brands created
✅ Sample device models created
✅ Sample repair services created
✅ Sample repair order created
✅ Sample data insertion completed
✅ Database schema setup completed successfully!

🎉 Your MongoDB database is now ready to use!
```

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Connection Error**:

   ```
   Error: Please add your MongoDB URI to .env.local
   ```

   **Solution**: Check your `.env.local` file has the correct `MONGODB_URI`

2. **Permission Error**:

   ```
   Error: not authorized on fixuphone to execute command
   ```

   **Solution**: Check your MongoDB Atlas user has read/write permissions

3. **Collection Already Exists**:
   ```
   Error: collection already exists
   ```
   **Solution**: This is normal if you've run the setup before. The script will continue.

### **Reset Database (if needed):**

If you want to start fresh:

```bash
# Drop all collections and recreate
npm run db:reset
```

## 📈 **Verification**

After running the setup, you can verify it worked by:

1. **Check MongoDB Atlas Dashboard** - You should see the collections
2. **Run your Next.js app** - The admin dashboard should show sample data
3. **Check the database** - Use MongoDB Compass or Atlas to inspect collections

## 🎉 **Success!**

Once the setup completes successfully, your database will have:

- ✅ **4 Collections** with proper validation
- ✅ **15+ Indexes** for optimal performance
- ✅ **Sample Data** for testing
- ✅ **Proper Relationships** between collections
- ✅ **Ready for Production** use

Your MongoDB database is now fully configured and ready to use with your Next.js application! 🚀
