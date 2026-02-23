"use client";

import style from "./MenuBar.module.css";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

import "./../../font.css";

const MenuBar = ({
  ExploreProductsFunc,
}: {
  ExploreProductsFunc?: () => void;
}) => {
  const ExploreProducts = () => {
    window.scroll({
      top: 1050,
      behavior: "smooth",
    });
  };

  const ContactUs = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button className={style.Item} onClick={ExploreProductsFunc != null ? ExploreProductsFunc : ExploreProducts}>
        <p className={style.ButtonTitle}>Explore products</p>
        <FaArrowRight className={style.Icon} />
      </button>
      <div className={style.LogoParent}>
        <div className={style.Name}>
          <Image
            className={style.Logo}
            src={"img/logo.svg"}
            height={70}
            width={70}
            alt=""
          />
          <p className={style.Pr1}>Unique Carpet</p>
        </div>
      </div>
      <button className={style.Item} onClick={ContactUs}>
        <p className={style.ButtonTitle}>Contact us</p>
      </button>
    </>
  );
};

export default MenuBar;
