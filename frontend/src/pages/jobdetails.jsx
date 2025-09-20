import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { apiRequest } from "../utils/api";
import { useParams } from "react-router-dom";
import { Briefcase, Send, Loader2, AlertCircle } from "lucide-react";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [coverLetter, setCoverLetter] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobData = await apiRequest(`/jobs/${id}`);
                setJob(jobData);
            } catch (err) {
                setError("Failed to load job details");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            await apiRequest("/applications", {
                method: "POST",
                body: JSON.stringify({ job_id: id, cover_letter: coverLetter }),
            });
            setSuccessMessage("Application submitted successfully!");
            setCoverLetter("");
        } catch (err) {
            setErrorMessage("Failed to submit application.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 text-white">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-lg">Loading job details...</span>
                </div>
            </div>
        </main>
    );

    if (error) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-red-300/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 text-red-200">
                    <AlertCircle size={24} />
                    <span className="text-lg">{error}</span>
                </div>
            </div>
        </main>
    );

    if (!job) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 text-white">
                    <span className="text-lg">Job not found</span>
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

            <div className="relative z-10 flex flex-col items-center px-2 py-8">
                <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Briefcase className="w-8 h-8 text-white" />
                        <h1 className="text-3xl font-bold text-white">{job.title}</h1>
                    </div>
                    <p className="mb-6 text-blue-100">{job.context}</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="coverLetter" className="block text-white mb-3 font-semibold text-lg">
                                Cover Letter
                            </label>
                            <textarea
                                id="coverLetter"
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                rows={6}
                                placeholder="Write your cover letter here..."
                                required
                            />
                        </div>
                        {errorMessage && <p className="text-red-300 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3">{errorMessage}</p>}
                        {successMessage && <p className="text-green-300 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-3">{successMessage}</p>}
                        <div className="flex items-center gap-3">
                            <Button type="submit" disabled={submitting} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                <Send size={20} />
                                {submitting ? "Applying..." : "Apply Now"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default JobDetails;
