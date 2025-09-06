import React from "react";

const PostJob = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow p-8">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Post a Job</h1>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Job Title" className="px-4 py-2 border rounded" required />
                <textarea placeholder="Job Description" className="px-4 py-2 border rounded" rows={4} required />
                <input type="text" placeholder="Category" className="px-4 py-2 border rounded" required />
                <input type="number" placeholder="Salary" className="px-4 py-2 border rounded" required />
                <input type="text" placeholder="Location" className="px-4 py-2 border rounded" required />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post Job</button>
            </form>
        </div>
    </main>
);

export default PostJob;
