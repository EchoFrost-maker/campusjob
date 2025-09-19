import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { getUser, apiRequest, getEmployerProfile, updateEmployerProfile } from "../utils/api";

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
                        {profileLoading ? (
                            <p>Loading profile...</p>
                        ) : profileError ? (
                            <p className="text-red-500">{profileError}</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <label>
                                    Company Name<span className="text-red-500">*</span>:
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                    />
                                </label>
                                <label>
                                    Industry:
                                    <input
                                        type="text"
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                    />
                                </label>
                                <label>
                                    Website:
                                    <input
                                        type="url"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                    />
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        rows={4}
                                    />
                                </label>
                                <label>
                                    Company Logo URL:
                                    <input
                                        type="text"
                                        value={companyLogo}
                                        onChange={(e) => setCompanyLogo(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                                >
                                    Update Profile
                                </button>
                                {successMessage && <p className="text-green-600">{successMessage}</p>}
                                {submitError && <p className="text-red-600">{submitError}</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EmployerDashboard;
