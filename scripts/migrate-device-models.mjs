#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, "..", ".env.local") });

console.log("🚀 Device Models Migration Script");
console.log("==================================\n");

// Check for required environment variables
if (!process.env.MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI environment variable is not set");
  console.error("Please set MONGODB_URI in your .env.local file");
  process.exit(1);
}

console.log("📝 Running TypeScript migration with tsx...\n");

// Use dynamic import with tsx
(async () => {
  try {
    // Import tsx register to handle TypeScript files
    await import("tsx/esm/api");

    // Now import the TypeScript migration file
    const migration = await import("../src/lib/db-migrations/device-models-migration.ts");

    console.log("✓ Migration script loaded\n");

    // Run the migration
    await migration.migrateDeviceModelsToDatabase();

    console.log("\n✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
})();
