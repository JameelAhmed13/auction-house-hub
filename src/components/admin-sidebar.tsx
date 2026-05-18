import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Shield, UserCheck, Gavel, FileText,
  Settings, BarChart3, LogOut, ChevronLeft, Hash, Trophy,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";

type AdminItem = { title: string; url: string; icon: any; badge?: string };
type AdminGroup = { label: string; items: AdminItem[] };

const adminGroups: AdminGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "User Management",
    items: [
      { title: "Users", url: "/admin/users", icon: Users },
      { title: "Roles", url: "/admin/roles", icon: Shield },
      { title: "Members", url: "/admin/members", icon: UserCheck },
    ],
  },
  {
    label: "Auctions",
    items: [
      { title: "All Auctions", url: "/admin/auctions", icon: Gavel },
      { title: "Number Plates", url: "/admin/plates", icon: Hash },
      { title: "Winners", url: "/admin/winners", icon: Trophy },
    ],
  },
  {
    label: "Configuration",
    items: [
      { title: "Applications", url: "/admin/applications", icon: FileText },
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";

  const handleLogout = async () => {
    logout();
    await navigate({ to: "/login" });
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold text-base shadow-md">
            <Shield className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="font-display text-sm font-bold text-sidebar-foreground whitespace-nowrap">
                Admin Panel
              </span>
              <span className="text-[10px] text-sidebar-foreground/60 whitespace-nowrap">
                E-Auction Control
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {adminGroups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-semibold">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const active = path === item.url || (item.url !== "/admin" && path.startsWith(item.url));
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.title}
                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-yellow-400 data-[active=true]:text-primary data-[active=true]:font-semibold transition-all"
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white font-bold">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Link to="/dashboard">
            <ChevronLeft className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to App</span>}
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-red-200 hover:bg-red-500/20 hover:text-red-100"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
