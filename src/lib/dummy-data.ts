// E-Auction Balochistan Data Models & Sample Data

/* ========== TYPES ========== */

export type VehicleCategory = "Motor Cycle" | "Motor Car" | "Commercial";
export type VanityCategory = "Gold" | "Platinum";
export type ApplicationStatus = "pending" | "approved" | "rejected" | "withdrawn";
export type AdvanceNumberStatus = "active" | "expired" | "used";
export type AuctionStatus = "upcoming" | "live" | "completed" | "ended";
export type AuctionType = "live" | "online";
export type PaymentStatus = "pending" | "paid" | "overdue" | "refunded";
export type UserRole = "admin" | "user" | "buyer" | "viewer";
export type UserStatus = "active" | "suspended" | "pending";

/* ========== USER & ROLE TYPES ========== */

export interface UserAccount {
  id: string;
  firstName: string;
  lastName: string;
  cnic: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  registeredAt: string;
  lastLogin?: string;
  totalBids?: number;
  totalWins?: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
}

export interface Member {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  cnic: string;
  email: string;
  phone: string;
  district: string;
  memberSince: string;
  totalApplications: number;
  status: UserStatus;
}

/* ========== AUCTION TYPES ========== */

export interface NumberPlate {
  id: string;
  plateNumber: string;
  category: VehicleCategory | VanityCategory;
  reservePrice: number;
  openingBid: number;
  currentBid: number;
  yourBid?: number;
  bidCount: number;
  highestBidderId?: string;
  // Anonymous code for transparency, e.g., "BID-A4F2"
  highestBidderCode?: string;
  status: "available" | "in-auction" | "sold" | "reserved";
  auctionId?: string;
  description?: string;
}

export type PlateMode = "single" | "multi";

export interface Auction {
  id: string;
  title: string;
  description: string;
  type: AuctionType;
  status: AuctionStatus;
  startTime: string; // ISO datetime
  endTime?: string; // Only for ONLINE auctions. Live auctions end when all plates are sold.
  plateIds: string[];
  bidIncrement: number; // Fixed increment range
  registrationFee: number;
  totalParticipants: number;
  createdAt: string;
  createdBy: string;
  /** Single-plate auction = 1 plate per auction; Multi = multiple plates */
  plateMode?: PlateMode;
  // For live auctions
  countdownSeconds?: number; // 5 by default
  bonusCountdownSeconds?: number; // 5 bonus
  // Live auction progression
  currentPlateIndex?: number; // Which plate is currently being auctioned
}

export interface Bid {
  id: string;
  auctionId: string;
  plateId: string;
  userId: string;
  // Anonymous bidder identifier shown publicly (e.g., "BID-A4F2")
  bidderCode: string;
  amount: number;
  timestamp: string;
  isWinning?: boolean;
}

/* ========== EXISTING TYPES (kept for backward compat) ========== */

export interface RegistrationMark {
  id: string;
  mark: string;
  category: VehicleCategory;
  reservePrice: number;
  currentBid?: number;
  bidsCount: number;
  seriesId: string;
}

export interface AuctionSeries {
  id: string;
  name: string;
  code: string;
  category: VehicleCategory;
  registrationStartDate: string;
  registrationEndDate: string;
  auctionStartDate: string;
  auctionEndDate: string;
  totalNumbers: number;
  availableNumbers: number;
  reauction?: boolean;
  description?: string;
}

export interface VanityPlate {
  id: string;
  plateNumber: string;
  category: VanityCategory;
  auctionStartDate: string;
  auctionEndDate: string;
  reservePrice: number;
  currentBid?: number;
  status: AuctionStatus;
}

export interface AdvanceNumber {
  id: string;
  registrationNumber: string;
  category: VehicleCategory;
  requestedBy: string;
  approvedDate: string;
  psid: string;
  psidExpiry: string;
  paymentStatus: PaymentStatus;
  status: AdvanceNumberStatus;
}

export interface UserApplication {
  id: string;
  applicationId: string;
  type: "standard" | "vanity" | "corporate-vanity" | "advance";
  category: VehicleCategory | VanityCategory;
  registrationNumber?: string;
  seriesName?: string;
  cnicNumber: string;
  ntnNumber?: string;
  companyName?: string;
  submittedDate: string;
  status: ApplicationStatus;
  psid?: string;
  psidExpiry?: string;
  paymentStatus: PaymentStatus;
}

export interface AuctionWinner {
  id: string;
  seriesName: string;
  seriesCode: string;
  category: VehicleCategory;
  auctionStartDate: string;
  auctionEndDate: string;
  registrationNumber: string;
  reservePrice: number;
  highestBid: number;
  winnerAin: string;
  winnerName: string;
}

