import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import {
  TrendingUp, TrendingDown, Users, Gavel, Hash, DollarSign,
  Activity, BarChart3, Download, Calendar,
} from "lucide-react";
import { users, auctions, numberPlates, bids } from "@/lib/dummy-data";

export const Route = createFileRoute("/admin/analytics")({ component: AdminAnalyticsPage });

function AdminAnalyticsPage() {
  const totalRevenue = bids.reduce((sum, b) => sum + (b.isWinning ? b.amount : 0), 0);
  const activeAuctions = auctions.filter((a) => a.status === "live").length;
  const totalBids = bids.length;
  const avgBidValue = totalBids > 0 ? bids.reduce((s, b) => s + b.amount, 0) / totalBids : 0;

  const stats = [
    {
      label: "Total Revenue", value: `PKR ${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign, change: "+24.3%", isUp: true,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      label: "Active Users", value: users.filter((u) => u.status === "active").length.toString(),
      icon: Users, change: "+12.5%", isUp: true,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      label: "Total Bids", value: totalBids.toString(),
      icon: Activity, change: "+18.2%", isUp: true,
      gradient: "from-amber-500 to-orange-600",
    },
    {
      label: "Avg Bid Value", value: `PKR ${(avgBidValue / 1000).toFixed(0)}K`,
      icon: TrendingUp, change: "-2.1%", isUp: false,
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const categoryStats = ["Platinum", "Gold", "Motor Car", "Motor Cycle", "Commercial"].map((cat) => {
    const platesInCat = numberPlates.filter((p) => p.category === cat);
    const totalValue = platesInCat.reduce((s, p) => s + p.currentBid, 0);
    return { category: cat, count: platesInCat.length, value: totalValue };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Insights"
        subtitle="Real-time platform analytics and performance metrics"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </>
        }
      />

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-5 relative">
              <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10`} />
              <div className="relative">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md mb-3`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${stat.isUp ? "text-emerald-600" : "text-red-600"}`}>
                  {stat.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bids per Day */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Bidding Activity
            </CardTitle>
            <CardDescription>Last 7 days bid activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
                const value = [45, 62, 38, 78, 92, 105, 84][idx];
                const max = 110;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <div className="w-10 text-xs text-muted-foreground font-medium">{day}</div>
                    <div className="flex-1 h-7 bg-muted rounded-md overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-md flex items-center justify-end pr-2 text-xs font-bold text-primary-foreground transition-all"
                        style={{ width: `${(value / max) * 100}%` }}
                      >
                        {value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-primary" />
              Category Performance
            </CardTitle>
            <CardDescription>Plates per category with total value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryStats.map((cat) => {
                const maxCount = Math.max(...categoryStats.map((c) => c.count));
                return (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cat.category}</span>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">{cat.count} plates</span>
                        <Badge variant="secondary">PKR {(cat.value / 1000).toFixed(0)}K</Badge>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
                        style={{ width: `${(cat.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Auction Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="status">
              <TabsList>
                <TabsTrigger value="status">By Status</TabsTrigger>
                <TabsTrigger value="type">By Type</TabsTrigger>
              </TabsList>
              <TabsContent value="status" className="mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <StatusBox label="Live" count={auctions.filter((a) => a.status === "live").length} color="red" />
                  <StatusBox label="Upcoming" count={auctions.filter((a) => a.status === "upcoming").length} color="blue" />
                  <StatusBox label="Ended" count={auctions.filter((a) => a.status === "ended" || a.status === "completed").length} color="gray" />
                </div>
              </TabsContent>
              <TabsContent value="type" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <StatusBox label="Live Auctions" count={auctions.filter((a) => a.type === "live").length} color="red" />
                  <StatusBox label="Online Auctions" count={auctions.filter((a) => a.type === "online").length} color="blue" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {numberPlates
              .filter((p) => p.currentBid > p.openingBid)
              .sort((a, b) => (b.currentBid - b.openingBid) - (a.currentBid - a.openingBid))
              .slice(0, 5)
              .map((p, idx) => (
                <div key={p.id} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono font-semibold truncate">{p.plateNumber}</div>
                    <div className="text-xs text-muted-foreground">{p.bidCount} bids</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600 text-sm">+{(((p.currentBid - p.openingBid) / p.openingBid) * 100).toFixed(0)}%</div>
                    <div className="text-[10px] text-muted-foreground">PKR {(p.currentBid / 1000).toFixed(0)}K</div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusBox({ label, count, color }: { label: string; count: number; color: string }) {
  const colors: Record<string, string> = {
    red: "bg-red-50 border-red-200 text-red-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    gray: "bg-gray-50 border-gray-200 text-gray-700",
  };
  return (
    <div className={`rounded-lg border p-4 text-center ${colors[color]}`}>
      <div className="text-3xl font-bold">{count}</div>
      <div className="text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
