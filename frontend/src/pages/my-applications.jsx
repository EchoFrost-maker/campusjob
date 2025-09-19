import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";

const MyApplications = () => {
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

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">My Applications</h1>
                <ul className="list-disc list-inside text-gray-700">
                    {applications.map(app => (
                        <li key={app.id}>
                            {app.job.title} - <span className="text-blue-600">{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default MyApplications;

