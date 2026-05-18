import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gavel, Users, Hash, ArrowRight, Wifi, Globe, Eye, CheckCircle2, Trophy, Sparkles, Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Auction, getSoldPlatesCount, isLiveAuctionComplete, isSinglePlateAuction, numberPlates } from "@/lib/dummy-data";
import { CountdownTimer } from "@/components/countdown-timer";
import { PlateDisplay } from "@/components/plate-display";

interface AuctionCardProps {
  auction: Auction;
  className?: string;
}

export function AuctionCard({ auction, className }: AuctionCardProps) {
  const isLiveType = auction.type === "live";
  const isOnlineType = auction.type === "online";
  const isSinglePlate = isSinglePlateAuction(auction);
  const singlePlate = isSinglePlate ? numberPlates.find((p) => p.id === auction.plateIds[0]) : null;

  // For live auctions, check if all plates sold
  const liveCompleted = isLiveType && isLiveAuctionComplete(auction);
  const soldCount = getSoldPlatesCount(auction);
  const totalPlates = auction.plateIds.length;
  const progress = totalPlates > 0 ? (soldCount / totalPlates) * 100 : 0;

  // Effective status
  const isLive = auction.status === "live" && !liveCompleted;
  const isUpcoming = auction.status === "upcoming";
  const isEnded = liveCompleted || auction.status === "ended" || auction.status === "completed";

  return (
    <Card className={cn(
      "group overflow-hidden border-2 transition-all hover:-translate-y-1 hover:shadow-2xl relative",
      isLive ? "border-red-200 hover:border-red-400" :
      isEnded ? "border-gray-200" :
      "border-border/60 hover:border-primary/40",
      className
    )}>
      {/* Top status bar */}
      <div className={cn(
        "h-1.5",
        isLive
          ? "bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"
          : isEnded
          ? "bg-gradient-to-r from-gray-400 to-gray-500"
          : "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"
      )} />

      <CardContent className="p-6 space-y-4">
        {/* Header: Type + Status */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className={cn(
              "border-2 font-semibold",
              isLiveType
                ? "border-red-300 text-red-700 bg-red-50"
                : "border-blue-300 text-blue-700 bg-blue-50"
            )}>
              {isLiveType ? (
                <>
                  <Wifi className="h-3 w-3 mr-1" />
                  Live
                </>
              ) : (
                <>
                  <Globe className="h-3 w-3 mr-1" />
                  Online
                </>
              )}
            </Badge>
            {isSinglePlate ? (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:opacity-90">
                <Sparkles className="h-3 w-3 mr-1" />
                Solo
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Layers className="h-3 w-3 mr-1" />
                {totalPlates} Plates
              </Badge>
            )}
          </div>

          {isLive && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              LIVE NOW
            </div>
          )}

          {isUpcoming && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Upcoming
            </Badge>
          )}

          {isEnded && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Ended
            </Badge>
          )}
        </div>

        {/* Featured Plate Preview for Solo auctions */}
        {isSinglePlate && singlePlate && (
          <div className="flex justify-center py-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <PlateDisplay plateNumber={singlePlate.plateNumber} size="md" />
          </div>
        )}

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
            {auction.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {auction.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Hash className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider">Plates</span>
            </div>
            <div className="text-lg font-bold">
              {isLiveType ? `${soldCount}/${totalPlates}` : totalPlates}
            </div>
          </div>
          <div className="text-center border-x">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Users className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider">Bidders</span>
            </div>
            <div className="text-lg font-bold">{auction.totalParticipants}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Gavel className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider">Fee</span>
            </div>
            <div className="text-sm font-bold">PKR {(auction.registrationFee / 1000).toFixed(0)}K</div>
          </div>
        </div>

        {/* Live auction: Progress bar showing sold plates */}
        {isLiveType && isLive && (
          <div className="bg-red-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-700 font-medium uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Live Progress
              </span>
              <span className="font-bold text-red-700">{soldCount} of {totalPlates} sold</span>
            </div>
            <div className="h-2 bg-red-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[10px] text-red-700 italic text-center">
              Ends when all plates are sold
            </div>
          </div>
        )}

        {/* Online auction: Countdown */}
        {isOnlineType && isLive && auction.endTime && (
          <div className="bg-red-50 rounded-lg p-3 text-center space-y-1.5">
            <div className="text-xs text-red-700 font-medium uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Auction Ends In
            </div>
            <CountdownTimer
              targetDate={auction.endTime}
              variant="large"
              className="justify-center"
            />
          </div>
        )}

        {/* Upcoming: Show start countdown */}
        {isUpcoming && (
          <div className="bg-blue-50 rounded-lg p-3 text-center space-y-1.5">
            <div className="text-xs text-blue-700 font-medium uppercase tracking-wider">
              Auction Starts In
            </div>
            <CountdownTimer
              targetDate={auction.startTime}
              variant="large"
              className="justify-center"
            />
          </div>
        )}

        {/* Ended: Show winners count */}
        {isEnded && (
          <div className="bg-gray-50 rounded-lg p-3 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {soldCount} plate{soldCount !== 1 ? "s" : ""} sold
              </span>
            </div>
            <div className="text-xs text-gray-600">Auction completed</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Always show View Plates */}
          <Button asChild variant="outline" className="font-semibold">
            <Link to="/auctions/$id" params={{ id: auction.id }}>
              {isEnded ? (
                <><Trophy className="h-4 w-4 mr-1" />Results</>
              ) : (
                <><Eye className="h-4 w-4 mr-1" />View</>
              )}
            </Link>
          </Button>

          {/* Join button for non-ended auctions */}
          {!isEnded ? (
            <Button asChild className={cn(
              "font-semibold shadow-md",
              isLive
                ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            )}>
              <Link to="/join-auction/$id" params={{ id: auction.id }}>
                <Gavel className="h-4 w-4 mr-1" />
                {isLive ? "Join Now" : "Join"}
              </Link>
            </Button>
          ) : (
            <Button asChild variant="default" className="font-semibold">
              <Link to="/auctions/$id" params={{ id: auction.id }}>
                <Trophy className="h-4 w-4 mr-1" />
                View Results
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
