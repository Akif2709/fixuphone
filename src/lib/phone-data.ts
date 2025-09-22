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
  {
    id: "google",
    name: "Google",
    models: [
      { id: "pixel-8-pro", name: "Pixel 8 Pro", year: 2023 },
      { id: "pixel-8", name: "Pixel 8", year: 2023 },
      { id: "pixel-7-pro", name: "Pixel 7 Pro", year: 2022 },
      { id: "pixel-7", name: "Pixel 7", year: 2022 },
      { id: "pixel-6-pro", name: "Pixel 6 Pro", year: 2021 },
      { id: "pixel-6", name: "Pixel 6", year: 2021 },
      { id: "pixel-6a", name: "Pixel 6a", year: 2022 },
      { id: "pixel-5", name: "Pixel 5", year: 2020 },
      { id: "pixel-4a", name: "Pixel 4a", year: 2020 },
    ],
  },
  {
    id: "oneplus",
    name: "OnePlus",
    models: [
      { id: "oneplus-11", name: "OnePlus 11", year: 2023 },
      { id: "oneplus-10-pro", name: "OnePlus 10 Pro", year: 2022 },
      { id: "oneplus-10t", name: "OnePlus 10T", year: 2022 },
      { id: "oneplus-9-pro", name: "OnePlus 9 Pro", year: 2021 },
      { id: "oneplus-9", name: "OnePlus 9", year: 2021 },
      { id: "oneplus-8t", name: "OnePlus 8T", year: 2020 },
      { id: "oneplus-8-pro", name: "OnePlus 8 Pro", year: 2020 },
      { id: "oneplus-8", name: "OnePlus 8", year: 2020 },
      { id: "oneplus-nord-3", name: "OnePlus Nord 3", year: 2023 },
    ],
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    models: [
      { id: "xiaomi-13-pro", name: "Xiaomi 13 Pro", year: 2023 },
      { id: "xiaomi-13", name: "Xiaomi 13", year: 2023 },
      { id: "xiaomi-12-pro", name: "Xiaomi 12 Pro", year: 2022 },
      { id: "xiaomi-12", name: "Xiaomi 12", year: 2022 },
      { id: "xiaomi-11-ultra", name: "Xiaomi 11 Ultra", year: 2021 },
      { id: "xiaomi-11", name: "Xiaomi 11", year: 2021 },
      { id: "redmi-note-12-pro", name: "Redmi Note 12 Pro", year: 2023 },
      { id: "redmi-note-11", name: "Redmi Note 11", year: 2022 },
    ],
  },
  {
    id: "huawei",
    name: "Huawei",
    models: [
      { id: "p60-pro", name: "P60 Pro", year: 2023 },
      { id: "p60", name: "P60", year: 2023 },
      { id: "p50-pro", name: "P50 Pro", year: 2021 },
      { id: "p50", name: "P50", year: 2021 },
      { id: "mate-50-pro", name: "Mate 50 Pro", year: 2022 },
      { id: "mate-40-pro", name: "Mate 40 Pro", year: 2020 },
      { id: "nova-11", name: "Nova 11", year: 2023 },
    ],
  },
  {
    id: "oppo",
    name: "OPPO",
    models: [
      { id: "find-x6-pro", name: "Find X6 Pro", year: 2023 },
      { id: "find-x5-pro", name: "Find X5 Pro", year: 2022 },
      { id: "find-x3-pro", name: "Find X3 Pro", year: 2021 },
      { id: "reno-10-pro", name: "Reno 10 Pro", year: 2023 },
      { id: "reno-9-pro", name: "Reno 9 Pro", year: 2022 },
      { id: "a78", name: "A78", year: 2023 },
    ],
  },
  {
    id: "vivo",
    name: "vivo",
    models: [
      { id: "x90-pro", name: "X90 Pro", year: 2023 },
      { id: "x80-pro", name: "X80 Pro", year: 2022 },
      { id: "v27-pro", name: "V27 Pro", year: 2023 },
      { id: "v25-pro", name: "V25 Pro", year: 2022 },
      { id: "y36", name: "Y36", year: 2023 },
    ],
  },
];

export const deviceTypes = [
  { id: "phone", name: "Phone", description: "Smartphones and mobile phones" },
  { id: "tablet", name: "Tablet", description: "iPad, Android tablets, and other tablets" },
  { id: "other", name: "Other Device", description: "Laptops, smartwatches, or other electronic devices" },
];

export const tabletBrands: PhoneBrand[] = [
  {
    id: "apple-tablet",
    name: "Apple iPad",
    models: [
      { id: "ipad-pro-12.9-6th", name: "iPad Pro 12.9\" (6th generation)", year: 2022 },
      { id: "ipad-pro-11-4th", name: "iPad Pro 11\" (4th generation)", year: 2022 },
      { id: "ipad-air-5th", name: "iPad Air (5th generation)", year: 2022 },
      { id: "ipad-10th", name: "iPad (10th generation)", year: 2022 },
      { id: "ipad-mini-6th", name: "iPad mini (6th generation)", year: 2021 },
      { id: "ipad-pro-12.9-5th", name: "iPad Pro 12.9\" (5th generation)", year: 2021 },
      { id: "ipad-pro-11-3rd", name: "iPad Pro 11\" (3rd generation)", year: 2021 },
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
  {
    id: "google-tablet",
    name: "Google Pixel Tablet",
    models: [
      { id: "pixel-tablet", name: "Pixel Tablet", year: 2023 },
    ],
  },
  {
    id: "huawei-tablet",
    name: "Huawei MatePad",
    models: [
      { id: "matepad-pro-12.6", name: "MatePad Pro 12.6\"", year: 2021 },
      { id: "matepad-pro-11", name: "MatePad Pro 11\"", year: 2021 },
      { id: "matepad-11", name: "MatePad 11", year: 2021 },
    ],
  },
  {
    id: "lenovo-tablet",
    name: "Lenovo Tab",
    models: [
      { id: "tab-p12-pro", name: "Tab P12 Pro", year: 2021 },
      { id: "tab-p11-pro", name: "Tab P11 Pro", year: 2021 },
      { id: "tab-m10-plus", name: "Tab M10 Plus", year: 2020 },
    ],
  },
];

export const repairServices = [
  { id: "screen-repair", name: "Screen Repair", description: "Cracked or broken display replacement" },
  { id: "battery-replacement", name: "Battery Replacement", description: "Low battery life or battery swelling" },
  { id: "water-damage", name: "Water Damage Repair", description: "Device exposed to water or liquid" },
  { id: "charging-port", name: "Charging Port Repair", description: "Charging issues or port damage" },
  { id: "camera-repair", name: "Camera Repair", description: "Camera not working or blurry photos" },
  { id: "speaker-repair", name: "Speaker Repair", description: "Audio issues or no sound" },
  { id: "button-repair", name: "Button Repair", description: "Power, volume, or home button issues" },
  { id: "software-issue", name: "Software Issues", description: "Device freezing, crashing, or slow performance" },
  { id: "other", name: "Other Issues", description: "Any other repair needs" },
];
