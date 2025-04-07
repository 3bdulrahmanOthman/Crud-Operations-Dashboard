import { SidebarNavItem } from "@/types";


export interface DashboardConfig {
  sidebarHeader: SidebarNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarHeader: [
    {
      title: "Dashboard",
      icon: "logo",
      description: "Dashboard Page",
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Overview",
          path: "/dashboard",
          icon: "dashboard",
          active: true,
        },
      ],
    },
    {
      title: "Store",
      items: [
        {
          title: "Products",
          path: "/dashboard/products",
          icon: "product",
        },
      ],
    },
    {
      title: "Users",
      items: [
        {
          title: "Users",
          path: "/dashboard/users",
          icon: "userGroup",
        },
      ],
    },
  ],
};


