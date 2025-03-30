import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserNav } from "../dashboard/user-profile";
import { NavGroup } from "../dashboard/nav-group";
import { NavHeader } from "../dashboard/nav-header";
import { dashboardConfig } from "@/config/dashboard";
import { Combobox } from "../combobox";

const DashboardSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <NavHeader data={dashboardConfig.sidebarHeader} />
        <SidebarMenu className="flex md:hidden">
          <SidebarMenuItem>
            <Combobox data={dashboardConfig.sidebarNav} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {dashboardConfig.sidebarNav.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
