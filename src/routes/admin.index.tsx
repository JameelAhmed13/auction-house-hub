import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import {
  Users, Gavel, Hash, Trophy, TrendingUp, Shield, UserCheck,
  Activity, ArrowRight, AlertCircle, CheckCircle2,
} from "lucide-react";
import { users, roles, members, auctions, numberPlates, bids } from "@/lib/dummy-data";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

function AdminDashboard() {
  const stats = [
    {
      label: "Total Users", value: users.length.toString(), icon: Users,
      change: "+12%", color: "from-blue-500 to-indigo-600", link: "/admin/users",
    },
    {
      label: "Active Auctions",
      value: auctions.filter((a) => a.status === "live").length.toString(),
      icon: Gavel, change: "+3 today",
      color: "from-red-500 to-orange-600", link: "/admin/auctions",
    },
    {
      label: "Number Plates", value: numberPlates.length.toString(), icon: Hash,
      change: "+8 added", color: "from-amber-500 to-yellow-600", link: "/admin/plates",
    },
    {
      label: "Total Bids", value: bids.length.toString(), icon: TrendingUp,
      change: "+24%", color: "from-emerald-500 to-teal-600", link: "/admin/auctions",
    },
  ];

  const recentUsers = users.slice(0, 5);
  const recentAuctions = auctions.slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage your E-Auction platform"
        actions={
          <Button asChild>
            <Link to="/admin/auctions">
              <Gavel className="mr-2 h-4 w-4" />
              Create Auction
            </Link>
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link}>
            <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer overflow-hidden h-full">
              <CardContent className="p-5 relative">
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md mb-3`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-semibold">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Auctions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Auctions</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/auctions">View All <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAuctions.map((auction) => (
                <div key={auction.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      auction.status === "live" ? "bg-red-100 text-red-700" :
                      auction.status === "upcoming" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      <Gavel className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{auction.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-[10px] h-4">
                          {auction.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {auction.plateIds.length} plates · {auction.totalParticipants} bidders
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={
                    auction.status === "live" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                    auction.status === "upcoming" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                    "bg-gray-100 text-gray-700 hover:bg-gray-100"
                  }>
                    {auction.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{role.name}</span>
                  </div>
                  <Badge variant="secondary">{role.userCount}</Badge>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full mt-3">
                <Link to="/admin/roles">Manage Roles</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-900">System Status</div>
                  <div className="text-sm text-emerald-700 mt-1">All systems operational</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                    <Activity className="h-3 w-3" />
                    99.9% uptime
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Users</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/users">View All <ArrowRight className="ml-1 h-3 w-3" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">User</th>
                  <th className="pb-2 font-medium">CNIC</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium text-right">Activity</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs">{user.cnic}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="capitalize">{user.role}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge className={
                        user.status === "active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                        user.status === "suspended" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                        "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right text-xs text-muted-foreground">
                      {user.totalBids ?? 0} bids · {user.totalWins ?? 0} wins
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
