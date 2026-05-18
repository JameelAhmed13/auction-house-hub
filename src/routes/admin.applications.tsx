import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/page-header";
import {
  FileText, Search, MoreVertical, CheckCircle2, XCircle, Eye, Clock, AlertCircle, Download,
} from "lucide-react";
import { myApplications } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/applications")({ component: AdminApplicationsPage });

function AdminApplicationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = myApplications.filter((app) => {
    if (search && !`${app.applicationId} ${app.cnicNumber} ${app.registrationNumber}`.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (typeFilter !== "all" && app.type !== typeFilter) return false;
    if (activeTab !== "all" && app.status !== activeTab) return false;
    return true;
  });

  const handleApprove = (id: string) => {
    toast.success(`Application ${id} approved`);
  };
  const handleReject = (id: string) => {
    toast.error(`Application ${id} rejected`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        subtitle="Review and process auction applications"
        actions={
          <Button variant="outline" onClick={() => toast.success("Exporting applications...")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={FileText} label="Total"
          value={myApplications.length.toString()}
          color="bg-blue-100 text-blue-700"
        />
        <StatCard
          icon={Clock} label="Pending"
          value={myApplications.filter((a) => a.status === "pending").length.toString()}
          color="bg-amber-100 text-amber-700"
        />
        <StatCard
          icon={CheckCircle2} label="Approved"
          value={myApplications.filter((a) => a.status === "approved").length.toString()}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          icon={XCircle} label="Rejected"
          value={myApplications.filter((a) => a.status === "rejected").length.toString()}
          color="bg-red-100 text-red-700"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ID, CNIC, or registration number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="vanity">Vanity</SelectItem>
                <SelectItem value="corporate-vanity">Corporate Vanity</SelectItem>
                <SelectItem value="advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({myApplications.length})</TabsTrigger>
          <TabsTrigger value="pending">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Pending ({myApplications.filter((a) => a.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Approved ({myApplications.filter((a) => a.status === "approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Rejected ({myApplications.filter((a) => a.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="font-semibold mb-1">No applications found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>App ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>CNIC</TableHead>
                      <TableHead>Plate</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>PSID</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-xs">{app.applicationId}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs capitalize">
                            {app.type.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{app.cnicNumber}</TableCell>
                        <TableCell className="font-semibold">{app.registrationNumber || "—"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{app.submittedDate}</TableCell>
                        <TableCell className="font-mono text-xs">{app.psid || "—"}</TableCell>
                        <TableCell>
                          <Badge className={
                            app.paymentStatus === "paid"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }>
                            {app.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            app.status === "approved" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                            app.status === "rejected" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                            app.status === "withdrawn" ? "bg-gray-100 text-gray-700 hover:bg-gray-100" :
                            "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {app.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost" size="icon" className="h-7 w-7 text-emerald-600 hover:bg-emerald-50"
                                  onClick={() => handleApprove(app.applicationId)}
                                  title="Approve"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost" size="icon" className="h-7 w-7 text-red-600 hover:bg-red-50"
                                  onClick={() => handleReject(app.applicationId)}
                                  title="Reject"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                                <DropdownMenuItem><AlertCircle className="h-4 w-4 mr-2" />Request Info</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
