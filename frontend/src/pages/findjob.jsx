import React from "react";



const FindJob = () => {
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
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                        <svg className="w-7 h-7 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" /></svg>
                                    </div>
                                    <span className="text-[#2d4373] text-lg font-bold">5,831</span>
                                    <span className="text-gray-600 text-xs">LIVE JOBS</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                        <svg className="w-7 h-7 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 17v-5a4 4 0 014-4h8a4 4 0 014 4v5" /></svg>
                                    </div>
                                    <span className="text-[#2d4373] text-lg font-bold">24,188+</span>
                                    <span className="text-gray-600 text-xs">VACANCIES</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                        <svg className="w-7 h-7 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20H2v-2a4 4 0 014-4h1m4-4V4m0 0a4 4 0 110 8 4 4 0 010-8z" /></svg>
                                    </div>
                                    <span className="text-[#2d4373] text-lg font-bold">3,296</span>
                                    <span className="text-gray-600 text-xs">COMPANIES</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#eaf3fb] mb-1 border-2 border-[#b7d7b9]">
                                        <svg className="w-7 h-7 text-[#2d4373]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                                    </div>
                                    <span className="text-[#2d4373] text-lg font-bold">382</span>
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
                            {/* Location Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {['Dhaka (3403)', 'Barishal (57)', 'Khulna (124)', 'Sylhet (129)', 'Chattogram (526)', 'Rajshahi (132)', 'Rangpur (114)', 'Mymensingh (126)'].map((loc) => (
                                    <span key={loc} className="bg-[#e6eaf3] text-[#2d4373] px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-[#d1d8e6]">{loc}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Job Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* AUST Job Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-start border-t-4 border-purple-500 hover:scale-[1.02] transition-transform">
                            <h2 className="text-lg font-bold text-purple-700 mb-1">Lab Assistant</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-1">AUST &middot; Ahsanullah University of Science and Technology</p>
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">Part-time</span>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Assist in laboratory work and research at AUST. Great opportunity for students.</p>
                            <button className="mt-auto px-4 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition animate-pulse">Apply Now</button>
                        </div>
                        {/* AUST Faculty Member Job Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-start border-t-4 border-blue-500 hover:scale-[1.02] transition-transform">
                            <h2 className="text-lg font-bold text-blue-700 mb-1">Faculty Member</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-1">AUST &middot; Ahsanullah University of Science and Technology</p>
                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mb-2">Permanent</span>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Join AUST as a faculty member. Teach, guide, and inspire students in a dynamic academic environment.</p>
                            <button className="mt-auto px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition animate-pulse">Apply Now</button>
                        </div>
                        {/* ...existing job cards... */}
                    </div>
                </section>
                {/* Sidebar Quick Links */}
                <aside className="w-full lg:w-72 bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-fit">
                    <h3 className="text-lg font-bold text-[#2d4373] mb-4">QUICK LINKS</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-[#2d4373] hover:underline">Employer List (3295)</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">New Jobs (382)</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Deadline Tomorrow (592)</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Internship Opportunity (76) <span className="bg-yellow-200 text-yellow-800 px-1 rounded text-xs ml-1">new</span></a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Contractual Jobs (278)</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Part time Jobs (31)</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Overseas Jobs (125)</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Work From Home (70)</a></li>
                        <li><a href="#" className="text-[#2d4373] hover:underline">Fresher Jobs (1835)</a></li>
                    </ul>
                </aside>
            </div>
        </main>
    );
};

export default FindJob;
