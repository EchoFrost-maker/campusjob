import React from "react";

const SearchBar = ({ placeholder = "Search jobs..." }) => (
    <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 gap-2 w-full max-w-2xl mx-auto">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
        <input
            type="text"
            placeholder={placeholder}
            className="flex-1 px-2 py-2 rounded border-none focus:outline-none text-gray-900 bg-transparent"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Search</button>
    </div>
);

export default SearchBar;
