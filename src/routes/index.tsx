import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gavel, ShieldCheck, Trophy, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VehicleCard } from "@/components/vehicle-card";
import { vehiclesByStatus, auctions, locations } from "@/lib/dummy-data";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { isAuthed } = useAuth();
  const featured = vehiclesByStatus.live.slice(0, 8);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-night text-sidebar-foreground">
        <div className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-accent/30 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <Badge className="w-fit bg-primary/15 text-primary border-primary/30">Live now · {vehiclesByStatus.live.length} auctions</Badge>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Bid bold.<br />
              <span className="bg-gradient-to-r from-primary via-warning to-primary bg-clip-text text-transparent">Drive premium.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-sidebar-foreground/70 md:text-lg">
              The Middle East's most trusted automotive auction marketplace. Live bidding, verified vehicles,
              and same-day clearance — all in one bold platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-gold text-primary-foreground shadow-xl">
                <Link to={isAuthed ? "/todays-auctions" : "/register"}>
                  {isAuthed ? "Join Live Auction" : "Start Bidding"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent">
                <Link to="/inventory">Browse Inventory</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-sidebar-border pt-6">
              <Stat label="Vehicles sold" value="12,400+" />
              <Stat label="Active bidders" value="8,900" />
              <Stat label="Locations" value={`${locations.length}`} />
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rotate-3 rounded-3xl bg-primary/20 blur-2xl" />
            <img src={featured[0]?.image} alt="" className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-sidebar-border" />
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-sidebar-border bg-sidebar/90 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary"><span className="live-pulse" /> Live bid</div>
              <div className="mt-1 font-display text-2xl font-bold">$54,200</div>
              <div className="text-xs text-sidebar-foreground/60">{featured[0]?.title}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Gavel, title: "Live auctions", text: "Bid in real-time across multiple lanes simultaneously." },
            { icon: ShieldCheck, title: "Verified vehicles", text: "Every car inspected, scored and disclosed up-front." },
            { icon: Zap, title: "Instant settlement", text: "Pay fast, pick up faster. Same-day clearance available." },
            { icon: Trophy, title: "Trusted dealers", text: "Curated network of premium sellers and dealers." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border bg-card p-6 transition-colors hover:border-primary/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary"><f.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured live */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <Badge className="bg-live/15 text-live border-live/30 live-pulse">Live now</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Featured auctions</h2>
          </div>
          <Button asChild variant="ghost"><Link to="/todays-auctions">View all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
      </section>

      {/* Auctions strip */}
      <section className="border-y bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">Upcoming sales</h2>
              <p className="mt-1 text-sm text-muted-foreground">Pre-register and never miss a deal.</p>
            </div>
            <Button asChild variant="ghost"><Link to="/upcoming-auctions">All upcoming <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {auctions.slice(3, 6).map((a) => (
              <Link key={a.id} to="/$auctionId/upcoming-auction-sale-list" params={{ auctionId: a.id }} className="group overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={a.cover} alt={a.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">{a.location}</div>
                  <h3 className="mt-1 font-display text-lg font-semibold">{a.name}</h3>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{a.vehiclesCount} vehicles</span>
                    <span>{a.lanes} lanes</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl gradient-night p-10 text-sidebar-foreground md:p-16">
          <Sparkles className="absolute -top-6 -right-6 h-40 w-40 text-primary/20" />
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Ready to win your next vehicle?
          </h2>
          <p className="mt-3 max-w-xl text-sidebar-foreground/70">
            Join thousands of buyers and sellers transacting with confidence on BK Cars Auctions.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild size="lg" className="gradient-gold text-primary-foreground"><Link to="/register">Create account</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent"><Link to="/deposit-plans">View plans</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-primary md:text-3xl">{value}</div>
      <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">{label}</div>
    </div>
  );
}
