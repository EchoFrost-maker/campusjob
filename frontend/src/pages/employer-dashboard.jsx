import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { getUser, apiRequest } from "../utils/api";

const EmployerDashboard = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
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
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12">
            <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <ProfileCard name={user.name} role={user.role} skills={["HR", "Recruitment"]} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="font-bold text-lg mb-2">Manage Jobs</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {jobs.map(job => (
                                <li key={job.id}>{job.title} <span className="text-blue-600">({job.applications_count || 0} Applications)</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="font-bold text-lg mb-2">Company Profile</h2>
                        <p className="text-gray-700">Update your company information and logo here.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EmployerDashboard;

