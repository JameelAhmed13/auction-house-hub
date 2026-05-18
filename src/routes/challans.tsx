import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { CountdownTimer } from "@/components/countdown-timer";
import {
  Search, FileText, Clock, CheckCircle2, XCircle, AlertCircle,
  CreditCard, Download, Eye,
} from "lucide-react";
import { challans, Challan } from "@/lib/dummy-data";
import { useAuth } from "@/lib/auth-store";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/challans")({ component: ChallansPage });

function ChallansPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const myChallans = challans.filter((c) => !user || c.winnerCnic === user.cnic);

  const filtered = myChallans.filter((c) => {
    if (search && !`${c.challanNumber} ${c.plateNumber} ${c.psid}`.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (activeTab !== "all" && c.status !== activeTab) return false;
    return true;
  });

  const totalPending = myChallans
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + c.totalAmount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Challans"
        subtitle="Payment slips for won auctions"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{myChallans.length}</div>
                <div className="text-xs text-muted-foreground">Total Challans</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-700">
                  {myChallans.filter((c) => c.status === "pending").length}
                </div>
                <div className="text-xs text-muted-foreground">Pending Payment</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-700">
                  {myChallans.filter((c) => c.status === "paid").length}
                </div>
                <div className="text-xs text-muted-foreground">Paid</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-5">
            <div className="text-xs text-orange-700 font-medium uppercase tracking-wider mb-1">
              Total Due
            </div>
            <div className="text-2xl font-bold text-orange-900">
              PKR {totalPending.toLocaleString()}
            </div>
            <div className="text-xs text-orange-700 mt-1">Across pending challans</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Alert */}
      {totalPending > 0 && (
        <Card className="border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 animate-pulse">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900">Payment Required</h3>
              <p className="text-sm text-orange-700">
                You have {myChallans.filter((c) => c.status === "pending").length} pending
                challan{myChallans.filter((c) => c.status === "pending").length !== 1 ? "s" : ""}.
                Pay before deadline to avoid forfeiture.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by challan #, PSID, or plate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({myChallans.length})</TabsTrigger>
          <TabsTrigger value="pending">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Pending ({myChallans.filter((c) => c.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="paid">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Paid ({myChallans.filter((c) => c.status === "paid").length})
          </TabsTrigger>
          <TabsTrigger value="expired">
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Expired ({myChallans.filter((c) => c.status === "expired").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                <h3 className="font-semibold mb-1">No challans found</h3>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Challan #</TableHead>
                      <TableHead>Plate</TableHead>
                      <TableHead>PSID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((c) => (
                      <ChallanRow key={c.id} challan={c} />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChallanRow({ challan }: { challan: Challan }) {
  const statusBadge = {
    pending: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    paid: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    overdue: "bg-red-100 text-red-700 hover:bg-red-100",
    expired: "bg-red-100 text-red-700 hover:bg-red-100",
    refunded: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  };

  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-semibold">{challan.challanNumber}</TableCell>
      <TableCell className="font-mono font-bold">{challan.plateNumber}</TableCell>
      <TableCell className="font-mono text-xs">{challan.psid}</TableCell>
      <TableCell className="font-bold text-primary">
        PKR {challan.totalAmount.toLocaleString()}
      </TableCell>
      <TableCell className="text-xs text-muted-foreground">
        {new Date(challan.generatedAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {challan.status === "pending" ? (
          <CountdownTimer
            targetDate={challan.dueDate}
            variant="inline"
            className={cn(
              "text-xs font-bold",
              new Date(challan.dueDate).getTime() - Date.now() < 86400000
                ? "text-red-600"
                : "text-orange-600"
            )}
          />
        ) : (
          <span className="text-xs text-muted-foreground">
            {new Date(challan.dueDate).toLocaleDateString()}
          </span>
        )}
      </TableCell>
      <TableCell>
        <Badge className={statusBadge[challan.status]}>{challan.status}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Button asChild variant="ghost" size="icon" className="h-7 w-7">
            <Link to="/challans/$id" params={{ id: challan.id }}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {challan.status === "pending" && (
            <Button asChild size="sm" className="h-7 bg-orange-500 hover:bg-orange-600">
              <Link to="/challans/$id" params={{ id: challan.id }}>
                <CreditCard className="h-3 w-3 mr-1" />
                Pay
              </Link>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
