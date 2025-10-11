
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
