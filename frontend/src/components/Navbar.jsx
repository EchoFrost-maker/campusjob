import React from "react";

const Navbar = () => (
    <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
                <span className="font-bold text-xl text-blue-700">Campus Job Portal</span>
            </div>
            <div className="flex gap-6 items-center">
                <a href="/" className="text-gray-700 hover:text-blue-700 font-medium">Home</a>
                <a href="/find-job" className="text-gray-700 hover:text-blue-700 font-medium">Browse Jobs</a>
                <a href="/about" className="text-gray-700 hover:text-blue-700 font-medium">About</a>
                <a href="/contact" className="text-gray-700 hover:text-blue-700 font-medium">Contact</a>
                <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold">Login/Register</a>
            </div>
        </div>
    </nav>
);

export default Navbar;
