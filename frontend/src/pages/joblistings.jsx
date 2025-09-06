import React from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";

const jobs = [
    { title: "Campus Ambassador", company: "ABC Company", location: "Dhaka University", salary: 10000, type: "Part-time" },
    { title: "Lab Assistant", company: "AUST", location: "Ahsanullah University", salary: 9000, type: "Part-time" },
    { title: "Research Assistant", company: "Dhaka University", location: "Dhaka University", salary: 15000, type: "Permanent" },
    { title: "Library Staff", company: "NSU", location: "North South University", salary: 12000, type: "Permanent" },
];

const JobListings = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-5xl w-full">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-600 to-green-600 mb-6 drop-shadow">Browse Jobs</h1>
            <SearchBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {jobs
                    .filter(job => ["Permanent", "Part-time"].includes(job.type) && (job.location.toLowerCase().includes("university") || job.company.toLowerCase().includes("university")))
                    .map((job, idx) => (
                        <div className="hover:scale-105 transition-transform duration-200" key={idx}>
                            <JobCard {...job} />
                        </div>
                    ))}
            </div>
        </div>
    </main>
);

export default JobListings;
