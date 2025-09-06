
import React from "react";
import Button from "../components/Button";

const JobDetails = () => {
    return (
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center px-2 py-8">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="md:w-1/3 w-full bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 md:mb-0">
                    <div className="flex items-center gap-4 mb-4">
                        <img src="https://i.ibb.co/6bQ6QkT/company-logo.png" alt="Company Logo" className="w-16 h-16 rounded border object-cover" />
                        <div>
                            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">ABC Company</h2>
                            <p className="text-gray-500 dark:text-gray-300 text-sm">Dhaka University</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Industry:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Marketing & Promotion</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Vacancy:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">5</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Employment Status:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Part-time</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Experience:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Not required</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Gender:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Any</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Application Deadline:</span>
                        <span className="text-red-600 dark:text-red-400 text-sm">15 September 2025</span>
                    </div>
                    <Button className="w-full mt-4">Apply Now</Button>
                </aside>
                {/* Main Content */}
                <section className="md:w-2/3 w-full bg-white dark:bg-gray-800 rounded-xl shadow p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">Campus Ambassador</h1>
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Part-time</span>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Dhaka University</span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">ABC Company</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Job Context</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">Promote our brand on campus and earn rewards. Flexible hours. Great for students looking to gain experience in marketing and networking.</p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Job Responsibilities</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        <li>Promote company events and offers on campus</li>
                        <li>Engage with students and collect feedback</li>
                        <li>Represent the brand at campus activities</li>
                    </ul>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Employment Status</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">Part-time</p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Educational Requirements</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        <li>Current student at Dhaka University</li>
                    </ul>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Additional Requirements</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        <li>Strong communication skills</li>
                        <li>Active on social media</li>
                    </ul>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Job Location</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">Dhaka University Campus</p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Compensation & Other Benefits</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        <li>Attractive rewards and certificates</li>
                        <li>Networking opportunities</li>
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default JobDetails;
