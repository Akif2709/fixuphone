import { AdminModel } from "../../db/models/Admin";

/**
 * Initial admin user data
 * ⚠️ SECURITY WARNING: Change these credentials immediately after first login!
 * For production, use environment variables for the initial password.
 */
export const initialAdminData = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_INITIAL_PASSWORD || "Akif1234&",
  email: process.env.ADMIN_EMAIL,
};

/**
 * Migrate admin user to database
 * This creates the initial admin user if it doesn't exist
 */
export async function migrateAdminToDatabase(): Promise<void> {
  try {
    console.log("🔄 Starting admin user migration...");

    // Check if admin already exists
    const existingAdmin = await AdminModel.findByUsername(initialAdminData.username);

    if (existingAdmin) {
      console.log("✅ Admin user already exists, skipping migration");
      return;
    }

    // Create admin user
    const admin = await AdminModel.create(initialAdminData);

    console.log("✅ Admin user created successfully:", admin._id);
    console.log("⚠️  IMPORTANT: Change the default password after first login!");
    console.log(`   Username: ${initialAdminData.username}`);
    console.log(`   Password: ${initialAdminData.password}`);
  } catch (error) {
    console.error("❌ Error migrating admin user:", error);
    throw new Error(`Failed to migrate admin user: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Get admin info (for fallback)
 */
export async function getAdminInfo(): Promise<typeof initialAdminData> {
  try {
    const admin = await AdminModel.findByUsername(initialAdminData.username);
    if (admin) {
      return {
        username: admin.username,
        password: "***", // Don't return actual password
        email: admin.email || initialAdminData.email,
      };
    }

    // Fallback to static data if no database record exists
    console.warn("⚠️ No admin user found in database, using static fallback");
    return initialAdminData;
  } catch (error) {
    console.error("❌ Error fetching admin info from database, using static fallback:", error);
    return initialAdminData;
  }
}
