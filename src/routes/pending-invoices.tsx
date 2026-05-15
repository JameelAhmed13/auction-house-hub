import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, EmptyState } from "@/components/page-header";
import { invoices } from "@/lib/dummy-data";
import { money, dateShort } from "@/lib/format";
import { ReceiptText } from "lucide-react";

export const Route = createFileRoute("/pending-invoices")({ component: Page });

function Page() {
  const items = invoices.filter((i) => i.status === "pending");
  return (
    <div>
      <PageHeader title="Pending Invoices" subtitle="Settlements awaiting payout" />
      {items.length === 0 ? (
        <EmptyState icon={ReceiptText} title="No invoices" description="Invoices appear here once activity occurs." />
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-4 text-left">Invoice</th>
                <th className="p-4 text-left">Vehicle</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Due</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((i) => (
                <tr key={i.id} className="hover:bg-secondary/30">
                  <td className="p-4 font-mono text-xs">#{i.id}</td>
                  <td className="p-4"><Link to="/vehicle-details/$id" params={{ id: i.vehicle.id }} className="font-medium hover:text-primary">{i.vehicle.title}</Link></td>
                  <td className="p-4 font-semibold">{money(i.amount)}</td>
                  <td className="p-4 text-muted-foreground">{dateShort(i.dueAt)}</td>
                  <td className="p-4"><Badge variant={i.status === "paid" || i.status === "settled" ? "default" : i.status === "due" ? "destructive" : "secondary"} className="uppercase">{i.status}</Badge></td>
                  <td className="p-4 text-right"><Button size="sm" variant="outline">View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
