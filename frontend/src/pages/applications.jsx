import React from "react";

const Applications = () => (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-green-100 to-blue-100 flex flex-col items-center px-4 py-12">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">Applications</h1>
            <ul className="list-disc list-inside text-gray-700">
                <li>Student 1 applied for Campus Ambassador - <span className="text-green-600">Pending</span></li>
                <li>Student 2 applied for Web Developer - <span className="text-blue-600">Shortlisted</span></li>
            </ul>
        </div>
    </main>
);

export default Applications;
