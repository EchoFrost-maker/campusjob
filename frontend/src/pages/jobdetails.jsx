
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { apiRequest } from "../utils/api";
import { useParams } from "react-router-dom";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobData = await apiRequest(`/jobs/${id}`);
                setJob(jobData);
            } catch (err) {
                setError("Failed to load job details");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) return <div className="text-center py-12">Loading job details...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
    if (!job) return <div className="text-center py-12">Job not found</div>;

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center px-2 py-8">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="md:w-1/3 w-full bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 md:mb-0">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={job.company_logo || "https://i.ibb.co/6bQ6QkT/company-logo.png"} alt="Company Logo" className="w-16 h-16 rounded border object-cover" />
                        <div>
                            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">{job.company}</h2>
                            <p className="text-gray-500 dark:text-gray-300 text-sm">{job.location}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Industry:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{job.industry || "N/A"}</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Vacancy:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{job.vacancy || "N/A"}</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Employment Status:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{job.type}</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Experience:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{job.experience || "Not required"}</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Gender:</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{job.gender || "Any"}</span>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold">Application Deadline:</span>
                        <span className="text-red-600 dark:text-red-400 text-sm">{job.application_deadline || "N/A"}</span>
                    </div>
                    <Button className="w-full mt-4">Apply Now</Button>
                </aside>
                {/* Main Content */}
                <section className="md:w-2/3 w-full bg-white dark:bg-gray-800 rounded-xl shadow p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">{job.title}</h1>
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{job.type}</span>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{job.location}</span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{job.company}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Job Context</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{job.context || "N/A"}</p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Job Responsibilities</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        {(job.responsibilities || []).map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                        ))}
                    </ul>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Employment Status</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{job.type}</p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Educational Requirements</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        {(job.education_requirements || []).map((req, idx) => (
                            <li key={idx}>{req}</li>
                        ))}
                    </ul>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Additional Requirements</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        {(job.additional_requirements || []).map((req, idx) => (
                            <li key={idx}>{req}</li>
                        ))}
                    </ul>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Job Location</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{job.location}</p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Compensation & Other Benefits</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                        {(job.benefits || []).map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default JobDetails;
