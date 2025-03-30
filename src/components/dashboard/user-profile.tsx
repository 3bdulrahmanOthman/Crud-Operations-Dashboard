"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { showErrorToast } from "@/lib/handle-error";
import { UserProps } from "@/types";
import ProfileMenu from "../account-menu";

export function UserNav() {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    try {
      logout();
      toast.success("Logout successful");
    } catch (error) {
      showErrorToast(error);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <ProfileMenu
            user={user as UserProps}
            logout={handleLogout}
            loading={loading}
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
