"use client";

import style from "./ProductList.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

type ProductOrCategory = {
  id: number;
  name: string;
  image_url: string[];
  parent_id?: number;
  description?: string;
  price?: number;
}

type Result = {
  Status: number;
  Categories: ProductOrCategory[]
  Products: ProductOrCategory[]
};

const ProductList = ({ data }: { data: Result }) => {
  // Routing
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("parent_id") || '[]';

  // State
  const [Level, setLevel] = useState(0);
  const [ShowList, setShowList] = useState<ProductOrCategory[]>([]);

  const ExploreProducts = () => {
    window.scroll({
      top: 1050,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (query) {
      const queryParsed = JSON.parse(query);
      console.log(queryParsed);
      
      switch (queryParsed.length) {
        case 1:
          setLevel(1);
          setShowList(
            data.Categories.filter((v) => typeof v.parent_id == "number" && v.parent_id == queryParsed[0]),
          );
          ExploreProducts();
          break;
        case 2:
          setLevel(2);
          setShowList(
            data.Products.filter((v) => typeof v.parent_id == "number" && v.parent_id == queryParsed[1]),
          );
          ExploreProducts();
          break;
        default:
          console.log("failed");
      }
    } else {
      setShowList(data.Categories.filter((v) => !v.parent_id));
    }
  }, [query]);

  useEffect(() => {
    console.log('Level: ',Level);
  },[Level])

  const Operator = (selectedId: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      const queryParsed = JSON.parse(query);
      switch (queryParsed.length) {
        case 1:
          params.set("parent_id", JSON.stringify([query[0], selectedId]));
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
      <p className={style.HeadText}>
        Explore {Level == 2 ? "Products" : "Categories"}
      </p>
      {Level > 0 ? (
        <div className={style.UpperLine}>
          <FaArrowLeft className={style.BackButton} />
          <div className={style.UpperLineTextBox}>
            <p className={style.UpperLineTitle}>
              Category:{" "}
              {
                data?.Categories?.find(
                  (v) => {
                    const parsed: number[] = JSON.parse(query)
                    const last: number = parsed[parsed.length]
                    return last
                  }
                )?.name
              }
            </p>
          </div>
        </div>
      ) : null}
      {ShowList.length ? (
        <>
          <div className={style.CardsParent}>
            {ShowList.map((v, k) => (
              <div
                className={style.GlassCard}
                key={k}
                onClick={() => {
                  if (Level == 2) {
                    router.push(`/${v.id}`);
                  } else {
                    Operator(v.id);
                  }
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
        </>
      ) : (
        <p className={style.NotFound}>Sorry, Nothing found.</p>
      )}
    </div>
  );
};

export default ProductList;
