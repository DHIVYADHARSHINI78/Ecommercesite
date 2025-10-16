

import React from "react";

export default function ProductCard({ product, addToCart, addToWishlist }) {
  const { name, price, stock, desc, image } = product;

  return (
    <div className="bg-white  rounded-lg p-4 flex flex-col justify-between w-full sm:w-72 md:w-64 lg:w-72 mx-auto border border-gray-200">
      
   
      <div className="flex justify-center">
        <img
          src={image}
          alt={name}
          className=" w-40 h-40 object-cover rounded mb-4"
        />
      </div>

      
      <div>
        <h2 className="text-base sm:text-lg text-center text-blue-600 font-semibold">
          {name}
        </h2>
        <p className="mt-1 text-sm sm:text-base text-center text-gray-700">{desc}</p>
        <p className="mt-2 font-bold text-center text-sm sm:text-lg">RS.{price}</p>
        {stock === 0 && (
          <span className="inline-block mt-2 px-2 py-1 text-xs sm:text-sm text-red-700 bg-red-200 rounded text-center w-full">
            Out of Stock
          </span>
        )}
      </div>

      
      <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
        <button
          onClick={() => addToCart(product)}
          disabled={stock === 0}
          className={`flex-1 px-3 py-2 rounded text-center font-medium transition-colors duration-200 ${
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
          className={`flex-1 px-3 py-2 rounded text-center font-medium transition-colors duration-200 ${
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
