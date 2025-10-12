// ==================== LEGACY DATA FOR MIGRATION ONLY ====================
// This file contains the original phone and tablet data used ONLY for the
// one-time device models migration to MongoDB.
//
// DO NOT import this in the application code.
// Use database queries from device-model-actions.ts instead.
//
// This file is kept for:
// 1. Re-running migrations if needed
// 2. Reference for model names and years
// ========================================================================

export interface PhoneModel {
  id: string;
  name: string;
  year: number;
}

export interface PhoneBrand {
  id: string;
  name: string;
  models: PhoneModel[];
}

export const phoneBrands: PhoneBrand[] = [
  {
    id: "apple",
    name: "Apple",
    models: [
      { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", year: 2023 },
      { id: "iphone-15-pro", name: "iPhone 15 Pro", year: 2023 },
      { id: "iphone-15-plus", name: "iPhone 15 Plus", year: 2023 },
      { id: "iphone-15", name: "iPhone 15", year: 2023 },
      { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", year: 2022 },
      { id: "iphone-14-pro", name: "iPhone 14 Pro", year: 2022 },
      { id: "iphone-14-plus", name: "iPhone 14 Plus", year: 2022 },
      { id: "iphone-14", name: "iPhone 14", year: 2022 },
      { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", year: 2021 },
      { id: "iphone-13-pro", name: "iPhone 13 Pro", year: 2021 },
      { id: "iphone-13-mini", name: "iPhone 13 mini", year: 2021 },
      { id: "iphone-13", name: "iPhone 13", year: 2021 },
      { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", year: 2020 },
      { id: "iphone-12-pro", name: "iPhone 12 Pro", year: 2020 },
      { id: "iphone-12-mini", name: "iPhone 12 mini", year: 2020 },
      { id: "iphone-12", name: "iPhone 12", year: 2020 },
      { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", year: 2019 },
      { id: "iphone-11-pro", name: "iPhone 11 Pro", year: 2019 },
      { id: "iphone-11", name: "iPhone 11", year: 2019 },
      { id: "iphone-se-3rd", name: "iPhone SE (3rd generation)", year: 2022 },
      { id: "iphone-se-2nd", name: "iPhone SE (2nd generation)", year: 2020 },
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    models: [
      { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", year: 2024 },
      { id: "galaxy-s24-plus", name: "Galaxy S24+", year: 2024 },
      { id: "galaxy-s24", name: "Galaxy S24", year: 2024 },
      { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", year: 2023 },
      { id: "galaxy-s23-plus", name: "Galaxy S23+", year: 2023 },
      { id: "galaxy-s23", name: "Galaxy S23", year: 2023 },
      { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", year: 2022 },
      { id: "galaxy-s22-plus", name: "Galaxy S22+", year: 2022 },
      { id: "galaxy-s22", name: "Galaxy S22", year: 2022 },
      { id: "galaxy-s21-ultra", name: "Galaxy S21 Ultra", year: 2021 },
      { id: "galaxy-s21-plus", name: "Galaxy S21+", year: 2021 },
      { id: "galaxy-s21", name: "Galaxy S21", year: 2021 },
      { id: "galaxy-note-20-ultra", name: "Galaxy Note 20 Ultra", year: 2020 },
      { id: "galaxy-note-20", name: "Galaxy Note 20", year: 2020 },
      { id: "galaxy-z-fold-5", name: "Galaxy Z Fold 5", year: 2023 },
      { id: "galaxy-z-flip-5", name: "Galaxy Z Flip 5", year: 2023 },
      { id: "galaxy-a54", name: "Galaxy A54", year: 2023 },
      { id: "galaxy-a34", name: "Galaxy A34", year: 2023 },
    ],
  },
];

export const tabletBrands: PhoneBrand[] = [
  {
    id: "apple-tablet",
    name: "Apple iPad",
    models: [
      { id: "ipad-pro-12.9-6th", name: 'iPad Pro 12.9" (6th generation)', year: 2022 },
      { id: "ipad-pro-11-4th", name: 'iPad Pro 11" (4th generation)', year: 2022 },
      { id: "ipad-air-5th", name: "iPad Air (5th generation)", year: 2022 },
      { id: "ipad-10th", name: "iPad (10th generation)", year: 2022 },
      { id: "ipad-mini-6th", name: "iPad mini (6th generation)", year: 2021 },
      { id: "ipad-pro-12.9-5th", name: 'iPad Pro 12.9" (5th generation)', year: 2021 },
      { id: "ipad-pro-11-3rd", name: 'iPad Pro 11" (3rd generation)', year: 2021 },
      { id: "ipad-air-4th", name: "iPad Air (4th generation)", year: 2020 },
      { id: "ipad-9th", name: "iPad (9th generation)", year: 2021 },
      { id: "ipad-8th", name: "iPad (8th generation)", year: 2020 },
    ],
  },
  {
    id: "samsung-tablet",
    name: "Samsung Galaxy Tab",
    models: [
      { id: "galaxy-tab-s9-ultra", name: "Galaxy Tab S9 Ultra", year: 2023 },
      { id: "galaxy-tab-s9-plus", name: "Galaxy Tab S9+", year: 2023 },
      { id: "galaxy-tab-s9", name: "Galaxy Tab S9", year: 2023 },
      { id: "galaxy-tab-s8-ultra", name: "Galaxy Tab S8 Ultra", year: 2022 },
      { id: "galaxy-tab-s8-plus", name: "Galaxy Tab S8+", year: 2022 },
      { id: "galaxy-tab-s8", name: "Galaxy Tab S8", year: 2022 },
      { id: "galaxy-tab-a8", name: "Galaxy Tab A8", year: 2021 },
      { id: "galaxy-tab-a7-lite", name: "Galaxy Tab A7 Lite", year: 2021 },
    ],
  },
];