export interface SeriesSchedule {
  id: string;
  seriesCode: string;
  seriesName: string;
  category: VehicleCategory;
  type: "initial" | "reauction";
  registrationStartDate: string;
  registrationEndDate: string;
  auctionStartDate: string;
  auctionEndDate: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "application" | "payment" | "auction" | "system";
  timestamp: string;
  read: boolean;
}

/* ========== USERS DATA ========== */

export const users: UserAccount[] = [
  {
    id: "u1", firstName: "Admin", lastName: "Super", cnic: "11111-1111111-1",
    email: "admin@eauction.gov.pk", phone: "+923001111111",
    role: "admin", status: "active",
    registeredAt: "2024-01-01", lastLogin: "2026-05-15",
    totalBids: 0, totalWins: 0,
  },
  {
    id: "u2", firstName: "Muhammad", lastName: "Hassan", cnic: "42301-1234567-1",
    email: "hassan@example.pk", phone: "+923001234567",
    role: "buyer", status: "active",
    registeredAt: "2025-08-15", lastLogin: "2026-05-15",
    totalBids: 23, totalWins: 5,
  },
  {
    id: "u3", firstName: "Fatima", lastName: "Khan", cnic: "42301-7654321-2",
    email: "fatima@example.pk", phone: "+923007654321",
    role: "buyer", status: "active",
    registeredAt: "2025-09-20", lastLogin: "2026-05-14",
    totalBids: 18, totalWins: 3,
  },
  {
    id: "u4", firstName: "Ahmed", lastName: "Ali", cnic: "42301-9876543-3",
    email: "ahmed@example.pk", phone: "+923009876543",
    role: "buyer", status: "active",
    registeredAt: "2025-10-10", lastLogin: "2026-05-13",
    totalBids: 12, totalWins: 2,
  },
  {
    id: "u5", firstName: "Sana", lastName: "Malik", cnic: "42301-1112222-4",
    email: "sana@example.pk", phone: "+923001112222",
    role: "buyer", status: "suspended",
    registeredAt: "2025-11-05", lastLogin: "2026-05-10",
    totalBids: 5, totalWins: 0,
  },
  {
    id: "u6", firstName: "Bilal", lastName: "Sheikh", cnic: "42301-3334444-5",
    email: "bilal@example.pk", phone: "+923003334444",
    role: "user", status: "pending",
    registeredAt: "2026-05-10",
    totalBids: 0, totalWins: 0,
  },
];

export const roles: Role[] = [
  {
    id: "r1", name: "Administrator", description: "Full system access",
    permissions: ["users.manage", "roles.manage", "auctions.manage", "members.manage", "reports.view"],
    userCount: 1, createdAt: "2024-01-01",
  },
  {
    id: "r2", name: "Buyer", description: "Can bid on auctions and manage applications",
    permissions: ["auctions.bid", "applications.create", "applications.view"],
    userCount: 4, createdAt: "2024-01-01",
  },
  {
    id: "r3", name: "User", description: "Registered user with limited access",
    permissions: ["auctions.view", "profile.edit"],
    userCount: 1, createdAt: "2024-01-01",
  },
  {
    id: "r4", name: "Viewer", description: "Read-only access to public auctions",
    permissions: ["auctions.view"],
    userCount: 0, createdAt: "2024-01-01",
  },
];

export const members: Member[] = users
  .filter((u) => u.role === "buyer" || u.role === "user")
  .map((u) => ({
    id: `m${u.id.replace("u", "")}`,
    userId: u.id,
    firstName: u.firstName, lastName: u.lastName,
    cnic: u.cnic, email: u.email, phone: u.phone,
    district: ["Quetta", "Khuzdar", "Turbat", "Gwadar"][parseInt(u.id.slice(1)) % 4],
    memberSince: u.registeredAt,
    totalApplications: u.totalBids || 0,
    status: u.status,
  }));

/* ========== AUCTIONS & PLATES DATA ========== */

const now = new Date();
const inFuture = (mins: number) => new Date(now.getTime() + mins * 60 * 1000).toISOString();
const inPast = (mins: number) => new Date(now.getTime() - mins * 60 * 1000).toISOString();

