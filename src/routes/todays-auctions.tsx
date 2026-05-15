import { createFileRoute } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, allVehicles } from "@/lib/dummy-data";
export const Route = createFileRoute("/todays-auctions")({
  component: Page,
});

function Page() {
  return <VehiclesListPage title="Today's Auctions" subtitle="Live & ending today" vehicles={vehiclesByStatus.live} />;
}
