import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Moon, Sun, User2, Gavel, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth, useTheme, setMode, logout } from "@/lib/auth-store";
import { notifications } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/inventory", label: "Inventory" },
  { to: "/todays-auctions", label: "Today" },
  { to: "/upcoming-auctions", label: "Upcoming" },
  { to: "/locations", label: "Locations" },
  { to: "/deposit-plans", label: "Plans" },
  { to: "/about-us", label: "About" },
  { to: "/contact-us", label: "Contact" },
];

export function AppNavbar() {
  const { user, isAuthed } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/85 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/70 md:px-6">
      {isAuthed && <SidebarTrigger className="md:hidden" />}
      <Link to="/" className="flex items-center gap-2 md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-gold">
          <Gavel className="h-4 w-4 text-primary-foreground" />
        </div>
      </Link>

      <nav className="hidden flex-1 items-center gap-1 md:flex">
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-primary"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        {isAuthed && user && (
          <div className="hidden items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs font-medium md:flex">
            <span className={cn("uppercase tracking-wider", user.currentMode === "buyer" ? "text-primary" : "text-muted-foreground")}>Buyer</span>
            <Switch
              checked={user.currentMode === "seller"}
              onCheckedChange={(v) => setMode(v ? "seller" : "buyer")}
            />
            <span className={cn("uppercase tracking-wider", user.currentMode === "seller" ? "text-primary" : "text-muted-foreground")}>Seller</span>
          </div>
        )}

        <Button size="icon" variant="ghost" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-live px-1 text-[10px] font-bold text-live-foreground">
                  {unread}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="font-semibold">Notifications</span>
              <Badge variant="secondary">{unread} new</Badge>
            </div>
            <ScrollArea className="h-80">
              <ul className="divide-y">
                {notifications.map((n) => (
                  <li key={n.id} className={cn("px-4 py-3 text-sm", !n.read && "bg-secondary/50")}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium">{n.title}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {isAuthed && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 gap-2 px-2">
                <Avatar className="h-7 w-7"><AvatarImage src={user.avatar} /><AvatarFallback>{user.firstName[0]}</AvatarFallback></Avatar>
                <span className="hidden text-sm font-medium md:inline">{user.firstName}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-sm font-semibold">{user.firstName} {user.lastName}</div>
                <div className="text-xs font-normal text-muted-foreground">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>Dashboard</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>My Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/deposit-plans" })}>Current Plan</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/switch-to-organization" })}>Switch to Organization</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/" }); }} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/login" })}>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
            <Button size="sm" className="hidden md:inline-flex" onClick={() => navigate({ to: "/register" })}>
              Get Started
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
