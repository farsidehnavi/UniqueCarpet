'use client'

import style from './ProductList.module.css'

const ProductList = ({data}) => {
  return (<div className={style.Main}>
    <p className={style.HeadText}>Explore products</p>
    <div className={style.CardsParent}>
      {data.Categories.filter((v) => v.parent_id == SecondStepId).map(
        (v, k) => (
          <div
            className={style.GlassCard}
            key={k}
            onClick={() => {
              SecondStepId = v.id;
            }}
          >
            {v.image_url[0] ? (
              <img
                className={style.ItemImage}
                src={
                  "https://carpet-back-end.vercel.app/img/images/" +
                  v.image_url[0]
                }
              />
            ) : null}
            <p className={style.Title}>{v.name}</p>
          </div>
        )
      )}
    </div>
  </div> );
}
 
export default ProductList;
  
