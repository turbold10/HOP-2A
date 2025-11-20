"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const productId = params.productId;

  const fetchProduct = async () => {
    const data = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await data.json();
    setProduct(product);
    setCategory(product.category);
  };

  const fetchRelatedProducts = async () => {
    const data = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const product = await data.json();
    setRelatedProducts(product.products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchRelatedProducts();
  }, [product]);

  console.log(relatedProducts);
  return (
    <div>
      <div>{product?.title}</div>
      <div>related products</div>
      <div>
        {relatedProducts.map((product) => {
          return <div key={product.id}>{product.title}</div>;
        })}
      </div>
    </div>
  );
};

export default Page;
