import React from "react";

const Terms = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-700 to-pink-600 mb-4 drop-shadow">Terms & Conditions</h1>
            <p className="text-gray-700 mb-2">By using Campus Job Portal, you agree to our terms and conditions. Please read them carefully before using our services.</p>
            <ul className="list-disc list-inside text-gray-700">
                <li>All information provided must be accurate and truthful.</li>
                <li>Do not post inappropriate or fraudulent job listings.</li>
                <li>Respect the privacy and rights of other users.</li>
                <li>We reserve the right to remove any content or user that violates our policies.</li>
            </ul>
        </div>
    </main>
);

export default Terms;
