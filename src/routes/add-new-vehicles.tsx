import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/add-new-vehicles")({ component: Page });
function Page() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Add Vehicle" subtitle="List a new vehicle for auction" />
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Vehicle submitted for review"); navigate({ to: "/pending-vehicles" }); }}>
        <Card><CardContent className="p-6 space-y-4">
          <h3 className="font-display text-lg font-semibold">Photos</h3>
          <div className="flex aspect-[16/6] items-center justify-center rounded-xl border-2 border-dashed bg-secondary/40">
            <div className="text-center"><Upload className="mx-auto h-10 w-10 text-muted-foreground" /><p className="mt-2 text-sm font-medium">Click to upload photos</p><p className="text-xs text-muted-foreground">JPG, PNG · up to 20 photos</p></div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5"><Label>Make</Label><Input placeholder="BMW" /></div>
          <div className="space-y-1.5"><Label>Model</Label><Input placeholder="M340i" /></div>
          <div className="space-y-1.5"><Label>Year</Label><Input type="number" placeholder="2023" /></div>
          <div className="space-y-1.5"><Label>Mileage (km)</Label><Input type="number" placeholder="25000" /></div>
          <div className="space-y-1.5"><Label>VIN</Label><Input placeholder="WBA..." /></div>
          <div className="space-y-1.5"><Label>Color</Label><Input placeholder="Midnight Blue" /></div>
          <div className="space-y-1.5"><Label>Fuel</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>
              <SelectItem value="petrol">Petrol</SelectItem><SelectItem value="diesel">Diesel</SelectItem><SelectItem value="hybrid">Hybrid</SelectItem><SelectItem value="ev">Electric</SelectItem>
            </SelectContent></Select>
          </div>
          <div className="space-y-1.5"><Label>Transmission</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>
              <SelectItem value="auto">Automatic</SelectItem><SelectItem value="manual">Manual</SelectItem>
            </SelectContent></Select>
          </div>
          <div className="space-y-1.5 md:col-span-2"><Label>Description</Label><Textarea rows={4} placeholder="Tell buyers about your vehicle..." /></div>
          <div className="space-y-1.5"><Label>Reserve price (USD)</Label><Input type="number" placeholder="45000" /></div>
          <div className="space-y-1.5"><Label>Starting bid (USD)</Label><Input type="number" placeholder="35000" /></div>
        </CardContent></Card>
        <div className="flex justify-end gap-2"><Button type="button" variant="outline">Save draft</Button><Button type="submit">Submit for review</Button></div>
      </form>
    </div>
  );
}
