import React, { useState } from "react";
import { apiRequest } from "../utils/api";

const PostJob = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
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
                type: category,
                salary: parseFloat(salary),
                location,
            };
            await apiRequest('/jobs', {
                method: 'POST',
                body: JSON.stringify(jobData),
            });
            setSuccess("Job posted successfully!");
            setTitle("");
            setDescription("");
            setCategory("");
            setSalary("");
            setLocation("");
        } catch (err) {
            setError("Failed to post job");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Post a Job</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Job Title"
                        className="px-4 py-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Job Description"
                        className="px-4 py-2 border rounded"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        className="px-4 py-2 border rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Salary"
                        className="px-4 py-2 border rounded"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        className="px-4 py-2 border rounded"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
                        Post Job
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {success && <p className="text-green-500 mt-2">{success}</p>}
                </form>
            </div>
        </main>
    );
};

export default PostJob;
