import { createFileRoute } from "@tanstack/react-router";
import { VehiclesListPage } from "@/components/vehicles-list-page";
import { vehiclesByStatus, allVehicles } from "@/lib/dummy-data";
export const Route = createFileRoute("/inventory")({
  component: Page,
});

function Page() {
  return <VehiclesListPage title="Inventory" subtitle="Search the full vehicle catalog" vehicles={allVehicles} />;
}
