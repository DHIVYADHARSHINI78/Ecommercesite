


import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaHeart, FaShoppingCart, FaHistory, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ user, onNav, cartCount, wishlistCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      onNav("login"); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow p-4 rounded-lg mb-4 relative">
      <div className="flex justify-between items-center">
        
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => onNav("products")}
        >
          Ecommerce 
        </h1>

        <div className="hidden md:flex items-center gap-4  ">
          <button onClick={() => onNav("products")} className=" hover:text-blue-600 bg-blue-300 text-white text-xl rounded-lg px-2 py-2 ">
            Products
          </button>
          <button onClick={() => onNav("wishlist")} className=" hover:text-blue-600 bg-blue-300 text-white text-xl rounded-lg px-2 py-2">
            Wishlist ({wishlistCount})
          </button>
          <button onClick={() => onNav("cart")} className=" hover:text-blue-600 bg-blue-300 text-white text-xl rounded-lg px-2 py-2">
            Cart ({cartCount})
          </button>
          <button onClick={() => onNav("orders")} className=" hover:text-blue-600 bg-blue-300 text-white text-xl rounded-lg px-2 py-2">
            Order History
          </button>
          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 text-white px-2 py-2  hover:bg-red-600 rounded-lg"
          >
            Logout
          </button>
        </div>

       
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => onNav("wishlist")}
            className="text-red-500 text-xl relative"
          >
            <FaHeart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          </button>

          <button
            onClick={() => onNav("cart")}
            className="text-blue-500 text-xl relative"
          >
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </button>

          <button onClick={() => onNav("orders")} className="text-gray-700 text-xl">
            <FaHistory />
          </button>

          <button onClick={handleLogout} className="text-gray-700 text-xl">
            <FaSignOutAlt />
          </button>

         
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 text-xl ml-2"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border rounded shadow p-2 flex flex-col gap-2">
          <button
            onClick={() => {
              onNav("products");
              setMobileMenuOpen(false);
            }}
            className="text-gray-700 hover:text-blue-600 text-left "
          >
            Products
          </button>
        </div>
      )}
    </nav>
  );
}