import { UsersTable } from "@/components/dashboard/users-table";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";
import { UserService } from "@/lib/services/user";
import { use } from "react";

export const metadata = {
  title: "Users",
  description:
    "Manage and monitor user accounts, permissions, and activities in your system. View, edit, or delete user profiles and access settings.",
};

export default function Users() {
  const users = use(UserService.fetchAll());
  
  return (
    <Shell variant="sidebar">
      <PageHeader title={metadata.title} description={metadata.description} />
      <UsersTable initialUsers={users} />
    </Shell>
  );
}
