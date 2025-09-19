import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setStatus("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("Failed to send message.");
            }
        } catch (error) {
            setStatus("An error occurred. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
            <div className="max-w-2xl w-full bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-8">
                <h1 className="text-3xl font-extrabold text-blue-100 mb-4 drop-shadow">Contact Us</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50"
                        rows={4}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600/80 backdrop-blur-sm border border-blue-500/50 text-blue-100 font-semibold rounded hover:bg-blue-500/80 hover:border-blue-400/60 transition-all duration-200 px-4 py-2"
                    >
                        Send Message
                    </button>
                </form>
                {status && <p className="mt-4 text-center text-blue-300">{status}</p>}
            </div>
        </main>
    );
};

export default Contact;

