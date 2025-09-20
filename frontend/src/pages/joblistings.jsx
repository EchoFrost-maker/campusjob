import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import { getJobs } from "../utils/api";
import { Briefcase, Loader2, AlertCircle } from "lucide-react";

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsData = await getJobs();
                setJobs(jobsData);
            } catch (err) {
                setError('Failed to load jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="flex flex-col items-center gap-4 text-blue-100">
                <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
                <p className="text-lg">Loading jobs...</p>
            </div>
        </main>
    );

    if (error) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="flex flex-col items-center gap-4 text-red-100">
                <AlertCircle className="w-12 h-12 text-red-400" />
                <p className="text-lg">{error}</p>
            </div>
        </main>
    );

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-5xl w-full relative z-10">
                <div className="text-center mb-8">
                    <Briefcase className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-6 drop-shadow">Browse Jobs</h1>
                </div>
                <SearchBar />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {jobs.map((job) => (
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

