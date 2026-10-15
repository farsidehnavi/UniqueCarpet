import { redirect } from "react-router-dom";
import ProductList from "./../ProductList/ProductList";
import { Suspense } from "react";

type Product = {
  id: number;
  name: string;
  name_fa: string;
  image_url: string[];
  description?: string;
  description_fa?: string;
  price?: number;
};

type Result = {
  Status: number;
  Data: Product[];
};

async function getProducts(): Promise<Result> {
  let res

  try {
    
    res = await fetch(
      "https://carpet-backend-final.vercel.app/product/all",
      { cache: "no-store" }, // or "force-cache" if you want caching
    );
  
    if (!res.ok) {
      redirect('/ConnectionFailed')
    }

  } catch (e) {
    console.log(e);
    
    redirect('/ConnectionFailed')
  }

  return res?.json();
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
