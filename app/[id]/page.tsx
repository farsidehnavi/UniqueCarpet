import { redirect } from "react-router-dom";
import Image from "next/image";
import style from "./page.module.css";
import MenuBar from "../Components/MenuBar/MenuBar";
import ProductDetlaisView from "../Components/ProductDetailsView/ProductDetailsView";

type Product = {
  id: number;
  name: string;
  image_url: string[];
  description: string;
  price: number;
  parent_id: number;
};

const FetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`https://carpet-back-end.vercel.app/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/ConnectionFailed");
  }

  return res.json();
};

const ProductView = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await FetchProduct(id);

  return (
    <div className={style.Main}>
      <div className={style.MenuBar}>
        <MenuBar />
      </div>
      <ProductDetlaisView data={data} />
      {/* <div className={style.wrapper}>
        <svg
          className={style.svg}
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="patternFill"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
              width="60"
              height="60"
              patternTransform="scale(1,2)"
            >
              <image
                href="/img/template.svg"
                width="60"
                height="60"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1000" height="60" className={style.top} />
          <path
            d="M0 60 
             L200 60 
             L250 110 
             L750 110 
             L800 60 
             L1000 60 
             L1000 120 
             L0 120 
             Z"
            className={style.bottom}
          />
        </svg>
      </div>
      <div className={style.Arted}></div> */}
    </div>
  );
};

export default ProductView;
