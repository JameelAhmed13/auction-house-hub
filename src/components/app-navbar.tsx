import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown, Lock, LogOut, LogIn, Shield, Hash, Gavel, Home, LayoutDashboard, Menu,
  Bell, User as UserIcon, Trophy, Receipt, CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth, logout as authLogout } from "@/lib/auth-store";
import { getUnreadNotifications } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

export function AppNavbar() {
  const { user, isAuthed, isAdmin } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const isLandingArea =
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
  const isAdminArea = path.startsWith("/admin");
  const showSidebarTrigger = isAuthed && !isLandingArea;

  const handleLogout = async () => {
    authLogout();
    await navigate({ to: "/login" });
  };

  const publicLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/inventory", label: "Inventory", icon: Hash },
    { to: "/auctions", label: "Auctions", icon: Gavel },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {showSidebarTrigger && (
        <SidebarTrigger className="text-foreground hover:bg-accent hover:text-accent-foreground" />
      )}

      {/* Left: Brand */}
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-md">
          ب
        </div>
        <div className="hidden sm:flex flex-col leading-tight">
          <div className="text-sm font-bold text-foreground">E-Auction</div>
          <div className="text-[10px] text-muted-foreground">Balochistan Excise</div>
        </div>
      </Link>

      {/* Center: Public Navigation (only on landing) */}
      {isLandingArea && (
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {publicLinks.map((link) => {
            const active = path === link.to || (link.to !== "/" && path.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Mobile Menu (for landing) */}
        {isLandingArea && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 lg:hidden">
              {publicLinks.map((link) => (
                <DropdownMenuItem key={link.to} onClick={() => navigate({ to: link.to })}>
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {isAuthed && user ? (
          <>
            {/* Admin Badge/Link (visible when admin and not in admin area) */}
            {isAdmin && !isAdminArea && (
              <Button asChild variant="outline" size="sm" className="hidden md:inline-flex border-red-200 text-red-700 hover:bg-red-50">
                <Link to="/admin">
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  Admin Panel
                </Link>
              </Button>
            )}

            {/* Dashboard link (for non-landing) */}
            {isLandingArea && (
              <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
                <Link to="/dashboard">
                  <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
                  Dashboard
                </Link>
              </Button>
            )}

            {/* Notifications */}
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/notifications" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {getUnreadNotifications().length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
                )}
              </Link>
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {user.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium md:inline">{user.firstName}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-sm font-semibold">{user.firstName} {user.lastName}</div>
                  <div className="text-xs font-normal text-muted-foreground">{user.cnic}</div>
                  <div className="text-xs font-normal text-primary capitalize mt-1">{user.role}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/my-wins" })}>
                  <Trophy className="mr-2 h-4 w-4 text-amber-600" />
                  My Wins
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/challans" })}>
                  <CreditCard className="mr-2 h-4 w-4 text-orange-600" />
                  Challans
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/invoices" })}>
                  <Receipt className="mr-2 h-4 w-4 text-emerald-600" />
                  Invoices
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/notifications" })}>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
                    <Shield className="mr-2 h-4 w-4 text-red-600" />
                    <span className="text-red-600">Admin Panel</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate({ to: "/change-password" })}>
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/login" })}>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" onClick={() => navigate({ to: "/register" })}>
              Register
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
