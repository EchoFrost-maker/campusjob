import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { getUser, apiRequest } from "../utils/api";

const StudentDashboard = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
                const apps = await apiRequest('/applications');
                setApplications(apps);
                const pays = await apiRequest('/payments');
                setPayments(pays);
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
        <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
            <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <ProfileCard name={user.name} role={user.role} skills={["React", "Design", "Marketing"]} resumeUrl="#" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="font-bold text-lg mb-2">My Applications</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {applications.map(app => (
                                <li key={app.id}>
                                    {app.job.title} - <span className="text-blue-600">{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="font-bold text-lg mb-2">Payment History</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {payments.map(pay => (
                                <li key={pay.id}>
                                    {pay.description} - ৳{pay.amount} - <span className={`text-${pay.status === 'success' ? 'green' : pay.status === 'failed' ? 'red' : 'yellow'}-600`}>{pay.status.charAt(0).toUpperCase() + pay.status.slice(1)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default StudentDashboard;
