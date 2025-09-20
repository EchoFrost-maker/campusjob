import React from "react";
import Button from "./Button";

const SearchBar = ({ placeholder = "Search jobs..." }) => (
    <div className="flex items-center bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-xl border border-blue-500/20 px-4 py-3 gap-3 w-full max-w-2xl mx-auto shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-400/30">
        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
            type="text"
            placeholder={placeholder}
            className="flex-1 px-2 py-2 rounded-lg border-none focus:outline-none text-slate-200 bg-transparent placeholder-slate-400 focus:bg-slate-700/50 transition-all duration-200"
        />
        <Button variant="primary" className="px-6">
            Search
        </Button>
    </div>
);

export default SearchBar;
