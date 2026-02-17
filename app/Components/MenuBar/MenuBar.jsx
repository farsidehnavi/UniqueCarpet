"use client";

import style from "./MenuBar.module.css";
import { FaArrowRight } from "react-icons/fa";

const MenuBar = () => {

  const ExploreProducts = () => {
    window.scroll({
      top: 1050,
      behavior: 'smooth'
    })
  }

  const ContactUs = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <button className={style.Item} onClick={ExploreProducts}>
        <p className={style.ButtonTitle}>Explore products</p>
        <FaArrowRight className={style.Icon} />
      </button>
      <button className={style.Item} onClick={ContactUs}>
        <p className={style.ButtonTitle}>Contact us</p>
      </button>
    </>
  );
};

export default MenuBar;
