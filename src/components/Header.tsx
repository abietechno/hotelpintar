import { Search, LogOut } from "lucide-react";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "./auth-provider";

import { Button } from "./ui/button";

export default function Header() {
  const location = useLocation();
  const pathPart = location.pathname.split("/").pop() || "";
  const pageTitle = pathPart.charAt(0).toUpperCase() + pathPart.slice(1);
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6 shrink-0">
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-6 h-6 bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
          H
        </div>
      </div>
      
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>
        <ModeToggle />
        <Button variant="ghost" size="icon" className="lg:hidden text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
          <LogOut className="h-5 w-5" />
        </Button>
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border border-border outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