export const numberPlates: NumberPlate[] = [
  {
    id: "p1", plateNumber: "AB 0001", category: "Platinum",
    reservePrice: 500000, openingBid: 500000, currentBid: 750000,
    yourBid: 700000, bidCount: 12,
    highestBidderCode: "BID-A4F2",
    status: "in-auction", auctionId: "a1",
  },
  {
    id: "p2", plateNumber: "AB 7777", category: "Gold",
    reservePrice: 300000, openingBid: 300000, currentBid: 425000,
    bidCount: 8, highestBidderCode: "BID-B7K1",
    status: "in-auction", auctionId: "a1",
  },
  {
    id: "p3", plateNumber: "QT 9999", category: "Platinum",
    reservePrice: 600000, openingBid: 600000, currentBid: 850000,
    yourBid: 800000, bidCount: 15,
    highestBidderCode: "BID-A4F2",
    status: "in-auction", auctionId: "a2",
  },
  {
    id: "p4", plateNumber: "AB 0786", category: "Gold",
    reservePrice: 250000, openingBid: 250000, currentBid: 350000,
    bidCount: 6, highestBidderCode: "BID-C9M3",
    status: "in-auction", auctionId: "a2",
  },
  {
    id: "p5", plateNumber: "AB 5555", category: "Gold",
    reservePrice: 200000, openingBid: 200000, currentBid: 200000,
    bidCount: 0, status: "available", auctionId: "a3",
  },
  {
    id: "p6", plateNumber: "BAL 100", category: "Motor Car",
    reservePrice: 50000, openingBid: 50000, currentBid: 67500,
    bidCount: 5, highestBidderCode: "BID-A4F2",
    status: "in-auction", auctionId: "a3",
  },
  {
    id: "p7", plateNumber: "BAL 200", category: "Motor Car",
    reservePrice: 40000, openingBid: 40000, currentBid: 40000,
    bidCount: 0, status: "available", auctionId: "a3",
  },
  {
    id: "p8", plateNumber: "BEL 010", category: "Motor Cycle",
    reservePrice: 15000, openingBid: 15000, currentBid: 22000,
    bidCount: 4, highestBidderCode: "BID-B7K1",
    status: "in-auction", auctionId: "a4",
  },
  {
    id: "p9", plateNumber: "BEL 111", category: "Motor Cycle",
    reservePrice: 25000, openingBid: 25000, currentBid: 25000,
    bidCount: 0, status: "available", auctionId: "a4",
  },
  {
    id: "p10", plateNumber: "AB 1111", category: "Platinum",
    reservePrice: 400000, openingBid: 400000, currentBid: 400000,
    bidCount: 0, status: "available",
  },
  {
    id: "p11", plateNumber: "AB 0007", category: "Gold",
    reservePrice: 350000, openingBid: 350000, currentBid: 350000,
    bidCount: 0, status: "available",
  },
  {
    id: "p12", plateNumber: "QT 0001", category: "Platinum",
    reservePrice: 550000, openingBid: 550000, currentBid: 550000,
    bidCount: 0, status: "available",
  },
  // Additional plates (p13-p32) — 20 more plates with variety
  {
    id: "p13", plateNumber: "AB 0786", category: "Platinum",
    reservePrice: 1000000, openingBid: 1000000, currentBid: 1450000,
    bidCount: 22, highestBidderCode: "BID-E2P5",
    status: "in-auction", auctionId: "sp1",
  },
  {
    id: "p14", plateNumber: "QT 0007", category: "Platinum",
    reservePrice: 750000, openingBid: 750000, currentBid: 920000,
    bidCount: 14, highestBidderCode: "BID-F3R6",
    status: "in-auction", auctionId: "sp2",
  },
  {
    id: "p15", plateNumber: "AB 9999", category: "Platinum",
    reservePrice: 850000, openingBid: 850000, currentBid: 1100000,
    bidCount: 18, highestBidderCode: "BID-A4F2",
    status: "in-auction", auctionId: "sp3",
  },
  {
    id: "p16", plateNumber: "BAL 786", category: "Gold",
    reservePrice: 200000, openingBid: 200000, currentBid: 285000,
    bidCount: 7, highestBidderCode: "BID-G7S8",
    status: "in-auction", auctionId: "sp4",
  },
  {
    id: "p17", plateNumber: "AB 0500", category: "Gold",
    reservePrice: 175000, openingBid: 175000, currentBid: 175000,
    bidCount: 0, status: "available", auctionId: "sp5",
  },
  {
    id: "p18", plateNumber: "QT 8888", category: "Gold",
    reservePrice: 250000, openingBid: 250000, currentBid: 320000,
    bidCount: 6, highestBidderCode: "BID-H1T2",
    status: "in-auction", auctionId: "a6",
  },
  {
    id: "p19", plateNumber: "BEL 999", category: "Motor Cycle",
    reservePrice: 30000, openingBid: 30000, currentBid: 45000,
    bidCount: 9, highestBidderCode: "BID-J5U7",
    status: "in-auction", auctionId: "a6",
  },
  {
    id: "p20", plateNumber: "BAL 1000", category: "Motor Car",
    reservePrice: 80000, openingBid: 80000, currentBid: 105000,
    bidCount: 5, highestBidderCode: "BID-K9V4",
    status: "in-auction", auctionId: "a7",
  },
  {
    id: "p21", plateNumber: "BAZ 786", category: "Commercial",
    reservePrice: 65000, openingBid: 65000, currentBid: 78000,
    bidCount: 3, highestBidderCode: "BID-L2W6",
    status: "in-auction", auctionId: "a7",
  },
  {
    id: "p22", plateNumber: "AB 0123", category: "Gold",
    reservePrice: 400000, openingBid: 400000, currentBid: 400000,
    bidCount: 0, status: "available", auctionId: "a7",
  },
  {
    id: "p23", plateNumber: "QT 0786", category: "Platinum",
    reservePrice: 920000, openingBid: 920000, currentBid: 920000,
    bidCount: 0, status: "available", auctionId: "sp6",
  },
  {
    id: "p24", plateNumber: "AB 0555", category: "Platinum",
    reservePrice: 880000, openingBid: 880000, currentBid: 880000,
    bidCount: 0, status: "available", auctionId: "sp7",
  },
  {
    id: "p25", plateNumber: "BAL 5050", category: "Motor Car",
    reservePrice: 45000, openingBid: 45000, currentBid: 58000,
    bidCount: 4, highestBidderCode: "BID-A4F2",
    status: "in-auction", auctionId: "a8",
  },
  {
    id: "p26", plateNumber: "BAL 7070", category: "Motor Car",
    reservePrice: 55000, openingBid: 55000, currentBid: 55000,
    bidCount: 0, status: "available", auctionId: "a8",
  },
  {
    id: "p27", plateNumber: "BEL 333", category: "Motor Cycle",
    reservePrice: 18000, openingBid: 18000, currentBid: 22500,
    bidCount: 3, highestBidderCode: "BID-M3X1",
    status: "in-auction", auctionId: "a8",
  },
  {
    id: "p28", plateNumber: "BEL 555", category: "Motor Cycle",
    reservePrice: 22000, openingBid: 22000, currentBid: 22000,
    bidCount: 0, status: "available", auctionId: "a8",
  },
  {
    id: "p29", plateNumber: "AB 0250", category: "Gold",
    reservePrice: 225000, openingBid: 225000, currentBid: 295000,
    bidCount: 8, highestBidderCode: "BID-N4Y9",
    status: "in-auction", auctionId: "sp8",
  },
  {
    id: "p30", plateNumber: "QT 6666", category: "Gold",
    reservePrice: 270000, openingBid: 270000, currentBid: 270000,
    bidCount: 0, status: "available",
  },
  {
    id: "p31", plateNumber: "AB 0009", category: "Platinum",
    reservePrice: 1200000, openingBid: 1200000, currentBid: 1200000,
    bidCount: 0, status: "available",
  },
  {
    id: "p32", plateNumber: "AB 4321", category: "Gold",
    reservePrice: 180000, openingBid: 180000, currentBid: 180000,
    bidCount: 0, status: "available",
  },
];

