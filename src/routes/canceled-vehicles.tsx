import { createFileRoute } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, allVehicles } from "@/lib/dummy-data";
export const Route = createFileRoute("/canceled-vehicles")({
  component: Page,
});

function Page() {
  return <VehiclesListPage title="Cancelled Vehicles" subtitle="Withdrawn from auction" vehicles={vehiclesByStatus.cancelled} />;
}
