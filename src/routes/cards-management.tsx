import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { savedCards } from "@/lib/dummy-data";

export const Route = createFileRoute("/cards-management")({ component: Page });
function Page() {
  return (
    <div>
      <PageHeader title="Saved Cards" subtitle="Manage your payment cards" actions={<Button asChild><Link to="/add-card-details"><Plus className="mr-2 h-4 w-4" />Add card</Link></Button>} />
      <div className="grid gap-4 md:grid-cols-2">
        {savedCards.map((c) => (
          <Card key={c.id} className="overflow-hidden">
            <CardContent className="relative gradient-night p-6 text-sidebar-foreground">
              <div className="flex items-center justify-between">
                <CreditCard className="h-7 w-7 text-primary" />
                {c.default && <Badge className="bg-primary text-primary-foreground">Default</Badge>}
              </div>
              <div className="mt-8 font-mono text-xl tracking-widest">•••• •••• •••• {c.last4}</div>
              <div className="mt-4 flex justify-between text-xs">
                <div><div className="text-sidebar-foreground/60">Cardholder</div><div className="font-semibold">{c.holder}</div></div>
                <div><div className="text-sidebar-foreground/60">Expires</div><div className="font-semibold">{c.exp}</div></div>
                <div className="text-sidebar-foreground/60">{c.brand}</div>
              </div>
            </CardContent>
            <div className="flex justify-end p-3"><Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="mr-1 h-3 w-3" />Remove</Button></div>
          </Card>
        ))}
      </div>
    </div>
  );
}
