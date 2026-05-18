import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Grid3x3, List, Sparkles, Hash } from "lucide-react";
import { numberPlates, getAuctionById, NumberPlate } from "@/lib/dummy-data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlateDisplay } from "@/components/plate-display";

export const Route = createFileRoute("/inventory")({ component: InventoryPage });

function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterPlates = () => {
    let filtered = numberPlates;
    if (activeTab !== "all") {
      filtered = filtered.filter((p) => p.category === activeTab);
    }
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const plates = filterPlates();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-6">
        <div className="mx-auto max-w-7xl space-y-4">
          <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400 border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Complete Collection
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Number Plate <span className="text-amber-400">Inventory</span>
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Browse our complete collection of {numberPlates.length} available vehicle registration plates from Balochistan Excise Department.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-background border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by plate number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <div className="flex gap-2 items-center">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
                className="h-11 w-11"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("list")}
                className="h-11 w-11"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="default" className="h-11">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 inline-flex flex-wrap h-auto bg-background border">
            <TabsTrigger value="all" className="px-4">All ({numberPlates.length})</TabsTrigger>
            <TabsTrigger value="Platinum" className="px-4">Platinum</TabsTrigger>
            <TabsTrigger value="Gold" className="px-4">Gold</TabsTrigger>
            <TabsTrigger value="Motor Car" className="px-4">Motor Car</TabsTrigger>
            <TabsTrigger value="Motor Cycle" className="px-4">Motor Cycle</TabsTrigger>
            <TabsTrigger value="Commercial" className="px-4">Commercial</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{plates.length}</span> plates
              </p>
            </div>

            {view === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {plates.map((plate) => (
                  <InventoryGridCard key={plate.id} plate={plate} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {plates.map((plate) => (
                  <InventoryListCard key={plate.id} plate={plate} />
                ))}
              </div>
            )}

            {plates.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Hash className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                  <h3 className="font-semibold mb-1">No plates found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function InventoryGridCard({ plate }: { plate: NumberPlate }) {
  const auction = plate.auctionId ? getAuctionById(plate.auctionId) : null;

  const statusBadge = () => {
    if (plate.status === "available") {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Available</Badge>;
    }
    if (plate.status === "in-auction" && auction?.status === "live") {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <span className="h-1 w-1 rounded-full bg-red-500 mr-1 animate-pulse" />
          Live Auction
        </Badge>
      );
    }
    if (plate.status === "in-auction") {
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Auction</Badge>;
    }
    return <Badge variant="secondary">{plate.status}</Badge>;
  };

  return (
    <Link to="/plates/$id" params={{ id: plate.id }} className="block">
      <Card className="group overflow-hidden border-2 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer h-full">
        <div className={cn(
          "h-1.5",
          plate.category === "Platinum"
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
            : plate.category === "Gold"
            ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"
            : "bg-gradient-to-r from-emerald-500 to-blue-500"
        )} />

        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">{plate.category}</Badge>
            {statusBadge()}
          </div>

          <PlateDisplay plateNumber={plate.plateNumber} size="md" />

          <div className="space-y-1 pt-2 border-t">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Reserve</span>
              <span className="font-semibold">PKR {(plate.reservePrice / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current</span>
              <span className="font-bold text-primary">PKR {(plate.currentBid / 1000).toFixed(0)}K</span>
            </div>
          </div>

          <Button size="sm" className="w-full pointer-events-none">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

function InventoryListCard({ plate }: { plate: NumberPlate }) {
  return (
    <Link to="/plates/$id" params={{ id: plate.id }} className="block">
      <Card className="hover:shadow-md hover:border-primary/40 transition-all cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            {/* Plate */}
            <PlateDisplay plateNumber={plate.plateNumber} size="sm" className="shrink-0 w-32" />

            {/* Info */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 items-center min-w-0">
              <div>
                <div className="text-xs text-muted-foreground">Category</div>
                <Badge variant="outline" className="text-xs mt-1">{plate.category}</Badge>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Reserve</div>
                <div className="font-semibold text-sm">PKR {plate.reservePrice.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Current Bid</div>
                <div className="font-bold text-primary text-sm">PKR {plate.currentBid.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Bids</div>
                <div className="font-semibold text-sm">{plate.bidCount}</div>
              </div>
            </div>

            {/* Action */}
            <Button size="sm" className="shrink-0 pointer-events-none">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
