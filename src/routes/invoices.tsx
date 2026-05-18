import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { Search, Receipt, Download, Eye, DollarSign, CheckCircle2 } from "lucide-react";
import { invoices } from "@/lib/dummy-data";
import { useAuth } from "@/lib/auth-store";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/invoices")({ component: InvoicesPage });

function InvoicesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const myInvoices = invoices.filter((i) => !user || i.cnic === user.cnic);

  const filtered = myInvoices.filter((i) =>
    !search ||
    `${i.invoiceNumber} ${i.plateNumber} ${i.transactionId}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = myInvoices.reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Invoices"
        subtitle="Payment receipts for completed auctions"
        actions={
          <Button variant="outline" onClick={() => toast.success("Exporting all invoices...")}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{myInvoices.length}</div>
                <div className="text-xs text-muted-foreground">Total Invoices</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">PKR {(totalPaid / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground">Total Paid</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{myInvoices.length}</div>
                <div className="text-xs text-muted-foreground">Verified Receipts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by invoice #, plate, or transaction..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Receipt className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold mb-1">No invoices yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Invoices are generated automatically after successful payment.
            </p>
            <Button asChild>
              <Link to="/challans">View Pending Challans</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Plate</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs font-semibold">{inv.invoiceNumber}</TableCell>
                    <TableCell className="font-mono font-bold">{inv.plateNumber}</TableCell>
                    <TableCell className="font-bold text-primary">PKR {inv.total.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(inv.issuedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{inv.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{inv.transactionId}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button asChild variant="ghost" size="icon" className="h-7 w-7">
                          <Link to="/invoices/$id" params={{ id: inv.id }}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success("Downloading...")}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
