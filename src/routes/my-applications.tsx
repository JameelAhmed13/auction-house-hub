import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { myApplications, UserApplication } from "@/lib/dummy-data";
import { useState } from "react";

export const Route = createFileRoute("/my-applications")({ component: MyApplicationsPage });

const statusBadgeVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
  withdrawn: "outline",
};

function MyApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filterApplications = (type?: string): UserApplication[] => {
    if (type === "all") return myApplications;
    return myApplications.filter((app) => app.type === type);
  };

  const categories = ["all", "standard", "vanity", "corporate-vanity", "advance"] as const;
  const categoryLabels: Record<typeof categories[number], string> = {
    all: "All Applications",
    standard: "Motor Cycle",
    vanity: "Motor Car",
    "corporate-vanity": "Commercial",
    advance: "Vanity",
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Applications"
        subtitle="View and manage your auction applications"
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-xs md:text-sm">
              {categoryLabels[cat]}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const apps = filterApplications(category === "all" ? undefined : category);
          return (
            <TabsContent key={category} value={category} className="mt-6">
              {apps.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No applications found for {categoryLabels[category].toLowerCase()}.
                  </CardContent>
                </Card>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Application ID</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Series</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>PSID</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apps.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-mono text-sm">{app.applicationId}</TableCell>
                          <TableCell className="font-semibold">{app.registrationNumber || "-"}</TableCell>
                          <TableCell>{app.seriesName || "-"}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{app.submittedDate}</TableCell>
                          <TableCell className="font-mono text-sm">{app.psid || "-"}</TableCell>
                          <TableCell>
                            <Badge variant={app.paymentStatus === "paid" ? "default" : "secondary"}>
                              {app.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusBadgeVariant[app.status]}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
