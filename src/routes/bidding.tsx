import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { AlertCircle, Gavel, Clock, Trophy, Info, ChevronRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/bidding")({ component: BiddingPage });

function BiddingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Bidding"
        subtitle="Participate in real-time vehicle registration auctions"
      />

      {/* Info Banner */}
      <Card className="border-l-4 border-l-yellow-400 bg-yellow-50/50">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
              <Info className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Bidding Not Active</h3>
              <p className="text-sm text-muted-foreground">
                You're not currently part of any active bidding session. Please complete your application and payment to participate in live auctions.
              </p>
              <div className="mt-3 flex gap-2">
                <Button asChild size="sm">
                  <Link to="/how-to-auction">
                    Learn How to Bid
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/auction-series">Browse Auctions</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-border/60 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Gavel className="h-5 w-5" />
              </div>
              <Badge variant="outline">Today</Badge>
            </div>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground mt-1">Active Auctions</p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700">
                <Clock className="h-5 w-5" />
              </div>
              <Badge variant="outline">Upcoming</Badge>
            </div>
            <div className="text-3xl font-bold">28</div>
            <p className="text-sm text-muted-foreground mt-1">Upcoming Auctions</p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700">
                <Trophy className="h-5 w-5" />
              </div>
              <Badge variant="outline">All Time</Badge>
            </div>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-muted-foreground mt-1">Total Winners</p>
          </CardContent>
        </Card>
      </div>

      {/* How Bidding Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            How Bidding Works
          </CardTitle>
          <CardDescription>
            Follow these steps to start bidding in E-Auction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                step: "1",
                title: "Apply for Number",
                desc: "Select a registration number from available series",
              },
              {
                step: "2",
                title: "Complete Payment",
                desc: "Pay the application fee via PSID through your bank",
              },
              {
                step: "3",
                title: "Wait for Approval",
                desc: "Application is verified by the department",
              },
              {
                step: "4",
                title: "Place Bids",
                desc: "During auction window, place bids on your number",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 p-4 rounded-lg border border-border/60 hover:bg-accent/5 transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
