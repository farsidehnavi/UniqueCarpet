"use client";

import style from "./ProductList.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

type Result = {
  Status: number;
  Data: Product[];
};

const ProductList = ({ data }: { data: Result }) => {
  // Routing
  const router = useRouter();

  const ProductOnClick = (id: number) => {
    router.push(`/${id}`)
  }

  return (
    <div className={style.Main}>
      <p className={style.HeadText}>
        Explore Products
      </p>
      {data?.Data.length ? (
        <>
          <div className={style.CardsParent}>
            {data.Data.map((v, k) => (
              <Product key={k} data={v} OnClick={() => ProductOnClick(v.id)} />
            ))}
          </div>
        </>
      ) : (
        <p className={style.NotFound}>Sorry, Nothing found.</p>
      )}
    </div>
  );
};

export default ProductList;
