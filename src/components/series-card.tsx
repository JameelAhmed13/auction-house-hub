import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuctionSeries } from "@/lib/dummy-data";

interface SeriesCardProps {
  series: AuctionSeries;
  onClick?: () => void;
}

export function SeriesCardComponent({ series, onClick }: SeriesCardProps) {
  return (
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

        <div className="space-y-2 mb-3 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Registration:</span>
            <span className="font-semibold">{series.registrationStartDate} to {series.registrationEndDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Auction:</span>
            <span className="font-semibold">{series.auctionStartDate} to {series.auctionEndDate}</span>
          </div>
        </div>

        <Button asChild className="w-full" variant="outline" size="sm" onClick={onClick}>
          <Link to="/auction-series/$seriesId" params={{ seriesId: series.id }}>Select</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
