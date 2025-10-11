# Development Environment Setup

## 🔧 **Setting Up Environment Variables for Development**

### **Step 1: Create `.env.local` File**

Create a `.env.local` file in your project root (`/Users/akif.bugday/repos/personal/fixuphone/.env.local`):

```env
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

### **Step 2: Verify `.gitignore`**

Make sure your `.gitignore` file includes:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Dependencies
node_modules/
```

### **Step 3: Test Your Setup**

Run these commands to test your environment:

```bash
# Start development server
npm run dev

# Test database connection
# Visit: http://localhost:3000/api/test-db
```

## 🚀 **Quick Setup Commands**

### **Option 1: Manual Setup**
```bash
# Create .env.local file
touch .env.local

# Edit with your preferred editor
nano .env.local
# or
code .env.local
```

### **Option 2: Copy from Example**
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit with your credentials
nano .env.local
```

## 📝 **Environment Variables Explained**

### **MongoDB Variables:**
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `MONGODB_DB_NAME` - Database name (default: fixuphone)

### **EmailJS Variables (Public):**
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID  
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

### **Development Variables:**
- `NODE_ENV` - Set to 'development' for local development

## 🔍 **Verification Steps**

### **1. Check Environment Variables are Loaded:**

Create a test file `src/app/api/test-env/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not Set',
    mongodbDb: process.env.MONGODB_DB_NAME || 'Not Set',
    nodeEnv: process.env.NODE_ENV || 'Not Set',
    emailjsService: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'Set' : 'Not Set'
  });
}
```

Visit: `http://localhost:3000/api/test-env`

### **2. Test Database Connection:**

Visit: `http://localhost:3000/api/test-db`

Should return:
```json
{
  "success": true,
  "message": "Database connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **1. Environment Variables Not Loading:**
```bash
# Restart your development server
npm run dev

# Check if .env.local exists
ls -la .env.local
```

#### **2. MongoDB Connection Failed:**
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

#### **3. EmailJS Not Working:**
- Verify your EmailJS credentials
- Check if the service is active in EmailJS dashboard

### **Debug Commands:**

```bash
# Check if environment variables are loaded
node -e "console.log(process.env.MONGODB_URI)"

# Test MongoDB connection
node -e "
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
console.log('URI:', uri ? 'Set' : 'Not Set');
"
```

## 🎯 **Development Workflow**

### **1. Start Development:**
```bash
npm run dev
```

### **2. Test Features:**
- Visit `http://localhost:3000` - Main site
- Visit `http://localhost:3000/book` - Booking form
- Visit `http://localhost:3000/admin` - Admin dashboard
- Visit `http://localhost:3000/api/test-db` - Database test

### **3. Monitor Logs:**
```bash
# Watch for database connection logs
npm run dev | grep -i mongo
```

## ✅ **Success Checklist**

- [ ] `.env.local` file created
- [ ] MongoDB URI set correctly
- [ ] EmailJS credentials configured
- [ ] Development server starts without errors
- [ ] Database connection test passes
- [ ] Booking form works
- [ ] Admin dashboard loads
- [ ] No environment variable errors in console

## 🚀 **Ready to Develop!**

Once your environment variables are set up:

1. **Start development server:** `npm run dev`
2. **Test database:** Visit `/api/test-db`
3. **Test booking form:** Submit a test booking
4. **Check admin dashboard:** View bookings at `/admin`

Your development environment is now ready! 🎉
