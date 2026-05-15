import { Outlet, useRouterState } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { AppFooter } from "@/components/app-footer";
import { useAuth, useTheme } from "@/lib/auth-store";

export function AppShell() {
  useTheme(); // ensure theme class applied
  const { isAuthed } = useAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isAuthPage = ["/login", "/register", "/forgot-password", "/verify-otp", "/reset-password",
    "/select-role", "/select-seller-type", "/register-organization"].includes(path);

  if (isAuthPage) {
    return <div className="min-h-screen bg-background"><Outlet /></div>;
  }

  if (!isAuthed) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <AppNavbar />
        <main className="flex-1"><Outlet /></main>
        <AppFooter />
      </div>
    );
  }

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
