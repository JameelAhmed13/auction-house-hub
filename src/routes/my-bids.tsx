import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import {
  Gavel, Trophy, XCircle, Activity, Eye, ArrowRight, TrendingUp, TrendingDown, Clock,
} from "lucide-react";
import { bids, numberPlates, getAuctionById, myWins } from "@/lib/dummy-data";
import { useAuth } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-bids")({ component: MyBidsPage });

function MyBidsPage() {
  const { user } = useAuth();

  // Get all bids by user
  const userBids = bids.filter((b) => !user || b.userId === user.id);

  // Categorize bids
  const activeBids = userBids.filter((b) => {
    const plate = numberPlates.find((p) => p.id === b.plateId);
    return plate && plate.status === "in-auction" && b.isWinning;
  });

  const outbidBids = userBids.filter((b) => {
    const plate = numberPlates.find((p) => p.id === b.plateId);
    return plate && plate.status === "in-auction" && !b.isWinning;
  });

  const wonBids = myWins.filter((w) => !user || w.userCnic === user.cnic);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Bids"
        subtitle="Track all your bidding activity"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={Activity} label="Active Bids" value={(activeBids.length + outbidBids.length).toString()}
          color="bg-blue-100 text-blue-700"
        />
        <StatCard
          icon={TrendingUp} label="Winning" value={activeBids.length.toString()}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          icon={TrendingDown} label="Outbid" value={outbidBids.length.toString()}
          color="bg-red-100 text-red-700"
        />
        <StatCard
          icon={Trophy} label="Won" value={wonBids.length.toString()}
          color="bg-amber-100 text-amber-700"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="winning">
        <TabsList>
          <TabsTrigger value="winning">
            <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
            Winning ({activeBids.length})
          </TabsTrigger>
          <TabsTrigger value="outbid">
            <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
            Outbid ({outbidBids.length})
          </TabsTrigger>
          <TabsTrigger value="won">
            <Trophy className="h-3.5 w-3.5 mr-1.5" />
            Won ({wonBids.length})
          </TabsTrigger>
        </TabsList>

        {/* Winning bids */}
        <TabsContent value="winning" className="mt-4">
          {activeBids.length === 0 ? (
            <EmptyState
              icon={TrendingUp}
              title="No winning bids"
              description="Place bids on active auctions to see them here"
              ctaText="Browse Auctions"
              ctaLink="/auctions"
            />
          ) : (
            <div className="space-y-3">
              {activeBids.map((bid) => {
                const plate = numberPlates.find((p) => p.id === bid.plateId);
                const auction = bid.auctionId ? getAuctionById(bid.auctionId) : null;
                if (!plate) return null;
                return (
                  <BidRow
                    key={bid.id}
                    plate={plate}
                    auction={auction}
                    bidAmount={bid.amount}
                    timestamp={bid.timestamp}
                    status="winning"
                  />
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Outbid */}
        <TabsContent value="outbid" className="mt-4">
          {outbidBids.length === 0 ? (
            <EmptyState
              icon={TrendingDown}
              title="No outbid items"
              description="You're not currently outbid on any auctions"
              ctaText="Browse Auctions"
              ctaLink="/auctions"
            />
          ) : (
            <div className="space-y-3">
              {outbidBids.map((bid) => {
                const plate = numberPlates.find((p) => p.id === bid.plateId);
                const auction = bid.auctionId ? getAuctionById(bid.auctionId) : null;
                if (!plate) return null;
                return (
                  <BidRow
                    key={bid.id}
                    plate={plate}
                    auction={auction}
                    bidAmount={bid.amount}
                    timestamp={bid.timestamp}
                    status="outbid"
                  />
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Won */}
        <TabsContent value="won" className="mt-4">
          {wonBids.length === 0 ? (
            <EmptyState
              icon={Trophy}
              title="No wins yet"
              description="Keep bidding to win your dream plate"
              ctaText="Browse Auctions"
              ctaLink="/auctions"
            />
          ) : (
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">View detailed win records</h3>
                  <p className="text-sm text-muted-foreground">See all your wins with payment status and invoices</p>
                </div>
                <Button asChild>
                  <Link to="/my-wins">
                    Go to My Wins
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BidRow({
  plate, auction, bidAmount, timestamp, status,
}: {
  plate: any; auction: any; bidAmount: number; timestamp: string;
  status: "winning" | "outbid";
}) {
  const isWinning = status === "winning";
  return (
    <Card className={cn(
      "border-2 transition-all hover:shadow-md",
      isWinning ? "border-emerald-300" : "border-red-300"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          <PlateDisplay plateNumber={plate.plateNumber} size="sm" className="shrink-0 w-32" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="font-bold">{plate.plateNumber}</h4>
              <Badge variant="outline" className="text-xs">{plate.category}</Badge>
              {isWinning ? (
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">
                  <TrendingUp className="h-2.5 w-2.5 mr-1" />
                  Winning
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                  <TrendingDown className="h-2.5 w-2.5 mr-1" />
                  Outbid
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{auction?.title || "Unknown Auction"}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Bid placed {new Date(timestamp).toLocaleString()}</span>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Your Bid</div>
            <div className={cn("text-lg font-bold", isWinning ? "text-emerald-600" : "text-red-600")}>
              PKR {bidAmount.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Current: <span className="font-semibold">PKR {plate.currentBid.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <Button asChild size="sm" variant={isWinning ? "outline" : "default"}>
              <Link to="/plates/$id" params={{ id: plate.id }}>
                {isWinning ? <Eye className="h-3.5 w-3.5 mr-1.5" /> : <Gavel className="h-3.5 w-3.5 mr-1.5" />}
                {isWinning ? "View" : "Increase"}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({
  icon: Icon, title, description, ctaText, ctaLink,
}: { icon: any; title: string; description: string; ctaText: string; ctaLink: string }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Icon className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button asChild>
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon: Icon, label, value, color,
}: { icon: any; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
