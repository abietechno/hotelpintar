import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarRange, BedDouble, ReceiptText, Users, Webhook, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/bookings", label: "Bookings", icon: CalendarRange },
  { path: "/rooms", label: "Room Management", icon: BedDouble },
  { path: "/finance", label: "Financial Reports", icon: ReceiptText },
  { path: "/departments", label: "Departments", icon: Users },
  { path: "/integrations", label: "Integrations", icon: Webhook },
  { path: "/settings/users", label: "User Settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      <div className="hidden lg:flex flex-col w-64 h-screen fixed inset-y-0 left-0 bg-background border-r border-border z-20">
        <div className="h-14 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
              H
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground">HotelPintar</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-muted-foreground">AD</span>
             </div>
             <div className="flex flex-col">
               <span className="text-sm font-medium text-foreground leading-none mb-1">Admin User</span>
               <span className="text-xs text-muted-foreground leading-none">admin@toscaerp.com</span>
             </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around z-30 px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
             <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
