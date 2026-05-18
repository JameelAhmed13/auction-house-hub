import { createFileRoute, useParams, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Heart, ChevronLeft, ChevronRight, Info, Copy,
  Plus, Minus, Gavel, TrendingUp, Trophy, Clock, Eye, Activity,
  Hash, Wifi, Globe, AlertCircle, Share2, CheckCircle2, Tag, Crown,
} from "lucide-react";
import {
  numberPlates, getAuctionById, getBidsForPlate,
} from "@/lib/dummy-data";
import { PlateDisplay } from "@/components/plate-display";
import { CountdownTimer, CircularBidCountdown } from "@/components/countdown-timer";
import { BidInput } from "@/components/bid-input";
import { useAuth } from "@/lib/auth-store";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plates/$id")({ component: PlateDetailPage });

function PlateDetailPage() {
  const { id } = useParams({ from: "/plates/$id" });
  const navigate = useNavigate();
  const plate = numberPlates.find((p) => p.id === id);
  const auction = plate?.auctionId ? getAuctionById(plate.auctionId) : null;
  const bids = plate ? getBidsForPlate(plate.id) : [];
  const { isAuthed } = useAuth();

  const [bidAmount, setBidAmount] = useState<number>(
    plate ? plate.currentBid + (auction?.bidIncrement || 5000) : 0
  );
  const [watchlisted, setWatchlisted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [bonusActive, setBonusActive] = useState(false);

  const plateIndex = numberPlates.findIndex((p) => p.id === id);
  const totalPlates = numberPlates.length;
  const prevPlate = plateIndex > 0 ? numberPlates[plateIndex - 1] : null;
  const nextPlate = plateIndex < totalPlates - 1 ? numberPlates[plateIndex + 1] : null;

  if (!plate) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Card>
          <CardContent className="p-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Plate Not Found</h2>
            <Button asChild>
              <Link to="/inventory">Browse Inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const auctionStarted = auction
    ? new Date(auction.startTime).getTime() <= Date.now()
    : true;
  const plateSold = plate.status === "sold";
  const onlineEnded = auction?.type === "online" && auction.endTime
    ? new Date(auction.endTime).getTime() <= Date.now()
    : false;
  const auctionEnded = plateSold || onlineEnded;

  const isWinning = plate.yourBid !== undefined && plate.yourBid >= plate.currentBid;
  const isOutbid = plate.yourBid !== undefined && plate.yourBid < plate.currentBid;
  const bidIncrement = auction?.bidIncrement || 5000;

  const handleBid = () => {
    if (bidAmount <= plate.currentBid) {
      toast.error(`Bid must be higher than PKR ${plate.currentBid.toLocaleString()}`);
      return;
    }
    toast.success(`Bid placed: PKR ${bidAmount.toLocaleString()}`);
    if (auction?.type === "live") setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    if (!bonusActive) {
      setBonusActive(true);
    } else {
      setShowCountdown(false);
      setBonusActive(false);
      toast.success("You won this number plate!", { duration: 5000 });
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(plate.id);
    toast.success("Plate ID copied");
  };

  const buttonState = auctionEnded ? "ended" : !auctionStarted ? "pre-bid" : isOutbid ? "increase-bid" : "bid-now";

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Navigation Bar */}
      <div className="bg-background border-b sticky top-16 z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to results
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant={watchlisted ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setWatchlisted(!watchlisted);
                toast.success(watchlisted ? "Removed from watchlist" : "Added to watchlist");
              }}
              className="gap-1.5"
            >
              <Heart className={cn("h-4 w-4", watchlisted && "fill-current")} />
              <span className="hidden sm:inline">Watchlist</span>
            </Button>

            <div className="flex items-center gap-1 text-sm">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => prevPlate && navigate({ to: "/plates/$id", params: { id: prevPlate.id } })}
                disabled={!prevPlate}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-muted-foreground px-2">
                <span className="font-semibold text-foreground">{plateIndex + 1}</span> of {totalPlates}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => nextPlate && navigate({ to: "/plates/$id", params: { id: nextPlate.id } })}
                disabled={!nextPlate}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title Bar */}
      <div className="bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Number Plate: <span className="font-mono text-primary">{plate.plateNumber}</span>
          </h1>
          <div className="flex items-center gap-3 flex-wrap mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Hash className="h-3.5 w-3.5" />
              ID: <button onClick={copyId} className="font-mono hover:text-foreground inline-flex items-center gap-1">
                {plate.id}
                <Copy className="h-3 w-3" />
              </button>
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span>Category: <span className="font-semibold text-foreground">{plate.category}</span></span>
            <span className="text-muted-foreground/50">•</span>
            <span>Status: <span className="font-semibold text-foreground capitalize">{plate.status}</span></span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 space-y-6">

        {/* TOP: Plate + Bidding Side by Side */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* LEFT: Plate Display (3 cols) */}
          <Card className="lg:col-span-3 overflow-hidden">
            <CardContent className="p-6 bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:to-slate-800 relative h-full flex flex-col">
              {/* Floating actions */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                  onClick={() => setWatchlisted(!watchlisted)}
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-colors shadow-md",
                    watchlisted
                      ? "bg-red-500 text-white"
                      : "bg-white/90 backdrop-blur text-slate-600 hover:text-red-500"
                  )}
                >
                  <Heart className={cn("h-5 w-5", watchlisted && "fill-current")} />
                </button>
                <button
                  onClick={() => navigator.share?.({ title: plate.plateNumber, url: window.location.href }) || (navigator.clipboard.writeText(window.location.href), toast.success("Link copied"))}
                  className="h-10 w-10 rounded-full flex items-center justify-center bg-white/90 backdrop-blur text-slate-600 hover:text-primary transition-colors shadow-md"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className={cn(
                  "border shadow-md text-sm py-1.5 px-3",
                  plate.category === "Platinum"
                    ? "bg-purple-100 text-purple-700 border-purple-200"
                    : plate.category === "Gold"
                    ? "bg-amber-100 text-amber-700 border-amber-200"
                    : "bg-blue-100 text-blue-700 border-blue-200"
                )}>
                  {plate.category === "Platinum" ? "💎" : plate.category === "Gold" ? "⭐" : "🔵"} {plate.category}
                </Badge>
              </div>

              {/* Large Plate Display */}
              <div className="flex-1 flex items-center justify-center py-10 md:py-16">
                <PlateDisplay plateNumber={plate.plateNumber} size="xl" className="shadow-2xl" />
              </div>

              {/* Status Pills */}
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="outline" className="bg-white">
                  <Eye className="h-3 w-3 mr-1" />
                  {plate.bidCount} bids
                </Badge>
                {plate.status === "in-auction" && (
                  <Badge className="bg-red-500 text-white border-0 hover:bg-red-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
                    In Auction
                  </Badge>
                )}
                {plate.status === "available" && (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                )}
                {plate.status === "sold" && (
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                    <Trophy className="h-3 w-3 mr-1" />
                    Sold
                  </Badge>
                )}
                {auction && (
                  <Badge variant="outline" className={cn(
                    "bg-white",
                    auction.type === "live" ? "border-red-300 text-red-700" : "border-blue-300 text-blue-700"
                  )}>
                    {auction.type === "live" ? <Wifi className="h-3 w-3 mr-1" /> : <Globe className="h-3 w-3 mr-1" />}
                    {auction.type} auction
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Bidding Panel (2 cols) */}
          <Card className="lg:col-span-2 border-2">
            <CardContent className="p-5 md:p-6 space-y-4">
              {/* Current Bid */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Current Bid
                </div>
                <div className="text-3xl md:text-4xl font-bold mt-1">
                  PKR {plate.currentBid.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-2 space-y-1">
                  {plate.yourBid ? (
                    isWinning ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <Trophy className="h-3.5 w-3.5" />
                        You are winning · Your bid PKR {plate.yourBid.toLocaleString()}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-600 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        You've been outbid · Your bid PKR {plate.yourBid.toLocaleString()}
                      </div>
                    )
                  ) : (
                    <div>You haven't placed a bid yet</div>
                  )}
                  {auction?.type === "online" && auction.endTime && !auctionEnded && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      Auction ends:{" "}
                      <CountdownTimer targetDate={auction.endTime} variant="inline" className="ml-1 font-semibold text-foreground" />
                    </div>
                  )}
                  {auction?.type === "live" && (
                    <div className="flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5" />
                      Live auction · Ends when all plates sold
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5" />
                    Minimum bid: PKR {(plate.currentBid + bidIncrement).toLocaleString()}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Live Countdown */}
              {showCountdown && auction?.type === "live" && (
                <div className="flex justify-center py-2">
                  <CircularBidCountdown
                    seconds={bonusActive ? (auction.bonusCountdownSeconds ?? 5) : (auction.countdownSeconds ?? 5)}
                    isBonus={bonusActive}
                    onComplete={handleCountdownComplete}
                    size={100}
                  />
                </div>
              )}

              {/* Bidding UI */}
              {!isAuthed ? (
                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/login">Sign in to Bid</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Create an account to participate in auctions
                  </p>
                </div>
              ) : auctionEnded ? (
                <div className="space-y-2">
                  <Button disabled className="w-full" size="lg">
                    <Trophy className="h-4 w-4 mr-2" />
                    Auction Ended
                  </Button>
                  {plate.highestBidderCode && (
                    <p className="text-xs text-center text-muted-foreground">
                      Won by <span className="font-semibold text-foreground">{plate.highestBidderCode}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                      Your Bid
                    </span>
                    <span className="text-muted-foreground">
                      +PKR {bidIncrement.toLocaleString()}
                    </span>
                  </div>

                  <BidInput
                    value={bidAmount}
                    onChange={setBidAmount}
                    onBid={handleBid}
                    increment={bidIncrement}
                    minBid={plate.currentBid + bidIncrement}
                    currentBid={plate.currentBid}
                    buttonState={buttonState as any}
                    size="lg"
                  />

                  {auction && auction.status === "live" && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/join-auction/$id" params={{ id: auction.id }}>
                        <Activity className="h-3.5 w-3.5 mr-1.5" />
                        Open Live Bidding Room
                      </Link>
                    </Button>
                  )}
                </div>
              )}

              <Separator />

              {/* Quick stats */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Opening bid</span>
                  <span className="font-semibold">PKR {plate.openingBid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reserve price</span>
                  <span className="font-semibold">PKR {plate.reservePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total bids</span>
                  <span className="font-semibold">{plate.bidCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eligibility</span>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px]">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 mr-1" />
                    Can bid
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center bg-muted/50 p-2.5 rounded">
                All bids are legally binding and all sales are final.{" "}
                <Link to="/how-to-auction" className="text-primary hover:underline font-medium">
                  Learn more
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BOTTOM: Plate Details */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Plate Details (2 cols) */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Plate Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                <DetailRow
                  label="Plate Number"
                  value={<span className="font-mono font-bold text-primary">{plate.plateNumber}</span>}
                  hasInfo
                />
                <DetailRow label="Plate ID" value={<span className="font-mono">{plate.id}</span>} />
                <DetailRow label="Category" value={plate.category} />
                <DetailRow
                  label="Status"
                  value={
                    <Badge variant="outline" className="capitalize text-xs">{plate.status}</Badge>
                  }
                />
                <DetailRow label="Reserve Price" value={`PKR ${plate.reservePrice.toLocaleString()}`} />
                <DetailRow label="Opening Bid" value={`PKR ${plate.openingBid.toLocaleString()}`} />
                <DetailRow label="Current Bid" value={`PKR ${plate.currentBid.toLocaleString()}`} />
                <DetailRow label="Total Bids" value={plate.bidCount.toString()} />
                {plate.highestBidderCode && (
                  <DetailRow label="Top Bidder" value={plate.highestBidderCode} />
                )}
                <DetailRow label="Region" value="Balochistan" />
                <DetailRow label="City" value="Quetta" />
                <DetailRow label="Vehicle Type" value={
                  plate.category === "Motor Car" ? "4-Wheeler" :
                  plate.category === "Motor Cycle" ? "2-Wheeler" :
                  plate.category === "Commercial" ? "Commercial" :
                  "Premium Personal"
                } />
              </div>

              {plate.description && (
                <div className="mt-6 pt-6 border-t">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Description
                  </div>
                  <p className="text-sm leading-relaxed">{plate.description}</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <Tag className="h-3.5 w-3.5 mr-1.5" />
                  Order Condition Report
                </Button>
                <Button variant="outline" size="sm">
                  <Info className="h-3.5 w-3.5 mr-1.5" />
                  3rd Party Verification
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Auction Details */}
          {auction ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-primary" />
                  Auction Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <DetailRow
                  label="Type"
                  value={
                    <Badge variant="outline" className={cn(
                      "text-xs",
                      auction.type === "live"
                        ? "border-red-300 text-red-700"
                        : "border-blue-300 text-blue-700"
                    )}>
                      {auction.type === "live" ? (
                        <><Wifi className="h-3 w-3 mr-1" />Live</>
                      ) : (
                        <><Globe className="h-3 w-3 mr-1" />Online</>
                      )}
                    </Badge>
                  }
                />
                <DetailRow
                  label="Status"
                  value={
                    <Badge className={cn(
                      "capitalize text-xs",
                      auction.status === "live" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                      auction.status === "upcoming" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                      "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    )}>
                      {auction.status}
                    </Badge>
                  }
                />
                <DetailRow
                  label="Title"
                  value={
                    <Link
                      to="/auctions/$id"
                      params={{ id: auction.id }}
                      className="text-primary hover:underline font-medium text-right max-w-[180px] inline-block truncate"
                    >
                      {auction.title}
                    </Link>
                  }
                />
                <DetailRow
                  label="Start"
                  value={
                    <span className="text-xs">{new Date(auction.startTime).toLocaleString()}</span>
                  }
                />
                {auction.type === "online" && auction.endTime ? (
                  <DetailRow
                    label="End"
                    value={
                      <span className="text-xs">{new Date(auction.endTime).toLocaleString()}</span>
                    }
                  />
                ) : auction.type === "live" ? (
                  <DetailRow
                    label="End"
                    value={
                      <span className="text-xs italic text-muted-foreground">When all sold</span>
                    }
                  />
                ) : null}
                <DetailRow
                  label="Bid Increment"
                  value={`PKR ${auction.bidIncrement.toLocaleString()}`}
                  hasInfo
                />
                <DetailRow
                  label="Registration Fee"
                  value={`PKR ${auction.registrationFee.toLocaleString()}`}
                />
                <DetailRow label="Total Plates" value={auction.plateIds.length.toString()} />
                <DetailRow label="Bidders" value={auction.totalParticipants.toString()} />

                <div className="pt-4 mt-2 border-t space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/auctions/$id" params={{ id: auction.id }}>
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      View Auction
                    </Link>
                  </Button>
                  {auction.status === "live" && (
                    <Button asChild size="sm" className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                      <Link to="/join-auction/$id" params={{ id: auction.id }}>
                        <Activity className="h-3.5 w-3.5 mr-1.5" />
                        Join Live Bidding
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <Gavel className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Not part of any auction yet</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bid History */}
        {bids.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Bid History
                <Badge variant="secondary" className="ml-2">{bids.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground text-xs">
                      <th className="pb-2 font-medium">#</th>
                      <th className="pb-2 font-medium">Bidder</th>
                      <th className="pb-2 font-medium">Bid Amount</th>
                      <th className="pb-2 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bids.map((bid, idx) => (
                      <tr key={bid.id} className="border-b last:border-0">
                        <td className="py-3 text-muted-foreground">{idx + 1}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                              <Hash className="h-3 w-3" />
                            </div>
                            <span className="font-mono text-xs font-semibold">{bid.bidderCode}</span>
                          </div>
                        </td>
                        <td className="py-3 font-bold tabular-nums">
                          PKR {bid.amount.toLocaleString()}
                        </td>
                        <td className="py-3 text-right">
                          {idx === 0 ? (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                              <Crown className="h-3 w-3 mr-1" />
                              Leading
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px]">Outbid</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Similar Plates */}
        <div>
          <h2 className="text-xl font-bold mb-4">Similar Plates</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {numberPlates
              .filter((p) => p.id !== plate.id && p.category === plate.category)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  to="/plates/$id"
                  params={{ id: p.id }}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 group">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex justify-center">
                        <PlateDisplay plateNumber={p.plateNumber} size="sm" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Current</span>
                        <span className="font-bold text-primary">PKR {(p.currentBid / 1000).toFixed(0)}K</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label, value, hasInfo,
}: { label: string; value: React.ReactNode; hasInfo?: boolean }) {
  return (
    <div className="grid grid-cols-5 gap-3 py-2 items-center text-sm border-b border-border/40 last:border-0">
      <div className="col-span-2 text-muted-foreground flex items-center gap-1 text-xs">
        {label}
        {hasInfo && <Info className="h-3 w-3" />}
      </div>
      <div className="col-span-3 font-medium text-right">{value}</div>
    </div>
  );
}
