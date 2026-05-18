import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wifi, Calendar, Trophy, Activity, Sparkles, Layers } from "lucide-react";
import {
  auctions, getLiveAuctions, getUpcomingAuctions, getSinglePlateAuctions, getMultiPlateAuctions,
} from "@/lib/dummy-data";
import { AuctionCard } from "@/components/auction-card";

export const Route = createFileRoute("/auctions")({ component: AuctionsPage });

function AuctionsPage() {
  const liveAuctions = getLiveAuctions();
  const upcomingAuctions = getUpcomingAuctions();
  const singlePlateAuctions = getSinglePlateAuctions();
  const multiPlateAuctions = getMultiPlateAuctions();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "linear-gradient(135deg, #ef4444, #f59e0b)" }}
        />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
        />

        <div className="relative mx-auto max-w-7xl space-y-4">
          <Badge className="bg-red-500 text-white hover:bg-red-500 border-0">
            <Activity className="h-3 w-3 mr-1" />
            {liveAuctions.length} Active Now
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Auction <span className="text-amber-400">Marketplace</span>
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Browse multi-plate group auctions or focus on solo single-plate showdowns. Bid in real-time or join scheduled auctions.
          </p>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <Wifi className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Live Now</span>
              </div>
              <div className="text-2xl font-bold">{liveAuctions.length}</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Upcoming</span>
              </div>
              <div className="text-2xl font-bold">{upcomingAuctions.length}</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Solo Plates</span>
              </div>
              <div className="text-2xl font-bold">{singlePlateAuctions.length}</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Trophy className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Total Plates</span>
              </div>
              <div className="text-2xl font-bold">
                {auctions.reduce((sum, a) => sum + a.plateIds.length, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auctions Listing */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-background border h-12 p-1 flex-wrap h-auto">
            <TabsTrigger value="all" className="px-4">
              All ({auctions.length})
            </TabsTrigger>
            <TabsTrigger value="single" className="px-4">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Solo Plates ({singlePlateAuctions.length})
            </TabsTrigger>
            <TabsTrigger value="multi" className="px-4">
              <Layers className="h-3.5 w-3.5 mr-1.5" />
              Multi-Plate ({multiPlateAuctions.length})
            </TabsTrigger>
            <TabsTrigger value="live" className="px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2 animate-pulse" />
              Live ({liveAuctions.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="px-4">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Upcoming ({upcomingAuctions.length})
            </TabsTrigger>
          </TabsList>

          {/* All Tab - Show solo first, then multi */}
          <TabsContent value="all" className="space-y-10">
            {singlePlateAuctions.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-bold">
                    <Sparkles className="h-3 w-3" />
                    SOLO PLATES
                  </div>
                  <h2 className="text-2xl font-bold">Single-Plate Auctions</h2>
                  <Badge variant="secondary">{singlePlateAuctions.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Focused auctions — one plate per auction, all attention on a single prize.
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {singlePlateAuctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </section>
            )}

            {multiPlateAuctions.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-xs font-bold">
                    <Layers className="h-3 w-3" />
                    GROUP
                  </div>
                  <h2 className="text-2xl font-bold">Multi-Plate Auctions</h2>
                  <Badge variant="secondary">{multiPlateAuctions.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Auctions containing multiple plates — bid sequentially (live) or in parallel (online).
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {multiPlateAuctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </section>
            )}
          </TabsContent>

          {/* Solo Plates Tab */}
          <TabsContent value="single">
            {singlePlateAuctions.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Single-plate auctions feature exactly <strong>one plate per auction</strong> for focused, dedicated bidding.
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {singlePlateAuctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Sparkles}
                title="No single-plate auctions"
                description="Check back later for solo plate auctions"
              />
            )}
          </TabsContent>

          {/* Multi-Plate Tab */}
          <TabsContent value="multi">
            {multiPlateAuctions.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Multi-plate auctions group multiple plates together in one session.
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {multiPlateAuctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Layers}
                title="No multi-plate auctions"
                description="Check back later for group auctions"
              />
            )}
          </TabsContent>

          {/* Live Tab */}
          <TabsContent value="live">
            {liveAuctions.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {liveAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <EmptyState icon={Wifi} title="No live auctions" description="Check back later or view upcoming auctions" />
            )}
          </TabsContent>

          {/* Upcoming Tab */}
          <TabsContent value="upcoming">
            {upcomingAuctions.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <EmptyState icon={Calendar} title="No upcoming auctions" description="Stay tuned for new auction schedules" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Icon className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
