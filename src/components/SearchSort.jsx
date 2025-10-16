import React from "react";

export default function SearchSort({ search, setSearch, sort, setSort }) {
  return (
    <div className="flex gap-4 mb-4">
   
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
  );
}