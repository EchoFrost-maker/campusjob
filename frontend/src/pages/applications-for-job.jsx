import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";
import { Loader2, AlertCircle, UserCheck } from "lucide-react";

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

    if (loading) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="flex flex-col items-center gap-4 text-blue-100">
                <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
                <p className="text-lg">Loading applications...</p>
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

    // Group applications by job
    const groupedApps = applications.reduce((acc, app) => {
        if (!acc[app.job.title]) acc[app.job.title] = [];
        acc[app.job.title].push(app);
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 relative z-10">
                {Object.keys(groupedApps).map(jobTitle => (
                    <div key={jobTitle} className="mb-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">Applications for {jobTitle}</h1>
                        <ul className="list-disc list-inside text-blue-100">
                            {groupedApps[jobTitle].map(app => (
                                <li key={app.id} className="mb-2">
                                    <div className="flex items-center gap-2">
                                        <UserCheck className="text-blue-400" />
                                        <span className="font-semibold">{app.user.name}</span> - <span className={`font-bold ${app.status === 'shortlisted' ? 'text-green-400' : 'text-blue-400'}`}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                                    </div>
                                    {app.cover_letter && (
                                        <div className="mt-1 text-blue-200 whitespace-pre-wrap border border-blue-400 rounded p-2 bg-blue-900/20">
                                            {app.cover_letter}
                                        </div>
                                    )}
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

