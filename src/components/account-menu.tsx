"use client";
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { UserProps } from "@/types";
import { RenderIcon } from "../lib/utils";
import { Skeleton } from "./ui/skeleton";

interface DropdownMenuItemConfig {
  key?: string;
  label: string;
  icon?: keyof typeof Icons;
  onClick?: () => void;
  path?: string;
}

interface ProfileMenuProps {
  user: UserProps;
  logout: () => void;
  extraMenuItems?: DropdownMenuItemConfig[];
  loading: boolean;
}

const ProfileMenu = ({ user, logout, extraMenuItems, loading }: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer w-full">
          {<UserProfile user={user} loading={loading} />}
          <Icons.chevronsUpDown className="ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="right"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserProfile user={user} loading={loading}/>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => console.log("Profile clicked")}>
            <Icons.badge className="mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Billing clicked")}>
            <Icons.billing className="mr-2" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Notifications clicked")}
          >
            <Icons.bell className="mr-2" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {extraMenuItems && extraMenuItems.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {extraMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.key || item.label}
                  onClick={item.onClick}
                >
                  {item.icon && <RenderIcon icon={item.icon} className="mr-2" />}
                  {item.path ? (
                    <Link href={item.path}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <Icons.logout className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;

const UserProfile = ({ user, loading }: { user: UserProps, loading: boolean; }) => {
  return (
    <div className="flex items-center gap-2">
      {loading ? (
        <Skeleton className="size-8 rounded-lg" />
      ) : (
        <Avatar className="size-8 rounded-lg">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="rounded-lg">
            {(user.name ?? "").slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="grid flex-1 text-left text-sm leading-tight">
        {loading ? (
          <>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32 mt-1" />
          </>
        ) : (
          <>
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-sm text-muted-foreground">
              {user.email}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
