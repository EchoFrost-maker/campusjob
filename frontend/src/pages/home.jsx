import React from "react";


const Home = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 dark:bg-gray-900 flex flex-col items-center px-2 py-8">
            <div className="w-full max-w-4xl mx-auto">
                {/* Hero & Search Card */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#eaf3fb] to-[#f3f6fb] rounded-2xl blur-sm opacity-80" style={{ zIndex: 0 }}></div>
                    <div className="relative z-10 p-8 rounded-2xl shadow-xl bg-white/90 flex flex-col items-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d4373] mb-2 tracking-tight">Campus Job Portal</h1>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6">Connecting students with the best campus jobs and internships. Start your career journey with opportunities tailored for you!</p>
                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-6 mb-6">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                    <svg className="w-6 h-6 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" /></svg>
                                </div>
                                <span className="text-[#2d4373] text-base font-bold">5,831</span>
                                <span className="text-gray-600 text-xs">LIVE JOBS</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                    <svg className="w-6 h-6 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 17v-5a4 4 0 014-4h8a4 4 0 014 4v5" /></svg>
                                </div>
                                <span className="text-[#2d4373] text-base font-bold">24,188+</span>
                                <span className="text-gray-600 text-xs">VACANCIES</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                    <svg className="w-6 h-6 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20H2v-2a4 4 0 014-4h1m4-4V4m0 0a4 4 0 110 8 4 4 0 010-8z" /></svg>
                                </div>
                                <span className="text-[#2d4373] text-base font-bold">3,296</span>
                                <span className="text-gray-600 text-xs">COMPANIES</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                    <svg className="w-6 h-6 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                                </div>
                                <span className="text-[#2d4373] text-base font-bold">382</span>
                                <span className="text-gray-600 text-xs">NEW JOBS</span>
                            </div>
                        </div>
                        {/* Search Bar */}
                        <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-[#2d4373] rounded-lg p-4 mt-2">
                            <div className="flex items-center flex-1 bg-white rounded px-2">
                                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                                <input
                                    type="text"
                                    placeholder="Search by keyword"
                                    className="flex-1 px-2 py-2 rounded border-none focus:outline-none text-gray-900 bg-transparent"
                                />
                            </div>
                            <select className="px-4 py-2 rounded text-gray-700">
                                <option>Organization Type</option>
                                <option>Company</option>
                                <option>NGO</option>
                                <option>University</option>
                            </select>
                            <button className="px-8 py-2 bg-[#b7d7b9] text-[#2d4373] font-semibold rounded hover:bg-[#a0cfa3] transition">Search</button>
                        </div>
                    </div>
                </div>
                {/* Features Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
                        <svg className="w-10 h-10 text-blue-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V5a4 4 0 00-8 0v2m8 0v2a4 4 0 01-8 0V7" /></svg>
                        <h3 className="font-bold text-lg mb-2">Student Focused</h3>
                        <p className="text-gray-600 dark:text-gray-300">Opportunities designed for students and fresh graduates.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
                        <svg className="w-10 h-10 text-blue-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
                        <h3 className="font-bold text-lg mb-2">Verified Employers</h3>
                        <p className="text-gray-600 dark:text-gray-300">All job postings are from trusted and verified campus partners.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
                        <svg className="w-10 h-10 text-blue-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8zm-6 4v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8z" /></svg>
                        <h3 className="font-bold text-lg mb-2">Easy Application</h3>
                        <p className="text-gray-600 dark:text-gray-300">Apply to jobs and internships with a simple, user-friendly process.</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
