import "server-only";

import style from "./RelatedProducts.module.css";
import { redirect } from "react-router-dom";
import Product from "./../Product/Product";

type Product = {
  id: number;
  name: string;
  name_fa: string;
  image_url: string[];
  description?: string;
  description_fa?: string;
  price?: number;
};

type RelatedProducts = {
  Status: number;
  Data: Product[];
};

const FetchRelatedProducts = async (): Promise<RelatedProducts> => {
  const res = await fetch(
    'http://193.163.201.24:3000/product/all',
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    redirect("/ConnectionFailed");
  }

  return res.json();
};

const RelatedProducts = async ({ CurrentId }: { CurrentId: number }) => {
  const data = await FetchRelatedProducts();

  const FilteredData = Object.values(data.Data).filter(v => {
    return v.id != CurrentId
  })
  

  return (
    <div className={style.Main}>
      <hr className={style.Line} />
      <p className={style.Label}>Other products</p>
      <div className={style.ProductsParent}>
        {FilteredData.map((v, k) => (
          <Product data={v} key={k} IsLightMode={true} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
