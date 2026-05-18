import { createFileRoute, useParams, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import { CountdownTimer } from "@/components/countdown-timer";
import {
  ArrowLeft, FileText, Printer, Download, Copy, CreditCard,
  AlertCircle, CheckCircle2, Calendar, Hash, Receipt, Trophy, XCircle,
  Building2, Shield, Clock, Phone, ArrowRight,
} from "lucide-react";
import { getChallanById, getInvoiceByChallanId } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/challans/$id")({ component: ChallanDetailPage });

function ChallanDetailPage() {
  const { id } = useParams({ from: "/challans/$id" });
  const navigate = useNavigate();
  const challan = getChallanById(id);
  const invoice = challan ? getInvoiceByChallanId(challan.id) : null;
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!challan) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Card>
          <CardContent className="p-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Challan Not Found</h2>
            <Button asChild>
              <Link to="/challans">View All Challans</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowPayDialog(false);
      toast.success("Payment successful! Invoice has been generated.", { duration: 5000 });
      // In real app would refresh - here we simulate
      setTimeout(() => navigate({ to: "/my-wins" }), 1500);
    }, 1500);
  };

  const copyPSID = () => {
    navigator.clipboard.writeText(challan.psid);
    toast.success("PSID copied to clipboard");
  };

  const isPending = challan.status === "pending";
  const isPaid = challan.status === "paid";
  const isExpired = challan.status === "expired" || challan.status === "overdue";

  const statusConfig = {
    pending: { color: "bg-orange-100 text-orange-700 border-orange-300", icon: Clock, label: "Awaiting Payment" },
    paid: { color: "bg-emerald-100 text-emerald-700 border-emerald-300", icon: CheckCircle2, label: "Paid" },
    overdue: { color: "bg-red-100 text-red-700 border-red-300", icon: XCircle, label: "Overdue" },
    expired: { color: "bg-red-100 text-red-700 border-red-300", icon: XCircle, label: "Expired" },
    refunded: { color: "bg-blue-100 text-blue-700 border-blue-300", icon: Receipt, label: "Refunded" },
  };
  const cfg = statusConfig[challan.status];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div>
        <Link to="/challans" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-3">
          <ArrowLeft className="h-4 w-4" />
          Back to challans
        </Link>
        <PageHeader
          title={`Challan ${challan.challanNumber}`}
          subtitle={`For plate ${challan.plateNumber} · Generated ${new Date(challan.generatedAt).toLocaleDateString()}`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.success("Downloading PDF...")}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          }
        />
      </div>

      {/* Status Banner */}
      <Card className={cn("border-2", cfg.color)}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${cfg.color}`}>
            <cfg.icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">{cfg.label}</h3>
            {isPending && (
              <p className="text-sm">
                Pay before deadline to register your plate. <span className="font-mono font-bold">{challan.psid}</span>
              </p>
            )}
            {isPaid && (
              <p className="text-sm">
                Paid on {challan.paidAt && new Date(challan.paidAt).toLocaleDateString()} via {challan.paymentMethod}
              </p>
            )}
            {isExpired && (
              <p className="text-sm">
                Payment deadline has passed. The plate has been forfeited.
              </p>
            )}
          </div>
          {isPending && (
            <CountdownTimer targetDate={challan.dueDate} variant="large" />
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT: Challan Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plate Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                Won Plate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <PlateDisplay plateNumber={challan.plateNumber} size="lg" />
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Auction</div>
                    <div className="font-semibold">{challan.auctionTitle}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Winner</div>
                    <div className="font-semibold">{challan.winnerName}</div>
                    <div className="text-xs text-muted-foreground font-mono">{challan.winnerCnic}</div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/plates/$id" params={{ id: challan.plateId }}>
                      View Plate Details
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Payment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <BreakdownRow label="Winning Bid Amount" value={challan.winningBid} />
                <BreakdownRow label="Registration Fee" value={challan.registrationFee} />
                <BreakdownRow label="Processing Fee" value={challan.processingFee} />
                <Separator />
                <BreakdownRow label="GST" value={challan.tax} muted />
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-primary text-2xl">
                    PKR {challan.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          {isPending && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  How to Pay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3">
                  <PaymentMethod
                    icon={Phone}
                    name="1-Bill"
                    description="Pay via mobile banking app or USSD"
                  />
                  <PaymentMethod
                    icon={Building2}
                    name="Bank Branch"
                    description="HBL, MCB, UBL, NBP, ABL accepted"
                  />
                  <PaymentMethod
                    icon={Shield}
                    name="ATM"
                    description="Bill payment from any bank ATM"
                  />
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2 text-blue-900">
                    <AlertCircle className="h-4 w-4" />
                    Quick Payment Steps
                  </h4>
                  <ol className="text-xs text-blue-800 space-y-1 list-decimal pl-5">
                    <li>Open your bank app, select "1-Bill" or "Utility Bill" payment</li>
                    <li>Search for "Excise Department Balochistan"</li>
                    <li>
                      Enter PSID:{" "}
                      <button
                        onClick={copyPSID}
                        className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-blue-300 hover:bg-blue-100"
                      >
                        {challan.psid} <Copy className="h-3 w-3 inline ml-1" />
                      </button>
                    </li>
                    <li>Confirm amount: <strong>PKR {challan.totalAmount.toLocaleString()}</strong></li>
                    <li>Complete payment and save the receipt</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Invoice link if paid */}
          {isPaid && invoice && (
            <Card className="border-2 border-emerald-300 bg-emerald-50">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Receipt className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-emerald-900">Invoice Available</h3>
                  <p className="text-sm text-emerald-700">
                    Your official invoice {invoice.invoiceNumber} has been generated
                  </p>
                </div>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link to="/invoices/$id" params={{ id: invoice.id }}>
                    View Invoice
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT: Quick Info + Action */}
        <div className="space-y-4">
          {/* Pay Button */}
          {isPending && (
            <Card className="border-2 border-orange-300 sticky top-20">
              <CardContent className="p-5 space-y-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Due</div>
                  <div className="text-3xl font-bold text-orange-700">
                    PKR {challan.totalAmount.toLocaleString()}
                  </div>
                </div>
                <Separator />
                <div className="text-center space-y-1">
                  <div className="text-xs text-muted-foreground">Deadline</div>
                  <div className="font-bold text-orange-600">
                    {new Date(challan.dueDate).toLocaleDateString()}
                  </div>
                  <CountdownTimer
                    targetDate={challan.dueDate}
                    variant="compact"
                    className="text-xs text-red-600 justify-center"
                  />
                </div>

                <Dialog open={showPayDialog} onOpenChange={setShowPayDialog}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Complete Payment</DialogTitle>
                      <DialogDescription>
                        Confirm your payment of PKR {challan.totalAmount.toLocaleString()}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-1.5">
                        <Label>Payment Method</Label>
                        <Input value="1-Bill (Demo)" readOnly />
                      </div>
                      <div className="space-y-1.5">
                        <Label>PSID</Label>
                        <Input value={challan.psid} readOnly className="font-mono" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Amount</Label>
                        <Input value={`PKR ${challan.totalAmount.toLocaleString()}`} readOnly className="font-bold" />
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
                        <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                        This is a demo payment. In production, you'd be redirected to your bank.
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowPayDialog(false)} disabled={processing}>
                        Cancel
                      </Button>
                      <Button onClick={handlePay} disabled={processing} className="bg-orange-500 hover:bg-orange-600">
                        {processing ? "Processing..." : "Confirm Payment"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="text-[10px] text-center text-muted-foreground">
                  ⚠️ Payment cannot be undone
                </p>
              </CardContent>
            </Card>
          )}

          {/* Key Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Challan Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <InfoRow label="Challan #" value={challan.challanNumber} icon={Hash} />
              <InfoRow label="PSID" value={challan.psid} icon={CreditCard} onCopy={copyPSID} />
              <InfoRow label="Generated" value={new Date(challan.generatedAt).toLocaleDateString()} icon={Calendar} />
              <InfoRow label="Due Date" value={new Date(challan.dueDate).toLocaleDateString()} icon={Calendar} />
              {challan.paidAt && (
                <InfoRow
                  label="Paid On"
                  value={new Date(challan.paidAt).toLocaleDateString()}
                  icon={CheckCircle2}
                />
              )}
              {challan.paymentMethod && (
                <InfoRow label="Method" value={challan.paymentMethod} icon={Building2} />
              )}
              <Separator />
              <div className="text-center">
                <Badge className={cfg.color}>{cfg.label}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card className="bg-muted/40">
            <CardContent className="p-4 text-xs space-y-1">
              <div className="font-semibold text-sm">Need Help?</div>
              <p className="text-muted-foreground">
                Call our helpline at <strong>+92 81 9201234</strong> or email{" "}
                <strong>support@eauction.gov.pk</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({
  label, value, muted,
}: { label: string; value: number; muted?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between text-sm", muted && "text-muted-foreground")}>
      <span>{label}</span>
      <span className="font-mono font-semibold">PKR {value.toLocaleString()}</span>
    </div>
  );
}

function PaymentMethod({
  icon: Icon, name, description,
}: { icon: any; name: string; description: string }) {
  return (
    <div className="p-3 rounded-lg border hover:border-primary/40 hover:shadow-sm transition-all">
      <Icon className="h-5 w-5 text-primary mb-2" />
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-xs text-muted-foreground mt-1">{description}</div>
    </div>
  );
}

function InfoRow({
  label, value, icon: Icon, onCopy,
}: { label: string; value: string; icon: any; onCopy?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-muted-foreground flex items-center gap-1.5 text-xs shrink-0">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="font-medium text-right flex items-center gap-1">
        <span className="font-mono">{value}</span>
        {onCopy && (
          <button onClick={onCopy} className="text-muted-foreground hover:text-primary">
            <Copy className="h-3 w-3" />
          </button>
        )}
      </span>
    </div>
  );
}
