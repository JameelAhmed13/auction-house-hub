import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, EmptyState } from "@/components/page-header";
import { myBids } from "@/lib/dummy-data";
import { money, dateTime } from "@/lib/format";
import { Tag } from "lucide-react";

export const Route = createFileRoute("/bids-won")({ component: Page });

function Page() {
  const items = myBids.filter((b) => b.status === "won");
  return (
    <div>
      <PageHeader title="Bids Won" subtitle="Auctions you've won" />
      {items.length === 0 ? (
        <EmptyState icon={Tag} title="Nothing here yet" description="Your bids won will appear here." />
      ) : (
        <div className="space-y-3">
          {items.map((b) => (
            <Card key={b.id} className="flex flex-wrap items-center gap-4 p-4">
              <img src={b.vehicle.image} alt="" className="h-20 w-28 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <Link to="/vehicle-details/$id" params={{ id: b.vehicle.id }} className="font-semibold hover:text-primary">{b.vehicle.title}</Link>
                <div className="text-xs text-muted-foreground">{b.vehicle.location} · placed {dateTime(b.placedAt)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase text-muted-foreground">Your bid</div>
                <div className="font-display text-lg font-bold">{money(b.yourBid)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase text-muted-foreground">Highest</div>
                <div className="font-display text-lg font-bold text-primary">{money(b.highestBid)}</div>
              </div>
              <Badge variant={b.status === "winning" || b.status === "won" ? "default" : "secondary"} className="uppercase">{b.status}</Badge>
              <Button asChild variant="outline" size="sm"><Link to="/vehicle-details/$id" params={{ id: b.vehicle.id }}>View</Link></Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
