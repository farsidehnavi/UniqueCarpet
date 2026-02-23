"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./Product.module.css";

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
  Level,
}: {
  data: ProductOrCategory;
  Level: number;
}) => {
  // Routing
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("parent_id") || "[]";

  console.log(Level);
  

  const Operator = (selectedId: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (JSON.parse(query).length) {
      const queryParsed = JSON.parse(query);
      switch (queryParsed.length) {
        case 1:
          params.set("parent_id", JSON.stringify([queryParsed[0], selectedId]));
          break;
        case 2:
          break;
        default:
          console.log("failed");
      }
    } else {
      params.set("parent_id", JSON.stringify([selectedId]));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={style.GlassCard}
      onClick={() => {
        if (Level == 2) {
          router.push(`/${data.id}`);
        } else {
          Operator(data.id);
        }
      }}
    >
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
};

export default Product;
