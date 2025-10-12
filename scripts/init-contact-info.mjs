#!/usr/bin/env node

/**
 * Contact Info Initialization Script
 *
 * This script creates the initial contact information in the database.
 * Run this in production to ensure contact info exists.
 *
 * Usage:
 *   node scripts/init-contact-info.mjs
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

console.log("🚀 Contact Info Initialization");
console.log("==============================");
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
import { migrateContactDataToDatabase } from '../src/lib/db-migrations/contact-migration';

async function runMigration() {
  try {
    console.log('📝 Creating initial contact information...');
    await migrateContactDataToDatabase();
    console.log('✅ Contact information initialized successfully!');
    console.log('');
    console.log('🎉 Your contact page should now work correctly');
    process.exit(0);
  } catch (error) {
    console.error('❌ Contact info initialization failed:', error);
    process.exit(1);
  }
}

runMigration();
`;

  const tempScriptPath = path.join(__dirname, "temp-contact-init.ts");
  fs.writeFileSync(tempScriptPath, tempScript);

  console.log("⚙️  Initializing contact information...");
  console.log("");

  execSync(`npx tsx ${tempScriptPath}`, {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
    env,
  });

  // Clean up temporary file
  fs.unlinkSync(tempScriptPath);
} catch (error) {
  console.error("");
  console.error("❌ Error initializing contact info:");
  console.error(error.message);
  process.exit(1);
}
