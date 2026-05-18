import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Wifi, Globe, Users, Hash, Trophy, AlertCircle,
  Plus, Minus, Gavel, TrendingUp, Eye, CheckCircle2,
  Clock, Zap, Crown, Activity,
} from "lucide-react";
import {
  getAuctionById, getPlatesByAuctionId, getBidsForPlate,
  isLiveAuctionComplete, getSoldPlatesCount, NumberPlate, isSinglePlateAuction,
} from "@/lib/dummy-data";
import { useAuth } from "@/lib/auth-store";
import { CountdownTimer, CircularBidCountdown } from "@/components/countdown-timer";
import { PlateDisplay } from "@/components/plate-display";
import { BidInput } from "@/components/bid-input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/join-auction/$id")({
  component: JoinAuctionPage,
});

function JoinAuctionPage() {
  const { id } = useParams({ from: "/join-auction/$id" });
  const auction = getAuctionById(id);
  const allPlates = getPlatesByAuctionId(id);
  const { isAuthed, user } = useAuth();

  // Sort plates: active (in-auction) first, then available, then sold
  const sortedPlates = [...allPlates].sort((a, b) => {
    const order = { "in-auction": 0, "available": 1, "reserved": 2, "sold": 3 };
    return (order[a.status] ?? 99) - (order[b.status] ?? 99);
  });

  // Track current active plate
  const [activePlateIdx, setActivePlateIdx] = useState(0);
  const activePlate = sortedPlates[activePlateIdx];
  const upcomingPlates = sortedPlates.filter((_, idx) => idx > activePlateIdx && sortedPlates[idx].status !== "sold");
  const soldPlates = sortedPlates.filter((p) => p.status === "sold");

  // Bid state
  const [bidAmount, setBidAmount] = useState<number>(
    activePlate ? activePlate.currentBid + (auction?.bidIncrement || 5000) : 0
  );
  const [showCountdown, setShowCountdown] = useState(false);
  const [bonusActive, setBonusActive] = useState(false);
  const [recentBids, setRecentBids] = useState<{ code: string; amount: number; time: string; isYou?: boolean }[]>([
    { code: "BID-A4F2", amount: activePlate?.currentBid || 0, time: "Just now" },
    { code: "BID-B7K1", amount: (activePlate?.currentBid || 0) - (auction?.bidIncrement || 5000), time: "12s ago" },
    { code: "BID-C9M3", amount: (activePlate?.currentBid || 0) - 2 * (auction?.bidIncrement || 5000), time: "45s ago" },
    { code: "BID-D5N7", amount: (activePlate?.currentBid || 0) - 3 * (auction?.bidIncrement || 5000), time: "1m ago" },
    { code: "BID-A4F2", amount: (activePlate?.currentBid || 0) - 4 * (auction?.bidIncrement || 5000), time: "2m ago" },
  ]);

  useEffect(() => {
    if (activePlate) {
      setBidAmount(activePlate.currentBid + (auction?.bidIncrement || 5000));
    }
  }, [activePlateIdx, activePlate, auction]);

  if (!auction) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Card>
          <CardContent className="p-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Auction Not Found</h2>
            <Button asChild>
              <Link to="/auctions">Browse Auctions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLiveType = auction.type === "live";
  const isOnlineType = auction.type === "online";
  const isUpcoming = auction.status === "upcoming";
  const isSolo = isSinglePlateAuction(auction);
  const soldCount = getSoldPlatesCount(auction);
  const totalPlates = auction.plateIds.length;

  const handleBid = () => {
    if (!activePlate) return;
    if (bidAmount <= activePlate.currentBid) {
      toast.error(`Bid must be higher than current bid`);
      return;
    }

    // Add to recent bids (anonymous - using user's bidder code)
    const yourCode = `BID-${user?.id?.slice(-4).toUpperCase() ?? "YOU0"}`;
    setRecentBids((prev) => [
      { code: yourCode, amount: bidAmount, time: "Just now", isYou: true },
      ...prev.slice(0, 4),
    ]);

    toast.success(`Bid placed: PKR ${bidAmount.toLocaleString()}`);

    // For live auctions, trigger countdown
    if (isLiveType) {
      setShowCountdown(true);
      setBonusActive(false);
    }
  };

  const handleCountdownComplete = () => {
    if (!bonusActive) {
      setBonusActive(true);
    } else {
      // Plate is won - move to next
      setShowCountdown(false);
      setBonusActive(false);
      toast.success("Plate won! Moving to next plate...", { duration: 3000 });

      // Move to next plate after a short delay
      setTimeout(() => {
        if (activePlateIdx < sortedPlates.length - 1) {
          setActivePlateIdx((idx) => idx + 1);
        }
      }, 2000);
    }
  };

  if (!activePlate) {
    return (
      <div className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-6 py-12 text-center">
          <Trophy className="h-16 w-16 mx-auto text-amber-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Auction Complete!</h2>
          <p className="text-muted-foreground mb-6">All plates have been sold.</p>
          <Button asChild>
            <Link to="/auctions/$id" params={{ id: auction.id }}>View Results</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Bar */}
      <div className="border-b bg-background sticky top-16 z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            to="/auctions/$id"
            params={{ id: auction.id }}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit Auction</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className={
              isLiveType
                ? "border-red-300 text-red-700 bg-red-50"
                : "border-blue-300 text-blue-700 bg-blue-50"
            }>
              {isLiveType ? <><Wifi className="h-3 w-3 mr-1" />Live</> : <><Globe className="h-3 w-3 mr-1" />Online</>}
            </Badge>
            <div className="hidden md:block text-sm font-semibold">{auction.title}</div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">{auction.totalParticipants}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Hash className="h-4 w-4 text-amber-600" />
              <span className="font-medium">{soldCount}/{totalPlates}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        {/* Solo Auction Banner */}
        {isSolo && (
          <div className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 shadow-md">
            <span className="text-xs font-bold uppercase tracking-widest">⭐ Solo Auction — One Plate, One Winner</span>
          </div>
        )}
        <div className={cn("grid gap-6", isSolo ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
          {/* LEFT: Active Plate */}
          <div className={cn("space-y-4", !isSolo && "lg:col-span-2")}>
            {/* Active Auction Card */}
            <Card className="overflow-hidden relative border-2">
              {/* Status badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className={
                  isLiveType
                    ? "bg-red-500 text-white hover:bg-red-500 border-0"
                    : "bg-blue-500 text-white hover:bg-blue-500 border-0"
                }>
                  <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
                  ACTIVE NOW
                </Badge>
              </div>

              <CardContent className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50 to-white">
                <div>
                  <div className="text-xs text-primary uppercase tracking-widest font-bold mb-2">
                    {isUpcoming ? "Auction Preview" : isSolo ? "The Featured Plate" : "Currently Auctioning"}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {isSolo ? auction.title : `Plate #${activePlateIdx + 1} of ${totalPlates}`}
                  </h2>
                </div>

                {/* Upcoming notice */}
                {isUpcoming && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Auction starts in:</p>
                      <div className="mt-2">
                        <CountdownTimer
                          targetDate={auction.startTime}
                          variant="large"
                        />
                      </div>
                      <p className="text-xs text-blue-700 mt-2">
                        You can place Pre-Bids now. Bids will be locked in when auction starts.
                      </p>
                    </div>
                  </div>
                )}

                {/* Large Plate Display */}
                <div className="flex justify-center py-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur-xl opacity-40 animate-pulse" />
                    <PlateDisplay
                      plateNumber={activePlate.plateNumber}
                      size="xl"
                      className="relative shadow-2xl min-w-[300px] md:min-w-[400px]"
                    />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="flex justify-center">
                  <Badge className={cn(
                    "border text-sm py-1 px-3",
                    activePlate.category === "Platinum"
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : activePlate.category === "Gold"
                      ? "bg-amber-100 text-amber-700 border-amber-200"
                      : "bg-emerald-100 text-emerald-700 border-emerald-200"
                  )}>
                    <Crown className="h-3 w-3 mr-1" />
                    {activePlate.category}
                  </Badge>
                </div>

                {/* Price Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <PriceBox
                    label="Opening Bid"
                    value={`PKR ${(activePlate.openingBid / 1000).toFixed(0)}K`}
                    color="slate"
                  />
                  <PriceBox
                    label="Current Bid"
                    value={`PKR ${(activePlate.currentBid / 1000).toFixed(0)}K`}
                    color="emerald"
                    highlight
                  />
                  <PriceBox
                    label="Your Bid"
                    value={activePlate.yourBid ? `PKR ${(activePlate.yourBid / 1000).toFixed(0)}K` : "—"}
                    color={
                      activePlate.yourBid && activePlate.yourBid >= activePlate.currentBid
                        ? "emerald" : "amber"
                    }
                  />
                </div>

                {/* Circular Countdown for Live */}
                {showCountdown && isLiveType && (
                  <div className="flex justify-center py-4 bg-gradient-to-b from-transparent via-amber-50/50 to-transparent rounded-xl">
                    <CircularBidCountdown
                      seconds={bonusActive ? (auction.bonusCountdownSeconds ?? 5) : (auction.countdownSeconds ?? 5)}
                      isBonus={bonusActive}
                      onComplete={handleCountdownComplete}
                      size={140}
                    />
                  </div>
                )}

                {/* Online Auction End Time */}
                {isOnlineType && auction.endTime && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Auction ends in</span>
                    </div>
                    <CountdownTimer
                      targetDate={auction.endTime}
                      variant="inline"
                      className="text-foreground font-bold"
                    />
                  </div>
                )}

                {/* Bid Input */}
                {!isAuthed ? (
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4 flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-amber-900">Sign in to place bids</p>
                      </div>
                      <Button asChild size="sm">
                        <Link to="/login">Sign In</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2 pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Your Bid
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Min +PKR {auction.bidIncrement.toLocaleString()}
                      </span>
                    </div>
                    <BidInput
                      value={bidAmount}
                      onChange={setBidAmount}
                      onBid={handleBid}
                      increment={auction.bidIncrement}
                      minBid={activePlate.currentBid + auction.bidIncrement}
                      currentBid={activePlate.currentBid}
                      buttonState={isUpcoming ? "pre-bid" : "bid-now"}
                      size="lg"
                      disabled={showCountdown}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Bids - Horizontal Scroll Row */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    <h3 className="font-bold text-sm">Recent Bids</h3>
                    <Badge variant="secondary" className="text-[9px] py-0 px-1.5 h-4">
                      Anonymous
                    </Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{recentBids.length} bids</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
                  {recentBids.map((bid, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "shrink-0 w-[88px] rounded-md py-1.5 px-2 text-center border transition-all",
                        idx === 0
                          ? "bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200"
                          : bid.isYou
                          ? "bg-blue-50 border-blue-200"
                          : "bg-muted/40 border-border/60"
                      )}
                    >
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        {idx === 0 && <Crown className="h-2.5 w-2.5 text-emerald-600 shrink-0" />}
                        <div className={cn(
                          "text-[9px] font-mono font-semibold truncate",
                          idx === 0 ? "text-emerald-700" : bid.isYou ? "text-blue-700" : "text-muted-foreground"
                        )}>
                          {bid.isYou ? "You" : bid.code}
                        </div>
                      </div>
                      <div className="font-bold text-xs tabular-nums leading-tight">
                        {(bid.amount / 1000).toFixed(0)}K
                      </div>
                      <div className="text-[8px] text-muted-foreground truncate">{bid.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Queue & Sold (Solo auctions show different sidebar) */}
          <div className="space-y-4">
            {isSolo ? (
              <SoloAuctionSidebar auction={auction} activePlate={activePlate} />
            ) : (
            <>
            {/* Upcoming Queue */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <h3 className="font-bold">Up Next</h3>
                  </div>
                  <Badge variant="outline">
                    {upcomingPlates.length} queued
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mb-3 leading-snug">
                  Pre-bid on queued plates. The <span className="font-semibold text-foreground">Next-up</span> plate is locked.
                </p>
                {upcomingPlates.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingPlates.map((plate, idx) => (
                      <QueuePlateItem
                        key={plate.id}
                        plate={plate}
                        position={idx + 1}
                        isNextUp={idx === 0}
                        auction={auction}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500 mb-2" />
                    No more plates in queue
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sold Plates */}
            {soldPlates.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-emerald-600" />
                      <h3 className="font-bold">Sold</h3>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                      {soldPlates.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {soldPlates.map((plate) => (
                      <SoldPlateItem key={plate.id} plate={plate} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Auction Info */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-bold mb-2">Auction Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">{auction.type} Auction</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bid Increment</span>
                    <span className="font-medium">PKR {auction.bidIncrement.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bidders Online</span>
                    <span className="font-medium text-emerald-600 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {auction.totalParticipants}
                    </span>
                  </div>
                  {isLiveType && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timer</span>
                        <span className="font-medium">{auction.countdownSeconds}s + {auction.bonusCountdownSeconds}s bonus</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sidebar for solo auctions — no queue, just stats and info */
function SoloAuctionSidebar({ auction, activePlate }: { auction: any; activePlate: NumberPlate }) {
  const isLiveType = auction.type === "live";
  return (
    <>
      {/* Solo Highlight Card */}
      <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="p-5 space-y-3 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white mx-auto">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs text-amber-700 font-bold uppercase tracking-widest">Solo Auction</div>
            <h3 className="text-lg font-bold text-foreground mt-1">One Plate, One Winner</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              This auction features <span className="font-bold text-foreground">only one plate</span>. The
              highest bidder takes it home.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Auction Info */}
      <Card>
        <CardContent className="p-5 space-y-3">
          <h3 className="font-bold mb-2">Auction Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium capitalize">{auction.type} Auction</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mode</span>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:opacity-90 text-[10px]">
                ⭐ Solo
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bid Increment</span>
              <span className="font-medium">PKR {auction.bidIncrement.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Registration Fee</span>
              <span className="font-medium">PKR {auction.registrationFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bidders Online</span>
              <span className="font-medium text-emerald-600 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {auction.totalParticipants}
              </span>
            </div>
            {isLiveType && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timer</span>
                <span className="font-medium">
                  {auction.countdownSeconds}s + {auction.bonusCountdownSeconds}s bonus
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bid Stats */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-3 text-sm">Live Stats</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/40 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{activePlate.bidCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Bids</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-emerald-700">
                +{((activePlate.currentBid - activePlate.openingBid) / 1000).toFixed(0)}K
              </div>
              <div className="text-[10px] text-emerald-700 uppercase tracking-wider">Above Open</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function PriceBox({
  label, value, color, highlight,
}: { label: string; value: string; color: string; highlight?: boolean }) {
  const colors: Record<string, string> = {
    slate: "bg-slate-50 border-slate-200",
    emerald: "bg-emerald-50 border-emerald-200",
    amber: "bg-amber-50 border-amber-200",
  };

  return (
    <div className={cn(
      "rounded-lg border p-3 text-center",
      colors[color],
      highlight && "ring-2 ring-emerald-400/40 shadow-md"
    )}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className="font-bold text-base md:text-lg text-foreground">{value}</div>
    </div>
  );
}

function QueuePlateItem({
  plate, position, isNextUp, auction,
}: {
  plate: NumberPlate;
  position: number;
  isNextUp?: boolean;
  auction: any;
}) {
  const [showInput, setShowInput] = useState(false);
  const [bidAmount, setBidAmount] = useState(plate.currentBid + (auction?.bidIncrement || 5000));

  const handleBid = () => {
    toast.success(`Pre-bid placed for ${plate.plateNumber}: PKR ${bidAmount.toLocaleString()}`);
    setShowInput(false);
  };

  return (
    <div className={cn(
      "rounded-lg border p-2.5 transition-all",
      isNextUp
        ? "bg-amber-50 border-amber-200"
        : "bg-muted/40 border-border/60 hover:border-primary/40"
    )}>
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
          isNextUp ? "bg-amber-200 text-amber-800" : "bg-blue-100 text-blue-700"
        )}>
          {position}
        </div>
        <PlateDisplay plateNumber={plate.plateNumber} size="xs" className="shrink-0 w-24" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-muted-foreground">{plate.category}</span>
            {isNextUp && (
              <Badge className="bg-amber-500 text-white text-[9px] hover:bg-amber-500 h-4 px-1.5">
                Next Up
              </Badge>
            )}
          </div>
          <div className="text-xs font-bold tabular-nums">
            PKR {(plate.currentBid / 1000).toFixed(0)}K
          </div>
        </div>
        {!isNextUp && !showInput && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-[10px] shrink-0"
            onClick={() => setShowInput(true)}
          >
            <Clock className="h-3 w-3 mr-0.5" />
            Pre-Bid
          </Button>
        )}
        {isNextUp && (
          <div className="text-[10px] text-amber-700 font-medium shrink-0">
            🔒 Locked
          </div>
        )}
      </div>
      {showInput && !isNextUp && (
        <div className="mt-2 pt-2 border-t border-border/60">
          <BidInput
            value={bidAmount}
            onChange={setBidAmount}
            onBid={handleBid}
            increment={auction?.bidIncrement || 5000}
            minBid={plate.currentBid + (auction?.bidIncrement || 5000)}
            currentBid={plate.currentBid}
            buttonState="pre-bid"
            size="default"
          />
          <button
            onClick={() => setShowInput(false)}
            className="text-[10px] text-muted-foreground hover:text-foreground mt-1.5 w-full text-center"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function SoldPlateItem({ plate }: { plate: NumberPlate }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50">
      <Trophy className="h-4 w-4 text-emerald-600 shrink-0" />
      <PlateDisplay plateNumber={plate.plateNumber} size="xs" className="shrink-0 w-24 opacity-80" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono text-muted-foreground truncate">
          {plate.highestBidderCode ?? "Winner"}
        </div>
        <div className="text-xs font-bold text-emerald-600">
          PKR {(plate.currentBid / 1000).toFixed(0)}K
        </div>
      </div>
    </div>
  );
}
