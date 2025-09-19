import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";
import { apiRequest } from "../utils/api";

const JobCard = ({ id, title, company, location, salary, type }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [jobDetails, setJobDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState("");

    const handleApplyClick = () => {
        setModalOpen(true);
    };

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
            setTimeout(() => {
                setModalOpen(false);
                setSuccessMessage("");
            }, 2000);
        } catch (err) {
            setErrorMessage("Failed to submit application. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleViewDetails = async () => {
        setDetailsLoading(true);
        setDetailsError("");
        try {
            const data = await apiRequest(`/jobs/${id}`);
            setJobDetails(data);
            setDetailsModalOpen(true);
        } catch (err) {
            setDetailsError("Failed to load job details.");
        } finally {
            setDetailsLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-blue-400 hover:scale-[1.02] transition-transform">
                <h2 className="text-lg font-bold text-blue-700">{title}</h2>
                <div className="text-gray-600 text-sm">{company} &middot; {location}</div>
                <div className="flex gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{type}</span>
                    {salary && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">৳ {salary}</span>}
                </div>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleApplyClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex-1"
                    >
                        Apply Now
                    </button>
                    <button
                        onClick={handleViewDetails}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                    >
                        View Details
                    </button>
                </div>
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-xl font-bold text-blue-700 mb-4">Apply for {title}</h2>
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
                            placeholder="Tell us why you're interested in this position..."
                        />
                    </div>
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    {successMessage && <p className="text-green-600">{successMessage}</p>}
                    <div className="flex gap-2">
                        <Button type="submit" disabled={submitting} className="flex-1">
                            {submitting ? "Applying..." : "Submit Application"}
                        </Button>
                        <Button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-gray-600 hover:bg-gray-700">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)}>
                {detailsLoading ? (
                    <p>Loading job details...</p>
                ) : detailsError ? (
                    <p className="text-red-600">{detailsError}</p>
                ) : jobDetails ? (
                    <div>
                        <h2 className="text-xl font-bold text-blue-700 mb-4">{jobDetails.title}</h2>
                        <p className="mb-2"><strong>Company:</strong> {jobDetails.company || company}</p>
                        <p className="mb-2"><strong>Location:</strong> {jobDetails.location || location}</p>
                        <p className="mb-2"><strong>Salary:</strong> {jobDetails.salary ? `৳ ${jobDetails.salary}` : salary ? `৳ ${salary}` : "N/A"}</p>
                        <p className="mb-2"><strong>Type:</strong> {jobDetails.type || type}</p>
                        <p className="mb-4">{jobDetails.context}</p>
                        <Button onClick={() => setDetailsModalOpen(false)}>Close</Button>
                    </div>
                ) : null}
            </Modal>
        </>
    );
};

export default JobCard;
