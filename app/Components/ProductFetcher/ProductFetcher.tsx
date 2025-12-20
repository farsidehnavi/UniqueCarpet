import ProductList from './../ProductList/ProductList'

type resault = {
  Status: number;
  Categories: [
    {
      id: number;
      name: string;
      image_url?: string[];
      parent_id?: number;
    }
  ];
  Products: [
    {
      id: number;
      name: string;
      image_url?: number;
      parent_id: number;
      description: string;
      price: number;
    }
  ];
}

const ProductFetcher = async () => {
  const res = (await fetch('https://carpet-back-end.vercel.app/category/allFront'))
  const data: resault = await res.json()

  console.log(res);


  return (
    <ProductList data={data} />
  );
};
export default ProductFetcher;
