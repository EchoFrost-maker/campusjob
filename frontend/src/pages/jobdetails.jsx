import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { apiRequest } from "../utils/api";
import { useParams } from "react-router-dom";

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

    if (loading) return <div className="text-center py-12">Loading job details...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
    if (!job) return <div className="text-center py-12">Job not found</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-2 py-8">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">{job.title}</h1>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{job.context}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="coverLetter" className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                            Cover Letter
                        </label>
                        <textarea
                            id="coverLetter"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            rows={6}
                            required
                        />
                    </div>
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    {successMessage && <p className="text-green-600">{successMessage}</p>}
                    <div>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? "Applying..." : "Apply Now"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default JobDetails;
