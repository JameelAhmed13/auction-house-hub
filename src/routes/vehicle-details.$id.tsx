import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MapPin, Gauge, Fuel, Cog, Calendar, Award, Share2, Shield, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { findVehicle, allVehicles } from "@/lib/dummy-data";
import { money, numberFmt, timeLeft, dateTime } from "@/lib/format";
import { VehicleCard } from "@/components/vehicle-card";
import { toast } from "sonner";

export const Route = createFileRoute("/vehicle-details/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/vehicle-details/$id" });
  const v = findVehicle(id);
  const [active, setActive] = useState(0);
  const [bid, setBid] = useState(v.currentBid + 500);
  const similar = allVehicles.filter((x) => x.id !== v.id && x.bodyType === v.bodyType).slice(0, 4);

  return (
    <div>
      <nav className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/inventory" className="hover:text-foreground">Inventory</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{v.title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gallery */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
            <img src={v.images[active]} alt={v.title} className="h-full w-full object-cover" />
            {v.status === "live" && <Badge className="absolute left-4 top-4 live-pulse bg-live text-live-foreground">LIVE NOW</Badge>}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {v.images.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className={`aspect-[4/3] overflow-hidden rounded-xl border-2 transition-colors ${i === active ? "border-primary" : "border-transparent"}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card><CardContent className="p-6 space-y-3 text-sm leading-relaxed">
                <p>This {v.year} {v.make} {v.model} is in excellent condition with full service history. Single owner, garage kept, and meticulously maintained.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {v.features.map((f) => <Badge key={f} variant="secondary">{f}</Badge>)}
                </div>
              </CardContent></Card>
            </TabsContent>
            <TabsContent value="specs" className="mt-4">
              <Card><CardContent className="p-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                {[
                  ["Make", v.make], ["Model", v.model], ["Year", v.year], ["Mileage", `${numberFmt(v.mileage)} km`],
                  ["Fuel", v.fuel], ["Transmission", v.transmission], ["Body", v.bodyType], ["Color", v.color],
                  ["VIN", v.vin], ["Location", v.location],
                ].map(([k, val]) => (
                  <div key={k as string}>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                    <div className="font-medium">{val}</div>
                  </div>
                ))}
              </CardContent></Card>
            </TabsContent>
            <TabsContent value="condition" className="mt-4">
              <Card><CardContent className="p-6 text-sm">
                <div className="flex items-center gap-2 text-success"><Shield className="h-4 w-4" /> Inspected & verified</div>
                <p className="mt-3 text-muted-foreground">Overall condition: 8.5/10. {v.damage ?? "No reported damage."}</p>
              </CardContent></Card>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Card><CardContent className="p-6 text-sm space-y-2">
                <div>✓ 1 previous owner</div>
                <div>✓ Complete service history</div>
                <div>✓ No accidents reported</div>
              </CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bidding sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="font-display text-2xl font-bold leading-tight">{v.title}</h1>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {v.location}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost"><Heart className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost"><Share2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <Stat icon={Calendar} label="Year" value={String(v.year)} />
                <Stat icon={Gauge} label="Mileage" value={`${numberFmt(v.mileage)} km`} />
                <Stat icon={Fuel} label="Fuel" value={v.fuel} />
                <Stat icon={Cog} label="Trans." value={v.transmission} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/40 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-widest text-muted-foreground">Current bid</span>
                <Badge className="live-pulse bg-live text-live-foreground">{timeLeft(v.endsAt)}</Badge>
              </div>
              <div className="mt-2 font-display text-4xl font-bold text-primary">{money(v.currentBid)}</div>
              <div className="text-xs text-muted-foreground">{v.bidsCount} bids · {v.watching} watching · ends {dateTime(v.endsAt)}</div>

              <div className="mt-5 space-y-3">
                <div className="flex gap-2">
                  <Input type="number" value={bid} onChange={(e) => setBid(Number(e.target.value))} className="text-lg font-semibold" />
                  <Button size="lg" onClick={() => toast.success(`Bid of ${money(bid)} placed!`)}>Place bid</Button>
                </div>
                <Button variant="outline" size="lg" className="w-full" onClick={() => toast.success("Auto-bid set")}>
                  <Award className="mr-2 h-4 w-4" /> Set auto-bid up to {money(bid + 5000)}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base font-display">Seller</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-3">
              <Avatar><AvatarFallback>{v.seller.name[0]}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="font-semibold">{v.seller.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{v.seller.type} · ⭐ {v.seller.rating.toFixed(1)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-bold">Similar vehicles</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((s) => <VehicleCard key={s.id} vehicle={s} />)}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground"><Icon className="h-3 w-3" />{label}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
