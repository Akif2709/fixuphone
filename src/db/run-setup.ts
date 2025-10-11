#!/usr/bin/env tsx

/**
 * Direct execution script for database schema setup
 * Run with: npx tsx src/db/run-setup.ts
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

import setupDatabaseSchema from './schema/setup-schema';

async function main() {
  try {
    console.log('🚀 Starting database schema setup...');
    console.log('📋 This will create collections, indexes, and sample data');
    console.log('');
    
    await setupDatabaseSchema();
    
    console.log('');
    console.log('✅ Database schema setup completed successfully!');
    console.log('🎉 Your MongoDB database is now ready to use!');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error during database setup:');
    console.error(error);
    process.exit(1);
  }
}

// Run the setup
main();
