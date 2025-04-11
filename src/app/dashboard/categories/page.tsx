import { CategoriesTable } from "@/components/dashboard/category-table";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";
import { CategoryService } from "@/lib/services/category";
import { use } from "react";

export const metadata = {
  title: "Categories",
  description: "Manage your product categories.",
};

export default function Category() {
  const categories = use(CategoryService.fetchAll());
    
  return (
    <Shell variant="sidebar">
      <PageHeader
        title={metadata.title}
        description={metadata.description}
      />
        <CategoriesTable initialCategories={categories} />
    </Shell>
  );
}
