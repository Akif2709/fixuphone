#!/usr/bin/env node

/**
 * Admin User Creation Script
 * 
 * This script creates the initial admin user in the database.
 * Run this script to set up admin authentication.
 * 
 * Usage:
 *   node scripts/create-admin.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting admin user creation...');
console.log('📋 This will create the initial admin user in the database');
console.log('');

try {
  // Check if required environment variables are set
  if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI environment variable is not set');
    console.error('Please set MONGODB_URI in your .env.local file');
    process.exit(1);
  }

  const env = {
    ...process.env,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'fixuphone'
  };

  // Create a temporary TypeScript file to run the migration
  const tempScript = `
import { migrateAdminToDatabase } from '../src/lib/admin-migration';

async function runMigration() {
  try {
    await migrateAdminToDatabase();
    console.log('✅ Admin user creation completed successfully');
  } catch (error) {
    console.error('❌ Admin user creation failed:', error);
    process.exit(1);
  }
}

runMigration();
`;

  const tempScriptPath = path.join(__dirname, 'temp-admin-migration.ts');
  require('fs').writeFileSync(tempScriptPath, tempScript);
  
  console.log('⚙️  Creating admin user...');
  execSync(`npx tsx ${tempScriptPath}`, { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env
  });
  
  // Clean up temporary file
  require('fs').unlinkSync(tempScriptPath);
  
  console.log('');
  console.log('✅ Admin user creation completed successfully!');
  console.log('🎉 You can now login to the admin panel!');
  console.log('');
  console.log('⚠️  IMPORTANT SECURITY NOTES:');
  console.log('   1. Change the default password immediately after first login');
  console.log('   2. Use a strong, unique password');
  console.log('   3. Keep your admin credentials secure');
  console.log('');
  console.log('🔗 Access the admin panel at: http://localhost:3000/admin/login');
  
} catch (error) {
  console.error('');
  console.error('❌ Error creating admin user:');
  console.error(error.message);
  process.exit(1);
}
