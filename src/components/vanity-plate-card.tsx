import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VanityPlate } from "@/lib/dummy-data";
import { PlateDisplay } from "@/components/plate-display";

interface VanityPlateCardProps {
  plate: VanityPlate;
  onClick?: () => void;
}

export function VanityPlateCardComponent({ plate, onClick }: VanityPlateCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-muted-foreground">{plate.category}</div>
          <Badge variant={plate.status === "live" ? "default" : "secondary"}>
            {plate.status.charAt(0).toUpperCase() + plate.status.slice(1)}
          </Badge>
        </div>

        {/* Number Plate Preview */}
        <div className="flex justify-center mb-3">
          <PlateDisplay plateNumber={plate.plateNumber} size="md" />
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-muted-foreground">Reserve Price</div>
            <div className="font-semibold">PKR {plate.reservePrice.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-muted-foreground">Current Bid</div>
            <div className="font-semibold text-primary">
              {plate.currentBid ? `PKR ${plate.currentBid.toLocaleString()}` : "-"}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="text-xs text-muted-foreground mb-3 space-y-1">
          <div>Start: {plate.auctionStartDate}</div>
          <div>End: {plate.auctionEndDate}</div>
        </div>

        <Button asChild className="w-full" variant="outline" size="sm" onClick={onClick}>
          <Link to="/vanity">Select</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