export const auctions: Auction[] = [
  {
    id: "a1",
    title: "Premium Platinum & Gold Auction",
    description: "Live auction for exclusive premium registration numbers",
    type: "live",
    status: "live",
    startTime: inPast(30),
    plateIds: ["p1", "p2"],
    bidIncrement: 10000,
    registrationFee: 5000,
    totalParticipants: 24,
    createdAt: "2026-05-10",
    createdBy: "u1",
    plateMode: "multi",
    countdownSeconds: 5,
    bonusCountdownSeconds: 5,
    currentPlateIndex: 0,
  },
  {
    id: "a2",
    title: "Quetta Special Series",
    description: "Online auction for Quetta special edition plates",
    type: "online",
    status: "live",
    startTime: inPast(120),
    endTime: inFuture(180),
    plateIds: ["p3", "p4"],
    bidIncrement: 5000,
    registrationFee: 3000,
    totalParticipants: 18,
    createdAt: "2026-05-12",
    createdBy: "u1",
    plateMode: "multi",
  },
  {
    id: "a3",
    title: "Motor Car Standard Auction",
    description: "Standard motor car registration series",
    type: "online",
    status: "upcoming",
    startTime: inFuture(45),
    endTime: inFuture(360),
    plateIds: ["p5", "p6", "p7"],
    bidIncrement: 2000,
    registrationFee: 1500,
    totalParticipants: 0,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "multi",
  },
  {
    id: "a4",
    title: "Motor Cycle Auction",
    description: "Motor cycle registration numbers - Live bidding",
    type: "live",
    status: "upcoming",
    startTime: inFuture(15),
    plateIds: ["p8", "p9"],
    bidIncrement: 1000,
    registrationFee: 1000,
    totalParticipants: 0,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "multi",
    countdownSeconds: 5,
    bonusCountdownSeconds: 5,
    currentPlateIndex: 0,
  },
  {
    id: "a5",
    title: "Weekend Premium Auction",
    description: "Special weekend live auction for premium plates",
    type: "live",
    status: "upcoming",
    startTime: inFuture(1440),
    plateIds: ["p10", "p11", "p12"],
    bidIncrement: 25000,
    registrationFee: 10000,
    totalParticipants: 0,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "multi",
    countdownSeconds: 5,
    bonusCountdownSeconds: 5,
    currentPlateIndex: 0,
  },
  {
    id: "a6",
    title: "Premium Gold Collection",
    description: "Mixed online auction for premium gold plates",
    type: "online",
    status: "live",
    startTime: inPast(60),
    endTime: inFuture(240),
    plateIds: ["p18", "p19"],
    bidIncrement: 3000,
    registrationFee: 2000,
    totalParticipants: 12,
    createdAt: "2026-05-13",
    createdBy: "u1",
    plateMode: "multi",
  },
  {
    id: "a7",
    title: "Commercial & Mixed Auction",
    description: "Multi-category online auction",
    type: "online",
    status: "live",
    startTime: inPast(45),
    endTime: inFuture(180),
    plateIds: ["p20", "p21", "p22"],
    bidIncrement: 2500,
    registrationFee: 1500,
    totalParticipants: 9,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "multi",
  },
  {
    id: "a8",
    title: "Daily Live Round - Standard Plates",
    description: "Live sequential auction for standard plates",
    type: "live",
    status: "upcoming",
    startTime: inFuture(30),
    plateIds: ["p25", "p26", "p27", "p28"],
    bidIncrement: 1500,
    registrationFee: 1000,
    totalParticipants: 0,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "multi",
    countdownSeconds: 5,
    bonusCountdownSeconds: 5,
    currentPlateIndex: 0,
  },

  // ============ SINGLE-PLATE AUCTIONS (Solo) ============
  {
    id: "sp1",
    title: "Solo: AB 0786 — Sacred Number",
    description: "Exclusive single-plate auction for the iconic AB 0786",
    type: "online",
    status: "live",
    startTime: inPast(180),
    endTime: inFuture(120),
    plateIds: ["p13"],
    bidIncrement: 25000,
    registrationFee: 10000,
    totalParticipants: 35,
    createdAt: "2026-05-10",
    createdBy: "u1",
    plateMode: "single",
  },
  {
    id: "sp2",
    title: "Solo: QT 0007 — Lucky Seven",
    description: "Single-plate showdown for QT 0007",
    type: "online",
    status: "live",
    startTime: inPast(90),
    endTime: inFuture(90),
    plateIds: ["p14"],
    bidIncrement: 15000,
    registrationFee: 8000,
    totalParticipants: 22,
    createdAt: "2026-05-11",
    createdBy: "u1",
    plateMode: "single",
  },
  {
    id: "sp3",
    title: "Solo Live: AB 9999 — Triple Nine",
    description: "Live single-plate auction for the lucky AB 9999",
    type: "live",
    status: "live",
    startTime: inPast(15),
    plateIds: ["p15"],
    bidIncrement: 20000,
    registrationFee: 8000,
    totalParticipants: 18,
    createdAt: "2026-05-13",
    createdBy: "u1",
    plateMode: "single",
    countdownSeconds: 8,
    bonusCountdownSeconds: 5,
    currentPlateIndex: 0,
  },
  {
    id: "sp4",
    title: "Solo: BAL 786 — Spiritual",
    description: "Single-plate online auction for the popular 786",
    type: "online",
    status: "live",
    startTime: inPast(30),
    endTime: inFuture(60),
    plateIds: ["p16"],
    bidIncrement: 5000,
    registrationFee: 2500,
    totalParticipants: 11,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "single",
  },
  {
    id: "sp5",
    title: "Solo: AB 0500 — Half-Thousand",
    description: "Single-plate online auction for AB 0500",
    type: "online",
    status: "upcoming",
    startTime: inFuture(120),
    endTime: inFuture(720),
    plateIds: ["p17"],
    bidIncrement: 5000,
    registrationFee: 2500,
    totalParticipants: 0,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "single",
  },
  {
    id: "sp6",
    title: "Solo Live: QT 0786 — Quetta Special",
    description: "Solo live bidding for QT 0786",
    type: "live",
    status: "upcoming",
    startTime: inFuture(60),
    plateIds: ["p23"],
    bidIncrement: 25000,
    registrationFee: 10000,
    totalParticipants: 0,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "single",
    countdownSeconds: 10,
    bonusCountdownSeconds: 5,
    currentPlateIndex: 0,
  },
  {
    id: "sp7",
    title: "Solo: AB 0555 — Triple Five",
    description: "Premium single-plate auction for AB 0555",
    type: "online",
    status: "upcoming",
    startTime: inFuture(720),
    endTime: inFuture(2160),
    plateIds: ["p24"],
    bidIncrement: 20000,
    registrationFee: 10000,
    totalParticipants: 0,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "single",
  },
  {
    id: "sp8",
    title: "Solo: AB 0250 — Quarter K",
    description: "Single-plate online auction for AB 0250",
    type: "online",
    status: "live",
    startTime: inPast(20),
    endTime: inFuture(150),
    plateIds: ["p29"],
    bidIncrement: 8000,
    registrationFee: 3000,
    totalParticipants: 14,
    createdAt: "2026-05-14",
    createdBy: "u1",
    plateMode: "single",
  },
];

