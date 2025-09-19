import React, { useState } from "react";
import Button from "../components/Button";
import { forgotPassword } from "../utils/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await forgotPassword(email);
            setMessage("Password reset link sent to your email!");
            setEmail("");
        } catch (err) {
            setError(err.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
            <div className="max-w-md w-full bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-8">
                <h1 className="text-2xl font-bold text-blue-100 mb-4">Forgot Password</h1>
                {error && <div className="text-red-400 mb-2">{error}</div>}
                {message && <div className="text-green-400 mb-2">{message}</div>}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>
                <div className="mt-4 text-sm text-center text-blue-200/80">
                    <a href="/login" className="text-blue-300 hover:underline">Back to Login</a>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;
