"use client";

import style from "./Product.module.css";
import { useRouter } from "next/navigation";

type ProductOrCategory = {
  id: number;
  name: string;
  image_url: string[];
  parent_id?: number;
  description?: string;
  price?: number;
};

const Product = ({
  data,
  OnClick,
}: {
  data: ProductOrCategory;
  OnClick?: (id: number) => void;
}) => {
  // Routing
  const router = useRouter();

  return (
    <div className={style.GlassCard} onClick={() => {
      if (OnClick) {
        OnClick(data.id)
      } else {
        router.push(`/${data.id}`)
      }
    }}>
      {data.image_url[0] ? (
        <img
          className={style.ItemImage}
          src={
            "https://carpet-back-end.vercel.app/img/images/" + data.image_url[0]
          }
        />
      ) : null}
      <p className={style.Title}>{data.name}</p>
    </div>
  );
};;

export default Product;
