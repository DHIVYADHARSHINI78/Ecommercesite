



import React from "react";

export default function ProductCard({ product, addToCart, addToWishlist }) {
  const { name, price, stock, category, desc } = product;

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col justify-between w-full sm:w-72 md:w-64 lg:w-72 mx-auto border-black border-2">
      <div className="">
        <img
          src={product.image}
          alt={name}
          className="w-40 h-40 sm:h-48 md:h-40 object-cover  mx-auto mb-4 rounded"
        />
        <h2 className="text-lg text-center text-blue-600 font-semibold">{name}</h2>
       
        <p className="mt-2 font-bold text-center text-lg">RS.{price}</p>
        {stock === 0 && (
          <span className="inline-block mt-1 px-2 py-1 text-xs sm:text-sm text-red-700 bg-red-200 rounded text-center w-full">
            Out of Stock
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => addToCart(product)}
          disabled={stock === 0}
          className={`flex-1 px-2 py-2 rounded text-center ${
            stock === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Add to Cart
        </button>

        <button
          onClick={() => addToWishlist(product)}
          disabled={stock === 0}
          className={`flex-1 px-2 py-2 rounded text-center ${
            stock === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Wishlist
        </button>
      </div>
    </div>
  );
}
