import React from "react";

const StudentSkills = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-pink-100 to-yellow-100 flex flex-col items-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Student Skills</h1>
            <ul className="list-disc list-inside text-gray-700">
                <li>Student 1: React, Design</li>
                <li>Student 2: Marketing, Python</li>
            </ul>
        </div>
    </main>
);

export default StudentSkills;
