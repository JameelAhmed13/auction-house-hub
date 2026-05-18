import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { Search, Download, UserCheck, MapPin, MoreVertical, Eye, Edit } from "lucide-react";
import { members } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/members")({ component: AdminMembersPage });

function AdminMembersPage() {
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");

  const filtered = members.filter((m) => {
    if (search && !`${m.firstName} ${m.lastName} ${m.cnic} ${m.email}`.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (districtFilter !== "all" && m.district !== districtFilter) return false;
    return true;
  });

  const districts = Array.from(new Set(members.map((m) => m.district)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Members Management"
        subtitle="View and manage all registered members"
        actions={
          <Button variant="outline" onClick={() => toast.success("Exporting members...")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{members.length}</div>
                <div className="text-xs text-muted-foreground">Total Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-2xl font-bold text-emerald-600">
              {members.filter((m) => m.status === "active").length}
            </div>
            <div className="text-xs text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-2xl font-bold text-amber-600">
              {members.filter((m) => m.status === "pending").length}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-2xl font-bold text-red-600">
              {members.filter((m) => m.status === "suspended").length}
            </div>
            <div className="text-xs text-muted-foreground">Suspended</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="District" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>CNIC</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                          {member.firstName[0]}{member.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium">{member.firstName} {member.lastName}</div>
                          <div className="text-xs text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{member.cnic}</TableCell>
                    <TableCell className="text-xs">{member.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {member.district}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        member.status === "active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                        member.status === "suspended" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                        "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{member.totalApplications}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{member.memberSince}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info("View profile")}>
                            <Eye className="h-4 w-4 mr-2" />View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("Edit member")}>
                            <Edit className="h-4 w-4 mr-2" />Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
