import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { depositPlans } from "@/lib/dummy-data";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/deposit-plans")({ component: Page });
function Page() {
  return (
    <div>
      <PageHeader title="Deposit Plans" subtitle="Choose the plan that matches your bidding volume" />
      <div className="grid gap-6 md:grid-cols-3">
        {depositPlans.map((p) => (
          <Card key={p.id} className={cn("relative overflow-hidden", p.recommended && "border-primary ring-2 ring-primary/20")}>
            {p.recommended && <Badge className="absolute right-4 top-4 gradient-gold text-primary-foreground">POPULAR</Badge>}
            <CardContent className="p-8">
              <div className="font-display text-2xl font-bold">{p.name}</div>
              <div className="text-sm text-muted-foreground">{p.tagline}</div>
              <div className="mt-6"><span className="font-display text-5xl font-bold">{money(p.monthly)}</span><span className="text-sm text-muted-foreground">/mo</span></div>
              <div className="mt-2 text-xs text-muted-foreground">Bid limit: {money(p.bidLimit)}</div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{f}</li>)}
              </ul>
              <Button asChild className={cn("mt-6 w-full", p.recommended && "gradient-gold text-primary-foreground")} size="lg">
                <Link to="/new-deposit-plan">Subscribe</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
