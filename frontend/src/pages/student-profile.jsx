import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { getProfile, updateProfile } from "../utils/api";
import { User, Save, Loader2, AlertCircle } from "lucide-react";

const StudentProfile = () => {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", skills: "", resumeUrl: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Check authentication (token in localStorage)
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        // Fetch profile data
        getProfile()
            .then(data => {
                setProfile(data);
                setForm({
                    name: data.name || "",
                    email: data.email || "",
                    skills: data.skills ? data.skills.join(", ") : "",
                    resumeUrl: data.resumeUrl || "",
                    description: data.description || ""
                });
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError("Failed to load profile");
            });
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            await updateProfile({
                name: form.name,
                skills: form.skills.split(",").map(s => s.trim()),
                resumeUrl: form.resumeUrl,
                description: form.description
            });
            setSuccess("Profile updated!");
        } catch (err) {
            setError("Could not update profile");
        }
    };

    if (loading) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 text-white">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-lg">Loading your profile...</span>
                </div>
            </div>
        </main>
    );

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center px-4 py-12">
                <div className="max-w-2xl w-full">
                    <ProfileCard name={form.name} role="Student" skills={form.skills.split(",").map(s => s.trim())} resumeUrl={form.resumeUrl} description={form.description} />
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 mt-6">
                        <div className="flex items-center gap-3 mb-4">
                            <User size={24} className="text-blue-400" />
                            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                        </div>
                        {error && <div className="text-red-300 mb-2">{error}</div>}
                        {success && <div className="text-green-300 mb-2">{success}</div>}
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                            <input type="email" name="email" value={form.email} disabled className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                            <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                            <input type="text" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="Resume URL (optional)" className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Profile Description (optional)" className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none" rows="4"></textarea>
                            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default StudentProfile;

