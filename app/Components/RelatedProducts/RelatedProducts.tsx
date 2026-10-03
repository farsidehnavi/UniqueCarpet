import "server-only";

import style from "./RelatedProducts.module.css";
import { redirect } from "react-router-dom";
import Product from "./../Product/Product";

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
    `http://localhost:3000/product/all?parent_id=${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    redirect("/ConnectionFailed");
  }

  return res.json();
};

const RelatedProducts = async ({ ParentId, CurrentId }: { ParentId: number, CurrentId: number }) => {
  const data = await FetchRelatedProducts(ParentId);

  const FilteredData = Object.values(data.Data).filter(v => {
    return v.id != CurrentId
  })

  console.log(FilteredData);
  console.log(data.Data);
  
  

  return (
    <div className={style.Main}>
      <hr className={style.Line} />
      <p className={style.Label}>Related products</p>
      <div className={style.ProductsParent}>
        {FilteredData.map((v, k) => (
          <Product data={v} key={k} IsLightMode={true} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
