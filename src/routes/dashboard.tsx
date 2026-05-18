import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import {
  Layers, Gem, FileText, BadgePlus, Gavel, Trophy, Calendar, HelpCircle,
  LayoutGrid, Briefcase,
} from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { auctionSeries, vanityPlates, getSeriesByCategory } from "@/lib/dummy-data";
import { PlateDisplay } from "@/components/plate-display";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const quickAccessCards = [
  { title: "Series", icon: Layers, color: "bg-teal-100 text-teal-700", to: "/auction-series" },
  { title: "Advance Number", icon: BadgePlus, color: "bg-orange-100 text-orange-700", to: "/advance-numbers" },
  { title: "My Applications", icon: FileText, color: "bg-purple-100 text-purple-700", to: "/my-applications" },
  { title: "Schedule", icon: Calendar, color: "bg-green-100 text-green-700", to: "/schedule" },
  { title: "Bidding", icon: Gavel, color: "bg-red-100 text-red-700", to: "/bidding" },
  { title: "Winners", icon: Trophy, color: "bg-blue-100 text-blue-700", to: "/winners" },
];

const SeriesCard = ({ series }: { series: typeof auctionSeries[0] }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-semibold text-muted-foreground">{series.category}</div>
          <div className="text-lg font-bold">{series.code}</div>
        </div>
        <Badge variant="outline">{series.reauction ? "Re-Auction" : "Active"}</Badge>
      </div>
      <div className="bg-blue-50 rounded p-2 mb-3 text-center">
        <div className="text-xs text-muted-foreground">Available Numbers</div>
        <div className="text-xl font-bold text-primary">{series.availableNumbers}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-muted-foreground">Reg Start</div>
          <div className="font-semibold">{series.registrationStartDate}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-muted-foreground">Auction Start</div>
          <div className="font-semibold">{series.auctionStartDate}</div>
        </div>
      </div>
      <Button asChild className="w-full" variant="outline" size="sm">
        <Link to="/auction-series/$seriesId" params={{ seriesId: series.id }}>Select</Link>
      </Button>
    </CardContent>
  </Card>
);

const VanityPlateCard = ({ plate }: { plate: typeof vanityPlates[0] }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-muted-foreground">{plate.category}</div>
        <Badge variant={plate.status === "live" ? "default" : "secondary"}>{plate.status}</Badge>
      </div>
      <div className="flex justify-center mb-3">
        <PlateDisplay plateNumber={plate.plateNumber} size="md" />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div>
          <div className="text-muted-foreground">Reserve</div>
          <div className="font-semibold">PKR {plate.reservePrice.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Current Bid</div>
          <div className="font-semibold text-primary">{plate.currentBid ? `PKR ${plate.currentBid.toLocaleString()}` : "-"}</div>
        </div>
      </div>
      <Button asChild className="w-full" variant="outline" size="sm">
        <Link to="/vanity">Select</Link>
      </Button>
    </CardContent>
  </Card>
);

function Dashboard() {
  const { user } = useAuth();
  const motorCarSeries = getSeriesByCategory("Motor Car");
  const vanityGold = vanityPlates.filter((v) => v.category === "Gold").slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title={`Welcome, ${user?.firstName ?? "User"} 👋`}
        subtitle="Excise E-Auction Portal"
      />

      {/* Hero Banner */}
      <div className="rounded-lg bg-hero-dark text-white p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-4">E-AUCTION</h2>
        <p className="max-w-2xl text-white/80">
          Unlock Prestige and Personalization, Join Our Exclusive E-Auction for Unique Automobile Registration Numbers. Bid Now to Secure the Perfect Plate for Your Vehicle!
        </p>
      </div>

      {/* Quick Access Cards */}
      <div>
        <h3 className="mb-4 text-lg font-bold">Quick Access</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {quickAccessCards.map((card) => (
            <Link key={card.title} to={card.to} className="block">
              <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardContent className="p-4 h-32 flex flex-col items-center justify-center text-center">
                  <div className={`p-3 rounded-lg mb-2 ${card.color}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{card.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Vanity Auction Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Vanity Auction</h3>
          <Button asChild variant="ghost" size="sm">
            <Link to="/vanity">View All →</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {vanityGold.map((plate) => (
            <VanityPlateCard key={plate.id} plate={plate} />
          ))}
        </div>
      </div>

      {/* Available Series Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Available Series for Auctions</h3>
          <Button asChild variant="ghost" size="sm">
            <Link to="/auction-series">View All →</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {motorCarSeries.slice(0, 3).map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>

      {/* Re-Auction Section */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold">Available Series for Re-Auction</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {auctionSeries.filter((s) => s.reauction).map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>
    </div>
  );
}
