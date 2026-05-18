import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { SeriesCardComponent } from "@/components/series-card";
import { auctionSeries, VehicleCategory } from "@/lib/dummy-data";
import { useState } from "react";

export const Route = createFileRoute("/auction-series")({ component: AuctionSeriesPage });

function AuctionSeriesPage() {
  const [activeTab, setActiveTab] = useState<VehicleCategory>("Motor Cycle");

  const categories: VehicleCategory[] = ["Motor Cycle", "Motor Car", "Commercial"];
  const filteredSeries = auctionSeries.filter((s) => s.category === activeTab);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auction Series"
        subtitle="Select a series to view available registration numbers"
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as VehicleCategory)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Motor Cycle">Motor Cycle</TabsTrigger>
          <TabsTrigger value="Motor Car">Motor Car</TabsTrigger>
          <TabsTrigger value="Commercial">Commercial</TabsTrigger>
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4 mt-6">
            <div className="text-sm text-muted-foreground">
              {filteredSeries.length} series available for {category}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSeries.map((series) => (
                <SeriesCardComponent key={series.id} series={series} />
              ))}
            </div>
            {filteredSeries.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No {category} series available at this time
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
