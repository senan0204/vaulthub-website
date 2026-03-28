import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/actions";

export default async function MarketplacePage() {
  const products = await getProducts();

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4">
        <ProductList initialProducts={products} />
      </div>
    </div>
  );
}
