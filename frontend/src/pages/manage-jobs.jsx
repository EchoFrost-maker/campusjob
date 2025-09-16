import React, { useState, useEffect } from "react";
import { getUser, apiRequest } from "../utils/api";

const ManageJobs = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);

                const jobsData = await apiRequest('/jobs');
                const employerJobs = jobsData.filter(job => job.employer_id === userData.id);
                setJobs(employerJobs);

                const appsData = await apiRequest('/applications');
                setApplications(appsData);
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getApplicationCount = (jobId) => {
        return applications.filter(app => app.job_id === jobId).length;
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Jobs</h1>
                <ul className="list-disc list-inside text-gray-700">
                    {jobs.map(job => (
                        <li key={job.id}>
                            {job.title} <span className="text-blue-600">({getApplicationCount(job.id)} Applications)</span>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default ManageJobs;
