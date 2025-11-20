"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "../_components/ProductCard";

const PAGE_SIZE = 12;

const Page = () => {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const fetchProduct = async () => {
    const SKIP = PAGE_SIZE * (currentPage - 1);
    let url = `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${SKIP}`;

    if (searchValue !== "") {
      url = `https://dummyjson.com/products/search?q=${searchValue}&limit=${PAGE_SIZE}&skip=${SKIP}`;
    }

    const data = await fetch(url);
    const products = await data.json();
    setProducts(products.products);
    setTotalProduct(products.total);
  };

  useEffect(() => {
    fetchProduct();
  }, [currentPage, searchValue]);

  const pages = Array.from(
    { length: Math.ceil(totalProduct / 12) },
    (_, i) => i + 1
  );
  console.log(currentPage);
  return (
    <div>
      <Input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div>
        {products.map((product) => {
          return (
            // <div
            //   key={product.id}
            //   onClick={() => router.push(`/products/${product.id}`)}
            // >
            //   {product.title}
            // </div>
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
      </div>
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        prev
      </Button>
      {pages.map((page) => {
        return (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            variant={page === currentPage ? "default" : "secondary"}
          >
            {page}
          </Button>
        );
      })}
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalProduct / 12)}
      >
        next
      </Button>
    </div>
  );
};

export default Page;
