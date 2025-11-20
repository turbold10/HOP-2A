"use client";

import { ChangeEvent, useState } from "react";
import { Product } from "./_components/Product";

type ProductFormType = {
  name: string;
  price: number;
  stock: number;
};

export type ProductType = ProductFormType & {
  id: number;
};

type CartProductType = {
  productName: string;
  productPrice: number;
  id: number;
  count: number;
};

export default function Home() {
  const [productForm, setProductForm] = useState<ProductFormType>({
    name: "",
    price: 0,
    stock: 0,
  });

  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  const handleProductForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProductForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { ...productForm, id: Date.now() }]);
  };

  const addCartProduct = (product: ProductType) => {
    const newCartProduct = {
      productName: product.name,
      productPrice: product.price,
      id: product.id,
      count: 1,
    };

    setProducts((prev) => {
      return prev.map((prevProduct) =>
        prevProduct.id === product.id
          ? { ...prevProduct, stock: prevProduct.stock - 1 }
          : prevProduct
      );
    });

    setCartProducts((prev) => {
      const existing = prev.find(
        (prevProduct) => prevProduct.id === product.id
      );

      if (existing) {
        return prev.map((el) =>
          el.id === product.id ? { ...el, count: el.count + 1 } : el
        );
      } else {
        return [...prev, newCartProduct];
      }
    });
  };

  const handleCartProductCount = (
    event: ChangeEvent<HTMLInputElement>,
    cartProductId: number
  ) => {
    const { value } = event.target;
    const newCount = Number(value);

    const currentCartProduct = cartProducts.find(
      (item) => item.id === cartProductId
    );

    const diff = newCount - currentCartProduct!.count;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === cartProductId
          ? { ...product, stock: product.stock - diff }
          : product
      )
    );

    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item.id === cartProductId ? { ...item, count: newCount } : item
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Store</h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-3"></h2>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Product name"
            className="border p-2 rounded"
            value={productForm.name}
            name="name"
            onChange={(e) => handleProductForm(e)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            name="price"
            value={productForm.price}
            onChange={(e) => handleProductForm(e)}
          />
          <input
            type="number"
            placeholder="Stock"
            className="border p-2 rounded"
            name="stock"
            value={productForm.stock}
            onChange={(e) => handleProductForm(e)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addProduct}
          >
            add product
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Products 0</h3>
          <div className="space-y-3">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                addCartProduct={addCartProduct}
              />
            ))}
          </div>
        </div>

        {/* Cart */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Cart</h3>
          <div className="border p-3 rounded">
            {cartProducts.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-3 pb-3 border-b last:border-b-0"
              >
                <div>
                  <div className="font-medium">{item.productName}</div>
                  <div className="text-sm text-gray-600">
                    ${item.productPrice} each
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={item.count}
                    onChange={(e) => handleCartProductCount(e, item.id)}
                    className="w-16 border p-1 rounded text-center"
                  />
                  <span className="font-medium">${item.productPrice}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t">
              <div className="flex justify-between items-center font-bold">
                <span>Total:</span>
                {/* <span>${cartTotal.toFixed(2)}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
