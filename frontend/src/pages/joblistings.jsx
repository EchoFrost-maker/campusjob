import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import { apiRequest } from "../utils/api";

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsData = await apiRequest('/jobs');
                setJobs(jobsData);
            } catch (err) {
                setError('Failed to load jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <div className="text-center py-12">Loading jobs...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
            <div className="max-w-5xl w-full">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-600 to-green-600 mb-6 drop-shadow">Browse Jobs</h1>
                <SearchBar />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {jobs
                        .filter(job => ["Permanent", "Part-time", "Internship"].includes(job.type) && (job.location.toLowerCase().includes("university") || job.company.toLowerCase().includes("university")))
                        .map((job) => (
                            <div className="hover:scale-105 transition-transform duration-200" key={job.id}>
                                <JobCard {...job} />
                            </div>
                        ))}
                </div>
            </div>
        </main>
    );
};

export default JobListings;
