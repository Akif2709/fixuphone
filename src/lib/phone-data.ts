export interface PhoneModel {
  id: string;
  name: string;
  year: number;
}

export interface RepairPrice {
  service: string;
  price: number;
  currency: string;
  description?: string;
}

export interface DevicePricing {
  deviceId: string;
  deviceName: string;
  brand: string;
  prices: RepairPrice[];
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
  }
];

export const deviceTypes = [
  { id: "phone", name: "Telefoon", description: "Smartphones en mobiele telefoons" },
  { id: "tablet", name: "Tablet", description: "iPad, Android tablets en andere tablets" },
  { id: "other", name: "Ander Apparaat", description: "Laptops, smartwatches of andere elektronische apparaten" },
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
  { id: "screen-repair", name: "Scherm Reparatie", description: "Gebarsten of kapot scherm vervangen" },
  { id: "battery-replacement", name: "Batterij Vervanging", description: "Lage batterij levensduur of opgezwollen batterij" },
  { id: "charging-port", name: "Oplaadpoort Reparatie", description: "Oplaadproblemen of poort schade" },
  { id: "water-damage", name: "Water Schade Reparatie", description: "Apparaat blootgesteld aan water of vloeistof" },
  { id: "camera-repair", name: "Camera Reparatie", description: "Camera werkt niet of wazige foto's" },
  { id: "speaker-repair", name: "Speaker Reparatie", description: "Audio problemen of geen geluid" },
  { id: "button-repair", name: "Knop Reparatie", description: "Aan/uit, volume of home knop problemen" },
  { id: "software-issue", name: "Software Problemen", description: "Apparaat bevriest, crasht of trage prestaties" },
  { id: "other", name: "Andere Problemen", description: "Alle andere reparatie behoeften" },
];

// ========================================
// PRICING INFORMATION
// ========================================
// Easy to manage pricing for site owners
// Update prices here when needed