export const bids: Bid[] = [
  { id: "b1", auctionId: "a1", plateId: "p1", userId: "u2", bidderCode: "BID-A4F2", amount: 750000, timestamp: inPast(5), isWinning: true },
  { id: "b2", auctionId: "a1", plateId: "p1", userId: "u3", bidderCode: "BID-B7K1", amount: 720000, timestamp: inPast(8) },
  { id: "b3", auctionId: "a1", plateId: "p1", userId: "u2", bidderCode: "BID-A4F2", amount: 700000, timestamp: inPast(12) },
  { id: "b4", auctionId: "a1", plateId: "p2", userId: "u3", bidderCode: "BID-B7K1", amount: 425000, timestamp: inPast(3), isWinning: true },
  { id: "b5", auctionId: "a2", plateId: "p3", userId: "u2", bidderCode: "BID-A4F2", amount: 850000, timestamp: inPast(15), isWinning: true },
  { id: "b6", auctionId: "a1", plateId: "p1", userId: "u4", bidderCode: "BID-C9M3", amount: 680000, timestamp: inPast(18) },
  { id: "b7", auctionId: "a1", plateId: "p1", userId: "u5", bidderCode: "BID-D5N7", amount: 650000, timestamp: inPast(25) },
  { id: "b8", auctionId: "a1", plateId: "p1", userId: "u3", bidderCode: "BID-B7K1", amount: 620000, timestamp: inPast(30) },
];

