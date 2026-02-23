"use client";

import style from "./ProductList.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Product from "./../Product/Product";

type ProductOrCategory = {
  id: number;
  name: string;
  image_url: string[];
  parent_id?: number;
  description?: string;
  price?: number;
};

type Result = {
  Status: number;
  Categories: ProductOrCategory[];
  Products: ProductOrCategory[];
};

const ProductList = ({ data }: { data: Result }) => {
  console.log(data);

  // Routing
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("parent_id") || "[]";

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
    if (JSON.parse(query).length) {
      const queryParsed = JSON.parse(query);
      console.log(queryParsed);

      switch (queryParsed.length) {
        case 1:
          setLevel(1);
          setShowList(
            data.Categories.filter(
              (v) =>
                typeof v.parent_id == "number" && v.parent_id == queryParsed[0],
            ),
          );
          ExploreProducts();
          break;
        case 2:
          setLevel(2);
          setShowList(
            data.Products.filter(
              (v) =>
                typeof v.parent_id == "number" && v.parent_id == queryParsed[1],
            ),
          );
          ExploreProducts();
          break;
        default:
          console.log("Query reading failed.");
      }
    } else {
      setShowList(data.Categories.filter((v) => !v.parent_id));
      console.log("Updated");
    }
  }, [query]);

  useEffect(() => {
    console.log(ShowList);
  }, [ShowList]);

  useEffect(() => {
    console.log("Level: ", Level);
  }, [Level]);

  const BackOperator = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (JSON.parse(query).length == 2) {
      setLevel(1);
      const queryParsed = JSON.parse(query);
      params.set("parent_id", JSON.stringify([queryParsed[0]]));
    } else {
      setLevel(0);
      params.delete("parent_id");
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
          <FaArrowLeft className={style.BackButton} onClick={BackOperator} />
          <div className={style.UpperLineTextBox}>
            <p className={style.UpperLineTitle}>
              Category:{" "}
              {
                data?.Categories?.find((v) => {
                  const parsed: number[] = JSON.parse(query);
                  const last: number = parsed[parsed.length - 1];
                  console.log(parsed);

                  return v.id == last;
                })?.name
              }
            </p>
          </div>
        </div>
      ) : null}
      {ShowList.length ? (
        <>
          <div className={style.CardsParent}>
            {ShowList.map((v, k) => (
              <Product key={k} data={v} Level={Level} />
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