export const devicePricing: DevicePricing[] = [
  // iPhone Pricing
  {
    deviceId: "iphone-15-pro-max",
    deviceName: "iPhone 15 Pro Max",
    brand: "Apple",
    prices: [
      { service: "screen-repair", price: 299, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 89, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 149, currency: "EUR", description: "Lightning port repair" },
      { service: "water-damage", price: 199, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 179, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 99, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 79, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "iphone-15-pro",
    deviceName: "iPhone 15 Pro",
    brand: "Apple",
    prices: [
      { service: "screen-repair", price: 279, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 89, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 149, currency: "EUR", description: "Lightning port repair" },
      { service: "water-damage", price: 199, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 179, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 99, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 79, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "iphone-14-pro-max",
    deviceName: "iPhone 14 Pro Max",
    brand: "Apple",
    prices: [
      { service: "screen-repair", price: 269, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 79, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 139, currency: "EUR", description: "Lightning port repair" },
      { service: "water-damage", price: 189, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 169, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 89, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 69, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "iphone-13-pro-max",
    deviceName: "iPhone 13 Pro Max",
    brand: "Apple",
    prices: [
      { service: "screen-repair", price: 249, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 69, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 129, currency: "EUR", description: "Lightning port repair" },
      { service: "water-damage", price: 179, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 159, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 79, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 59, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "iphone-12-pro-max",
    deviceName: "iPhone 12 Pro Max",
    brand: "Apple",
    prices: [
      { service: "screen-repair", price: 229, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 59, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 119, currency: "EUR", description: "Lightning port repair" },
      { service: "water-damage", price: 169, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 149, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 69, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 49, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 39, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "iphone-11-pro-max",
    deviceName: "iPhone 11 Pro Max",
    brand: "Apple",
    prices: [
      { service: "screen-repair", price: 199, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 49, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 99, currency: "EUR", description: "Lightning port repair" },
      { service: "water-damage", price: 149, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 129, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 59, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 39, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 39, currency: "EUR", description: "Software troubleshooting" }
    ]
  },

  // Samsung Galaxy Pricing
  {
    deviceId: "galaxy-s24-ultra",
    deviceName: "Galaxy S24 Ultra",
    brand: "Samsung",
    prices: [
      { service: "screen-repair", price: 279, currency: "EUR", description: "Original Samsung display" },
      { service: "battery-replacement", price: 89, currency: "EUR", description: "Original Samsung battery" },
      { service: "charging-port", price: 149, currency: "EUR", description: "USB-C port repair" },
      { service: "water-damage", price: 199, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 179, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 99, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 79, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "galaxy-s23-ultra",
    deviceName: "Galaxy S23 Ultra",
    brand: "Samsung",
    prices: [
      { service: "screen-repair", price: 259, currency: "EUR", description: "Original Samsung display" },
      { service: "battery-replacement", price: 79, currency: "EUR", description: "Original Samsung battery" },
      { service: "charging-port", price: 139, currency: "EUR", description: "USB-C port repair" },
      { service: "water-damage", price: 189, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 169, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 89, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 69, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "galaxy-s22-ultra",
    deviceName: "Galaxy S22 Ultra",
    brand: "Samsung",
    prices: [
      { service: "screen-repair", price: 239, currency: "EUR", description: "Original Samsung display" },
      { service: "battery-replacement", price: 69, currency: "EUR", description: "Original Samsung battery" },
      { service: "charging-port", price: 129, currency: "EUR", description: "USB-C port repair" },
      { service: "water-damage", price: 179, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 159, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 79, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 59, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },

  // Google Pixel Pricing
  {
    deviceId: "pixel-8-pro",
    deviceName: "Pixel 8 Pro",
    brand: "Google",
    prices: [
      { service: "screen-repair", price: 249, currency: "EUR", description: "Original Google display" },
      { service: "battery-replacement", price: 79, currency: "EUR", description: "Original Google battery" },
      { service: "charging-port", price: 129, currency: "EUR", description: "USB-C port repair" },
      { service: "water-damage", price: 179, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 159, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 79, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 59, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 49, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "pixel-7-pro",
    deviceName: "Pixel 7 Pro",
    brand: "Google",
    prices: [
      { service: "screen-repair", price: 229, currency: "EUR", description: "Original Google display" },
      { service: "battery-replacement", price: 69, currency: "EUR", description: "Original Google battery" },
      { service: "charging-port", price: 119, currency: "EUR", description: "USB-C port repair" },
      { service: "water-damage", price: 169, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 149, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 69, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 49, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 39, currency: "EUR", description: "Software troubleshooting" }
    ]
  },

  // iPad Pricing
  {
    deviceId: "ipad-pro-12.9-6th",
    deviceName: "iPad Pro 12.9\" (6th generation)",
    brand: "Apple iPad",
    prices: [
      { service: "screen-repair", price: 399, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 129, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 179, currency: "EUR", description: "USB-C port repair" },
      { service: "water-damage", price: 249, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 199, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 119, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 99, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 59, currency: "EUR", description: "Software troubleshooting" }
    ]
  },
  {
    deviceId: "ipad-pro-11-4th",
    deviceName: "iPad Pro 11\" (4th generation)",
    brand: "Apple iPad",
    prices: [
      { service: "screen-repair", price: 349, currency: "EUR", description: "Original Apple display" },
      { service: "battery-replacement", price: 119, currency: "EUR", description: "Original Apple battery" },
      { service: "charging-port", price: 169, currency: "EUR", description: "USB-C port repair" },
      { service: "water-damage", price: 229, currency: "EUR", description: "Water damage assessment & repair" },
      { service: "camera-repair", price: 189, currency: "EUR", description: "Camera module replacement" },
      { service: "speaker-repair", price: 109, currency: "EUR", description: "Speaker replacement" },
      { service: "button-repair", price: 89, currency: "EUR", description: "Button replacement" },
      { service: "software-issue", price: 59, currency: "EUR", description: "Software troubleshooting" }
    ]
  }
];

// Helper function to get pricing for a specific device
export function getDevicePricing(deviceId: string): DevicePricing | undefined {
  return devicePricing.find(device => device.deviceId === deviceId);
}

// Helper function to get price for a specific service on a device
export function getServicePrice(deviceId: string, serviceId: string): RepairPrice | undefined {
  const device = getDevicePricing(deviceId);
  if (!device) return undefined;
  
  return device.prices.find(price => price.service === serviceId);
}

// Helper function to get all devices with pricing
export function getAllDevicesWithPricing(): DevicePricing[] {
  return devicePricing;
}
