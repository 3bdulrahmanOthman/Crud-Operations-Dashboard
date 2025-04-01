"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { UserProps } from "@/types";
import ProfileMenu from "../account-menu";
import { signOut, useSession } from "next-auth/react";

export function UserNav() {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    toast.promise(signOut, {
      loading: "Logging out...",
      success: "Logout successful!",
      error: (error) => {
        return getErrorMessage(error);
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <ProfileMenu
            user={session?.user as UserProps}
            logout={handleLogout}
            loading={status === "loading"}
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
