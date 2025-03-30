import { ProductsTable } from "@/components/dashboard/products/product-table";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";


export default function Products() {
  
  return (
    <Shell variant="sidebar">
      <PageHeader
        title="Products"
        description="Manage your product catalog and inventory."
      />
        <ProductsTable />
    </Shell>
  );
}
