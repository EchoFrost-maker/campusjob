import React from "react";

const Skills = () => (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 flex flex-col items-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">Skills</h1>
            <ul className="list-disc list-inside text-gray-700">
                <li>React</li>
                <li>Design</li>
                <li>Marketing</li>
                <li>Python</li>
                <li>JavaScript</li>
            </ul>
        </div>
    </main>
);

export default Skills;
