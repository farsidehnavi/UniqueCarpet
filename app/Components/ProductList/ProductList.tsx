"use client";

import style from "./ProductList.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
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
  // Routing
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("parent_id") || "[]";

  // State
  const [Level, setLevel] = useState(0);
  const [ShowList, setShowList] = useState<ProductOrCategory[]>([]);

  const ExploreProducts = () => {
    if (window.innerWidth / window.innerHeight > 1)
      window.scroll({
        top: 1050,
        behavior: "smooth",
      });
    else {
      window.scroll({
        top: 1720,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (JSON.parse(query).length) {
      const queryParsed = JSON.parse(query);

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
      setLevel(0);
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

  const ProductOnClick = (id: number) => {
    if (Level == 2) {
      router.push(`/${id}`);
    } else {
      Operator(id);
    }
  };

  return (
    <div className={style.Main}>
      <p className={style.HeadText}>
        Explore {Level == 2 ? "Products" : "Categories"}
      </p>
      {/* {Level > 0 ? (
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
      ) : null} */}
      {/* <>
        <div className={style.TimeLine}>
          <p className={style.ItemText} onClick={() => router.push("/")}>
            Categories
          </p>
          {Level > 0 ? (
            <>
              <FaAngleRight className={style.ArrowIcon} />
              <p
                className={style.ItemText}
                onClick={() => router.push(`/?parent_id=[${data.Data.id}]`)}
              >
                {data.Categories.find((i) => i.id == queryParsed)}
                Problem
              </p>
            </>
          ) : null}
          {Level > 1 ? (
            <>
              <FaAngleRight className={style.ArrowIcon} />
              <p
                className={style.ItemText}
                onClick={() => router.push(`/?parent_id=[${data.Data.id}]`)}
              >
                {data.Data.name}
              </p>
            </>
          ) : null}
          {/* <FaAngleRight className={style.ArrowIcon} />
        <p
        className={style.ItemText}
        onClick={() =>
        router.push(`/?parent_id=[${data.Data.id},${data.Data.Child.id}]`)
        }
        >
        {data.Data.Child.name}
        </p>
        <FaAngleRight className={style.ArrowIcon} />
        <p className={`${style.ItemText} ${style.CurrentItem}`}>
        {data.Data.Child.Child.name}
        </p>
        </div>
      </> */}
      {ShowList.length ? (
        <>
          <div className={style.CardsParent}>
            {ShowList.map((v, k) => (
              <Product key={k} data={v} OnClick={ProductOnClick} />
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
