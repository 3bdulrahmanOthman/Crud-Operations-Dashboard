import { UsersTable } from "@/components/dashboard/users-table";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";

export const metadata = {
  title: "Users",
  description:
    "Manage and monitor user accounts, permissions, and activities in your system. View, edit, or delete user profiles and access settings.",
};

export default function Users() {
  return (
    <Shell variant="sidebar">
      <PageHeader
        title={metadata.title}
        description={metadata.description}
      />
      <UsersTable />
    </Shell>
  );
}
