import React from "react";

const ApplicationsForJob = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow p-8">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Applications for Campus Ambassador</h1>
            <ul className="list-disc list-inside text-gray-700">
                <li>Student 1 - <span className="text-green-600">Shortlisted</span></li>
                <li>Student 2 - <span className="text-blue-600">Applied</span></li>
            </ul>
        </div>
    </main>
);

export default ApplicationsForJob;
