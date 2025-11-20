"use client";

import { useState, useMemo } from "react";

export default function SimpleProductStore() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  function resetForm() {
    setForm({ name: "", price: "", stock: "" });
    setEditingProductId(null);
  }

  function onSubmitProduct() {
    if (!form.name.trim() || !form.price || !form.stock) {
      alert("Please fill all fields");
      return;
    }

    if (editingProductId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                name: form.name.trim(),
                price: Number(form.price),
                stock: Number(form.stock),
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    resetForm();
  }

  function onEditProduct(product) {
    setEditingProductId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
    });
  }

  function onDeleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.productId !== id));
    if (editingProductId === id) resetForm();
  }

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock === 0) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.productId === productId);
      if (existing) {
        return prev.map((c) =>
          c.productId === productId
            ? { ...c, qty: Math.min(c.qty + 1, product.stock) }
            : c
        );
      }
      return [...prev, { productId, qty: 1 }];
    });
  }

  function updateCartQty(productId, qty) {
    const newQty = Math.max(0, Number(qty) || 0);
    if (newQty === 0) {
      setCart((prev) => prev.filter((c) => c.productId !== productId));
    } else {
      setCart((prev) =>
        prev.map((c) => (c.productId === productId ? { ...c, qty: newQty } : c))
      );
    }
  }

  const cartItems = useMemo(() => {
    return cart
      .map((c) => {
        const product = products.find((p) => p.id === c.productId);
        return product
          ? { ...c, product, subtotal: c.qty * product.price }
          : null;
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Store</h1>

      {/* Add Product Form */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editingProductId ? "Edit Product" : "Add Product"}
        </h2>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            className="border p-2 rounded"
          />
          <button
            type="button"
            onClick={onSubmitProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingProductId ? "Update" : "Add"}
          </button>
          {editingProductId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Products */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Products ({products.length})
          </h3>
          {products.length === 0 ? (
            <p className="text-gray-500">No products added yet</p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="border p-3 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${product.price} • Stock: {product.stock}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onEditProduct(product)}
                        className="text-blue-600 text-sm px-2 py-1 border rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-red-600 text-sm px-2 py-1 border rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock === 0}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Cart ({cart.reduce((sum, c) => sum + c.qty, 0)} items)
          </h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <div className="border p-3 rounded">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center mb-3 pb-3 border-b last:border-b-0"
                >
                  <div>
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-sm text-gray-600">
                      ${item.product.price} each
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={item.product.stock}
                      value={item.qty}
                      onChange={(e) =>
                        updateCartQty(item.productId, e.target.value)
                      }
                      className="w-16 border p-1 rounded text-center"
                    />
                    <span className="font-medium">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
