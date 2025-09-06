import React from "react";

const NotificationHistory = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-700 mb-4 drop-shadow">Notification History</h1>
            <ul className="list-disc list-inside text-gray-700">
                <li>🎉 <span className="font-semibold text-green-700">Congratulations!</span> You have been hired for the Campus Ambassador job at ABC Company.</li>
                <li>⭐ Your application for Web Developer at AUST has been <span className="font-semibold text-blue-700">shortlisted</span>.</li>
                <li>⏳ Your application for Event Coordinator at NSU is <span className="font-semibold text-yellow-700">under review</span>.</li>
            </ul>
        </div>
    </main>
);

export default NotificationHistory;
