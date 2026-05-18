import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import { CountdownTimer } from "@/components/countdown-timer";
import {
  Trophy, FileText, CheckCircle2, AlertCircle, XCircle, ArrowRight, Receipt,
  Calendar, Clock, CreditCard, Eye,
} from "lucide-react";
import { myWins, getChallanById, WinRecord } from "@/lib/dummy-data";
import { useAuth } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-wins")({ component: MyWinsPage });

function MyWinsPage() {
  const { user } = useAuth();
  const wins = myWins.filter((w) => !user || w.userCnic === user.cnic);

  const filterByStatus = (status?: string) => {
    if (!status || status === "all") return wins;
    return wins.filter((w) => w.status === status);
  };

  const pendingCount = wins.filter((w) => w.status === "pending-payment").length;
  const paidCount = wins.filter((w) => w.status === "paid" || w.status === "registered").length;
  const expiredCount = wins.filter((w) => w.status === "expired").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Wins"
        subtitle="All plates you've won across auctions"
        actions={
          <Button asChild variant="outline">
            <Link to="/challans">
              <Receipt className="h-4 w-4 mr-2" />
              View All Challans
            </Link>
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={Trophy} label="Total Wins" value={wins.length.toString()}
          color="bg-amber-100 text-amber-700"
        />
        <StatCard
          icon={Clock} label="Pending Payment" value={pendingCount.toString()}
          color="bg-orange-100 text-orange-700"
        />
        <StatCard
          icon={CheckCircle2} label="Completed" value={paidCount.toString()}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          icon={XCircle} label="Expired" value={expiredCount.toString()}
          color="bg-red-100 text-red-700"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({wins.length})</TabsTrigger>
          <TabsTrigger value="pending-payment">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Pending ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="registered">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Completed ({paidCount})
          </TabsTrigger>
          <TabsTrigger value="expired">
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Expired ({expiredCount})
          </TabsTrigger>
        </TabsList>

        {["all", "pending-payment", "registered", "expired"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            {filterByStatus(tab).length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Trophy className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                  <h3 className="font-semibold mb-1">No wins in this category</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse current auctions to start bidding
                  </p>
                  <Button asChild>
                    <Link to="/auctions">Browse Auctions</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filterByStatus(tab).map((win) => (
                  <WinCard key={win.id} win={win} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function WinCard({ win }: { win: WinRecord }) {
  const challan = win.challanId ? getChallanById(win.challanId) : null;

  const statusConfig = {
    "pending-payment": {
      label: "Payment Pending",
      color: "bg-orange-100 text-orange-700",
      borderColor: "border-orange-300",
    },
    paid: {
      label: "Paid",
      color: "bg-emerald-100 text-emerald-700",
      borderColor: "border-emerald-300",
    },
    registered: {
      label: "Registered",
      color: "bg-emerald-100 text-emerald-700",
      borderColor: "border-emerald-300",
    },
    expired: {
      label: "Expired",
      color: "bg-red-100 text-red-700",
      borderColor: "border-red-300",
    },
    refunded: {
      label: "Refunded",
      color: "bg-blue-100 text-blue-700",
      borderColor: "border-blue-300",
    },
  };
  const cfg = statusConfig[win.status];

  return (
    <Card className={cn("border-2 overflow-hidden transition-all hover:shadow-md", cfg.borderColor)}>
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5" />
      <CardContent className="p-5">
        <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
          {/* Plate */}
          <div className="shrink-0">
            <PlateDisplay plateNumber={win.plateNumber} size="md" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Trophy className="h-4 w-4 text-amber-600" />
              <h3 className="font-bold text-lg">{win.plateNumber}</h3>
              <Badge variant="outline" className="text-xs">{win.category}</Badge>
              <Badge className={cn("text-xs", cfg.color, "hover:opacity-90")}>
                {cfg.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">From: {win.auctionTitle}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Winning Bid</div>
                <div className="font-bold text-lg text-primary">PKR {win.winningBid.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Won On</div>
                <div className="text-sm font-medium">{new Date(win.wonAt).toLocaleDateString()}</div>
              </div>
              {challan && challan.status === "pending" && (
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Pay Within</div>
                  <CountdownTimer
                    targetDate={challan.dueDate}
                    variant="inline"
                    className="text-sm font-bold text-orange-600"
                  />
                </div>
              )}
              {win.status === "registered" && challan?.paidAt && (
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Paid On</div>
                  <div className="text-sm font-medium text-emerald-600">
                    {new Date(challan.paidAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Alert for pending */}
            {win.status === "pending-payment" && challan && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2 mt-3">
                <AlertCircle className="h-4 w-4 text-orange-600 shrink-0" />
                <div className="text-xs text-orange-800 flex-1">
                  <strong>Action Required:</strong> Pay PKR {challan.totalAmount.toLocaleString()} via
                  PSID <span className="font-mono">{challan.psid}</span> before deadline.
                </div>
              </div>
            )}

            {win.status === "expired" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 mt-3">
                <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                <div className="text-xs text-red-800">
                  Payment deadline passed. The plate has been forfeited and will be re-auctioned.
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 shrink-0">
            <Button asChild variant="outline" size="sm">
              <Link to="/plates/$id" params={{ id: win.plateId }}>
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                View Plate
              </Link>
            </Button>
            {win.challanId && win.status === "pending-payment" && (
              <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Link to="/challans/$id" params={{ id: win.challanId }}>
                  <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                  Pay Now
                </Link>
              </Button>
            )}
            {win.challanId && (win.status === "registered" || win.status === "paid") && win.invoiceId && (
              <Button asChild size="sm" variant="outline">
                <Link to="/invoices/$id" params={{ id: win.invoiceId }}>
                  <Receipt className="h-3.5 w-3.5 mr-1.5" />
                  Invoice
                </Link>
              </Button>
            )}
            {win.challanId && (
              <Button asChild size="sm" variant="ghost">
                <Link to="/challans/$id" params={{ id: win.challanId }}>
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  Challan
                </Link>
              </Button>
            )}
          </div>
        </div>
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
