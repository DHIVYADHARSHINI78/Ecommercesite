


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
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Home", details: "Namakkal" },
    { id: 2, name: "Office", details: "Chennai " },
  ]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState({ name: "", details: "" });
  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.details) {
      const newEntry = {
        id: Date.now(),
        name: newAddress.name,
        details: newAddress.details,
      };
      setAddresses([...addresses, newEntry]);
      setNewAddress({ name: "", details: "" });
      setShowAddForm(false);
    } else {
      alert("Please fill in both fields");
    }
  };

  const confirmOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address before confirming your order!");
      return;
    }
    if (cart.length > 0) {
      const newOrders = cart.map((item) => ({
        ...item,
        address: selectedAddress,
        status: "On Process",
      }));
      setOrderHistory([...orderHistory, ...newOrders]);
      setCart([]);
      setSelectedAddress("");
      alert("Order confirmed successfully!");
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <div className="max-w-2xl mx-auto">
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

           
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Select Address:</h3>
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className="block border rounded p-2 mb-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr.details}
                      checked={selectedAddress === addr.details}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="mr-2"
                    />
                    <strong>{addr.name}:</strong> {addr.details}
                  </label>
                ))}

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="text-blue-500 underline mt-2"
                >
                  + Add New Address
                </button>

                {showAddForm && (
                  <div className="mt-3 border p-3 rounded bg-gray-50">
                    <input
                      type="text"
                      placeholder="Address Name (e.g., Home)"
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                      className="border p-2 rounded w-full mb-2"
                    />
                    <textarea
                      placeholder="Address Details"
                      value={newAddress.details}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, details: e.target.value })
                      }
                      className="border p-2 rounded w-full mb-2"
                    />
                    <button
                      onClick={handleAddAddress}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save Address
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={confirmOrder}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                {p.name} - ₹{p.price} <br />
                <span className="text-sm text-gray-600">
                  Address: {p.address}
                </span>
                <br />
                <span
                  className={`text-sm font-semibold ${
                    p.status === "Delivered"
                      ? "text-green-600"
                      : p.status === "Shipped"
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
                >
                  Status: {p.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}