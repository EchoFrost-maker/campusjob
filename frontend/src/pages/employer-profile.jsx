import React, { useState, useEffect } from "react";
import { Building2, Globe, Edit3, Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { getEmployerProfile, updateEmployerProfile } from "../utils/api";

const ProfileCard = ({ name, role, description, logo }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
    <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
            {logo ? (
              <img src={logo} alt={name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="w-full h-full bg-white/90 rounded-xl flex items-center justify-center">
                <Building2 size={32} className="text-gray-600" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {role}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            {name}
          </h1>
          <p className="text-blue-100 leading-relaxed">
            {description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const EmployerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
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
        setSaving(true);
        
        try {
            await updateEmployerProfile(formData);
            setSuccess('Profile updated successfully!');
            setProfile(formData);
            setIsEditing(false);
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 text-white">
                        <Loader2 size={24} className="animate-spin" />
                        <span className="text-lg">Loading your profile...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !profile) {
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
                <div className="max-w-4xl w-full space-y-8">
                    {/* Success/Error Messages */}
                    {success && (
                        <div className="bg-green-500/20 backdrop-blur-lg border border-green-300/30 rounded-xl p-4 shadow-lg">
                            <div className="flex items-center gap-3 text-green-100">
                                <CheckCircle size={20} />
                                <span className="font-medium">{success}</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/20 backdrop-blur-lg border border-red-300/30 rounded-xl p-4 shadow-lg">
                            <div className="flex items-center gap-3 text-red-100">
                                <AlertCircle size={20} />
                                <span className="font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Profile Card */}
                    <ProfileCard
                        name={profile?.company_name || profile?.name || 'Company'}
                        role="Employer"
                        description={profile?.description}
                        logo={profile?.company_logo}
                    />

                    {/* Edit Section */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-blue-500/10 rounded-2xl blur-xl opacity-50"></div>
                        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Company Profile</h2>
                                        <p className="text-blue-100">Manage your company information and branding</p>
                                    </div>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            <Edit3 size={18} />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-100">Company Name</label>
                                                <input
                                                    type="text"
                                                    name="company_name"
                                                    placeholder="Enter company name"
                                                    value={formData.company_name}
                                                    onChange={handleInputChange}
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
                                                    value={formData.industry}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                                                <Globe size={16} />
                                                Website
                                            </label>
                                            <input
                                                type="url"
                                                name="website"
                                                placeholder="https://example.com"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-blue-100">Company Logo URL</label>
                                            <input
                                                type="url"
                                                name="company_logo"
                                                placeholder="https://example.com/logo.png"
                                                value={formData.company_logo}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-blue-100">Description</label>
                                            <textarea
                                                name="description"
                                                placeholder="Tell us about your company..."
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows="4"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={saving}
                                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100"
                                            >
                                                {saving ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save size={18} />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                            
                                            <button
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setError(null);
                                                    setSuccess(null);
                                                }}
                                                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-medium transition-all duration-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-200">Company Name</label>
                                                <p className="text-white text-lg font-medium">{profile?.company_name || 'Not specified'}</p>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-200">Industry</label>
                                                <p className="text-white text-lg">{profile?.industry || 'Not specified'}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-blue-200 flex items-center gap-2">
                                                <Globe size={16} />
                                                Website
                                            </label>
                                            {profile?.website ? (
                                                <a 
                                                    href={profile.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-300 hover:text-blue-200 transition-colors duration-200 underline text-lg"
                                                >
                                                    {profile.website}
                                                </a>
                                            ) : (
                                                <p className="text-white text-lg">Not specified</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-blue-200">Description</label>
                                            <p className="text-white text-lg leading-relaxed">{profile?.description || 'No description available'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EmployerProfile;