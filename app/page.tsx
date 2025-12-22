import Image from "next/image";
import style from "./page.module.css";
import "./font.css";
import "./globals.css";
import { FaSearch, FaPhone } from "react-icons/fa";
import ProductFetcher from "./Components/ProductFetcher/ProductFetcher";

export default function Home() {
  console.log("page");
  const T1 = `Handmade Persian rugs and carpets are the most durable and exquisite
            oriental carpets and also Iran's unique and unmatchable handicrafts,
            used for the interior of ordinary people's houses or great kings'
            courts for centuries. Persian people weave their dreams,
            imaginations, stories, myths, and everything inside their inner
            world on looms of different forms and sizes all over Iran. Handmade
            Persian carpets symbolize a magical, abstract world of beliefs and
            desires; that's why each has a particular identity and touches
            people's souls. They are tied in with Persian life and traditions
            and have hundreds of patterns and many styles. Each region, city,
            and village in Iran has different types of Persian rugs, creating a
            live handmade carpet with natural fibers that they provide from
            their herd or cotton farms. Everything about Persian hand-woven
            carpets is related to the pure nature of Iran. Their stunning colors
            represent people's feelings and passions. They are extracted from
            beautiful and aromatic plants, are highly durable, and even get
            brighter as time passes. Persian rustic and tribal handmade carpets
            and rugs may have some irregularities but are so lovable worldwide
            as they are made by nomads and tribes on their small and medium
            handmade looms and designed by their wild souls' imaginations.
            Persian handmade rugs of cities are woven splendidly, with a more
            ordered structure, tiny knots and delicate designs full of mazes of
            plant branches and heaven's birds flying among them or mystical
            abstract leaves and flowers. The fantastic world of handmade Persian
            rugs still remains undiscovered between oriental rugs. There are
            some regions in this land where unique rugs are woven by local
            people with remarkable patterns and textures that remain unknown.
            Handmade Persian carpets were an excellent investment for the
            country for more than 400 years; they are still a valuable
            handicraft worth investing in, collecting, and decorating any
            interiors with them!`;

  return (
    <>
      <div className={style.Main}>
        <Image
          src={"/img/FinalBg.png"}
          alt=""
          width={853}
          height={288}
          className={style.Image}
        />
        <div className={style.MenuBar}>
          <button className={style.Item}>
            <FaSearch className={style.Icon} />
            <p className={style.ButtonTitle}>Explore products</p>
          </button>
          <button className={style.Item}>
            <FaPhone className={style.Icon} />
            <p className={style.ButtonTitle}>Contact us</p>
          </button>
        </div>
        <div className={style.Text}>
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
          <p className={style.Pr2}>
            Handmade Persian Rugs: One of The Most Valuable Oriental Carpets
          </p>
          <p className={style.Pr3}>{T1}</p>
        </div>
        <Image
          src={"img/card.svg"}
          className={style.Card}
          height={300}
          width={300}
          alt=""
        />
      </div>
      <div className={style.wrapper}>
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
      <ProductFetcher />
      <div className={style.wrapperE}>
        <svg
          className={style.svgE}
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="patternFill"
              patternUnits="userSpaceOnUse"
              width="160"
              height="160"
            >
              <image href="/img/template.svg" width="60" height="60" />
            </pattern>
          </defs>

          <rect
            x="0"
            y="60"
            width="1000"
            height="60"
            className={style.bottomE}
          />
          <path
            d="M1000 120
            L800 120
            L750 70
            L250 70
            L200 120
            L0 120
            L0 60
            L1000 60
            Z
            "
            className={style.topE}
          />
        </svg>
      </div>
    </>
  );
}
