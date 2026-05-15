// Centralized dummy data for the BK Cars Auctions portal.

export type VehicleStatus =
  | "live"
  | "upcoming"
  | "pending"
  | "approved"
  | "rejected"
  | "sold"
  | "cancelled";

export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  vin: string;
  bodyType: string;
  fuel: string;
  transmission: string;
  color: string;
  location: string;
  image: string;
  images: string[];
  reservePrice: number;
  currentBid: number;
  startingBid: number;
  bidsCount: number;
  watching: number;
  endsAt: string;
  status: VehicleStatus;
  laneId?: string;
  auctionId?: string;
  seller: { name: string; rating: number; type: "individual" | "organization" };
  damage?: string;
  features: string[];
}

const COVERS = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=70",
];

const MAKES = [
  ["Toyota", "Camry SE"],
  ["BMW", "M340i xDrive"],
  ["Mercedes", "C-Class AMG"],
  ["Audi", "A6 Quattro"],
  ["Lexus", "RX 350 F-Sport"],
  ["Porsche", "Cayenne Turbo"],
  ["Range Rover", "Sport HSE"],
  ["Tesla", "Model 3 LR"],
  ["Ford", "F-150 Raptor"],
  ["Nissan", "GT-R Premium"],
  ["Honda", "Civic Type R"],
  ["Hyundai", "Sonata Turbo"],
];

const LOCATIONS = ["Dubai", "Abu Dhabi", "Sharjah", "Riyadh", "Doha", "Muscat"];
const FUELS = ["Petrol", "Diesel", "Hybrid", "Electric"];
const TRANS = ["Automatic", "Manual", "DCT"];
const COLORS = ["Obsidian", "Pearl White", "Racing Red", "Midnight Blue", "Gunmetal", "Champagne"];
const BODY = ["Sedan", "SUV", "Coupe", "Pickup", "Hatchback"];

function rand<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}
function num(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000;
  const r = x - Math.floor(x);
  return Math.floor(min + r * (max - min));
}

function makeVehicle(i: number, status: VehicleStatus): Vehicle {
  const [make, model] = rand(MAKES, i);
  const year = 2018 + (i % 7);
  const cover = rand(COVERS, i);
  const reserve = num(i + 1, 18000, 95000);
  const current = reserve - num(i + 7, 2000, 6000);
  return {
    id: `veh-${status}-${i + 1}`,
    title: `${year} ${make} ${model}`,
    make,
    model,
    year,
    mileage: num(i + 3, 8000, 110000),
    vin: `WBA${(100000 + i * 13).toString().padStart(14, "0")}`,
    bodyType: rand(BODY, i + 2),
    fuel: rand(FUELS, i + 1),
    transmission: rand(TRANS, i),
    color: rand(COLORS, i + 4),
    location: rand(LOCATIONS, i + 5),
    image: cover,
    images: [cover, rand(COVERS, i + 1), rand(COVERS, i + 2), rand(COVERS, i + 3)],
    reservePrice: reserve,
    currentBid: current,
    startingBid: reserve - num(i + 9, 6000, 12000),
    bidsCount: num(i + 11, 3, 48),
    watching: num(i + 13, 5, 220),
    endsAt: new Date(Date.now() + (i + 1) * 1000 * 60 * 37).toISOString(),
    status,
    laneId: status === "live" ? `LANE-${(i % 4) + 1}` : undefined,
    auctionId: `auc-${(i % 6) + 1}`,
    seller: {
      name: i % 3 === 0 ? "Premium Motors LLC" : "Khalid Al Mansoori",
      rating: 4 + (i % 10) / 10,
      type: i % 3 === 0 ? "organization" : "individual",
    },
    damage: i % 4 === 0 ? "Minor cosmetic" : undefined,
    features: ["Sunroof", "Leather", "Navigation", "Apple CarPlay", "360° Camera"].slice(0, 3 + (i % 3)),
  };
}

