import { ProductsTable } from "@/components/dashboard/products-table";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";
import { CACHE_TAGS, CACHE_TTL, cachedApiCall } from "@/lib/cache";
import { CategoryService } from "@/lib/services/category";
import { ProductService } from "@/lib/services/product";

export const metadata = {
  title: "Products",
  description: "Manage your product catalog and inventory.",
};

export default async function Products() {
  const [products, categories] = await Promise.all([
    ProductService.fetchAll(),
    CategoryService.fetchAll(),
  ]);

  const productsByCategoryEntries = await Promise.all(
    categories.map(async (category) => {
      const product = await cachedApiCall(`products:${category.id}`, () => ProductService.fetchByCategory(category.id), [CACHE_TAGS.PRODUCTS], CACHE_TTL.MEDIUM);
      return [category.id, product] as const;
    })
  );

  const productsByCategory = Object.fromEntries(productsByCategoryEntries);

  return (
    <Shell variant="sidebar">
      <PageHeader title={metadata.title} description={metadata.description} />
      <ProductsTable
        initialProducts={products}
        initialCategories={categories}
        initialProductsByCategory={productsByCategory}
      />
    </Shell>
  );
}
