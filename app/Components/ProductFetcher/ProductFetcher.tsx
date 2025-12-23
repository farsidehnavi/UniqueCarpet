import ProductList from "./../ProductList/ProductList";
import { Suspense } from "react";

type resault = {
  Status: number;
  Categories: [
    {
      id: number;
      name: string;
      image_url?: string[];
      parent_id?: number;
    },
  ];
  Products: [
    {
      id: number;
      name: string;
      image_url?: number;
      parent_id: number;
      description: string;
      price: number;
    },
  ];
};

const ProductFetcher = async () => {
  console.log("ProductFetcher");

  const res = await fetch(
    "https://carpet-back-end.vercel.app/category/allFront"
  );
  const data: resault = await res.json();

  return (
    <Suspense fallback={<>Loading ...</>}>
      <ProductList data={data} />
    </Suspense>
  );
};
export default ProductFetcher;