export const vehiclesByStatus: Record<VehicleStatus, Vehicle[]> = {
  live: Array.from({ length: 12 }, (_, i) => makeVehicle(i, "live")),
  upcoming: Array.from({ length: 10 }, (_, i) => makeVehicle(i + 20, "upcoming")),
  pending: Array.from({ length: 6 }, (_, i) => makeVehicle(i + 40, "pending")),
  approved: Array.from({ length: 8 }, (_, i) => makeVehicle(i + 50, "approved")),
  rejected: Array.from({ length: 4 }, (_, i) => makeVehicle(i + 60, "rejected")),
  sold: Array.from({ length: 9 }, (_, i) => makeVehicle(i + 70, "sold")),
  cancelled: Array.from({ length: 3 }, (_, i) => makeVehicle(i + 80, "cancelled")),
};

export const allVehicles = Object.values(vehiclesByStatus).flat();

export function findVehicle(id: string) {
  return allVehicles.find((v) => v.id === id) ?? allVehicles[0];
}

// ---------- Bids ----------
export interface BidRecord {
  id: string;
  vehicle: Vehicle;
  yourBid: number;
  highestBid: number;
  status: "winning" | "outbid" | "won" | "lost";
  placedAt: string;
}
export const myBids: BidRecord[] = allVehicles.slice(0, 18).map((v, i) => ({
  id: `bid-${i + 1}`,
  vehicle: v,
  yourBid: v.currentBid - 500 + i * 120,
  highestBid: v.currentBid,
  status: (["winning", "outbid", "won", "lost"] as const)[i % 4],
  placedAt: new Date(Date.now() - i * 36e5).toISOString(),
}));

// ---------- Offers ----------
export interface OfferRecord {
  id: string;
  vehicle: Vehicle;
  amount: number;
  status: "pending" | "accepted" | "rejected" | "expired";
  expiresAt: string;
}
export const myOffers: OfferRecord[] = allVehicles.slice(5, 25).map((v, i) => ({
  id: `off-${i + 1}`,
  vehicle: v,
  amount: v.currentBid - 1500,
  status: (["pending", "accepted", "rejected", "expired"] as const)[i % 4],
  expiresAt: new Date(Date.now() + i * 86e5).toISOString(),
}));

// ---------- Invoices / Payments ----------
export interface Invoice {
  id: string;
  vehicle: Vehicle;
  amount: number;
  dueAt: string;
  status: "due" | "paid" | "pending" | "settled" | "refund";
  type: "buyer-payment" | "deposit" | "refund" | "settlement";
}
export const invoices: Invoice[] = allVehicles.slice(0, 16).map((v, i) => ({
  id: `inv-${1000 + i}`,
  vehicle: v,
  amount: v.currentBid + 1200,
  dueAt: new Date(Date.now() + i * 864e5).toISOString(),
  status: (["due", "paid", "pending", "settled", "refund"] as const)[i % 5],
  type: (["buyer-payment", "deposit", "refund", "settlement"] as const)[i % 4],
}));

// ---------- Auctions ----------
export interface Auction {
  id: string;
  name: string;
  date: string;
  status: "live" | "upcoming";
  vehiclesCount: number;
  location: string;
  cover: string;
  lanes: number;
}
export const auctions: Auction[] = Array.from({ length: 8 }, (_, i) => ({
  id: `auc-${i + 1}`,
  name: ["Dubai Premium Sale", "Sharjah Weekly", "Abu Dhabi Luxury", "Riyadh Express", "Doha Classics"][i % 5] +
    ` #${i + 1}`,
  date: new Date(Date.now() + (i - 2) * 864e5).toISOString(),
  status: i < 3 ? "live" : "upcoming",
  vehiclesCount: 40 + i * 7,
  location: rand(LOCATIONS, i),
  cover: rand(COVERS, i + 5),
  lanes: 2 + (i % 4),
}));

