#!/usr/bin/env node

/**
 * Admin User Creation Script
 *
 * This script creates the initial admin user in the database.
 * Run this script to set up admin authentication.
 *
 * Usage:
 *   node scripts/create-admin.mjs
 */

import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    line = line.trim();
    if (line && !line.startsWith("#")) {
      const [key, ...values] = line.split("=");
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join("=").trim();
      }
    }
  });
  console.log("✓ Loaded environment variables from .env.local");
} else {
  console.warn("⚠️  Warning: .env.local file not found");
}

console.log("🚀 Starting admin user creation...");
console.log("📋 This will create the initial admin user in the database");
console.log("");

// Check if required environment variables are set
if (!process.env.MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI environment variable is not set");
  console.error("Please set MONGODB_URI in your .env.local file");
  console.error("");
  console.error("Expected location: " + envPath);
  process.exit(1);
}

try {
  const env = {
    ...process.env,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "fixuphone",
  };

  // Create a temporary TypeScript file to run the migration
  const tempScript = `
import { migrateAdminToDatabase } from '../src/lib/db-migrations/admin-migration';

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

  const tempScriptPath = path.join(__dirname, "temp-admin-migration.ts");
  fs.writeFileSync(tempScriptPath, tempScript);

  console.log("⚙️  Creating admin user...");
  execSync(`npx tsx ${tempScriptPath}`, {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
    env,
  });

  // Clean up temporary file
  fs.unlinkSync(tempScriptPath);

  console.log("");
  console.log("✅ Admin user creation completed successfully!");
  console.log("🎉 You can now login to the admin panel!");
  console.log("");
  console.log("⚠️  IMPORTANT SECURITY NOTES:");
  console.log("   1. Change the default password immediately after first login");
  console.log("   2. Use a strong, unique password");
  console.log("   3. Keep your admin credentials secure");
  console.log("");
  console.log("🔗 Access the admin panel at: http://localhost:3000/admin/login");
} catch (error) {
  console.error("");
  console.error("❌ Error creating admin user:");
  console.error(error.message);
  process.exit(1);
}
