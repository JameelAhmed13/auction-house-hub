import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { locations } from "@/lib/dummy-data";

export const Route = createFileRoute("/locations")({ component: Page });
function Page() {
  return (
    <div>
      <PageHeader title="Auction Locations" subtitle="Visit one of our centers across the GCC" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((l) => (
          <Link key={l.id} to="/locations/$locationId" params={{ locationId: l.id }} className="group">
            <Card className="overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[16/10] overflow-hidden"><img src={l.cover} alt={l.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="p-5">
                <div className="font-display text-lg font-semibold">{l.name}</div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3" />{l.address}, {l.city}</div>
                  <div className="flex items-center gap-2"><Phone className="h-3 w-3" />{l.phone}</div>
                  <div className="flex items-center gap-2"><Clock className="h-3 w-3" />{l.hours}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
