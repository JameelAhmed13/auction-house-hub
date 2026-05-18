import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, Gavel, Trophy, TrendingUp, Shield, Zap,
  ChevronRight, Star, Award, Users, CheckCircle2, Clock, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auctionSeries, vanityPlates } from "@/lib/dummy-data";
import { useAuth } from "@/lib/auth-store";
import { PlateDisplay } from "@/components/plate-display";

export const Route = createFileRoute("/")({ component: Landing });

const stackedPlates = [
  { number: "AB 0001", category: "Platinum", price: "750K" },
  { number: "AB 7777", category: "Gold", price: "500K" },
  { number: "QT 9999", category: "Platinum", price: "850K" },
  { number: "AB 0786", category: "Gold", price: "350K" },
];

const scrollingPlates = [
  "AB 0001", "QT 9999", "AB 7777", "BAL 100", "BEL 010", "AB 0123",
  "AB 0786", "AB 5555", "QT 0001", "AB 1111", "BAL 999", "AB 0007",
];

function Landing() {
  const { isAuthed } = useAuth();

  return (
    <div className="overflow-hidden bg-background">
      {/* HERO SECTION - Modern Dark */}
      <section className="relative min-h-screen bg-slate-950 overflow-hidden">
        {/* Sophisticated Background Effects */}
        <div className="absolute inset-0">
          {/* Radial spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
            }}
          />

          {/* Animated gradient orbs */}
          <div className="absolute top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30 animate-blob"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
          />
          <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"
            style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
          />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"
            style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at top, transparent 0%, rgba(2, 6, 23, 0.8) 100%)"
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-32 lg:pt-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Text Content */}
            <div className="space-y-8 text-white relative z-10">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-300">
                  500+ Auctions Live Right Now
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  <span className="block text-white">Bid Smart.</span>
                  <span className="block">
                    Drive{" "}
                    <span className="relative inline-block">
                      <span
                        className="relative z-10"
                        style={{
                          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)",
                          backgroundSize: "200% 200%",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          animation: "gradient-shift 4s ease infinite",
                        }}
                      >
                        Premium.
                      </span>
                      <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                        <path d="M2 9C50 3 150 1 298 5" stroke="url(#highlight)" strokeWidth="3" strokeLinecap="round"/>
                        <defs>
                          <linearGradient id="highlight" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fbbf24"/>
                            <stop offset="1" stopColor="#f59e0b"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </span>
                </h1>
                <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                  Pakistan's first government-backed E-Auction for exclusive vehicle registration plates. Bid securely, win confidently, drive proudly across Balochistan.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {isAuthed ? (
                  <>
                    <Button
                      asChild
                      size="lg"
                      className="group bg-white text-slate-950 hover:bg-slate-100 font-semibold text-base px-7 h-12 rounded-xl shadow-2xl shadow-white/10 transition-all hover:scale-[1.02]"
                    >
                      <Link to="/auction-series">
                        Browse Auctions
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-medium text-base px-7 h-12 rounded-xl"
                    >
                      <Link to="/dashboard">
                        <Eye className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      size="lg"
                      className="group bg-white text-slate-950 hover:bg-slate-100 font-semibold text-base px-7 h-12 rounded-xl shadow-2xl shadow-white/10 transition-all hover:scale-[1.02]"
                    >
                      <Link to="/register">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-medium text-base px-7 h-12 rounded-xl"
                    >
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-slate-400">Government Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-slate-400">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-slate-400">5-Star Rated</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Premium Plate Showcase */}
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full border border-white/5 animate-spin-slow" />
              <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full border border-white/5 animate-spin-slow" style={{ animationDirection: "reverse" }} />

              {/* Main showcase container */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(circle at center, rgba(251, 191, 36, 0.15) 0%, transparent 60%)"
                  }}
                />

                {/* Stacked Plates Card */}
                <div className="relative space-y-4">
                  {/* Featured Plate (Top) */}
                  <div className="relative animate-float-plate">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl blur-lg opacity-50" />
                    <div className="relative bg-white rounded-xl p-5 shadow-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                          ⭐ Premium Auction
                        </span>
                        <Badge className="bg-amber-500 text-white border-0">Live Now</Badge>
                      </div>

                      {/* Big plate display */}
                      <PlateDisplay plateNumber="AB 0001" size="lg" />

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <div className="text-xs text-slate-500">Current Bid</div>
                          <div className="text-2xl font-bold text-slate-900">PKR 750K</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-500">Time Left</div>
                          <div className="flex items-center gap-1 text-sm font-semibold text-red-500">
                            <Clock className="h-3 w-3" />
                            02:45:18
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smaller plates grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {stackedPlates.slice(1, 4).map((plate, idx) => (
                      <div
                        key={plate.number}
                        className="bg-white/95 backdrop-blur rounded-lg p-3 shadow-xl border border-white/20 animate-float-plate-slow"
                        style={{ animationDelay: `${idx * 0.3}s` }}
                      >
                        <PlateDisplay plateNumber={plate.number} size="sm" className="mb-2" />
                        <div className="text-center">
                          <div className="text-[9px] text-slate-500">Bid</div>
                          <div className="text-xs font-bold text-slate-900">PKR {plate.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats card */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur" />
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">Total Volume</div>
                            <div className="text-lg font-bold">PKR 2.4 Cr</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
                          <span className="text-sm font-semibold">+24%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {[
              { value: "12,400+", label: "Active Bidders", icon: Users },
              { value: "500+", label: "Daily Auctions", icon: Gavel },
              { value: "PKR 50Cr+", label: "Total Volume", icon: TrendingUp },
              { value: "98.5%", label: "Success Rate", icon: Award },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-slate-950 p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling Plates Ticker */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md overflow-hidden py-4">
          <div className="flex gap-3 animate-scroll-x whitespace-nowrap">
            {[...scrollingPlates, ...scrollingPlates, ...scrollingPlates].map((plate, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-bold tracking-wider shrink-0"
              >
                <span className="text-[10px] tracking-widest text-slate-500">BAL</span>
                <span className="font-mono">{plate}</span>
                <span className="ml-2 text-xs text-emerald-600">● LIVE</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple. Fast. Secure.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From registration to winning your dream plate in just 4 easy steps
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Register",
                desc: "Sign up with your CNIC and verify identity",
                icon: Users,
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                step: "02",
                title: "Browse",
                desc: "Explore available registration plates",
                icon: Sparkles,
                gradient: "from-purple-500 to-pink-600",
              },
              {
                step: "03",
                title: "Bid",
                desc: "Place bids in real-time auctions",
                icon: Gavel,
                gradient: "from-amber-500 to-orange-600",
              },
              {
                step: "04",
                title: "Win",
                desc: "Pay and register your new plate",
                icon: Trophy,
                gradient: "from-emerald-500 to-teal-600",
              },
            ].map((item, idx) => (
              <Card key={idx} className="group relative overflow-hidden border-border/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/15">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VANITY PLATES */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
                💎 Premium Collection
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                Featured Vanity Plates
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Exclusive numbers up for auction. Don't miss your chance.
              </p>
            </div>
            {isAuthed && (
              <Button asChild variant="outline" size="lg" className="self-start md:self-auto">
                <Link to="/vanity">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vanityPlates.map((plate) => (
              <Card
                key={plate.id}
                className="group relative overflow-hidden border-2 border-border/60 hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Top gradient strip */}
                <div className={`h-1.5 ${
                  plate.category === "Platinum"
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                    : "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"
                }`} />

                <CardContent className="p-5 space-y-4">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between">
                    <Badge className={
                      plate.category === "Platinum"
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"
                    }>
                      {plate.category === "Platinum" ? "💎" : "⭐"} {plate.category}
                    </Badge>
                    {plate.status === "live" && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-red-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        LIVE
                      </div>
                    )}
                  </div>

                  {/* Plate */}
                  <PlateDisplay
                    plateNumber={plate.plateNumber}
                    size="md"
                    className="transform group-hover:scale-105 transition-transform"
                  />

                  {/* Price Info */}
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reserve</span>
                      <span className="font-semibold">PKR {(plate.reservePrice / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Current</span>
                      <span className="text-lg font-bold text-primary">
                        {plate.currentBid
                          ? `PKR ${(plate.currentBid / 1000).toFixed(0)}K`
                          : "—"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABLE SERIES */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 space-y-4">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
              🔥 Live Now
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Active Auction Series
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Browse from our extensive collection of registration series
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {auctionSeries.slice(0, 3).map((series) => (
              <Card
                key={series.id}
                className="group relative overflow-hidden border-2 border-border/60 hover:border-primary/40 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="relative p-6 space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        {series.category}
                      </div>
                      <div className="text-5xl font-bold text-primary">
                        {series.code}
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Award className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-4 text-center border border-amber-200/40">
                    <div className="text-xs text-muted-foreground mb-1">Available Numbers</div>
                    <div className="text-3xl font-bold text-orange-600">
                      {series.availableNumbers}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registration Opens</span>
                      <span className="font-semibold">{series.registrationStartDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Auction Starts</span>
                      <span className="font-semibold">{series.auctionStartDate}</span>
                    </div>
                  </div>

                  {isAuthed && (
                    <Button asChild className="w-full group-hover:bg-primary/90">
                      <Link to="/auction-series/$seriesId" params={{ seriesId: series.id }}>
                        View Numbers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-12 md:p-16">
            {/* Background effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
                style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
              />
              <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
              />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            <div className="relative text-center space-y-6 max-w-3xl mx-auto">
              <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400 border-0">
                🎯 Limited Time Offer
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Perfect Plate is{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Waiting
                </span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Join 12,400+ users who have already secured their dream registration numbers. Start bidding today.
              </p>
              {!isAuthed && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-slate-950 hover:bg-slate-100 font-bold px-8 h-12 shadow-2xl"
                  >
                    <Link to="/register">
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border border-white/20 bg-white/5 backdrop-blur text-white hover:bg-white/10 font-semibold px-8 h-12"
                  >
                    <Link to="/login">Already a Member?</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
