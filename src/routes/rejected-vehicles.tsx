import { createFileRoute } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, allVehicles } from "@/lib/dummy-data";
export const Route = createFileRoute("/rejected-vehicles")({
  component: Page,
});

function Page() {
  return <VehiclesListPage title="Rejected Vehicles" subtitle="Submissions that need attention" vehicles={vehiclesByStatus.rejected} />;
}
