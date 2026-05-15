import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleCard } from "@/components/vehicle-card";
import { PageHeader, EmptyState } from "@/components/page-header";
import type { Vehicle } from "@/lib/dummy-data";
import { Car } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  vehicles: Vehicle[];
  filter?: boolean;
}

export function VehiclesListPage({ title, subtitle, vehicles, filter = true }: Props) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("ending");
  const filtered = vehicles
    .filter((v) => v.title.toLowerCase().includes(q.toLowerCase()) || v.location.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-low") return a.currentBid - b.currentBid;
      if (sort === "price-high") return b.currentBid - a.currentBid;
      if (sort === "bids") return b.bidsCount - a.bidsCount;
      return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime();
    });

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle ?? `${vehicles.length} vehicles`} />
      {filter && (
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search make, model, location..." className="pl-9" />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ending">Ending soon</SelectItem>
              <SelectItem value="price-low">Price: Low → High</SelectItem>
              <SelectItem value="price-high">Price: High → Low</SelectItem>
              <SelectItem value="bids">Most bids</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {filtered.length === 0 ? (
        <EmptyState icon={Car} title="No vehicles found" description="Try adjusting your filters or search keywords." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
      )}
    </div>
  );
}
