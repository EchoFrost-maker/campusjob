import React, { useState } from "react";
import { apiRequest } from "../utils/api";
import { Plus, Briefcase, FileText, MapPin, Building, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

const PostJob = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const jobData = {
                title,
                description,
                type,
                salary: parseFloat(salary),
                location,
                company,
            };
            await apiRequest('/jobs', {
                method: 'POST',
                body: JSON.stringify(jobData),
            });
            setSuccess("Job posted successfully!");
            setTitle("");
            setDescription("");
            setType("");
            setSalary("");
            setLocation("");
            setCompany("");
        } catch (err) {
            if (err.message) {
                setError(`Failed to post job: ${err.message}`);
            } else {
                setError("Failed to post job");
            }
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 relative z-10">
                <div className="text-center mb-6">
                    <Plus className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">Post a Job</h1>
                </div>
                {error && (
                    <div className="bg-red-500/20 backdrop-blur-lg border border-red-300/30 rounded-xl p-4 mb-4 shadow-lg">
                        <div className="flex items-center gap-3 text-red-100">
                            <AlertCircle size={20} />
                            <span className="font-medium">{error}</span>
                        </div>
                    </div>
                )}
                {success && (
                    <div className="bg-green-500/20 backdrop-blur-lg border border-green-300/30 rounded-xl p-4 mb-4 shadow-lg">
                        <div className="flex items-center gap-3 text-green-100">
                            <CheckCircle size={20} />
                            <span className="font-medium">{success}</span>
                        </div>
                    </div>
                )}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="text"
                            placeholder="Job Title"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                        <textarea
                            placeholder="Job Description"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="" disabled className="bg-slate-800">Select Job Type</option>
                        <option value="Part-time" className="bg-slate-800">Part-time</option>
                        <option value="Permanent" className="bg-slate-800">Permanent</option>
                        <option value="Internship" className="bg-slate-800">Internship</option>
                    </select>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="number"
                            placeholder="Salary"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="text"
                            placeholder="Company"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <Plus size={18} />
                        Post Job
                    </button>
                </form>
            </div>
        </main>
    );
};

export default PostJob;

