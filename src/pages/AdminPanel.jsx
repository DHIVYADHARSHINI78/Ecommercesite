import React, { useState } from "react";

export default function AdminPanel({ orders, updateOrderStatus }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="border p-3 mb-3 rounded bg-gray-50">
            <p><b>{order.name}</b> - ₹{order.price}</p>
            <p>Address: {order.address.location}</p>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
              className="border p-1 rounded mt-2"
            >
              <option>On Process</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}