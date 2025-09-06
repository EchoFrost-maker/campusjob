import React from "react";

const AdminDashboard = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2">Total Students</h2>
                <span className="text-2xl text-blue-700 font-bold">1,200</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2">Total Employers</h2>
                <span className="text-2xl text-blue-700 font-bold">300</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2">Total Jobs</h2>
                <span className="text-2xl text-blue-700 font-bold">2,500</span>
            </div>
        </div>
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-lg mb-2">Manage Users</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Student 1 <span className="text-red-600">Block</span></li>
                    <li>Employer 1 <span className="text-red-600">Delete</span></li>
                </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-lg mb-2">Manage Jobs</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Campus Ambassador <span className="text-red-600">Remove</span></li>
                </ul>
            </div>
        </div>
        <div className="max-w-5xl w-full bg-white rounded-xl shadow p-6 mt-8">
            <h2 className="font-bold text-lg mb-2">Reports</h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>Applications: 3,000</li>
                <li>Revenue: ৳50,000</li>
            </ul>
        </div>
    </main>
);

export default AdminDashboard;
