import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { getUser, apiRequest, getEmployerProfile, updateEmployerProfile } from "../utils/api";
import { Briefcase, Building2, Edit3, Save, CheckCircle, AlertCircle, Loader2, Eye, Trash2, Users } from "lucide-react";

const EmployerDashboard = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Company profile states
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);

                const jobsData = await apiRequest('/jobs');
                const employerJobs = jobsData.filter(job => job.employer_id === userData.id);
                setJobs(employerJobs);

                // Fetch employer profile data with error handling and detailed logging
                try {
                    const profileData = await getEmployerProfile();
                    if (!profileData || typeof profileData !== 'object') {
                        throw new Error('Invalid profile data received');
                    }
                    setCompanyName(profileData.company_name || "");
                    setIndustry(profileData.industry || "");
                    setWebsite(profileData.website || "");
                    setDescription(profileData.description || "");
                    setCompanyLogo(profileData.company_logo || "");
                } catch (profileErr) {
                    console.error('Error fetching employer profile:', profileErr);
                    setProfileError('Failed to load profile data');
                }
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
                setProfileLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setSubmitError("");
        try {
            await updateEmployerProfile({
                company_name: companyName,
                industry,
                website,
                description,
                company_logo: companyLogo,
            });
            setSuccessMessage("Company profile updated successfully.");
        } catch (err) {
            setSubmitError("Failed to update company profile. " + err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 text-white">
                        <Loader2 size={24} className="animate-spin" />
                        <span className="text-lg">Loading your dashboard...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg border border-red-300/20 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 text-red-200">
                        <AlertCircle size={24} />
                        <span className="text-lg">{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center px-4 py-12">
                <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <ProfileCard name={user.name} role={user.role} skills={["HR", "Recruitment"]} />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-6">
                        {/* Success/Error Messages */}
                        {successMessage && (
                            <div className="bg-green-500/20 backdrop-blur-lg border border-green-300/30 rounded-xl p-4 shadow-lg">
                                <div className="flex items-center gap-3 text-green-100">
                                    <CheckCircle size={20} />
                                    <span className="font-medium">{successMessage}</span>
                                </div>
                            </div>
                        )}

                        {submitError && (
                            <div className="bg-red-500/20 backdrop-blur-lg border border-red-300/30 rounded-xl p-4 shadow-lg">
                                <div className="flex items-center gap-3 text-red-100">
                                    <AlertCircle size={20} />
                                    <span className="font-medium">{submitError}</span>
                                </div>
                            </div>
                        )}

                        {/* Manage Jobs Section */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-blue-500/10 rounded-2xl blur-xl opacity-50"></div>
                            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <Briefcase size={24} className="text-blue-400" />
                                            <h2 className="text-2xl font-bold text-white">Manage Jobs</h2>
                                        </div>
                                        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                            <Briefcase size={18} />
                                            Post New Job
                                        </button>
                                    </div>
                                    {jobs.length > 0 ? (
                                        <div className="space-y-4">
                                            {jobs.map(job => (
                                                <div key={job.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                                                            <div className="flex items-center gap-4 text-blue-100 text-sm">
                                                                <span className="flex items-center gap-1">
                                                                    <CheckCircle size={16} />
                                                                    {job.applications_count || 0} Applications
                                                                </span>
                                                                <span className="text-blue-200">•</span>
                                                                <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 px-4 py-2 rounded-lg font-medium transition-all duration-300">
                                                                <Eye size={16} />
                                                                View
                                                            </button>
                                                            <button className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-100 px-4 py-2 rounded-lg font-medium transition-all duration-300">
                                                                <Edit3 size={16} />
                                                                Edit
                                                            </button>
                                                            <button className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 px-4 py-2 rounded-lg font-medium transition-all duration-300">
                                                                <Trash2 size={16} />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                                                            <Users size={16} />
                                                            View Applications ({job.applications_count || 0})
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <Briefcase size={48} className="text-blue-400 mx-auto mb-4 opacity-50" />
                                            <p className="text-blue-100 text-lg mb-4">No jobs posted yet.</p>
                                            <p className="text-blue-200">Start by posting your first job to attract top talent.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Company Profile Section */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-blue-500/10 rounded-2xl blur-xl opacity-50"></div>
                            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Building2 size={24} className="text-blue-400" />
                                        <h2 className="text-2xl font-bold text-white mb-2">Company Profile</h2>
                                        <p className="text-blue-100">Manage your company information</p>
                                    </div>

                                    {profileLoading ? (
                                        <div className="flex items-center gap-3 text-white">
                                            <Loader2 size={20} className="animate-spin" />
                                            <span>Loading profile...</span>
                                        </div>
                                    ) : profileError ? (
                                        <div className="flex items-center gap-3 text-red-100">
                                            <AlertCircle size={20} />
                                            <span>{profileError}</span>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-blue-100">Company Name</label>
                                                    <input
                                                        type="text"
                                                        name="company_name"
                                                        placeholder="Enter company name"
                                                        value={companyName}
                                                        onChange={(e) => setCompanyName(e.target.value)}
                                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-blue-100">Industry</label>
                                                    <input
                                                        type="text"
                                                        name="industry"
                                                        placeholder="Enter industry"
                                                        value={industry}
                                                        onChange={(e) => setIndustry(e.target.value)}
                                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-100">Website</label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    placeholder="https://example.com"
                                                    value={website}
                                                    onChange={(e) => setWebsite(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-100">Company Logo URL</label>
                                                <input
                                                    type="url"
                                                    name="company_logo"
                                                    placeholder="https://example.com/logo.png"
                                                    value={companyLogo}
                                                    onChange={(e) => setCompanyLogo(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-100">Description</label>
                                                <textarea
                                                    name="description"
                                                    placeholder="Tell us about your company..."
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    rows="4"
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                                                />
                                            </div>

                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="submit"
                                                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                                >
                                                    <Save size={18} />
                                                    Update Profile
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EmployerDashboard;
