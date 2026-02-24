import "server-only";

import style from "./RelatedProducts.module.css";
import { redirect } from "react-router-dom";
import Product from "./../Product/Product";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  image_url: string[];
  description: string;
  price: number;
  parent_id: number;
};

type RelatedProducts = {
  Status: number;
  Data: Product[];
};

const FetchRelatedProducts = async (id: number): Promise<RelatedProducts> => {
  const res = await fetch(
    `https://carpet-back-end.vercel.app/product/all?parent_id=${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    redirect("/ConnectionFailed");
  }

  return res.json();
};

const RelatedProducts = async ({ id }: { id: number }) => {
  // Routing
  const router = useRouter();

  const data = await FetchRelatedProducts(id);

  const Operator = (id: number) => {
    router.push(`/${id}`);
  };

  return (
    <div className={style.Main}>
      <hr className={style.Line} />
      <div className={style.RelatedProduct}>
        <p className={style.Label}>Related products</p>
        <div className={style.ProductsParent}>
          {data.Data.map((v, k) => (
            <Product data={v} key={k} OnClick={} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
