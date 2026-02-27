import style from "./Footer.module.css";
import Image from "next/image";
import {
  FaWhatsapp,
  FaTelegram,
  FaAt,
  FaMapMarker,
  FaPhoneAlt,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className={style.DetailsSection}>
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
      <div className={style.ContactUsParent}>
        <div className={style.ContactUs}>
          <div className={style.TitleBox}>
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
            <p className={style.HeadText}>
              Best collection of handmade Persian Carpet, Kilim & Gabeh
            </p>
            <div className={style.ConnectionIcons}>
              <a href="https://wa.me/989131643499" target="_blank">
                <FaWhatsapp className={style.ConnectionButton} />
              </a>
              <a href="https://t.me/uniquecarpet20" target="_blank">
                <FaTelegram className={style.ConnectionButton} />
              </a>
              <a href="mailto:uniquecarpet.mo@hotmail.com">
                <FaAt className={style.ConnectionButton} />
              </a>
              <a
                href="https://maps.app.goo.gl/rsveFbo53ytjx5JL9"
                target="_blank"
              >
                <FaMapMarker className={style.ConnectionButton} />
              </a>
              <a href="tel:+989131643499">
                <FaPhoneAlt className={style.ConnectionButton} />
              </a>
              <a href="https://instagram.com/USERNAME" target="_blank">
                <FaInstagram className={style.ConnectionButton} />
              </a>
            </div>
          </div>
          {/* <div className={style.InnerFlex}>
              <p className={style.ContactItem}>
                Email: example@uniquecarpet.ir
              </p>
              <p className={style.ContactItem}>
                Address: 214, Eastern Bazarcheno Hakim st, Esfahan, Iran
              </p>
              <p className={style.ContactItem}>
                Phone: +98 913 164 3499 Mohammad Shafaei
              </p>
              <p className={style.ContactItem}>Landline: +98 313 228 147</p>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
