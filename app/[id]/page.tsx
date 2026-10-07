import "server-only";

import { redirect } from "react-router-dom";
import style from "./page.module.css";
import MenuBar from "../Components/MenuBar/MenuBar";
import ProductDetailsView from "../Components/ProductDetailsView/ProductDetailsView";
import Footer from "../Components/Footer/Footer";
import { Suspense } from "react";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

type Category = {
  id: number;
  name: string;
  image_url: string[];
  parent_id: number;
};

type Product = {
  id: number;
  name: string;
  image_url: string[];
  description: string;
  price: number;
  parent_id: number;
};

type GetById = {
  Status: number;
  Data: Category & {
    Child: Category & {
      Child: Product;
    };
  };
};

const FetchProduct = async (id: string): Promise<GetById> => {
  const res = await fetch(`http://193.163.201.24:3000/product/${id}`, {
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
      <ProductDetailsView data={data} />
      <Suspense fallback={<p>Loading ...</p>}>
        <RelatedProducts ParentId={data.Data.Child.id} CurrentId={data.Data.Child.Child.id} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default ProductView;
