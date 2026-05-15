import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Gavel, TrendingUp, Eye, Trophy, Wallet, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { VehicleCard } from "@/components/vehicle-card";
import { useAuth } from "@/lib/auth-store";
import { dashboardStats, chartActivity, vehiclesByStatus, myBids, notifications } from "@/lib/dummy-data";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const toneMap: Record<string, string> = {
  primary: "from-primary/20 to-primary/5 text-primary",
  success: "from-success/20 to-success/5 text-success",
  warning: "from-warning/20 to-warning/5 text-warning",
  live: "from-live/20 to-live/5 text-live",
};

function Dashboard() {
  const { user } = useAuth();
  const mode = user?.currentMode ?? "buyer";
  const stats = dashboardStats[mode];
  const featured = mode === "buyer" ? vehiclesByStatus.live.slice(0, 4) : vehiclesByStatus.approved.slice(0, 4);

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.firstName ?? "there"} 👋`}
        subtitle={`Here's what's happening in your ${mode} account today.`}
        actions={
          <>
            <Button asChild variant="outline"><Link to="/inventory">Browse inventory</Link></Button>
            <Button asChild><Link to={mode === "seller" ? "/add-new-vehicles" : "/todays-auctions"}>{mode === "seller" ? "Add vehicle" : "Join auction"}</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden border-border/60">
            <CardContent className={cn("relative bg-gradient-to-br p-5", toneMap[s.tone])}>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-2 font-display text-3xl font-bold text-foreground">{s.value}</div>
              <div className="mt-1 flex items-center text-xs font-medium">
                <ArrowUpRight className="mr-1 h-3 w-3" />{s.delta}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display">{mode === "buyer" ? "Bid activity" : "Sales activity"}</CardTitle>
              <p className="text-sm text-muted-foreground">Last 12 months</p>
            </div>
            <Badge variant="secondary"><TrendingUp className="mr-1 h-3 w-3" /> +18%</Badge>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ bids: { label: "Bids", color: "var(--color-primary)" }, wins: { label: "Wins", color: "var(--color-success)" } }} className="h-[260px] w-full">
              <BarChart data={chartActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="bids" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="wins" fill="var(--color-success)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-display">Revenue trend</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--color-primary)" } }} className="h-[260px] w-full">
              <LineChart data={chartActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">{mode === "buyer" ? "Recent bids" : "Featured listings"}</CardTitle>
            <Button asChild size="sm" variant="ghost"><Link to={mode === "buyer" ? "/current-bids" : "/approved-vehicles"}>View all</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(mode === "buyer" ? myBids.slice(0, 5) : featured.map((v) => ({ id: v.id, vehicle: v, yourBid: v.currentBid, highestBid: v.currentBid, status: "winning" as const }))).map((b) => (
                <Link key={b.id} to="/vehicle-details/$id" params={{ id: b.vehicle.id }} className="flex items-center gap-3 rounded-xl border bg-secondary/30 p-3 transition-colors hover:bg-secondary">
                  <img src={b.vehicle.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{b.vehicle.title}</div>
                    <div className="text-xs text-muted-foreground">{b.vehicle.location} · {b.vehicle.bidsCount} bids</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-primary">{money(b.highestBid)}</div>
                    <Badge variant={b.status === "winning" || b.status === "won" ? "default" : "secondary"} className="text-[10px] uppercase">{b.status}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-display flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-lg border bg-secondary/30 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  {n.type === "bid" ? <Gavel className="h-4 w-4" /> : n.type === "auction" ? <Eye className="h-4 w-4" /> : n.type === "offer" ? <Trophy className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                </div>
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Trending now</h2>
          <Button asChild size="sm" variant="ghost"><Link to="/inventory">Browse all</Link></Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
      </div>
    </div>
  );
}
