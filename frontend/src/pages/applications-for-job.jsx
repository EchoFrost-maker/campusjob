import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";

const ApplicationsForJob = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const apps = await apiRequest('/applications');
                setApplications(apps);
            } catch (err) {
                setError('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (loading) return <div className="text-center py-12">Loading applications...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

    // Group applications by job
    const groupedApps = applications.reduce((acc, app) => {
        if (!acc[app.job.title]) acc[app.job.title] = [];
        acc[app.job.title].push(app);
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow p-8">
                {Object.keys(groupedApps).map(jobTitle => (
                    <div key={jobTitle} className="mb-6">
                        <h1 className="text-2xl font-bold text-blue-700 mb-4">Applications for {jobTitle}</h1>
                        <ul className="list-disc list-inside text-gray-700">
                            {groupedApps[jobTitle].map(app => (
                                <li key={app.id}>
                                    {app.user.name} - <span className={`font-bold ${app.status === 'shortlisted' ? 'text-green-600' : 'text-blue-600'}`}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ApplicationsForJob;