/* ========== EXISTING DATA ========== */

export const auctionSeries: AuctionSeries[] = [
  { id: "s1", name: "Motor Car Series", code: "BAL", category: "Motor Car",
    registrationStartDate: "2026-06-01", registrationEndDate: "2026-06-15",
    auctionStartDate: "2026-06-16", auctionEndDate: "2026-06-20",
    totalNumbers: 500, availableNumbers: 487, description: "Premium Motor Car Registration Numbers" },
  { id: "s2", name: "Motor Cycle Series", code: "BEL", category: "Motor Cycle",
    registrationStartDate: "2026-05-20", registrationEndDate: "2026-06-05",
    auctionStartDate: "2026-06-06", auctionEndDate: "2026-06-10",
    totalNumbers: 300, availableNumbers: 265, reauction: false },
  { id: "s3", name: "Commercial Vehicle Series", code: "BAZ", category: "Commercial",
    registrationStartDate: "2026-05-15", registrationEndDate: "2026-05-30",
    auctionStartDate: "2026-06-01", auctionEndDate: "2026-06-05",
    totalNumbers: 150, availableNumbers: 134 },
  { id: "s4", name: "Re-Auction Motor Car", code: "BLN", category: "Motor Car",
    registrationStartDate: "2026-06-10", registrationEndDate: "2026-06-20",
    auctionStartDate: "2026-06-21", auctionEndDate: "2026-06-25",
    totalNumbers: 80, availableNumbers: 78, reauction: true },
];

export const registrationMarks: RegistrationMark[] = [
  { id: "rm1", mark: "BAL 001", category: "Motor Car", reservePrice: 15000, bidsCount: 3, seriesId: "s1" },
  { id: "rm2", mark: "BAL 002", category: "Motor Car", reservePrice: 12000, bidsCount: 5, seriesId: "s1" },
  { id: "rm3", mark: "BAL 010", category: "Motor Car", reservePrice: 25000, currentBid: 32000, bidsCount: 8, seriesId: "s1" },
  { id: "rm4", mark: "BAL 100", category: "Motor Car", reservePrice: 50000, currentBid: 67500, bidsCount: 12, seriesId: "s1" },
  { id: "rm5", mark: "BAL 111", category: "Motor Car", reservePrice: 60000, currentBid: 85000, bidsCount: 15, seriesId: "s1" },
  { id: "rm6", mark: "BEL 001", category: "Motor Cycle", reservePrice: 5000, bidsCount: 2, seriesId: "s2" },
  { id: "rm7", mark: "BEL 010", category: "Motor Cycle", reservePrice: 8000, currentBid: 11500, bidsCount: 6, seriesId: "s2" },
  { id: "rm8", mark: "BEL 111", category: "Motor Cycle", reservePrice: 12000, currentBid: 18000, bidsCount: 10, seriesId: "s2" },
  { id: "rm9", mark: "BAZ 001", category: "Commercial", reservePrice: 20000, bidsCount: 4, seriesId: "s3" },
  { id: "rm10", mark: "BAZ 100", category: "Commercial", reservePrice: 35000, currentBid: 42000, bidsCount: 7, seriesId: "s3" },
];

