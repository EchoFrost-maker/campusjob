import React from "react";

const ManageJobs = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow p-8">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Jobs</h1>
            <ul className="list-disc list-inside text-gray-700">
                <li>Campus Ambassador <span className="text-blue-600">(12 Applications)</span></li>
                <li>Intern - Web Developer <span className="text-blue-600">(5 Applications)</span></li>
            </ul>
        </div>
    </main>
);

export default ManageJobs;
