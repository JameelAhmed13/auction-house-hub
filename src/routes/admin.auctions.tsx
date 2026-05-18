import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/page-header";
import {
  Plus, Wifi, Globe, Calendar, Gavel, Users, Hash, Edit, Trash2, Eye, Activity,
} from "lucide-react";
import {
  auctions, numberPlates, getSoldPlatesCount, isLiveAuctionComplete,
} from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { PlateDisplay } from "@/components/plate-display";

export const Route = createFileRoute("/admin/auctions")({ component: AdminAuctionsPage });

function AdminAuctionsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [auctionType, setAuctionType] = useState<"live" | "online">("online");
  const [selectedPlates, setSelectedPlates] = useState<string[]>([]);

  const togglePlate = (id: string) => {
    setSelectedPlates((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auctions Management"
        subtitle="Create and manage all auctions"
        actions={
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Auction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Auction</DialogTitle>
                <DialogDescription>Configure auction details and select number plates</DialogDescription>
              </DialogHeader>
              <div className="space-y-5 py-4">
                {/* Auction Type Toggle */}
                <div className="space-y-2">
                  <Label>Auction Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAuctionType("online")}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                        auctionType === "online" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <Globe className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Online Auction</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Time-based with start/end time. Highest bidder wins.
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuctionType("live")}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                        auctionType === "live" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <Wifi className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Live Auction</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Real-time bidding with countdown after each bid.
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <Label>Auction Title</Label>
                  <Input placeholder="e.g., Premium Platinum Auction 2026" />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea rows={3} placeholder="Describe this auction..." />
                </div>

                {/* Schedule */}
                <div className={`grid gap-3 ${auctionType === "online" ? "md:grid-cols-2" : ""}`}>
                  <div className="space-y-1.5">
                    <Label>Start Time</Label>
                    <Input type="datetime-local" />
                  </div>
                  {auctionType === "online" ? (
                    <div className="space-y-1.5">
                      <Label>End Time</Label>
                      <Input type="datetime-local" />
                      <p className="text-xs text-muted-foreground">
                        Auction will close at this time, highest bid wins each plate
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-3 flex items-start gap-2">
                      <div className="text-xs text-red-800 space-y-1">
                        <div className="font-semibold">⚡ Live auction has no fixed end time</div>
                        <p className="text-red-700">
                          The auction will end automatically when all selected number plates are sold.
                          Each plate is auctioned in sequence with countdown timers.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Bid Increment (PKR)</Label>
                    <Input type="number" placeholder="5000" defaultValue={5000} />
                    <p className="text-xs text-muted-foreground">Fixed amount that bids must increase by</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Registration Fee (PKR)</Label>
                    <Input type="number" placeholder="3000" defaultValue={3000} />
                  </div>
                </div>

                {/* Live Auction Settings */}
                {auctionType === "live" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-red-800 font-semibold text-sm">
                      <Wifi className="h-4 w-4" />
                      Live Auction Settings
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Countdown (seconds)</Label>
                        <Input type="number" defaultValue={5} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Bonus Countdown (seconds)</Label>
                        <Input type="number" defaultValue={5} />
                      </div>
                    </div>
                    <p className="text-xs text-red-700">
                      After each bid, the main countdown starts. If no new bids, a bonus countdown
                      activates. Highest bidder wins when both timers expire.
                    </p>
                  </div>
                )}

                {/* Plate Selection */}
                <div className="space-y-2">
                  <Label>
                    Select Number Plates ({selectedPlates.length} selected)
                  </Label>
                  <div className="border rounded-lg p-3 max-h-60 overflow-y-auto space-y-2">
                    {numberPlates.filter((p) => p.status === "available" || p.status === "in-auction").map((plate) => (
                      <div
                        key={plate.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted/40 rounded cursor-pointer"
                        onClick={() => togglePlate(plate.id)}
                      >
                        <Checkbox checked={selectedPlates.includes(plate.id)} />
                        <PlateDisplay plateNumber={plate.plateNumber} size="xs" className="w-24" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{plate.category}</div>
                          <div className="text-xs text-muted-foreground">
                            Reserve: PKR {plate.reservePrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={() => {
                  toast.success(`${auctionType === "live" ? "Live" : "Online"} auction created with ${selectedPlates.length} plates`);
                  setShowAddDialog(false);
                  setSelectedPlates([]);
                }}>
                  Create Auction
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center">
                <Gavel className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{auctions.length}</div>
                <div className="text-xs text-muted-foreground">Total Auctions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {auctions.filter((a) => a.status === "live").length}
                </div>
                <div className="text-xs text-muted-foreground">Live Now</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {auctions.filter((a) => a.status === "upcoming").length}
                </div>
                <div className="text-xs text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {auctions.reduce((sum, a) => sum + a.totalParticipants, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Bidders</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auctions List */}
      <Tabs defaultValue="all">
        <TabsList className="bg-background border">
          <TabsTrigger value="all">All ({auctions.length})</TabsTrigger>
          <TabsTrigger value="live">
            Live ({auctions.filter((a) => a.status === "live").length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({auctions.filter((a) => a.status === "upcoming").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {auctions.map((auction) => (
            <Card key={auction.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Type Icon */}
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
                    auction.type === "live"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {auction.type === "live" ? <Wifi className="h-6 w-6" /> : <Globe className="h-6 w-6" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold">{auction.title}</h3>
                      <Badge variant="outline" className="text-xs capitalize">{auction.type}</Badge>
                      <Badge className={
                        auction.status === "live" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                        auction.status === "upcoming" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                        "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      }>
                        {auction.status === "live" && <span className="h-1 w-1 bg-red-500 rounded-full mr-1 animate-pulse" />}
                        {auction.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{auction.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Hash className="h-3 w-3" />
                        {auction.plateIds.length} plates
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {auction.totalParticipants} bidders
                      </span>
                      <span>+PKR {auction.bidIncrement.toLocaleString()} increments</span>
                    </div>
                  </div>

                  {/* Countdown / Progress */}
                  <div className="text-right shrink-0">
                    {auction.status === "live" && auction.type === "online" && auction.endTime && (
                      <div>
                        <div className="text-xs text-red-600 font-medium mb-1">Ends in</div>
                        <CountdownTimer targetDate={auction.endTime} variant="compact" className="text-red-700" />
                      </div>
                    )}
                    {auction.status === "live" && auction.type === "live" && (
                      <div>
                        <div className="text-xs text-red-600 font-medium mb-1">Progress</div>
                        <div className="text-sm font-bold text-red-700">
                          {getSoldPlatesCount(auction)}/{auction.plateIds.length} sold
                        </div>
                      </div>
                    )}
                    {auction.status === "upcoming" && (
                      <div>
                        <div className="text-xs text-blue-600 font-medium mb-1">Starts in</div>
                        <CountdownTimer targetDate={auction.startTime} variant="compact" className="text-blue-700" />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View</DropdownMenuItem>
                      <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="live" className="space-y-3 mt-4">
          {auctions.filter((a) => a.status === "live").map((auction) => (
            <AuctionRow key={auction.id} auction={auction} />
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-3 mt-4">
          {auctions.filter((a) => a.status === "upcoming").map((auction) => (
            <AuctionRow key={auction.id} auction={auction} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AuctionRow({ auction }: { auction: typeof auctions[0] }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold">{auction.title}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {auction.plateIds.length} plates · {auction.type} auction
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{auction.status}</Badge>
            <Button variant="outline" size="sm">View</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