export const vanityPlates: VanityPlate[] = [
  { id: "vp1", plateNumber: "AB 0001/1", category: "Platinum",
    auctionStartDate: "2026-05-20", auctionEndDate: "2026-06-05",
    reservePrice: 500000, currentBid: 750000, status: "live" },
  { id: "vp2", plateNumber: "AB 0123/2", category: "Gold",
    auctionStartDate: "2026-05-20", auctionEndDate: "2026-06-05",
    reservePrice: 250000, currentBid: 375000, status: "live" },
  { id: "vp3", plateNumber: "QT 9999/3", category: "Platinum",
    auctionStartDate: "2026-06-01", auctionEndDate: "2026-06-15",
    reservePrice: 600000, status: "upcoming" },
  { id: "vp4", plateNumber: "AB 0007/7", category: "Gold",
    auctionStartDate: "2026-06-01", auctionEndDate: "2026-06-15",
    reservePrice: 400000, status: "upcoming" },
];

export const advanceNumbers: AdvanceNumber[] = [
  { id: "an1", registrationNumber: "BAL 567", category: "Motor Car", requestedBy: "42301-1234567-1",
    approvedDate: "2026-05-10", psid: "PSID-2026-00001", psidExpiry: "2026-06-10",
    paymentStatus: "paid", status: "active" },
  { id: "an2", registrationNumber: "BEL 234", category: "Motor Cycle", requestedBy: "42301-1234567-1",
    approvedDate: "2026-05-05", psid: "PSID-2026-00002", psidExpiry: "2026-06-05",
    paymentStatus: "pending", status: "active" },
];

export const myApplications: UserApplication[] = [
  { id: "app1", applicationId: "APP-2026-00001", type: "standard", category: "Motor Car",
    registrationNumber: "BAL 789", seriesName: "Motor Car Series",
    cnicNumber: "42301-1234567-1", submittedDate: "2026-05-15", status: "approved",
    psid: "PSID-2026-00003", psidExpiry: "2026-06-15", paymentStatus: "paid" },
  { id: "app2", applicationId: "APP-2026-00002", type: "vanity", category: "Gold",
    registrationNumber: "NGC 456", cnicNumber: "42301-1234567-1",
    submittedDate: "2026-05-10", status: "pending", paymentStatus: "pending" },
  { id: "app3", applicationId: "APP-2026-00003", type: "advance", category: "Motor Cycle",
    registrationNumber: "BEL 999", cnicNumber: "42301-1234567-1",
    submittedDate: "2026-04-20", status: "approved",
    psid: "PSID-2026-00004", psidExpiry: "2026-05-20", paymentStatus: "paid" },
];

export const winners: AuctionWinner[] = [
  { id: "w1", seriesName: "Motor Car Series", seriesCode: "BAL", category: "Motor Car",
    auctionStartDate: "2026-04-01", auctionEndDate: "2026-04-10",
    registrationNumber: "BAL 234", reservePrice: 25000, highestBid: 45000,
    winnerAin: "BAL-2026***7890-001", winnerName: "Muhammad Hassan" },
  { id: "w2", seriesName: "Motor Cycle Series", seriesCode: "BEL", category: "Motor Cycle",
    auctionStartDate: "2026-04-01", auctionEndDate: "2026-04-05",
    registrationNumber: "BEL 567", reservePrice: 8000, highestBid: 15000,
    winnerAin: "BEL-2026***4321-002", winnerName: "Fatima Khan" },
  { id: "w3", seriesName: "Re-Auction Motor Car", seriesCode: "BLN", category: "Motor Car",
    auctionStartDate: "2026-05-01", auctionEndDate: "2026-05-05",
    registrationNumber: "BLN 100", reservePrice: 30000, highestBid: 52000,
    winnerAin: "BLN-2026***1234-003", winnerName: "Ahmed Ali" },
];

export const schedules: SeriesSchedule[] = [
  { id: "sch1", seriesCode: "BAL", seriesName: "Motor Car Series", category: "Motor Car",
    type: "initial", registrationStartDate: "2026-06-01", registrationEndDate: "2026-06-15",
    auctionStartDate: "2026-06-16", auctionEndDate: "2026-06-20" },
  { id: "sch2", seriesCode: "BEL", seriesName: "Motor Cycle Series", category: "Motor Cycle",
    type: "initial", registrationStartDate: "2026-05-20", registrationEndDate: "2026-06-05",
    auctionStartDate: "2026-06-06", auctionEndDate: "2026-06-10" },
  { id: "sch3", seriesCode: "BAZ", seriesName: "Commercial Vehicle Series", category: "Commercial",
    type: "initial", registrationStartDate: "2026-05-15", registrationEndDate: "2026-05-30",
    auctionStartDate: "2026-06-01", auctionEndDate: "2026-06-05" },
  { id: "sch4", seriesCode: "BLN", seriesName: "Re-Auction Motor Car", category: "Motor Car",
    type: "reauction", registrationStartDate: "2026-06-10", registrationEndDate: "2026-06-20",
    auctionStartDate: "2026-06-21", auctionEndDate: "2026-06-25" },
];

