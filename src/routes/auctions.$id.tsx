import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Wifi, Globe, Users, Hash, Clock, Trophy,
  AlertCircle, Activity, Calendar, Grid3x3, List, Gavel, Eye,
} from "lucide-react";
import {
  getAuctionById, getPlatesByAuctionId, getBidsForPlate,
  isLiveAuctionComplete, getSoldPlatesCount, NumberPlate, Auction,
} from "@/lib/dummy-data";
import { PlateBidCard } from "@/components/plate-bid-card";
import { CountdownTimer } from "@/components/countdown-timer";
import { PlateDisplay } from "@/components/plate-display";
import { useAuth } from "@/lib/auth-store";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auctions/$id")({ component: AuctionDetailPage });

function AuctionDetailPage() {
  const { id } = useParams({ from: "/auctions/$id" });
  const auction = getAuctionById(id);
  const plates = getPlatesByAuctionId(id);
  const { isAuthed } = useAuth();
  const [view, setView] = useState<"grid" | "list">("grid");

  if (!auction) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Card>
          <CardContent className="p-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Auction Not Found</h2>
            <p className="text-muted-foreground mb-6">The auction you're looking for doesn't exist.</p>
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
  const liveCompleted = isLiveType && isLiveAuctionComplete(auction);
  const soldCount = getSoldPlatesCount(auction);
  const totalPlates = auction.plateIds.length;

  const isLive = auction.status === "live" && !liveCompleted;
  const isUpcoming = auction.status === "upcoming";
  const isEnded = liveCompleted || auction.status === "ended" || auction.status === "completed";

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-10 px-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Back link */}
          <Link
            to="/auctions"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Auctions
          </Link>

          {/* Title & Status */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className={
                isLiveType
                  ? "border-red-400 text-red-300 bg-red-500/10"
                  : "border-blue-400 text-blue-300 bg-blue-500/10"
              }>
                {isLiveType ? (
                  <><Wifi className="h-3 w-3 mr-1" />Live Auction</>
                ) : (
                  <><Globe className="h-3 w-3 mr-1" />Online Auction</>
                )}
              </Badge>

              {isLive && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  LIVE NOW
                </div>
              )}

              {isUpcoming && (
                <Badge className="bg-blue-500 text-white border-0">Upcoming</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">{auction.title}</h1>
            <p className="text-slate-300 max-w-3xl">{auction.description}</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Hash} label="Plates" value={auction.plateIds.length.toString()} color="amber" />
            <StatCard icon={Users} label="Bidders" value={auction.totalParticipants.toString()} color="blue" />
            <StatCard
              icon={Activity}
              label="Bid Increment"
              value={`PKR ${(auction.bidIncrement / 1000).toFixed(0)}K`}
              color="green"
            />
            <StatCard
              icon={Trophy}
              label="Registration Fee"
              value={`PKR ${(auction.registrationFee / 1000).toFixed(0)}K`}
              color="purple"
            />
          </div>

          {/* Countdown / Progress */}
          {isUpcoming && (
            <Card className="bg-white/5 backdrop-blur border-white/10">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-blue-400 uppercase tracking-wider font-semibold mb-1">
                    Auction Starts In
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(auction.startTime).toLocaleString()}
                  </div>
                </div>
                <CountdownTimer targetDate={auction.startTime} variant="large" />
              </CardContent>
            </Card>
          )}

          {/* Online live auction: Show end countdown */}
          {isLive && isOnlineType && auction.endTime && (
            <Card className="bg-red-500/10 backdrop-blur border-red-500/30">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-red-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    Auction Ends In
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(auction.endTime).toLocaleString()}
                  </div>
                </div>
                <CountdownTimer targetDate={auction.endTime} variant="large" />
              </CardContent>
            </Card>
          )}

          {/* Live auction: Show progress (no countdown) */}
          {isLive && isLiveType && (
            <Card className="bg-red-500/10 backdrop-blur border-red-500/30">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-red-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      Live Auction in Progress
                    </div>
                    <div className="text-sm text-slate-400">
                      Auction ends when all plates are sold
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                      {soldCount} <span className="text-slate-400 text-xl">/ {totalPlates}</span>
                    </div>
                    <div className="text-xs text-red-300 uppercase tracking-wider mt-1">
                      Plates Sold
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-red-900/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                    style={{ width: `${(soldCount / totalPlates) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ended state */}
          {isEnded && (
            <Card className="bg-emerald-500/10 backdrop-blur border-emerald-500/30">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-emerald-400 uppercase tracking-wider font-semibold mb-1">
                    Auction Completed
                  </div>
                  <div className="text-sm text-slate-400">
                    {soldCount} of {totalPlates} plates have been sold
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-400">{soldCount} winners</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Auction-specific info */}
      {isLiveType && (
        <div className="bg-red-50 border-y border-red-200">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-start md:items-center gap-3 text-sm text-red-800">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5 md:mt-0" />
            <span>
              <strong>Live Auction Rules:</strong> Each plate is auctioned with a {auction.countdownSeconds ?? 5}-second
              timer after each bid. If no new bids come in, a {auction.bonusCountdownSeconds ?? 5}-second bonus countdown activates.
              Highest bidder wins when both timers expire. <strong>The auction ends when all {totalPlates} plates have been sold.</strong>
            </span>
          </div>
        </div>
      )}

      {isOnlineType && (
        <div className="bg-blue-50 border-y border-blue-200">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-start md:items-center gap-3 text-sm text-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5 md:mt-0" />
            <span>
              <strong>Online Auction Rules:</strong> Bid on any plate until the auction end time.
              The highest bidder for each plate wins when the auction closes.
            </span>
          </div>
        </div>
      )}

      {/* Plates Section */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {plates.length} Number Plate{plates.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isLive ? "Place your bids now" : isUpcoming ? "Browse and pre-bid" : "Auction ended"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isEnded && (
              <Button asChild size="lg" className={cn(
                "shadow-lg",
                isLive
                  ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              )}>
                <Link to="/join-auction/$id" params={{ id: auction.id }}>
                  <Gavel className="h-4 w-4 mr-2" />
                  {isLive ? "Join Live Auction" : "Join Auction"}
                </Link>
              </Button>
            )}

            {/* View Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("grid")}
                className="h-8 px-3"
              >
                <Grid3x3 className="h-3.5 w-3.5 mr-1" />
                Grid
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
                className="h-8 px-3"
              >
                <List className="h-3.5 w-3.5 mr-1" />
                List
              </Button>
            </div>
          </div>
        </div>

        {!isAuthed && (
          <Card className="border-amber-200 bg-amber-50 mb-6">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900">
                  Sign in to participate in bidding
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  You can view plates but need an account to place bids
                </p>
              </div>
              <Button asChild size="sm">
                <Link to="/login">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {plates.length > 0 ? (
          view === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plates.map((plate) => (
                <PlateBidCard
                  key={plate.id}
                  plate={plate}
                  auction={auction}
                  bidIncrement={auction.bidIncrement}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {plates.map((plate) => (
                <PlateListItem
                  key={plate.id}
                  plate={plate}
                  auction={auction}
                />
              ))}
            </div>
          )
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Hash className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="font-semibold mb-1">No plates in this auction</h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// List view plate item with inline bidding
function PlateListItem({ plate, auction }: { plate: NumberPlate; auction: Auction }) {
  const auctionStarted = new Date(auction.startTime).getTime() <= Date.now();
  const plateSold = plate.status === "sold";
  const isOutbid = plate.yourBid !== undefined && plate.yourBid < plate.currentBid;
  const isWinning = plate.yourBid !== undefined && plate.yourBid >= plate.currentBid;

  return (
    <Card className={cn(
      "overflow-hidden border-2 transition-all hover:shadow-md hover:border-primary/40",
      isWinning ? "border-emerald-400" :
      isOutbid ? "border-red-400" :
      "border-border/60"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          {/* Plate - clickable */}
          <Link to="/plates/$id" params={{ id: plate.id }} className="shrink-0">
            <PlateDisplay plateNumber={plate.plateNumber} size="sm" className="w-32 hover:opacity-90 transition-opacity" />
          </Link>

          {/* Info Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 items-center min-w-0">
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Category</div>
              <Badge variant="outline" className="text-xs mt-0.5">{plate.category}</Badge>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Opening</div>
              <div className="font-semibold text-sm">PKR {(plate.openingBid / 1000).toFixed(0)}K</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Current Bid</div>
              <div className="font-bold text-primary">PKR {(plate.currentBid / 1000).toFixed(0)}K</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Your Bid</div>
              <div className={cn(
                "font-bold text-sm",
                isWinning ? "text-emerald-600" :
                isOutbid ? "text-red-500" :
                "text-muted-foreground"
              )}>
                {plate.yourBid ? `PKR ${(plate.yourBid / 1000).toFixed(0)}K` : "—"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="shrink-0 flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/plates/$id" params={{ id: plate.id }}>
                <Eye className="h-3 w-3 mr-1" />
                Details
              </Link>
            </Button>
            {plateSold ? (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                <Trophy className="h-3 w-3 mr-1" />Sold
              </Badge>
            ) : !auctionStarted ? (
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/plates/$id" params={{ id: plate.id }}>
                  <Clock className="h-3 w-3 mr-1" />Pre-Bid
                </Link>
              </Button>
            ) : isOutbid ? (
              <Button asChild size="sm" className="bg-gradient-to-r from-orange-500 to-red-500">
                <Link to="/plates/$id" params={{ id: plate.id }}>
                  <Activity className="h-3 w-3 mr-1" />Increase
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-700">
                <Link to="/plates/$id" params={{ id: plate.id }}>
                  <Gavel className="h-3 w-3 mr-1" />Bid Now
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon: Icon, label, value, color,
}: { icon: any; label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    amber: "text-amber-400",
    blue: "text-blue-400",
    green: "text-emerald-400",
    purple: "text-purple-400",
  };

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
      <div className={`flex items-center gap-2 mb-1 ${colors[color]}`}>
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
