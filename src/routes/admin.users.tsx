import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { UserPlus, Search, MoreVertical, Edit, Trash2, Shield } from "lucide-react";
import { users } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/users")({ component: AdminUsersPage });

function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filtered = users.filter((u) => {
    if (search && !`${u.firstName} ${u.lastName} ${u.cnic} ${u.email}`.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users Management"
        subtitle="Manage all platform users"
        actions={
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>First Name</Label>
                    <Input placeholder="First name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last Name</Label>
                    <Input placeholder="Last name" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>CNIC</Label>
                  <Input placeholder="12345-1234567-1" />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" placeholder="user@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input placeholder="+923xxxxxxxxx" />
                </div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Select defaultValue="user">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={() => {
                  toast.success("User created successfully");
                  setShowAddDialog(false);
                }}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, CNIC, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="Filter by role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>CNIC</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bids / Wins</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{user.cnic}</TableCell>
                    <TableCell className="text-xs">{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.role === "admin" && <Shield className="h-3 w-3 mr-1" />}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        user.status === "active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                        user.status === "suspended" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                        "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="font-medium">{user.totalBids ?? 0}</span>
                      <span className="text-muted-foreground"> / </span>
                      <span className="text-emerald-600 font-medium">{user.totalWins ?? 0}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{user.registeredAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info("Edit user dialog")}>
                            <Edit className="h-4 w-4 mr-2" />Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("Change role")}>
                            <Shield className="h-4 w-4 mr-2" />Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.error("User deleted")}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No users found matching your filters
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
        <span className="font-semibold text-foreground">{users.length}</span> users
      </div>
    </div>
  );
}
