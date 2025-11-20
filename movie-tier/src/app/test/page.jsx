"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState(null);
  const count = 9;
  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const products = await response.json();
    setData(products.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data?.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </>
  );
};

export default Page;
