import { createFileRoute } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, allVehicles } from "@/lib/dummy-data";
export const Route = createFileRoute("/online-joined-auctions")({
  component: Page,
});

function Page() {
  return <VehiclesListPage title="Online Joined Auctions" subtitle="Auctions you've joined online" vehicles={vehiclesByStatus.live.slice(0,6)} />;
}
