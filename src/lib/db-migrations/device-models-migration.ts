import { ObjectId } from "mongodb";
import { BrandModel } from "../../db/models/Brand";
import { DeviceModelModel } from "../../db/models/DeviceModel";
import { phoneBrands, tabletBrands } from "../phone-data-legacy";

/**
 * Migration to convert phone-data.ts to database device models
 * Maps the existing phone data structure to the DeviceModel schema
 */

interface BrandMapping {
  oldId: string;
  newId: ObjectId;
  name: string;
}

export async function migrateDeviceModelsToDatabase(): Promise<void> {
  try {
    console.log("🔄 Starting device models migration (Apple & Samsung only)...");

    const brandMappings: BrandMapping[] = [];

    // Step 1: Create/Get Brands (Apple & Samsung only)
    console.log("📝 Creating brands...");

    // Only include Apple and Samsung brands
    const uniqueBrands = new Set<string>(["Apple", "Samsung"]);

    // Create brands in database
    for (const brandName of Array.from(uniqueBrands)) {
      // Check if brand already exists by querying
      const existingBrands = await BrandModel.findByQuery({ name: brandName });

      if (existingBrands.length > 0) {
        const existingBrand = existingBrands[0];
        console.log(`✓ Brand "${brandName}" already exists`);
        // Find matching phone brand id
        const phoneData = phoneBrands.find((b) => b.name === brandName);
        const tabletData = tabletBrands.find((b) => b.name.includes(brandName) || brandName.includes(b.name.split(" ")[0]));

        brandMappings.push({
          oldId: phoneData?.id || tabletData?.id || brandName.toLowerCase(),
          newId: existingBrand._id!,
          name: brandName,
        });
      } else {
        // Create new brand
        const newBrand = await BrandModel.create({
          name: brandName,
          logo_url: `/brands/${brandName.toLowerCase()}-logo.png`, // Placeholder
        });

        console.log(`✓ Created brand: ${brandName}`);

        // Find matching phone brand id
        const phoneData = phoneBrands.find((b) => b.name === brandName);
        const tabletData = tabletBrands.find((b) => b.name.includes(brandName) || brandName.includes(b.name.split(" ")[0]));

        brandMappings.push({
          oldId: phoneData?.id || tabletData?.id || brandName.toLowerCase(),
          newId: newBrand._id!,
          name: brandName,
        });
      }
    }

    console.log(`✓ Created/verified ${brandMappings.length} brands`);

    // Step 2: Migrate Phone Models (Apple & Samsung only)
    console.log("\n📱 Migrating phone models...");
    let phoneCount = 0;

    // Filter to only Apple and Samsung
    const filteredPhoneBrands = phoneBrands.filter((brand) => brand.name === "Apple" || brand.name === "Samsung");

    for (const phoneBrand of filteredPhoneBrands) {
      const brandMapping = brandMappings.find((m) => m.name === phoneBrand.name || m.oldId === phoneBrand.id);

      if (!brandMapping) {
        console.warn(`⚠️ Could not find brand mapping for: ${phoneBrand.name}`);
        continue;
      }

      for (const model of phoneBrand.models) {
        // Check if model already exists
        const existing = await DeviceModelModel.findByQuery({
          brandId: brandMapping.newId.toString(),
          name: model.name,
        });

        if (existing.length > 0) {
          console.log(`  ↷ Phone model "${model.name}" already exists`);
          continue;
        }

        // Create device model
        await DeviceModelModel.create({
          brandId: brandMapping.newId.toString(),
          name: model.name,
          type: "phone",
          releaseYear: model.year,
        });

        phoneCount++;
        console.log(`  ✓ Created phone: ${model.name} (${model.year})`);
      }
    }

    console.log(`✓ Migrated ${phoneCount} phone models`);

    // Step 3: Migrate Tablet Models (Apple & Samsung only)
    console.log("\n📱 Migrating tablet models...");
    let tabletCount = 0;

    // Filter to only Apple iPad and Samsung Galaxy Tab
    const filteredTabletBrands = tabletBrands.filter((brand) => brand.name.includes("iPad") || brand.name.includes("Galaxy Tab"));

    for (const tabletBrand of filteredTabletBrands) {
      // Find the base brand name
      let baseBrandName = tabletBrand.name;
      if (tabletBrand.name.includes("iPad")) {
        baseBrandName = "Apple";
      } else if (tabletBrand.name.includes("Galaxy Tab")) {
        baseBrandName = "Samsung";
      }

      const brandMapping = brandMappings.find((m) => m.name === baseBrandName || m.oldId === tabletBrand.id);

      if (!brandMapping) {
        console.warn(`⚠️ Could not find brand mapping for: ${tabletBrand.name}`);
        continue;
      }

      for (const model of tabletBrand.models) {
        // Check if model already exists
        const existing = await DeviceModelModel.findByQuery({
          brandId: brandMapping.newId.toString(),
          name: model.name,
        });

        if (existing.length > 0) {
          console.log(`  ↷ Tablet model "${model.name}" already exists`);
          continue;
        }

        // Create device model
        await DeviceModelModel.create({
          brandId: brandMapping.newId.toString(),
          name: model.name,
          type: "tablet",
          releaseYear: model.year,
        });

        tabletCount++;
        console.log(`  ✓ Created tablet: ${model.name} (${model.year})`);
      }
    }

    console.log(`✓ Migrated ${tabletCount} tablet models`);

    console.log("\n✅ Device models migration completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - Brands: ${brandMappings.length} (Apple, Samsung)`);
    console.log(`   - Phones: ${phoneCount}`);
    console.log(`   - Tablets: ${tabletCount}`);
    console.log(`   - Total: ${phoneCount + tabletCount} device models`);
  } catch (error) {
    console.error("❌ Error migrating device models:", error);
    throw new Error(`Failed to migrate device models: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
