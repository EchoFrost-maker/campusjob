import React from "react";

const JobCard = ({ title, company, location, salary, type }) => (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-blue-400 hover:scale-[1.02] transition-transform">
        <h2 className="text-lg font-bold text-blue-700">{title}</h2>
        <div className="text-gray-600 text-sm">{company} &middot; {location}</div>
        <div className="flex gap-2 text-xs">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{type}</span>
            {salary && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">৳ {salary}</span>}
        </div>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Apply Now</button>
    </div>
);

export default JobCard;
