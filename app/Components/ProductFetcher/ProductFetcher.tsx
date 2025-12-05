import axios from "axios";
import ProductList from './../ProductList/ProductList'

const ProductFetcher = async () => {
  const res = (
    await axios.get("https://carpet-back-end.vercel.app/category/allFront")
  ).data;
  console.log(res);


  return (
    <ProductList data={res} />
  );
};
export default ProductFetcher;
