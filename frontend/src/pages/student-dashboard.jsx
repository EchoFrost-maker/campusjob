import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { getUser, apiRequest } from "../utils/api";
import { FileText, CreditCard, Loader2, AlertCircle, CheckCircle } from "lucide-react";

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                    <p className="mt-2 text-gray-600">Welcome back, {user?.name}! Here's your overview.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{applications.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Pending Payments</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">
                                    {payments.filter(p => p.status === 'pending').length}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <CreditCard className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Successful Payments</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    {payments.filter(p => p.status === 'success').length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                                <p className="text-3xl font-bold text-purple-600 mt-2">
                                    ৳{payments.filter(p => p.status === 'success').reduce((sum, p) => sum + parseFloat(p.amount), 0)}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <CreditCard className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Section */}
                    <div className="lg:col-span-1">
                        <ProfileCard name={user?.name} role={user?.role} skills={["React", "Design", "Marketing"]} resumeUrl="#" />
                    </div>

                    {/* Applications and Payments */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Applications Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText size={24} className="text-blue-600" />
                                <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                            </div>
                            {applications.length > 0 ? (
                                <div className="space-y-3">
                                    {applications.map(app => (
                                        <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{app.job?.title || 'Job Title'}</p>
                                                <p className="text-sm text-gray-600">{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                app.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                                                app.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                                                app.status === 'hired' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No applications yet. Start applying to jobs!</p>
                            )}
                        </div>

                        {/* Payments Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CreditCard size={24} className="text-green-600" />
                                <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
                            </div>
                            {payments.length > 0 ? (
                                <div className="space-y-3">
                                    {payments.map(pay => (
                                        <div key={pay.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{pay.description}</p>
                                                <p className="text-sm text-gray-600">৳{pay.amount}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                pay.status === 'success' ? 'bg-green-100 text-green-800' :
                                                pay.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {pay.status.charAt(0).toUpperCase() + pay.status.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No payment history yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;

