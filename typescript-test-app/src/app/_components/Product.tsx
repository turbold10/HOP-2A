import { ProductType } from "../page";

type ProductProps = {
  product: ProductType;
  addCartProduct: (product: ProductType) => void;
};

export const Product = ({ product, addCartProduct }: ProductProps) => {
  return (
    <div className="border p-3 rounded">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{product.name}</h4>
          <p className="text-sm text-gray-600">
            ${product.price} • Stock: {product.stock}
          </p>
        </div>
        <div className="flex gap-1">
          <button className="text-blue-600 text-sm px-2 py-1 border rounded">
            Edit
          </button>
          <button className="text-red-600 text-sm px-2 py-1 border rounded">
            Delete
          </button>
        </div>
      </div>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
        onClick={() => addCartProduct(product)}
      >
        {/* {product.stock === 0 ? "Out of Stock" : "Add to Cart"} */}
        Add to Cart
      </button>
    </div>
  );
};
