import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Clock, Gauge, Fuel } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/lib/dummy-data";
import { money, numberFmt, timeLeft } from "@/lib/format";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const isLive = vehicle.status === "live";
  return (
    <Card className="group overflow-hidden border-border/60 bg-card p-0 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
      <Link to="/vehicle-details/$id" params={{ id: vehicle.id }} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img src={vehicle.image} alt={vehicle.title} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            {isLive ? (
              <Badge className="live-pulse bg-live text-live-foreground">LIVE</Badge>
            ) : (
              <Badge className="bg-background/90 text-foreground backdrop-blur">{vehicle.status.toUpperCase()}</Badge>
            )}
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur hover:bg-background">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground/90">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{timeLeft(vehicle.endsAt)}</span>
              <span>·</span>
              <span>{vehicle.bidsCount} bids</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">{vehicle.title}</h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Gauge className="h-3 w-3" />{numberFmt(vehicle.mileage)} km</span>
            <span className="flex items-center gap-1"><Fuel className="h-3 w-3" />{vehicle.fuel}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{vehicle.location}</span>
          </div>
        </div>
        <div className="flex items-end justify-between border-t pt-3">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Current bid</div>
            <div className="font-display text-2xl font-bold text-primary">{money(vehicle.currentBid)}</div>
          </div>
          <Button asChild size="sm">
            <Link to="/vehicle-details/$id" params={{ id: vehicle.id }}>Bid Now</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
