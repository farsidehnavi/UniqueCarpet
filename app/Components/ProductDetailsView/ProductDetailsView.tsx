"use client";

import style from "./ProductView.module.css";
import { FaAngleRight } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  image_url: string[];
  description: string;
  price: number;
  parent_id: number;
};

const ProductDetailsView = ({ data }: { data: Product }) => {
  return (
    <div className={style.Main}>
      <div className={style.TimeLine}>
        <p className={style.ItemText}>Carpet</p>
        <FaAngleRight className={style.ArrowIcon} />
        <p className={style.ItemText}>Isfahan</p>
        <FaAngleRight className={style.ArrowIcon} />
        <p className={`${style.ItemText} ${style.CurrentItem}`}>Isfahan 3*4 Abrisham</p>
      </div>
    </div>
  );
};

export default ProductDetailsView;
