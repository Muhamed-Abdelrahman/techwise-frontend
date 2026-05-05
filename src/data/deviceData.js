// ── deviceData.js ──────────────────────────────────────────────────────────
// Shared static data for all device-related pages
// Usage: import { BRANDS, CPUS, GPUS, ... } from "../data/deviceData";
// ──────────────────────────────────────────────────────────────────────────

export const BRANDS = [
  "Lenovo", "Dell", "HP", "Asus", "Acer", "Apple", "MSI", "Samsung",
  "Toshiba", "Huawei", "Microsoft", "Razer", "LG", "Sony", "Gigabyte",
  "Alienware", "Chuwi", "Honor", "Xiaomi", "Realme", "Infinix", "Avita",
];

export const MODELS = [
  // Lenovo
  "IdeaPad 3", "IdeaPad 5", "IdeaPad Gaming 3",
  "Legion 5", "Legion 5 Pro", "Legion 7", "Legion 7i",
  "ThinkPad X1 Carbon", "ThinkPad E14", "ThinkPad T14",
  "Yoga 7", "Yoga 9", "Slim 5",
  // Dell
  "XPS 13", "XPS 15", "XPS 17",
  "Inspiron 14", "Inspiron 15", "Inspiron 16",
  "Latitude 14", "Latitude 15",
  "G15 Gaming", "G16 Gaming",
  "Alienware m15", "Alienware m16", "Alienware x15",
  // HP
  "Pavilion 14", "Pavilion 15",
  "Envy x360 13", "Envy x360 15",
  "Spectre x360 14", "Spectre x360 16",
  "EliteBook 840", "EliteBook 850",
  "OMEN 16", "OMEN 17", "Victus 15", "Victus 16",
  // Asus
  "VivoBook 14", "VivoBook 15", "VivoBook 16",
  "ZenBook 14", "ZenBook 14X", "ZenBook Pro 15",
  "ROG Strix G15", "ROG Strix G16", "ROG Strix Scar 15",
  "TUF Gaming A15", "TUF Gaming A16", "TUF Gaming F15",
  "ProArt Studiobook 16",
  // Acer
  "Swift 3", "Swift 5", "Swift X",
  "Aspire 5", "Aspire 7",
  "Nitro 5", "Nitro 16",
  "Predator Helios 300", "Predator Helios 16",
  "ConceptD 7",
  // Apple
  "MacBook Air M1", "MacBook Air M2", "MacBook Air M3",
  'MacBook Pro 13" M2', 'MacBook Pro 14" M3', 'MacBook Pro 16" M3',
  'MacBook Pro 14" M3 Pro', 'MacBook Pro 16" M3 Max',
  // MSI
  "Modern 14", "Modern 15",
  "Prestige 14", "Prestige 15",
  "GF63 Thin", "GL65", "GS66 Stealth",
  "Raider GE68", "Titan GT77",
  // Microsoft
  "Surface Pro 9", "Surface Pro 10",
  "Surface Laptop 5", "Surface Laptop Studio 2",
  // Razer
  "Razer Blade 14", "Razer Blade 15", "Razer Blade 16",
  // Samsung
  "Galaxy Book3", "Galaxy Book3 Pro", "Galaxy Book3 Ultra",
  // Others
  "MateBook D15", "MateBook X Pro",
  "Mi Notebook Pro", "RedmiBook Pro 15",
];

export const CPUS = [
  // Intel 10th Gen
  "Intel Core i5-10300H", "Intel Core i7-10750H", "Intel Core i9-10980HK",
  // Intel 11th Gen
  "Intel Core i3-1115G4", "Intel Core i5-1135G7", "Intel Core i7-1165G7",
  "Intel Core i5-11300H", "Intel Core i5-11400H",
  "Intel Core i7-11370H", "Intel Core i7-11800H",
  "Intel Core i9-11900H", "Intel Core i9-11980HK",
  // Intel 12th Gen
  "Intel Core i3-1215U", "Intel Core i5-1235U", "Intel Core i7-1255U",
  "Intel Core i5-12450H", "Intel Core i5-12500H",
  "Intel Core i7-12650H", "Intel Core i7-12700H",
  "Intel Core i9-12900H", "Intel Core i9-12900HK",
  // Intel 13th Gen
  "Intel Core i5-1335U", "Intel Core i7-1355U",
  "Intel Core i5-13420H", "Intel Core i5-13500H",
  "Intel Core i7-13620H", "Intel Core i7-13700H",
  "Intel Core i9-13900H", "Intel Core i9-13900HK",
  // Intel 14th Gen
  "Intel Core i5-14500H", "Intel Core i7-14700H",
  "Intel Core Ultra 5 125H", "Intel Core Ultra 7 155H", "Intel Core Ultra 9 185H",
  // AMD Ryzen 5000
  "AMD Ryzen 5 5500U", "AMD Ryzen 5 5600H", "AMD Ryzen 5 5600U",
  "AMD Ryzen 7 5700U", "AMD Ryzen 7 5800H", "AMD Ryzen 7 5800U",
  "AMD Ryzen 9 5900HX", "AMD Ryzen 9 5900X",
  // AMD Ryzen 6000
  "AMD Ryzen 5 6600H", "AMD Ryzen 7 6800H", "AMD Ryzen 9 6900HX",
  // AMD Ryzen 7000
  "AMD Ryzen 5 7530U", "AMD Ryzen 5 7600H",
  "AMD Ryzen 7 7730U", "AMD Ryzen 7 7745H",
  "AMD Ryzen 9 7940H", "AMD Ryzen 9 7945HX",
  // Apple Silicon
  "Apple M1", "Apple M1 Pro", "Apple M1 Max", "Apple M1 Ultra",
  "Apple M2", "Apple M2 Pro", "Apple M2 Max", "Apple M2 Ultra",
  "Apple M3", "Apple M3 Pro", "Apple M3 Max",
];

