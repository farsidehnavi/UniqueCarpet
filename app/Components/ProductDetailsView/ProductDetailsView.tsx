"use client";

import { useState } from "react";
import style from "./ProductDetailsView.module.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  name_fa: string;
  image_url: string[];
  description?: string;
  description_fa?: string;
  price?: number;
};

type GetById = {
  Status: number;
  Data: Product;
};

const ProductDetailsView = ({ data }: { data: GetById }) => {

  const router = useRouter()

  // State
  const [OpenImageIndex, setOpenImageIndex] = useState<number>(0);

  return (
    <div className={style.Main}>
      <div className={style.TimeLine}>
        <p className={style.ItemText} onClick={() => router.push("/")}>
          Products
        </p>
        <FaAngleRight className={style.ArrowIcon} />
        <p className={`${style.ItemText} ${style.CurrentItem}`}>
          {data.Data.name}
        </p>
      </div>
      <div className={style.FirstRow}>
        <div className={style.LeftSection}>
          <div className={style.ImageParent}>
            <FaAngleLeft
              className={style.Arrow}
              onClick={() => {
                if (OpenImageIndex) {
                  setOpenImageIndex((v) => v - 1);
                } else {
                  setOpenImageIndex(data.Data.image_url.length - 1);
                }
              }}
            />
            <img
              src={
                "http://193.163.201.24:3000/img/images/" +
                data.Data.image_url[OpenImageIndex]
              }
              alt=""
              className={style.MainImg}
            />
            <FaAngleRight
              className={style.Arrow}
              onClick={() => {
                if (
                  OpenImageIndex <
                  data.Data.image_url.length - 1
                ) {
                  setOpenImageIndex((v) => v + 1);
                } else {
                  setOpenImageIndex(0);
                }
              }}
            />
          </div>
          <div className={style.ImageList}>
            {data.Data.image_url.map((v, k) => (
              <img
                alt=""
                src={"http://193.163.201.24:3000/img/images/" + v}
                className={style.ImageInLine}
                key={k}
                onClick={() => {
                  setOpenImageIndex(k);
                }}
              />
            ))}
          </div>
        </div>
        <div className={style.RightSection}>
          <p className={style.Name}>{data.Data.name}</p>
          {data.Data.price ? <p className={style.Price}>
            {data.Data.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            T
          </p> : ''}
          <p className={style.Description}>
            {data.Data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
