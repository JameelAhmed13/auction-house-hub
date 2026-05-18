import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { NumberPlate, Auction } from "@/lib/dummy-data";
import { CircularBidCountdown } from "@/components/countdown-timer";
import { PlateDisplay } from "@/components/plate-display";
import { BidInput } from "@/components/bid-input";

interface PlateBidCardProps {
  plate: NumberPlate;
  auction?: Auction;
  bidIncrement?: number;
  onBidPlaced?: (amount: number) => void;
  className?: string;
}

export function PlateBidCard({
  plate,
  auction,
  bidIncrement = 5000,
  onBidPlaced,
  className,
}: PlateBidCardProps) {
  const [bidAmount, setBidAmount] = useState<number>(
    plate.currentBid + (bidIncrement || 5000)
  );
  const [showCountdown, setShowCountdown] = useState(false);
  const [bonusActive, setBonusActive] = useState(false);

  const auctionStarted = auction
    ? new Date(auction.startTime).getTime() <= Date.now()
    : true;

  const plateSold = plate.status === "sold";
  const onlineEnded = auction?.type === "online" && auction.endTime
    ? new Date(auction.endTime).getTime() <= Date.now()
    : false;
  const auctionEnded = plateSold || onlineEnded || auction?.status === "ended" || auction?.status === "completed";

  const isWinning = plate.yourBid !== undefined && plate.yourBid >= plate.currentBid;
  const isOutbid = plate.yourBid !== undefined && plate.yourBid < plate.currentBid;

  const getButtonState = () => {
    if (auctionEnded) return "ended";
    if (!auctionStarted) return "pre-bid";
    if (isOutbid) return "increase-bid";
    return "bid-now";
  };

  const buttonState = getButtonState();

  const handleBid = () => {
    if (bidAmount <= plate.currentBid) {
      toast.error(`Bid must be higher than PKR ${plate.currentBid.toLocaleString()}`);
      return;
    }
    onBidPlaced?.(bidAmount);
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

  const categoryColor =
    plate.category === "Platinum"
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : plate.category === "Gold"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : plate.category === "Motor Car"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : plate.category === "Motor Cycle"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <Card className={cn(
      "overflow-hidden border-2 transition-all hover:shadow-xl flex flex-col",
      isWinning ? "border-emerald-400" :
      isOutbid ? "border-red-400" :
      "border-border/60 hover:border-primary/40",
      className
    )}>
      {/* Top gradient strip */}
      <div className={cn(
        "h-1.5",
        plate.category === "Platinum" ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" :
        plate.category === "Gold" ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" :
        "bg-gradient-to-r from-emerald-500 to-blue-500"
      )} />

      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge className={cn("border text-xs", categoryColor)}>
            {plate.category}
          </Badge>
          <div className="flex items-center gap-1.5">
            {plate.bidCount > 0 && (
              <span className="text-[10px] text-muted-foreground">
                {plate.bidCount} bids
              </span>
            )}
            {isWinning && !auctionEnded && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[10px]">
                <Trophy className="h-2.5 w-2.5 mr-0.5" />
                Winning
              </Badge>
            )}
            {isOutbid && !auctionEnded && (
              <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100 text-[10px]">
                Outbid
              </Badge>
            )}
            {plateSold && (
              <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100 text-[10px]">
                Sold
              </Badge>
            )}
          </div>
        </div>

        {/* Number Plate (clickable to view details) */}
        <Link to="/plates/$id" params={{ id: plate.id }} className="block hover:opacity-90 transition-opacity">
          <PlateDisplay plateNumber={plate.plateNumber} size="md" />
        </Link>

        {/* Price Info - Always visible */}
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-slate-50 rounded p-1.5">
            <div className="text-[9px] text-slate-500 uppercase">Opening</div>
            <div className="text-xs font-bold">PKR {(plate.openingBid / 1000).toFixed(0)}K</div>
          </div>
          <div className="bg-emerald-50 rounded p-1.5 ring-1 ring-emerald-200">
            <div className="text-[9px] text-emerald-700 uppercase">Current</div>
            <div className="text-xs font-bold text-emerald-700">PKR {(plate.currentBid / 1000).toFixed(0)}K</div>
          </div>
          <div className={cn(
            "rounded p-1.5",
            isWinning ? "bg-emerald-100 ring-1 ring-emerald-300" :
            isOutbid ? "bg-red-50 ring-1 ring-red-200" :
            "bg-slate-50"
          )}>
            <div className={cn(
              "text-[9px] uppercase",
              isWinning ? "text-emerald-700" : isOutbid ? "text-red-700" : "text-slate-500"
            )}>
              Your Bid
            </div>
            <div className={cn(
              "text-xs font-bold",
              isWinning ? "text-emerald-700" : isOutbid ? "text-red-600" : "text-slate-600"
            )}>
              {plate.yourBid ? `PKR ${(plate.yourBid / 1000).toFixed(0)}K` : "—"}
            </div>
          </div>
        </div>

        {/* Live Countdown */}
        {showCountdown && auction?.type === "live" && (
          <div className="flex justify-center py-2">
            <CircularBidCountdown
              seconds={bonusActive ? (auction.bonusCountdownSeconds ?? 5) : (auction.countdownSeconds ?? 5)}
              isBonus={bonusActive}
              onComplete={handleCountdownComplete}
              size={80}
            />
          </div>
        )}

        {/* Bidding Section - Always show unless ended */}
        {!auctionEnded ? (
          <div className="space-y-2 mt-auto pt-3 border-t-2 border-dashed border-border/60">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Your Bid
              </label>
              <span className="text-[9px] text-muted-foreground">
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
            />
          </div>
        ) : (
          <div className="pt-3 border-t-2 mt-auto space-y-1.5">
            <Badge variant="secondary" className="w-full justify-center py-2 bg-gray-100">
              <Trophy className="h-3.5 w-3.5 mr-1.5" />
              {plateSold ? "Sold" : "Ended"}
            </Badge>
            {plate.highestBidderCode && (
              <div className="text-center text-[10px] text-muted-foreground">
                Won by <span className="font-semibold">{plate.highestBidderCode}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
