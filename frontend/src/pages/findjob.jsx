import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";

const FindJob = () => {
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

    // Calculate stats dynamically
    const liveJobsCount = jobs.length;
    const uniqueEmployers = new Set(jobs.map(job => job.company)).size;
    const newJobsCount = jobs.filter(job => {
        const createdAt = new Date(job.created_at);
        const now = new Date();
        const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);
        return diffDays <= 7; // jobs posted in last 7 days
    }).length;

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#eaf3fb] to-[#f3f6fb] dark:bg-gray-900 flex flex-col items-center px-2 py-8">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <section className="flex-1">
                    {/* Hero & Search Card */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#eaf3fb] to-[#f3f6fb] rounded-2xl blur-sm opacity-80" style={{ zIndex: 0 }}></div>
                        <div className="relative z-10 p-8 rounded-2xl shadow-xl bg-white/90 flex flex-col items-center">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d4373] mb-2 tracking-tight">Find the right job</h1>
                            {/* Stats Row */}
                            <div className="flex flex-wrap justify-center gap-6 mb-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 mb-1 border-2 border-[#b7d7b9]">
                                        <svg className="w-7 h-7 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" /></svg>
                                    </div>
                                    <span className="text-[#2d4373] text-lg font-bold">{liveJobsCount}</span>
                                    <span className="text-gray-600 text-xs">LIVE JOBS</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 mb-1 border-2 border-[#b7d7b9]">
                                        <svg className="w-7 h-7 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 17v-5a4 4 0 014-4h8a4 4 0 014 4v5" /></svg>
                                    </div>
                                    <span className="text-[#2d4373] text-lg font-bold">{uniqueEmployers}</span>
                                    <span className="text-gray-600 text-xs">VERIFIED EMPLOYERS</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 mb-1 border-2 border-[#b7d7b9]">
                                        <svg className="w-7 h-7 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
                                    </div>
                                    <span className="text-[#2d4373] text-lg font-bold">{newJobsCount}</span>
                                    <span className="text-gray-600 text-xs">NEW JOBS THIS WEEK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Job Listings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <div key={job.id} className="hover:scale-105 transition-transform duration-200 border rounded p-4">
                                <h2 className="text-xl font-semibold text-blue-700">{job.title}</h2>
                                <p className="text-gray-600">{job.company} - {job.location}</p>
                                <p className="text-green-600 font-bold">{job.type}</p>
                                <p className="text-gray-700 mt-2">{job.description}</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Apply Now</button>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Sidebar Quick Links */}
                <aside className="w-full lg:w-72 bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-fit">
                    <h3 className="text-lg font-bold text-[#2d4373] mb-4">QUICK LINKS</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-[#2d4373] hover:underline">Employer List ({uniqueEmployers})</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">New Jobs ({newJobsCount})</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Deadline Tomorrow</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Internship Opportunity</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Contractual Jobs</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Part time Jobs</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Overseas Jobs</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Work From Home</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Fresher Jobs</a></li>
                    </ul>
                </aside>
            </div>
        </main>
    );
};

export default FindJob;

