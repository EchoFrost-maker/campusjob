import React from "react";

const Sidebar = () => (
    <aside className="bg-gradient-to-br from-blue-700 via-purple-500 to-fuchsia-400 shadow h-full w-64 flex flex-col gap-4 fixed top-16 left-0 z-40 hidden lg:flex">
        <div className="flex flex-col items-start w-full px-4 pt-4 pb-2">
            {/* Logo removed as requested */}
        </div>
        <nav className="flex flex-col gap-2 px-6 pb-6">
            <a href="/student-dashboard" className="text-gray-100 hover:text-yellow-200 font-medium">Student Dashboard</a>
            <a href="/student-profile" className="text-gray-100 hover:text-yellow-200 font-medium">My Profile</a>
            <a href="/joblistings" className="text-gray-100 hover:text-yellow-200 font-medium">Browse Jobs</a>
            <a href="/my-applications" className="text-gray-100 hover:text-yellow-200 font-medium">My Applications</a>
            <a href="/payment-history" className="text-gray-100 hover:text-yellow-200 font-medium">Payment History</a>
            <hr className="border-purple-300 my-2" />
            <a href="/employer-dashboard" className="text-gray-100 hover:text-yellow-200 font-medium">Employer Dashboard</a>
            <a href="/employer-profile" className="text-gray-100 hover:text-yellow-200 font-medium">Company Profile</a>
            <a href="/post-job" className="text-gray-100 hover:text-yellow-200 font-medium">Post a Job</a>
            <a href="/manage-jobs" className="text-gray-100 hover:text-yellow-200 font-medium">Manage Jobs</a>
            <a href="/applications-for-job" className="text-gray-100 hover:text-yellow-200 font-medium">Applications for Job</a>
            <hr className="border-purple-300 my-2" />
            <a href="/admin-dashboard" className="text-gray-100 hover:text-yellow-200 font-medium">Admin Dashboard</a>
        </nav>
    </aside>
);

export default Sidebar;
