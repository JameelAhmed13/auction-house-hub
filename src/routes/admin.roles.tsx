import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/page-header";
import { Shield, Plus, Edit, Trash2, Users, Lock } from "lucide-react";
import { roles } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";

const allPermissions = [
  { id: "users.manage", label: "Manage Users" },
  { id: "roles.manage", label: "Manage Roles" },
  { id: "auctions.manage", label: "Manage Auctions" },
  { id: "auctions.bid", label: "Place Bids" },
  { id: "auctions.view", label: "View Auctions" },
  { id: "members.manage", label: "Manage Members" },
  { id: "applications.create", label: "Create Applications" },
  { id: "applications.view", label: "View Applications" },
  { id: "reports.view", label: "View Reports" },
  { id: "profile.edit", label: "Edit Profile" },
];

export const Route = createFileRoute("/admin/roles")({ component: AdminRolesPage });

function AdminRolesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Define user roles and access control"
        actions={
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-1.5">
                  <Label>Role Name</Label>
                  <Input placeholder="e.g., Moderator" />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of this role's responsibilities" />
                </div>
                <div className="space-y-2">
                  <Label>Permissions ({selectedPermissions.length} selected)</Label>
                  <div className="border rounded-lg p-4 grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {allPermissions.map((perm) => (
                      <div key={perm.id} className="flex items-center gap-2">
                        <Checkbox
                          id={perm.id}
                          checked={selectedPermissions.includes(perm.id)}
                          onCheckedChange={() => togglePermission(perm.id)}
                        />
                        <Label htmlFor={perm.id} className="text-sm font-normal cursor-pointer">
                          {perm.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={() => {
                  toast.success("Role created successfully");
                  setShowAddDialog(false);
                  setSelectedPermissions([]);
                }}>Create Role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Roles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    role.name === "Administrator" ? "bg-red-100 text-red-700" :
                    role.name === "Buyer" ? "bg-emerald-100 text-emerald-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{role.name}</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      <Users className="h-3 w-3 inline mr-1" />
                      {role.userCount} {role.userCount === 1 ? "user" : "users"}
                    </CardDescription>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-600 hover:bg-red-50"
                    disabled={role.name === "Administrator"}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Lock className="h-3 w-3" />
                  Permissions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map((perm) => (
                    <Badge key={perm} variant="secondary" className="text-[10px]">
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
