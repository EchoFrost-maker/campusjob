import React from "react";

const Navbar = ({ toggleSidebar }) => (
    <nav className="bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-indigo-800/85 backdrop-blur-md shadow-2xl border-b border-blue-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden h-10 w-10 bg-gradient-to-br from-blue-400/30 to-indigo-500/40 rounded-lg border border-blue-400/50 flex items-center justify-center backdrop-blur-sm hover:bg-blue-500/40 transition-colors duration-200"
                    aria-label="Toggle sidebar"
                >
                    <div className="flex flex-col gap-1">
                        <div className="h-0.5 w-5 bg-blue-300 rounded"></div>
                        <div className="h-0.5 w-5 bg-blue-300 rounded"></div>
                        <div className="h-0.5 w-5 bg-blue-300 rounded"></div>
                    </div>
                </button>
                <div className="h-10 w-10 bg-gradient-to-br from-blue-400/30 to-indigo-500/40 rounded-lg border border-blue-400/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="h-6 w-6 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-md opacity-80"></div>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-300 bg-clip-text text-transparent">
                    Campus Job Portal
                </span>
            </div>
            
            <div className="flex gap-2 items-center">
                <a href="/" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-400/30">
                    Home
                </a>
                <a href="/about" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-400/30">
                    About
                </a>
                <a href="/contact" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-400/30">
                    Contact
                </a>
                
                {/* Elegant separator */}
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent mx-2"></div>
                
                <a href="/login" className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-500/90 hover:to-indigo-500/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 border border-blue-400/30 hover:border-blue-300/50 backdrop-blur-sm shadow-lg hover:shadow-blue-500/25">
                    Login/Register
                </a>
            </div>
        </div>
        
        {/* Subtle bottom accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
    </nav>
);

export default Navbar;