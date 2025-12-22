"use client";

import style from "./ProductList.module.css";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const ProductList = ({ data }) => {
  // Routing
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("parent_id");
  let ShowList = [];

  console.log(data);

  if (query) {
    const queryParsed = JSON.parse(query);
    switch (queryParsed.length) {
      case 1:
        console.log(1);
        ShowList = data.Categories.filter((v) => v.parent_id == queryParsed[0]);        
        break;
      case 2:
        console.log(2);
        ShowList = data.Products.filter((v) => v.parent_id == queryParsed[1]);
        break;
      default:
        console.log("failed");
    }
  } else {
    ShowList = data.Categories.filter((v) => !v.parent_id);
  }

  console.log(query);

  // State
  const [SecondStepId, setSecondStepId] = useState(null);

  const Operator = (selectedId) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      const queryParsed = JSON.parse(query);
      switch (queryParsed.length) {
        case 1:
          params.set("parent_id", JSON.stringify([query[0],selectedId]));
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
    <div className={style.Main}>
      <p className={style.HeadText}>Explore products</p>
      <div className={style.CardsParent}>
        {ShowList.map((v, k) => (
          <div
            className={style.GlassCard}
            key={k}
            onClick={() => {
              Operator(v.id);
            }}
          >
            {v.image_url[0] ? (
              <img
                className={style.ItemImage}
                src={
                  "https://carpet-back-end.vercel.app/img/images/" +
                  v.image_url[0]
                }
              />
            ) : null}
            <p className={style.Title}>{v.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
