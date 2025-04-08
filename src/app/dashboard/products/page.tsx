import { ProductsTable } from "@/components/dashboard/products-table";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";

export const metadata = {
  title: "Products",
  description: "Manage your product catalog and inventory.",
};

export default function Products() {
  
  return (
    <Shell variant="sidebar">
      <PageHeader
        title={metadata.title}
        description={metadata.description}
      />
        <ProductsTable />
    </Shell>
  );
}
