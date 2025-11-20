"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "./_components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchProduct = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=4&skip=0");
    const products = await data.json();
    setProducts(products.products);
    console.log(products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            imgUrl={product.images[0]}
            onChange={() => router.push(`/products/${product.id}`)}
          />
        );
      })}
      <Button onClick={() => router.push("/products")}>
        view all products
      </Button>
    </div>
  );
}
