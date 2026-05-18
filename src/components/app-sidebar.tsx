import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Layers, Gem, Briefcase, FileText, BadgePlus, Gavel, Trophy,
  Calendar, HelpCircle, Lock, LogOut,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
  SidebarFooter, SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";

type Item = { title: string; url: string; icon: any };

const menuItems: Item[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Series", url: "/auction-series", icon: Layers },
  { title: "Vanity", url: "/vanity", icon: Gem },
  { title: "Corporate Vanity", url: "/vanity-corporate", icon: Briefcase },
  { title: "My Applications", url: "/my-applications", icon: FileText },
  { title: "Advance Numbers", url: "/advance-numbers", icon: BadgePlus },
  { title: "Bidding", url: "/bidding", icon: Gavel },
  { title: "Winners", url: "/winners", icon: Trophy },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "How to E-Auction", url: "/how-to-auction", icon: HelpCircle },
  { title: "Change Password", url: "/change-password", icon: Lock },
];

export function AppSidebar() {
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
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 text-primary font-bold text-base shadow-md">
            E
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="font-display text-sm font-bold text-sidebar-foreground whitespace-nowrap">E-Auction</span>
              <span className="text-[10px] text-sidebar-foreground/60 whitespace-nowrap">Balochistan</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const active = path === item.url;
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
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
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