// ---------- Locations ----------
export interface AuctionLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  hours: string;
  cover: string;
  upcomingCount: number;
}
export const locations: AuctionLocation[] = LOCATIONS.map((c, i) => ({
  id: `loc-${i + 1}`,
  name: `${c} Auction Center`,
  city: c,
  country: i < 3 ? "United Arab Emirates" : ["Saudi Arabia", "Qatar", "Oman"][i - 3] ?? "UAE",
  address: `Plot ${100 + i * 7}, Industrial Area ${i + 1}`,
  phone: `+971 ${4 + i} ${num(i, 1000, 9999)} ${num(i + 1, 1000, 9999)}`,
  hours: "Sun – Thu · 8:00 AM – 8:00 PM",
  cover: rand(COVERS, i + 2),
  upcomingCount: 3 + i,
}));

// ---------- Deposit / Pricing Plans ----------
export interface DepositPlan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  bidLimit: number;
  features: string[];
  recommended?: boolean;
}
export const depositPlans: DepositPlan[] = [
  { id: "starter", name: "Starter", tagline: "For occasional buyers", monthly: 99, bidLimit: 5000, features: ["5 active bids", "Basic support", "1 location"] },
  { id: "pro", name: "Pro Bidder", tagline: "Most popular", monthly: 299, bidLimit: 25000, recommended: true, features: ["25 active bids", "Priority support", "All locations", "Auto-bid"] },
  { id: "elite", name: "Elite Dealer", tagline: "For volume buyers", monthly: 799, bidLimit: 100000, features: ["Unlimited bids", "Dedicated manager", "Same-day clearance", "API access"] },
];

// ---------- Notifications ----------
export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "bid" | "offer" | "auction" | "payment" | "system";
}
export const notifications: AppNotification[] = [
  { id: "n1", title: "You've been outbid", body: "2021 BMW M340i is now $54,200", time: "2m ago", read: false, type: "bid" },
  { id: "n2", title: "Auction starting soon", body: "Dubai Premium Sale starts in 30 minutes", time: "30m ago", read: false, type: "auction" },
  { id: "n3", title: "Offer accepted", body: "Your offer on 2022 Lexus RX 350 was accepted", time: "1h ago", read: false, type: "offer" },
  { id: "n4", title: "Payment due", body: "Invoice #INV-1003 is due tomorrow", time: "3h ago", read: true, type: "payment" },
  { id: "n5", title: "Welcome to BK Cars", body: "Your account has been verified", time: "Yesterday", read: true, type: "system" },
];

// ---------- Cards / Payouts ----------
export interface SavedCard {
  id: string;
  brand: "Visa" | "Mastercard" | "Amex";
  last4: string;
  exp: string;
  holder: string;
  default?: boolean;
}
export const savedCards: SavedCard[] = [
  { id: "c1", brand: "Visa", last4: "4242", exp: "08/27", holder: "Khalid Al Mansoori", default: true },
  { id: "c2", brand: "Mastercard", last4: "8810", exp: "11/26", holder: "Khalid Al Mansoori" },
];

// ---------- Dashboard stats ----------
export const dashboardStats = {
  buyer: [
    { label: "Active Bids", value: 12, delta: "+3 this week", tone: "primary" },
    { label: "Won Auctions", value: 7, delta: "+2", tone: "success" },
    { label: "Watching", value: 24, delta: "Live now", tone: "live" },
    { label: "Due Payments", value: "$4,250", delta: "1 overdue", tone: "warning" },
  ],
  seller: [
    { label: "Listed Vehicles", value: 18, delta: "+4", tone: "primary" },
    { label: "Sold This Month", value: 9, delta: "+1", tone: "success" },
    { label: "Pending Approval", value: 6, delta: "Review needed", tone: "warning" },
    { label: "Total Earnings", value: "$248,900", delta: "+12%", tone: "primary" },
  ],
};

export const chartActivity = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  bids: num(i + 1, 8, 60),
  wins: num(i + 2, 2, 22),
  revenue: num(i + 3, 8000, 65000),
}));
