import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { vehiclesByStatus } from "@/lib/dummy-data";
import { money, timeLeft } from "@/lib/format";
import { Gavel } from "lucide-react";

export const Route = createFileRoute("/live-joined-auctions")({ component: Page });
function Page() {
  const lanes = vehiclesByStatus.live.slice(0, 4);
  return (
    <div>
      <PageHeader title="Live Joined Auctions" subtitle={`Watching ${lanes.length} of 8 lanes`} actions={<Badge className="live-pulse bg-live text-live-foreground">LIVE</Badge>} />
      <div className="grid gap-4 lg:grid-cols-2">
        {lanes.map((v) => (
          <Card key={v.id} className="overflow-hidden p-0">
            <div className="grid grid-cols-[180px_1fr] gap-0">
              <div className="aspect-square"><img src={v.image} alt="" className="h-full w-full object-cover" /></div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Lane {v.laneId}</Badge>
                  <span className="text-xs font-medium text-live">{timeLeft(v.endsAt)}</span>
                </div>
                <Link to="/vehicle-details/$id" params={{ id: v.id }} className="mt-2 block font-display text-lg font-semibold hover:text-primary">{v.title}</Link>
                <div className="mt-2"><span className="text-xs text-muted-foreground">Current bid</span><div className="font-display text-2xl font-bold text-primary">{money(v.currentBid)}</div></div>
                <div className="mt-3 flex gap-2"><Button size="sm" className="flex-1"><Gavel className="mr-1 h-3 w-3" />Bid +$500</Button><Button size="sm" variant="outline">Watch</Button></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
