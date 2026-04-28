import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground border-none">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300 min-h-screen relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 w-full h-full pb-24 md:pb-8">
          <div className="mx-auto max-w-7xl h-full space-y-8">
            <Outlet />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
