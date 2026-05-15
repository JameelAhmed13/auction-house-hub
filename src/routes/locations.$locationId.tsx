import { createFileRoute, useParams } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { locations } from "@/lib/dummy-data";
import { MapPin, Phone, Clock, Building2 } from "lucide-react";

export const Route = createFileRoute("/locations/$locationId")({ component: Page });
function Page() {
  const { locationId } = useParams({ from: "/locations/$locationId" });
  const loc = locations.find((l) => l.id === locationId) ?? locations[0];
  return (
    <div>
      <PageHeader title={loc.name} subtitle={`${loc.city}, ${loc.country}`} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 overflow-hidden rounded-2xl"><img src={loc.cover} alt="" className="aspect-[16/9] w-full object-cover" /></div>
        <Card><CardContent className="p-6 space-y-3 text-sm">
          <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><span>{loc.address}<br/>{loc.city}, {loc.country}</span></div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{loc.phone}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{loc.hours}</div>
          <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" />{loc.upcomingCount} upcoming auctions</div>
        </CardContent></Card>
      </div>
    </div>
  );
}
