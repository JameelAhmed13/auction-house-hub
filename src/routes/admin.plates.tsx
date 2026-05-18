import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import {
  Plus, Hash, Search, MoreVertical, Edit, Trash2, Eye, CheckCircle2, Activity, Trophy,
} from "lucide-react";
import { numberPlates, getAuctionById } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/plates")({ component: AdminPlatesPage });

function AdminPlatesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filtered = numberPlates.filter((p) => {
    if (search && !p.plateNumber.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Number Plates"
        subtitle="Manage all registration plates in the system"
        actions={
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Plate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Number Plate</DialogTitle>
                <DialogDescription>Create a new plate available for auction</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-1.5">
                  <Label>Plate Number</Label>
                  <Input placeholder="e.g., AB 0001" />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select defaultValue="Gold">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Platinum">Platinum</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Motor Car">Motor Car</SelectItem>
                      <SelectItem value="Motor Cycle">Motor Cycle</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Reserve Price (PKR)</Label>
                    <Input type="number" placeholder="100000" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Opening Bid (PKR)</Label>
                    <Input type="number" placeholder="100000" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Description (Optional)</Label>
                  <Input placeholder="Brief description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={() => { toast.success("Plate added"); setShowAddDialog(false); }}>
                  Add Plate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Hash} label="Total Plates" value={numberPlates.length.toString()} color="bg-blue-100 text-blue-700" />
        <StatCard
          icon={CheckCircle2}
          label="Available"
          value={numberPlates.filter((p) => p.status === "available").length.toString()}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          icon={Activity}
          label="In Auction"
          value={numberPlates.filter((p) => p.status === "in-auction").length.toString()}
          color="bg-amber-100 text-amber-700"
        />
        <StatCard
          icon={Trophy}
          label="Sold"
          value={numberPlates.filter((p) => p.status === "sold").length.toString()}
          color="bg-purple-100 text-purple-700"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search plate number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Motor Car">Motor Car</SelectItem>
                <SelectItem value="Motor Cycle">Motor Cycle</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-auction">In Auction</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Plates Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plate</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Reserve</TableHead>
                  <TableHead>Current Bid</TableHead>
                  <TableHead>Bids</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Auction</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((plate) => {
                  const auction = plate.auctionId ? getAuctionById(plate.auctionId) : null;
                  return (
                    <TableRow key={plate.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <PlateDisplay plateNumber={plate.plateNumber} size="xs" className="w-24" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{plate.category}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-sm">
                        PKR {plate.reservePrice.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        PKR {plate.currentBid.toLocaleString()}
                      </TableCell>
                      <TableCell>{plate.bidCount}</TableCell>
                      <TableCell>
                        <Badge className={
                          plate.status === "available" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                          plate.status === "in-auction" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                          plate.status === "sold" ? "bg-purple-100 text-purple-700 hover:bg-purple-100" :
                          "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }>
                          {plate.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {auction ? auction.title : "—"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No plates found matching your filters
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
        <span className="font-semibold text-foreground">{numberPlates.length}</span> plates
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
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