export const GPUS = [
  // Integrated
  "Intel UHD Graphics 620", "Intel UHD Graphics 630", "Intel UHD Graphics",
  "Intel Iris Xe Graphics",
  "AMD Radeon Graphics (Integrated)",
  "Apple GPU (Integrated)",
  "Apple 8-core GPU", "Apple 10-core GPU",
  "Apple 14-core GPU", "Apple 16-core GPU",
  "Apple 18-core GPU", "Apple 19-core GPU",
  "Apple 30-core GPU", "Apple 38-core GPU", "Apple 40-core GPU",
  // NVIDIA GTX
  "NVIDIA GeForce GTX 1050", "NVIDIA GeForce GTX 1050 Ti",
  "NVIDIA GeForce GTX 1060", "NVIDIA GeForce GTX 1650",
  "NVIDIA GeForce GTX 1650 Ti", "NVIDIA GeForce GTX 1660 Ti",
  // NVIDIA RTX 30
  "NVIDIA GeForce RTX 3050", "NVIDIA GeForce RTX 3050 Ti",
  "NVIDIA GeForce RTX 3060", "NVIDIA GeForce RTX 3060 6GB",
  "NVIDIA GeForce RTX 3070", "NVIDIA GeForce RTX 3070 Ti",
  "NVIDIA GeForce RTX 3080", "NVIDIA GeForce RTX 3080 Ti",
  // NVIDIA RTX 40
  "NVIDIA GeForce RTX 4050", "NVIDIA GeForce RTX 4060",
  "NVIDIA GeForce RTX 4070", "NVIDIA GeForce RTX 4070 Ti",
  "NVIDIA GeForce RTX 4080", "NVIDIA GeForce RTX 4090",
  // AMD
  "AMD Radeon RX 5500M", "AMD Radeon RX 5600M",
  "AMD Radeon RX 6500M", "AMD Radeon RX 6600M",
  "AMD Radeon RX 6700M", "AMD Radeon RX 6800M",
  "AMD Radeon RX 7600M", "AMD Radeon RX 7700S",
];

export const MEMORY = [
  "4GB DDR4", "8GB DDR4", "12GB DDR4", "16GB DDR4",
  "24GB DDR5", "32GB DDR4", "32GB DDR5",
  "48GB DDR5", "64GB DDR5",
  "8GB Unified Memory", "16GB Unified Memory",
  "24GB Unified Memory", "32GB Unified Memory",
  "36GB Unified Memory", "48GB Unified Memory",
  "64GB Unified Memory", "96GB Unified Memory", "128GB Unified Memory",
];

export const STORAGE = [
  "128GB SSD", "256GB SSD", "512GB SSD",
  "1TB SSD", "2TB SSD", "4TB SSD",
  "500GB HDD", "1TB HDD", "2TB HDD",
  "256GB SSD + 500GB HDD",
  "256GB SSD + 1TB HDD",
  "512GB SSD + 1TB HDD",
  "1TB SSD + 1TB HDD",
  "1TB SSD + 2TB HDD",
];

export const SCREENS = [
  // 13"
  '13.3" FHD IPS', '13.3" 2K IPS', '13.3" Retina',
  '13.6" Liquid Retina',
  // 14"
  '14" HD TN', '14" FHD IPS', '14" FHD IPS 144Hz',
  '14" 2K IPS', '14" 2K IPS 90Hz',
  // 15"
  '15.6" HD TN', '15.6" FHD IPS', '15.6" FHD IPS 144Hz',
  '15.6" FHD IPS 240Hz', '15.6" 2K IPS 165Hz', '15.6" 4K OLED',
  // 16"
  '16" FHD IPS 144Hz', '16" FHD IPS 165Hz',
  '16" 2K IPS 165Hz', '16" 2K IPS 240Hz',
  '16" 4K OLED', '16-inch Liquid Retina XDR',
  // 17"
  '17.3" FHD IPS', '17.3" FHD IPS 144Hz',
  '17.3" 2K IPS', '17.3" 4K IPS',
];

export const CATEGORIES = [
  "Gaming", "Video Editing", "3D Rendering / Animation",
  "Programming / Development", "Machine Learning / AI",
  "Office & Productivity", "Graphic Design", "UI/UX Design",
  "Music Production", "Photo Editing",
  "General Use", "Streaming", "Cybersecurity",
  "Data Science", "Architecture / CAD",
];

export const USAGE_DURATION_OPTIONS = [
  "Less than 6 months", "6 - 12 months", "1 - 2 years",
  "2 - 3 years", "3 - 4 years", "More than 4 years",
];

// ── Grouped export (for pages that need everything) ──
const DEVICE_DATA = {
  brands:    BRANDS,
  models:    MODELS,
  cpus:      CPUS,
  gpus:      GPUS,
  memory:    MEMORY,
  storage:   STORAGE,
  screens:   SCREENS,
  categories: CATEGORIES,
};

export default DEVICE_DATA;