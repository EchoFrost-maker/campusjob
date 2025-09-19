import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { getProfile, updateProfile } from "../utils/api";

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

    if (loading) return <div className="text-center py-12">Loading...</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <ProfileCard name={form.name} role="Student" skills={form.skills.split(",").map(s => s.trim())} resumeUrl={form.resumeUrl} description={form.description} />
                <div className="bg-white rounded-xl shadow p-6 mt-6">
                    <h2 className="font-bold text-lg mb-2">Edit Profile</h2>
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    {success && <div className="text-green-600 mb-2">{success}</div>}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="px-4 py-2 border rounded" />
                        <input type="email" name="email" value={form.email} disabled className="px-4 py-2 border rounded bg-gray-100" />
                        <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="px-4 py-2 border rounded" />
                        <input type="text" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="Resume URL (optional)" className="px-4 py-2 border rounded" />
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Profile Description (optional)" className="px-4 py-2 border rounded" rows="4"></textarea>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default StudentProfile;

