import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vhnksndoatkniqvesrhe.supabase.co",
  "sb_publishable_sRrYh-BBqCRiazE0-W_Dbg_ZO75SKSH"
);

const restaurants = [
  // Together
  { name: "Alain Ducasse at The Dorchester", cuisine: "French", city: "London", country: "UK", stars: 3, lat: 51.5071, lng: -0.1559, category: "together", occasion: "Satvik's 22nd birthday" },
  { name: "Angler", cuisine: "Seafood", city: "London", country: "UK", stars: 1, lat: 51.5202, lng: -0.087, category: "together", occasion: "Surprise" },
  { name: "Under Grain", cuisine: "Modern Cuisine", city: "Malta", country: "Malta", stars: 1, lat: 35.895, lng: 14.513, category: "together", occasion: "1 year anniversary" },
  { name: "Restaurant Gordon Ramsay", cuisine: "French", city: "London", country: "UK", stars: 3, lat: 51.4854, lng: -0.1633, category: "together", occasion: "Satvik's 23rd birthday" },
  { name: "Kochi", cuisine: "Korean", city: "New York", country: "USA", stars: 1, lat: 40.7484, lng: -73.9967, category: "together", occasion: "Holiday" },
  { name: "Da Terra", cuisine: "Creative", city: "London", country: "UK", stars: 2, lat: 51.5195, lng: -0.0467, category: "together", occasion: "Louisa's 22nd birthday" },
  { name: "The Muddler's Club", cuisine: "Modern Cuisine", city: "Belfast", country: "UK", stars: 1, lat: 54.6014, lng: -5.928, category: "together", occasion: "Holiday" },
  { name: "Galvin La Chapelle", cuisine: "French", city: "London", country: "UK", stars: 1, lat: 51.5187, lng: -0.0762, category: "together", occasion: "Satvik's birthday gift" },
  { name: "Kiin Kiin", cuisine: "Thai & Contemporary", city: "Copenhagen", country: "Denmark", stars: 1, lat: 55.6936, lng: 12.5364, category: "together", occasion: "With Satvik's family" },
  { name: "A. Wong", cuisine: "Chinese", city: "London", country: "UK", stars: 2, lat: 51.4945, lng: -0.137, category: "together", occasion: "2 year anniversary" },
  { name: "Endo at the Rotunda", cuisine: "Japanese", city: "London", country: "UK", stars: 1, lat: 51.5115, lng: -0.2218, category: "together", occasion: "With Sadhvi" },
  { name: "The Fat Duck", cuisine: "Creative", city: "Bray", country: "UK", stars: 3, lat: 51.5082, lng: -0.6999, category: "together", occasion: "Satvik's 24th birthday" },
  { name: "La Aquarela", cuisine: "Creative", city: "Gran Canaria", country: "Spain", stars: 1, lat: 27.7874, lng: -15.711, category: "together", occasion: "Holiday" },
  { name: "Shaun Rankin at Grantley Hall", cuisine: "Modern British & Regional Cuisine", city: "Ripon", country: "UK", stars: 1, lat: 54.1247, lng: -1.5477, category: "together", occasion: "Christmas with family" },
  { name: "CORE by Clare Smyth", cuisine: "Modern British", city: "Notting Hill", country: "UK", stars: 3, lat: 51.513, lng: -0.2008, category: "together", occasion: "Jane's 23rd day of birth" },
  { name: "Fordwich Arms", cuisine: "Modern Cuisine", city: "Canterbury", country: "UK", stars: 1, lat: 51.3053, lng: 1.1024, category: "together", occasion: "Treehouse break" },
  { name: "Otto Geleng", cuisine: "Mediterranean & Sicilian", city: "Taormina", country: "Italy", stars: 1, lat: 37.8516, lng: 15.2884, category: "together", occasion: "Holiday to Sicily" },
  { name: "Benares", cuisine: "Indian", city: "Mayfair", country: "UK", stars: 1, lat: 51.51, lng: -0.1468, category: "together", occasion: "With Sara and Phil" },
  { name: "Le Pré Catelan", cuisine: "Modern & Classic Cuisine", city: "Paris", country: "France", stars: 3, lat: 48.8576, lng: 2.2518, category: "together", occasion: "Surprise trip!" },
  { name: "Published on Main", cuisine: "Contemporary & North American", city: "Vancouver", country: "Canada", stars: 1, lat: 49.2667, lng: -123.1012, category: "together", occasion: "Holiday with Subramaniams" },
  { name: "Restaurant 360", cuisine: "Modern Cuisine", city: "Dubrovnik", country: "Croatia", stars: 1, lat: 42.6407, lng: 18.1086, category: "together", occasion: "3 year anniversary" },
  { name: "Dinner by Heston Blumenthal", cuisine: "Traditional British", city: "Knightsbridge", country: "UK", stars: 2, lat: 51.502, lng: -0.1604, category: "together", occasion: "Satvik's birthday gift" },
  { name: "L'Enclume", cuisine: "Creative British", city: "Cartmel", country: "UK", stars: 3, lat: 54.2315, lng: -2.9512, category: "together", occasion: "Birthday trip to Cartmel" },
  { name: "Rogan & Co", cuisine: "Creative British", city: "Cartmel", country: "UK", stars: 1, lat: 54.2312, lng: -2.9508, category: "together", occasion: "Birthday trip to Cartmel" },
  { name: "Star Inn at Harome", cuisine: "Modern British & Regional Cuisine", city: "Harome", country: "UK", stars: 1, lat: 54.2653, lng: -1.134, category: "together", occasion: "Louisa's 24th birthday with family" },
  { name: "Amaya", cuisine: "Indian", city: "Belgravia", country: "UK", stars: 1, lat: 51.4996, lng: -0.1583, category: "together", occasion: "Sadhvi's 22nd birthday" },
  { name: "Five Fields", cuisine: "Modern Cuisine", city: "Chelsea", country: "UK", stars: 1, lat: 51.4926, lng: -0.1627, category: "together", occasion: "With Katharine and Dom" },
  { name: "Ginza Kojyu", cuisine: "Japanese", city: "Tokyo", country: "Japan", stars: 2, lat: 35.6713, lng: 139.7635, category: "together", occasion: "Holiday to Japan" },
  { name: "Pied à Terre", cuisine: "Creative", city: "Bloomsbury", country: "UK", stars: 1, lat: 51.5197, lng: -0.1355, category: "together", occasion: "4 year anniversary" },
  { name: "Akoko", cuisine: "African", city: "Fitzrovia", country: "UK", stars: 1, lat: 51.5174, lng: -0.1385, category: "together", occasion: "Satvik's 26th birthday" },
  { name: "Bybrook", cuisine: "Modern British", city: "Cotswolds", country: "UK", stars: 1, lat: 51.833, lng: -2.225, category: "together", occasion: "Louisa's 25th birthday" },
  { name: "Masons Arms", cuisine: "Classic French", city: "Knowstone", country: "UK", stars: 1, lat: 51.0047, lng: -3.641, category: "together", occasion: "Easter treehouse break" },
  { name: "Dewakan", cuisine: "Malaysian", city: "Kuala Lumpur", country: "Malaysia", stars: 2, lat: 3.1183, lng: 101.6658, category: "together", occasion: "Honeymoon" },
  { name: "Vinha", cuisine: "Portuguese", city: "Porto", country: "Portugal", stars: 1, lat: 41.1496, lng: -8.611, category: "together", occasion: "Holiday" },
  { name: "AngloThai", cuisine: "Thai", city: "Marylebone", country: "UK", stars: 1, lat: 51.5188, lng: -0.1504, category: "together", occasion: "Satvik's 27th birthday" },
  { name: "Stube Hermitage", cuisine: "Creative", city: "Madonna di Campiglio", country: "Italy", stars: 1, lat: 46.2292, lng: 10.8264, category: "together", occasion: "Ski trip to Italy" },
  { name: "Luca", cuisine: "Italian", city: "Farringdon", country: "UK", stars: 1, lat: 51.5223, lng: -0.1049, category: "together", occasion: "Dinner with Matt" },
  // Louisa
  { name: "Star Inn at Harome", cuisine: "Modern British", city: "Yorkshire", country: "UK", stars: 1, lat: 54.2653, lng: -1.134, category: "louisa", occasion: "18th birthday" },
  { name: "Gymkhana", cuisine: "Indian", city: "Mayfair", country: "UK", stars: 1, lat: 51.5094, lng: -0.1398, category: "louisa", occasion: "Work" },
  { name: "The Ritz Restaurant", cuisine: "Modern British", city: "St James' London", country: "UK", stars: 2, lat: 51.5074, lng: -0.1417, category: "louisa", occasion: "Louisa's pre-wedding celebration" },
  { name: "La Table de Xavier Mathieu", cuisine: "Modern Cuisine", city: "Provence", country: "France", stars: 1, lat: 43.8932, lng: 5.3837, category: "louisa", occasion: "Holiday to Provence with Sara" },
  // Satvik
  { name: "Benares", cuisine: "Indian", city: "Mayfair", country: "UK", stars: 1, lat: 51.51, lng: -0.1468, category: "satvik", occasion: "Work" },
  { name: "Gymkhana", cuisine: "Indian", city: "Mayfair", country: "UK", stars: 1, lat: 51.5094, lng: -0.1398, category: "satvik", occasion: "Work" },
  { name: "Hakkasan Mayfair", cuisine: "Chinese", city: "Mayfair", country: "UK", stars: 1, lat: 51.5101, lng: -0.1469, category: "satvik", occasion: null },
  { name: "Ritz Restaurant", cuisine: "Modern British", city: "Green Park", country: "UK", stars: 1, lat: 51.5074, lng: -0.1417, category: "satvik", occasion: null },
  { name: "Kai", cuisine: "Chinese", city: "Mayfair", country: "UK", stars: 1, lat: 51.5101, lng: -0.1489, category: "satvik", occasion: null },
  { name: "Pétrus", cuisine: "French", city: "Belgravia", country: "UK", stars: 1, lat: 51.4993, lng: -0.157, category: "satvik", occasion: "18th birthday" },
  { name: "Hakkasan Hanway Place", cuisine: "Chinese", city: "Fitzrovia", country: "UK", stars: 1, lat: 51.5168, lng: -0.1312, category: "satvik", occasion: null },
  { name: "Midsummer House", cuisine: "Creative", city: "Cambridge", country: "UK", stars: 2, lat: 52.212, lng: 0.1218, category: "satvik", occasion: null },
  { name: "Hélène Darroze at The Connaught", cuisine: "Modern Cuisine", city: "Mayfair", country: "UK", stars: 2, lat: 51.511, lng: -0.1508, category: "satvik", occasion: null },
  { name: "Quilon", cuisine: "Indian", city: "Victoria", country: "UK", stars: 1, lat: 51.4983, lng: -0.1388, category: "satvik", occasion: null },
];

const { data, error } = await supabase.from("restaurants").insert(restaurants).select();

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
} else {
  console.log(`Seeded ${data.length} restaurants successfully!`);
}