export const notifications: AppNotification[] = [
  { id: "n1", title: "Application Approved",
    message: "Your application for BAL 789 has been approved. Please complete payment.",
    type: "application", timestamp: "2026-05-15T10:30:00Z", read: false },
  { id: "n2", title: "Payment Reminder",
    message: "Payment for PSID-2026-00001 is due by 2026-06-10.",
    type: "payment", timestamp: "2026-05-14T09:00:00Z", read: false },
  { id: "n3", title: "Auction Started",
    message: "The Motor Car Series auction has started. You can now place bids.",
    type: "auction", timestamp: "2026-05-13T08:00:00Z", read: true },
];

/* ========== UTILITY FUNCTIONS ========== */

export function findSeriesByCode(code: string): AuctionSeries | undefined {
  return auctionSeries.find((s) => s.code === code);
}
export function getMarksBySeriesId(seriesId: string): RegistrationMark[] {
  return registrationMarks.filter((m) => m.seriesId === seriesId);
}
export function getSeriesByCategory(category: VehicleCategory): AuctionSeries[] {
  return auctionSeries.filter((s) => s.category === category);
}
export function getVanityByCategory(category: VanityCategory): VanityPlate[] {
  return vanityPlates.filter((v) => v.category === category);
}
export function getUnreadNotifications(): AppNotification[] {
  return notifications.filter((n) => !n.read);
}
export function getAuctionById(id: string): Auction | undefined {
  return auctions.find((a) => a.id === id);
}
export function getPlatesByAuctionId(auctionId: string): NumberPlate[] {
  const auction = getAuctionById(auctionId);
  if (!auction) return [];
  return numberPlates.filter((p) => auction.plateIds.includes(p.id));
}
export function getLiveAuctions(): Auction[] {
  return auctions.filter((a) => a.status === "live");
}
export function getUpcomingAuctions(): Auction[] {
  return auctions.filter((a) => a.status === "upcoming");
}
/** All single-plate (1 plate per auction) auctions */
export function getSinglePlateAuctions(): Auction[] {
  return auctions.filter((a) => a.plateMode === "single" || a.plateIds.length === 1);
}
/** All multi-plate (2+ plates per auction) auctions */
export function getMultiPlateAuctions(): Auction[] {
  return auctions.filter((a) => a.plateMode === "multi" || (a.plateMode === undefined && a.plateIds.length > 1));
}
/** Detect whether an auction is a single-plate auction */
export function isSinglePlateAuction(auction: Auction): boolean {
  if (auction.plateMode === "single") return true;
  if (auction.plateMode === "multi") return false;
  return auction.plateIds.length === 1;
}
export function getAvailablePlates(): NumberPlate[] {
  return numberPlates.filter((p) => p.status === "available" || p.status === "in-auction");
}
export function getBidsForPlate(plateId: string): Bid[] {
  return bids.filter((b) => b.plateId === plateId).sort((a, b) => b.amount - a.amount);
}

/**
 * Live auction logic helpers
 */

// Check if a live auction has all plates sold (= auction is over)
export function isLiveAuctionComplete(auction: Auction): boolean {
  if (auction.type !== "live") return false;
  const platesInAuction = numberPlates.filter((p) => auction.plateIds.includes(p.id));
  return platesInAuction.length > 0 && platesInAuction.every((p) => p.status === "sold");
}

// Count sold plates in an auction
export function getSoldPlatesCount(auction: Auction): number {
  return numberPlates.filter(
    (p) => auction.plateIds.includes(p.id) && p.status === "sold"
  ).length;
}

// Get the currently active plate in a live auction
export function getCurrentLivePlate(auction: Auction): NumberPlate | undefined {
  if (auction.type !== "live") return undefined;
  // Find the first plate that's still in-auction (not sold)
  const idx = auction.currentPlateIndex ?? 0;
  for (let i = idx; i < auction.plateIds.length; i++) {
    const plate = numberPlates.find((p) => p.id === auction.plateIds[i]);
    if (plate && plate.status !== "sold") return plate;
  }
  return undefined;
}

// Effective auction status (live auctions become "ended" when all plates sold)
export function getEffectiveAuctionStatus(auction: Auction): AuctionStatus {
  if (auction.type === "live" && isLiveAuctionComplete(auction)) {
    return "ended";
  }
  if (auction.type === "online" && auction.endTime) {
    if (new Date(auction.endTime).getTime() <= Date.now()) {
      return "ended";
    }
  }
  return auction.status;
}
