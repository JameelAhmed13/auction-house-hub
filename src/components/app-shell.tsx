import { Outlet, useRouterState } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { AppFooter } from "@/components/app-footer";
import { useAuth, useTheme } from "@/lib/auth-store";

export function AppShell() {
  useTheme();
  const { isAuthed, user } = useAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(path);
  const isAdminPage = path.startsWith("/admin");
  const isLandingPage =
    path === "/" ||
    path === "/inventory" ||
    path === "/auctions" ||
    path === "/about" ||
    path === "/contact" ||
    path === "/terms" ||
    path === "/privacy" ||
    path.startsWith("/auctions/") ||
    path.startsWith("/plates/") ||
    path.startsWith("/join-auction/");

  // Auth pages: no chrome
  if (isAuthPage) {
    return <div className="min-h-screen bg-background"><Outlet /></div>;
  }

  // Admin layout with admin sidebar
  if (isAdminPage && user?.role === "admin") {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AdminSidebar />
          <SidebarInset className="flex min-w-0 flex-1 flex-col">
            <AppNavbar />
            <main className="flex-1 p-4 md:p-6 lg:p-8"><Outlet /></main>
            <AppFooter />
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  // Landing/public pages: navbar + footer, no sidebar
  if (isLandingPage) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <AppNavbar />
        <main className="flex-1"><Outlet /></main>
        <AppFooter />
      </div>
    );
  }

  // Unauthenticated: just navbar
  if (!isAuthed) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <AppNavbar />
        <main className="flex-1"><Outlet /></main>
        <AppFooter />
      </div>
    );
  }

  // Authenticated dashboard layout
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <AppNavbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8"><Outlet /></main>
          <AppFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
