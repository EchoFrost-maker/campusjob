import React from "react";

const Terms = () => (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
        <div className="max-w-2xl w-full bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-8">
            <h1 className="text-3xl font-extrabold text-blue-100 mb-4 drop-shadow">Terms & Conditions</h1>
            <p className="text-blue-200/80 mb-2">By using Campus Job Portal, you agree to our terms and conditions. Please read them carefully before using our services.</p>
            <ul className="list-disc list-inside text-blue-200/80">
                <li>All information provided must be accurate and truthful.</li>
                <li>Do not post inappropriate or fraudulent job listings.</li>
                <li>Respect the privacy and rights of other users.</li>
                <li>We reserve the right to remove any content or user that violates our policies.</li>
            </ul>
        </div>
    </main>
);

export default Terms;

