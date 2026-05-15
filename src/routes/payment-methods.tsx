import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/payment-methods")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Payment Methods" subtitle="Manage how you pay" />
      <div className="grid gap-4 md:grid-cols-2"><Card><CardContent className="p-6"><div className="font-display text-lg font-semibold">💳 Cards</div><p className="text-sm text-muted-foreground mt-1">Manage saved cards.</p><Button size="sm" className="mt-3" asChild><a href="/cards-management">Open</a></Button></CardContent></Card><Card><CardContent className="p-6"><div className="font-display text-lg font-semibold">🏦 Bank transfer</div><p className="text-sm text-muted-foreground mt-1">For settlements & deposits.</p><Button size="sm" className="mt-3" variant="outline">Configure</Button></CardContent></Card></div>
    </div>
  );
}
