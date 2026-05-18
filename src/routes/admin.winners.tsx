import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import { Trophy, Search, Download, Eye, TrendingUp, DollarSign, Award } from "lucide-react";
import { winners } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/winners")({ component: AdminWinnersPage });

function AdminWinnersPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = winners.filter((w) => {
    if (search && !`${w.registrationNumber} ${w.winnerName} ${w.seriesCode}`.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (categoryFilter !== "all" && w.category !== categoryFilter) return false;
    return true;
  });

  const totalRevenue = winners.reduce((sum, w) => sum + w.highestBid, 0);
  const avgPremium = winners.length > 0
    ? winners.reduce((s, w) => s + ((w.highestBid - w.reservePrice) / w.reservePrice * 100), 0) / winners.length
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auction Winners"
        subtitle="View and manage all auction winning records"
        actions={
          <Button variant="outline" onClick={() => toast.success("Exporting winners list...")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">{winners.length}</div>
              <div className="text-xs text-muted-foreground">Total Winners</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">PKR {(totalRevenue / 1000).toFixed(0)}K</div>
              <div className="text-xs text-muted-foreground">Total Revenue</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">+{avgPremium.toFixed(0)}%</div>
              <div className="text-xs text-muted-foreground">Avg Premium</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                PKR {winners.length > 0 ? (Math.max(...winners.map((w) => w.highestBid)) / 1000).toFixed(0) : 0}K
              </div>
              <div className="text-xs text-muted-foreground">Highest Bid</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by plate, winner name, or series..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Motor Car">Motor Car</SelectItem>
                <SelectItem value="Motor Cycle">Motor Cycle</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Winners Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plate</TableHead>
                  <TableHead>Series</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Reserve</TableHead>
                  <TableHead>Winning Bid</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Winner AIN</TableHead>
                  <TableHead>Winner Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((w) => {
                  const premium = ((w.highestBid - w.reservePrice) / w.reservePrice * 100);
                  return (
                    <TableRow key={w.id}>
                      <TableCell>
                        <PlateDisplay plateNumber={w.registrationNumber} size="xs" className="w-24" />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{w.seriesCode}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{w.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">PKR {w.reservePrice.toLocaleString()}</TableCell>
                      <TableCell className="font-bold text-emerald-600">
                        PKR {w.highestBid.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          +{premium.toFixed(0)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{w.winnerAin}</TableCell>
                      <TableCell className="text-sm">{w.winnerName}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{w.auctionEndDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
              No winners found matching your filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
