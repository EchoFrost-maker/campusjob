import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { getEmployerProfile, updateEmployerProfile } from "../utils/api";

const EmployerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        company_name: '',
        industry: '',
        website: '',
        description: '',
        company_logo: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getEmployerProfile();
                setProfile(data);
                setFormData({
                    company_name: data.company_name || '',
                    industry: data.industry || '',
                    website: data.website || '',
                    description: data.description || '',
                    company_logo: data.company_logo || ''
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await updateEmployerProfile(formData);
            setSuccess('Profile updated successfully!');
            // Optionally refetch profile
            const data = await getEmployerProfile();
            setProfile(data);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error && !profile) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <ProfileCard
                    name={profile?.company_name || profile?.name || 'Company'}
                    role="Employer"
                    skills={[]} // No skills in employer profile
                    description={profile?.description}
                />
                <div className="bg-white rounded-xl shadow p-6 mt-6">
                    <h2 className="font-bold text-lg mb-2">Edit Company Profile</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {success && <p className="text-green-500 mb-2">{success}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="company_name"
                            placeholder="Company Name"
                            value={formData.company_name}
                            onChange={handleInputChange}
                            className="px-4 py-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="industry"
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="px-4 py-2 border rounded"
                        />
                        <input
                            type="url"
                            name="website"
                            placeholder="Website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="px-4 py-2 border rounded"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="px-4 py-2 border rounded"
                            rows="3"
                        />
                        <input
                            type="url"
                            name="company_logo"
                            placeholder="Company Logo URL"
                            value={formData.company_logo}
                            onChange={handleInputChange}
                            className="px-4 py-2 border rounded"
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default EmployerProfile;

