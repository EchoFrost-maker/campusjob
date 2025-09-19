import React from "react";

const Sidebar = () => {
    const role = localStorage.getItem("role");

    return (
        <aside className="bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-800/85 backdrop-blur-md shadow-2xl border border-blue-500/20 h-full w-64 flex flex-col gap-4 fixed top-16 left-0 z-40 hidden lg:flex">
            <div className="flex flex-col items-start w-full px-4 pt-4 pb-2">
                {/* Logo space - elegantly minimal */}
            </div>

            <nav className="flex flex-col gap-1 px-4 pb-6">
                {role === "student" && (
                    <div className="mb-3">
                        <h3 className="text-blue-300 text-xs uppercase tracking-wider font-semibold mb-2 px-2 opacity-70">Student Portal</h3>
                        <a href="/student-dashboard" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                            Student Dashboard
                        </a>
                        <a href="/student-profile" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                            My Profile
                        </a>
                        <a href="/joblistings" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                            Browse Jobs
                        </a>
                        <a href="/my-applications" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                            My Applications
                        </a>
                        <a href="/payment-history" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                            Payment History
                        </a>
                    </div>
                )}

                {role === "employer" && (
                    <>
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent my-3"></div>
                        <div className="mb-3">
                            <h3 className="text-blue-300 text-xs uppercase tracking-wider font-semibold mb-2 px-2 opacity-70">Employer Portal</h3>
                            <a href="/employer-dashboard" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                                Employer Dashboard
                            </a>
                            <a href="/employer-profile" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                                Company Profile
                            </a>
                            <a href="/post-job" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                                Post a Job
                            </a>
                            <a href="/manage-jobs" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                                Manage Jobs
                            </a>
                            <a href="/applications-for-job" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                                Applications for Job
                            </a>
                        </div>
                    </>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent my-3"></div>

                {/* Admin Section */}
                <div>
                    <h3 className="text-blue-300 text-xs uppercase tracking-wider font-semibold mb-2 px-2 opacity-70">Administration</h3>
                    <a href="/admin-dashboard" className="text-slate-200 hover:text-blue-300 hover:bg-blue-600/20 font-medium py-2 px-3 rounded-lg transition-all duration-200 block border border-transparent hover:border-blue-400/30">
                        Admin Dashboard
                    </a>
                </div>
            </nav>

            {/* Subtle bottom accent */}
            <div className="mt-auto mb-4 mx-4">
                <div className="h-1 bg-gradient-to-r from-blue-500/30 via-indigo-500/50 to-blue-500/30 rounded-full"></div>
            </div>
        </aside>
    );
};

export default Sidebar;
