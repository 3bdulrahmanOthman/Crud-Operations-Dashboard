import { CategoriesTable } from "@/components/dashboard/category-table";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";

export const metadata = {
  title: "Categories",
  description: "Manage your product categories.",
};

export default function Category() {
  
  return (
    <Shell variant="sidebar">
      <PageHeader
        title={metadata.title}
        description={metadata.description}
      />
        <CategoriesTable />
    </Shell>
  );
}
