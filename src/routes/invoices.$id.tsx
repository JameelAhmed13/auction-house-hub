import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import {
  ArrowLeft, Receipt, Printer, Download, Share2, Mail, CheckCircle2,
  Calendar, Hash, FileText, Building2,
} from "lucide-react";
import { getInvoiceById, getChallanById } from "@/lib/dummy-data";
import { toast } from "sonner";

export const Route = createFileRoute("/invoices/$id")({ component: InvoiceDetailPage });

function InvoiceDetailPage() {
  const { id } = useParams({ from: "/invoices/$id" });
  const invoice = getInvoiceById(id);
  const challan = invoice ? getChallanById(invoice.challanId) : null;

  if (!invoice) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Card>
          <CardContent className="p-12">
            <Receipt className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Invoice Not Found</h2>
            <Button asChild>
              <Link to="/invoices">View All Invoices</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePrint = () => window.print();
  const handleDownload = () => toast.success("Downloading invoice PDF...");
  const handleEmail = () => toast.success("Invoice sent to your email");

  return (
    <div className="space-y-6">
      {/* Top Bar - non-print */}
      <div className="print:hidden">
        <Link to="/invoices" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-3">
          <ArrowLeft className="h-4 w-4" />
          Back to invoices
        </Link>
        <PageHeader
          title={`Invoice ${invoice.invoiceNumber}`}
          subtitle={`Issued ${new Date(invoice.issuedAt).toLocaleDateString()}`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          }
        />
      </div>

      {/* Invoice Document */}
      <Card className="max-w-4xl mx-auto shadow-lg print:shadow-none print:border-0">
        <CardContent className="p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-4 pb-6 border-b-2">
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl">
                  ب
                </div>
                <div>
                  <h2 className="text-xl font-bold">E-Auction Portal</h2>
                  <p className="text-xs text-muted-foreground">Government of Balochistan</p>
                </div>
              </div>
              <p className="text-sm font-semibold">Excise, Taxation & Narcotics Control Department</p>
              <p className="text-xs text-muted-foreground">Civil Secretariat, Quetta, Balochistan, Pakistan</p>
              <p className="text-xs text-muted-foreground">support@eauction.gov.pk · +92 81 9201234</p>
            </div>
            <div className="text-right">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-2 text-base px-3 py-1">
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                PAID
              </Badge>
              <div className="space-y-0.5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Invoice #</div>
                <div className="text-2xl font-bold font-mono">{invoice.invoiceNumber}</div>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Billed To</div>
              <div className="font-bold text-lg">{invoice.customerName}</div>
              <div className="text-sm text-muted-foreground font-mono">{invoice.cnic}</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Issued:</span>
                <span className="font-semibold">{new Date(invoice.issuedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Paid:</span>
                <span className="font-semibold text-emerald-600">{new Date(invoice.paidAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-semibold">{invoice.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction:</span>
                <span className="font-mono font-semibold">{invoice.transactionId}</span>
              </div>
              {challan && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Challan:</span>
                  <span className="font-mono font-semibold">{invoice.challanNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Plate */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-5 flex items-center gap-6">
            <PlateDisplay plateNumber={invoice.plateNumber} size="lg" />
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-1">Registration Plate</div>
              <div className="font-bold text-2xl">{invoice.plateNumber}</div>
              <div className="text-xs text-amber-700 mt-1">
                Awarded to {invoice.customerName} via E-Auction
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Item Details
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs uppercase tracking-wider">Description</th>
                    <th className="text-right px-4 py-2 text-xs uppercase tracking-wider">Amount (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-3 text-sm">{item.description}</td>
                      <td className="px-4 py-3 text-right font-mono text-sm">
                        {item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="ml-auto max-w-xs space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono font-semibold">PKR {invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">GST</span>
              <span className="font-mono font-semibold">PKR {invoice.tax.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg pt-1">
              <span className="font-bold">Total Paid</span>
              <span className="font-bold text-2xl font-mono text-emerald-600">
                PKR {invoice.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t-2 text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="font-bold">Thank you for your payment</span>
            </div>
            <p className="text-xs text-muted-foreground">
              This is a system-generated invoice. No signature required. All amounts in Pakistani Rupees (PKR).
            </p>
            <p className="text-[10px] text-muted-foreground/70">
              For queries, contact support@eauction.gov.pk or call +92 81 9201234
            </p>
          </div>

          {/* Verification stamp */}
          <div className="flex justify-center pt-4">
            <div className="border-2 border-dashed border-emerald-400 rounded-full px-6 py-2 text-emerald-700 font-bold text-sm rotate-[-8deg]">
              ✓ VERIFIED · PAID IN FULL
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Footer */}
      <div className="print:hidden flex justify-center gap-2 max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => toast.success("Link copied")}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        {challan && (
          <Button asChild variant="outline">
            <Link to="/challans/$id" params={{ id: challan.id }}>
              <FileText className="h-4 w-4 mr-2" />
              View Challan
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
