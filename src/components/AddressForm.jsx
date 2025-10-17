import React, { useState } from "react";

export default function AddressForm({ addresses, setAddresses }) {
  const [address, setAddress] = useState({ name: "", phone: "", location: "" });

  const handleAdd = () => {
    if (!address.name || !address.phone || !address.location) return alert("Fill all fields");
    setAddresses([...addresses, { ...address, id: Date.now() }]);
    setAddress({ name: "", phone: "", location: "" });
  };

  return (
    <div className="border p-4 rounded mb-4 bg-gray-50">
      <h3 className="font-semibold mb-2">Add New Address</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={address.name}
        onChange={(e) => setAddress({ ...address, name: e.target.value })}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone"
        value={address.phone}
        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Full Address"
        value={address.location}
        onChange={(e) => setAddress({ ...address, location: e.target.value })}
        className="border p-2 w-full mb-2 rounded"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Address
      </button>
    </div>
  );
}

