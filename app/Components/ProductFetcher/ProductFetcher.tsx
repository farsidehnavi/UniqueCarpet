import { redirect } from "react-router-dom";
import ProductList from "./../ProductList/ProductList";
import { Suspense } from "react";

type ProductOrCategory = {
  id: number;
  name: string;
  image_url: string[];
  parent_id?: number;
  description?: string;
  price?: number;
};

type Result = {
  Status: number;
  Categories: ProductOrCategory[];
  Products: ProductOrCategory[];
};

async function getProducts(): Promise<Result> {
  const res = await fetch(
    "https://carpet-back-end.vercel.app/category/allFront",
    { cache: "no-store" }, // or "force-cache" if you want caching
  );

  if (!res.ok) {
    redirect('/ConnectionFailed')
  }

  return res.json();
}

const ProductFetcher = async () => {
  const data = await getProducts();

  return (
    <Suspense fallback={<>Loading ...</>}>
      <ProductList data={data} />
    </Suspense>
  );
};

export default ProductFetcher;
