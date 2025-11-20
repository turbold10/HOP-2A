"use client";

import { use, useEffect, useState } from "react";

export default function BlogPostPage({ params }) {
  const { id } = use(params);
  useState()
  const fetchData = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const movie = await res.json()

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
