import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { invoices } from "@/lib/dummy-data";
import { money, dateShort } from "@/lib/format";

export const Route = createFileRoute("/security-deposit/deposit-invoices")({ component: Page });
function Page() {
  const items = invoices.filter((i) => i.type === "deposit");
  return (
    <div>
      <PageHeader title="Deposit Invoices" subtitle="Outbound deposit payments" />
      <Card className="overflow-hidden"><table className="w-full text-sm">
        <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
          <th className="p-4 text-left">ID</th><th className="p-4 text-left">Vehicle</th><th className="p-4 text-left">Amount</th><th className="p-4 text-left">Date</th><th className="p-4 text-left">Status</th><th className="p-4"></th>
        </tr></thead>
        <tbody className="divide-y">{items.map((i) => (
          <tr key={i.id} className="hover:bg-secondary/30">
            <td className="p-4 font-mono text-xs">#{i.id}</td>
            <td className="p-4"><Link to="/vehicle-details/$id" params={{ id: i.vehicle.id }} className="font-medium hover:text-primary">{i.vehicle.title}</Link></td>
            <td className="p-4 font-semibold">{money(i.amount)}</td>
            <td className="p-4 text-muted-foreground">{dateShort(i.dueAt)}</td>
            <td className="p-4"><Badge variant="secondary" className="uppercase">{i.status}</Badge></td>
            <td className="p-4 text-right"><Button size="sm" variant="outline">View</Button></td>
          </tr>))}</tbody>
      </table></Card>
    </div>
  );
}
