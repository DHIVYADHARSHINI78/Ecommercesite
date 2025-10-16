


import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import productList from "../data/products";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [view, setView] = useState("products"); 

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) setUser(currentUser);

  
    setProducts(productList);
  }, []);

  
  const addToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) setCart([...cart, product]);
  };


  const addToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id))
      setWishlist([...wishlist, product]);
  };


  const confirmOrder = () => {
    if (cart.length > 0) {
      setOrderHistory([...orderHistory, ...cart]);
      setCart([]);
      alert("Order confirmed!");
    }
  };

  let displayedProducts = [...products];
  if (search) {
    displayedProducts = displayedProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (sort === "price-asc") displayedProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") displayedProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="p-4">
      {user && (
        <Navbar
          user={user}
          onNav={setView}
          cartCount={cart.length}
          wishlistCount={wishlist.length}
        />
      )}

    
      {view === "products" && (
        <div>
          <div className="flex gap-4 mb-4 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price Low → High</option>
              <option value="price-desc">Price High → Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />
            ))}
          </div>
        </div>
      )}

     
      {view === "cart" && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Cart</h2>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div className="flex flex-col gap-2">
              {cart.map((p) => (
                <div key={p.id} className="p-2 border flex justify-between">
                  <span>{p.name}</span>
                  <span>₹{p.price}</span>
                </div>
              ))}
              <button
                onClick={confirmOrder}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      )}

      
      {view === "wishlist" && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>No items in wishlist</p>
          ) : (
            wishlist.map((p) => (
              <div key={p.id} className="p-2 border-b">
                {p.name} - ₹{p.price}
              </div>
            ))
          )}
        </div>
      )}

      {view === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Order History</h2>
          {orderHistory.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orderHistory.map((p, idx) => (
              <div key={idx} className="p-2 border-b">
                {p.name} - ₹{p.price}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
