import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { schedules, VehicleCategory } from "@/lib/dummy-data";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/schedule")({ component: SchedulePage });

function SchedulePage() {
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);
  const categories: VehicleCategory[] = ["Motor Cycle", "Motor Car", "Commercial"];

  const filterSchedules = (category: VehicleCategory) => {
    return schedules.filter((s) => s.category === category);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Series Schedule"
        subtitle="View auction timelines and registration periods"
      />

      <Tabs defaultValue="Motor Cycle">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const categorySchedules = filterSchedules(category);
          return (
            <TabsContent key={category} value={category} className="mt-6">
              {categorySchedules.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No schedules available for {category}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2 border rounded-lg divide-y">
                  {categorySchedules.map((schedule) => (
                    <div key={schedule.id}>
                      <button
                        onClick={() =>
                          setExpandedSchedule(
                            expandedSchedule === schedule.id ? null : schedule.id
                          )
                        }
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 text-left"
                      >
                        <div>
                          <div className="font-semibold">{schedule.seriesCode} - {schedule.seriesName}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Reg: {schedule.registrationStartDate} to {schedule.registrationEndDate}
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedSchedule === schedule.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedSchedule === schedule.id && (
                        <div className="px-4 py-3 bg-muted/30 border-t">
                          <div className="grid gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Registration Start</span>
                              <span className="font-semibold">{schedule.registrationStartDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Registration End</span>
                              <span className="font-semibold">{schedule.registrationEndDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Auction Start</span>
                              <span className="font-semibold">{schedule.auctionStartDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Auction End</span>
                              <span className="font-semibold">{schedule.auctionEndDate}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
