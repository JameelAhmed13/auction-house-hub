import { createFileRoute } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, allVehicles } from "@/lib/dummy-data";
export const Route = createFileRoute("/upcoming-auctions")({
  component: Page,
});

function Page() {
  return <VehiclesListPage title="Upcoming Auctions" subtitle="Pre-register and never miss a deal" vehicles={vehiclesByStatus.upcoming} />;
}
