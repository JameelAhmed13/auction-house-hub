import { createFileRoute, useParams } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, auctions } from "@/lib/dummy-data";

export const Route = createFileRoute("/$auctionId/upcoming-auction-sale-list")({ component: Page });
function Page() {
  const { auctionId } = useParams({ from: "/$auctionId/upcoming-auction-sale-list" });
  const auction = auctions.find((a) => a.id === auctionId) ?? auctions[0];
  return <VehiclesListPage title={`Upcoming Sale List — ${auction.name}`} subtitle={`${auction.location} · ${auction.vehiclesCount} vehicles`} vehicles={vehiclesByStatus.upcoming} />;
}
