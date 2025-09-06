import React from "react";

const Footer = () => (
    <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Campus Job Portal. All rights reserved.</div>
            <div className="flex gap-4 text-sm">
                <a href="/about" className="hover:underline text-gray-700">About</a>
                <a href="/contact" className="hover:underline text-gray-700">Contact</a>
                <a href="/terms" className="hover:underline text-gray-700">Terms</a>
            </div>
        </div>
    </footer>
);

export default Footer;
