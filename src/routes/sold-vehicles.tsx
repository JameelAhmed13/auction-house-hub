import { createFileRoute } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, allVehicles } from "@/lib/dummy-data";
export const Route = createFileRoute("/sold-vehicles")({
  component: Page,
});

function Page() {
  return <VehiclesListPage title="Sold Vehicles" subtitle="Closed deals" vehicles={vehiclesByStatus.sold} />;
}
