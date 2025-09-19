import React, { useState, useEffect } from "react";
import { getJobs } from "../utils/api";

const Home = () => {
    const [stats, setStats] = useState({
        liveJobs: 0,
        vacancies: 0,
        companies: 0,
        newJobs: 0
    });
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("Organization Type");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const jobsData = await getJobs();
                setJobs(jobsData);
                const companies = new Set(jobsData.map(job => job.company)).size;
                const newJobs = jobsData.filter(job => {
                    const jobDate = new Date(job.created_at);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return jobDate > weekAgo;
                }).length;
                setStats({
                    liveJobs: jobsData.length,
                    vacancies: jobsData.length, // Assuming vacancies = jobs for now
                    companies,
                    newJobs
                });
            } catch (err) {
                console.error('Failed to load stats', err);
            }
        };
        fetchStats();
    }, []);

    return (
        <main className="flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
            <div className="w-full max-w-4xl mx-auto">
                {/* Hero & Search Card */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-indigo-800/30 rounded-2xl blur-sm" style={{ zIndex: 0 }}></div>
                    <div className="relative z-10 p-8 rounded-2xl shadow-2xl bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 flex flex-col items-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-100 mb-2 tracking-tight">Campus Job Portal</h1>
                        <p className="text-lg md:text-xl text-blue-200/90 mb-6 text-center">Connecting students with the best campus jobs and internships. Start your career journey with opportunities tailored for you!</p>
                        
                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-6 mb-6">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-800/50 backdrop-blur-sm mb-1 border-2 border-blue-400/30">
                                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" /></svg>
                                </div>
                                <span className="text-blue-100 text-base font-bold">{stats.liveJobs.toLocaleString()}</span>
                                <span className="text-blue-300/80 text-xs">LIVE JOBS</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-800/50 backdrop-blur-sm mb-1 border-2 border-blue-400/30">
                                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 17v-5a4 4 0 014-4h8a4 4 0 014 4v5" /></svg>
                                </div>
                                <span className="text-blue-100 text-base font-bold">{stats.vacancies.toLocaleString()}+</span>
                                <span className="text-blue-300/80 text-xs">VACANCIES</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-800/50 backdrop-blur-sm mb-1 border-2 border-blue-400/30">
                                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20H2v-2a4 4 0 014-4h1m4-4V4m0 0a4 4 0 110 8 4 4 0 010-8z" /></svg>
                                </div>
                                <span className="text-blue-100 text-base font-bold">{stats.companies}</span>
                                <span className="text-blue-300/80 text-xs">COMPANIES</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-800/50 backdrop-blur-sm mb-1 border-2 border-blue-400/30">
                                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                                </div>
                                <span className="text-blue-100 text-base font-bold">{stats.newJobs}</span>
                                <span className="text-blue-300/80 text-xs">NEW JOBS</span>
                            </div>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 mt-2">
                            <div className="flex items-center flex-1 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded px-2">
                                <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                                <input
                                    type="text"
                                    placeholder="Search by keyword"
                                    className="flex-1 px-2 py-2 rounded border-none focus:outline-none text-blue-100 bg-transparent placeholder-blue-300/60"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 rounded bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 text-blue-100 focus:outline-none focus:border-blue-400/50"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option className="bg-slate-800">Organization Type</option>
                                <option className="bg-slate-800">Company</option>
                                <option className="bg-slate-800">NGO</option>
                                <option className="bg-slate-800">University</option>
                            </select>
                            <button
                                className="px-8 py-2 bg-blue-600/80 backdrop-blur-sm border border-blue-500/50 text-blue-100 font-semibold rounded hover:bg-blue-500/80 hover:border-blue-400/60 transition-all duration-200"
                                onClick={() => {
                                    // For now, just log the search
                                    console.log('Search:', searchQuery, filterType);
                                    // In a full implementation, filter jobs and display
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
                    <div className="bg-slate-800/60 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-6 flex flex-col items-center hover:bg-slate-800/70 hover:border-blue-400/30 transition-all duration-300">
                        <svg className="w-10 h-10 text-blue-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V5a4 4 0 00-8 0v2m8 0v2a4 4 0 01-8 0V7" /></svg>
                        <h3 className="font-bold text-lg mb-2 text-blue-100">Student Focused</h3>
                        <p className="text-blue-200/80 text-center">Opportunities designed for students and fresh graduates.</p>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-6 flex flex-col items-center hover:bg-slate-800/70 hover:border-blue-400/30 transition-all duration-300">
                        <svg className="w-10 h-10 text-blue-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
                        <h3 className="font-bold text-lg mb-2 text-blue-100">Verified Employers</h3>
                        <p className="text-blue-200/80 text-center">All job postings are from trusted and verified campus partners.</p>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-6 flex flex-col items-center hover:bg-slate-800/70 hover:border-blue-400/30 transition-all duration-300">
                        <svg className="w-10 h-10 text-blue-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8zm-6 4v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8z" /></svg>
                        <h3 className="font-bold text-lg mb-2 text-blue-100">Easy Application</h3>
                        <p className="text-blue-200/80 text-center">Apply to jobs and internships with a simple, user-friendly process.</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
