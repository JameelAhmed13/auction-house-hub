import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, EmptyState } from "@/components/page-header";
import { myOffers } from "@/lib/dummy-data";
import { money, dateTime } from "@/lib/format";
import { Tag } from "lucide-react";

export const Route = createFileRoute("/offers-lost")({ component: Page });

function Page() {
  const items = myOffers.filter((o) => o.status === "rejected");
  return (
    <div>
      <PageHeader title="Offers Lost" subtitle="Rejected offers" />
      {items.length === 0 ? (
        <EmptyState icon={Tag} title="No offers yet" description="Your offers lost will show up here." />
      ) : (
        <div className="space-y-3">
          {items.map((o) => (
            <Card key={o.id} className="flex flex-wrap items-center gap-4 p-4">
              <img src={o.vehicle.image} alt="" className="h-20 w-28 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <Link to="/vehicle-details/$id" params={{ id: o.vehicle.id }} className="font-semibold hover:text-primary">{o.vehicle.title}</Link>
                <div className="text-xs text-muted-foreground">Expires {dateTime(o.expiresAt)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase text-muted-foreground">Your offer</div>
                <div className="font-display text-lg font-bold text-primary">{money(o.amount)}</div>
              </div>
              <Badge variant={o.status === "accepted" ? "default" : o.status === "rejected" ? "destructive" : "secondary"} className="uppercase">{o.status}</Badge>
              <Button asChild variant="outline" size="sm"><Link to="/vehicle-details/$id" params={{ id: o.vehicle.id }}>View</Link></Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
