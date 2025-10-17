import React, { useState } from "react";

export default function Checkout({ cart, addresses, confirmOrder }) {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleConfirm = () => {
    if (!selectedAddress) return alert("Please select an address");
    confirmOrder(selectedAddress);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>

      <h3 className="font-semibold mb-2">Select Address</h3>
      {addresses.length === 0 && <p>No saved addresses. Please add one in profile.</p>}
      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <label key={addr.id} className="border p-3 rounded cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="address"
              onChange={() => setSelectedAddress(addr)}
            />
            <span>{addr.name}, {addr.phone} - {addr.location}</span>
          </label>
        ))}
      </div>

      <h3 className="font-semibold mt-4 mb-2">Items</h3>
      {cart.map((item) => (
        <div key={item.id} className="border-b py-2 flex justify-between">
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}

      <button
        onClick={handleConfirm}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Confirm Order
      </button>
    </div>
  );
}