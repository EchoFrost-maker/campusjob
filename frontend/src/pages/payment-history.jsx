import React from "react";

const PaymentHistory = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-blue-700 to-green-600 mb-4 drop-shadow">Payment History</h1>
            <ul className="list-disc list-inside text-gray-700">
                <li>Campus Ambassador - ৳100 - <span className="text-green-600 font-bold">Success</span></li>
                <li>Intern - Web Developer - ৳150 - <span className="text-green-600 font-bold">Success</span></li>
            </ul>
        </div>
    </main>
);

export default PaymentHistory;
