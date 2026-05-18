import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { VanityPlateCardComponent } from "@/components/vanity-plate-card";
import { vanityPlates, VanityCategory } from "@/lib/dummy-data";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/vanity")({ component: VanityPage });

function VanityPage() {
  const [activeTab, setActiveTab] = useState<VanityCategory>("Gold");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: VanityCategory[] = ["Gold", "Platinum"];

  const filteredPlates = vanityPlates.filter((plate) => {
    const matchesCategory = plate.category === activeTab;
    const matchesSearch = plate.plateNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vanity Plates"
        subtitle="Auction for unique and customized registration plates"
      />

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Vanity Numbers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as VanityCategory)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Gold">💎 Gold</TabsTrigger>
          <TabsTrigger value="Platinum">💎 Platinum</TabsTrigger>
        </TabsList>

        {categories.map((category) => {
          const plates = filteredPlates.filter((p) => p.category === category);
          return (
            <TabsContent key={category} value={category} className="mt-6 space-y-4">
              {plates.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No {category} vanity plates available
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {plates.map((plate) => (
                    <VanityPlateCardComponent key={plate.id} plate={plate} />
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
