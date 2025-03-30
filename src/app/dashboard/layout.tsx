import { SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from "next";
import DashboardHeader from "@/components/layouts/dashboard-header";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";

export const metadata: Metadata = {
  title: "Dashboard overview",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="w-full h-full mx-auto">
        <DashboardHeader />
        <ScrollArea className="h-[calc(100vh-4rem)] px-4 overflow-hidden">
          {children}
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
}
