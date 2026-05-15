import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/cash-pickup-locations")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Cash Pickup Locations" subtitle="Physical drop-off & deposit centers" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card key=1><CardContent className="p-5"><div className="font-display font-semibold">Pickup Center #1</div><div className="mt-1 text-xs text-muted-foreground">Industrial Area, Dubai · Sun–Thu 9–6</div><Button size="sm" className="mt-3" variant="outline">Get directions</Button></CardContent></Card><Card key=2><CardContent className="p-5"><div className="font-display font-semibold">Pickup Center #2</div><div className="mt-1 text-xs text-muted-foreground">Industrial Area, Dubai · Sun–Thu 9–6</div><Button size="sm" className="mt-3" variant="outline">Get directions</Button></CardContent></Card><Card key=3><CardContent className="p-5"><div className="font-display font-semibold">Pickup Center #3</div><div className="mt-1 text-xs text-muted-foreground">Industrial Area, Dubai · Sun–Thu 9–6</div><Button size="sm" className="mt-3" variant="outline">Get directions</Button></CardContent></Card><Card key=4><CardContent className="p-5"><div className="font-display font-semibold">Pickup Center #4</div><div className="mt-1 text-xs text-muted-foreground">Industrial Area, Dubai · Sun–Thu 9–6</div><Button size="sm" className="mt-3" variant="outline">Get directions</Button></CardContent></Card><Card key=5><CardContent className="p-5"><div className="font-display font-semibold">Pickup Center #5</div><div className="mt-1 text-xs text-muted-foreground">Industrial Area, Dubai · Sun–Thu 9–6</div><Button size="sm" className="mt-3" variant="outline">Get directions</Button></CardContent></Card><Card key=6><CardContent className="p-5"><div className="font-display font-semibold">Pickup Center #6</div><div className="mt-1 text-xs text-muted-foreground">Industrial Area, Dubai · Sun–Thu 9–6</div><Button size="sm" className="mt-3" variant="outline">Get directions</Button></CardContent></Card>
</div>
    </div>
  );
}
