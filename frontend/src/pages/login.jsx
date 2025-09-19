import React, { useState } from "react";
import Button from "../components/Button";
import { login } from "../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("role", data.user.role);
            if (data.user.role === 'employer') {
                window.location.href = "/employer-dashboard";
            } else {
                window.location.href = "/student-profile";
            }
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
            <div className="max-w-md w-full bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-8">
                <h1 className="text-2xl font-bold text-blue-100 mb-4">Login</h1>
                {error && <div className="text-red-400 mb-2">{error}</div>}
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50" required value={password} onChange={e => setPassword(e.target.value)} />
                    <label className="flex items-center gap-2 text-sm text-blue-200/80">
                        <input type="checkbox" className="accent-blue-400" />
                        Save Password
                    </label>
                    <Button type="submit">Login</Button>
                </form>
                <div className="flex justify-between mt-4 text-sm text-blue-200/80">
                    <a href="/register" className="text-blue-300 hover:underline">Register</a>
                    <a href="/forgot-password" className="text-blue-300 hover:underline">Forgot Password?</a>
                </div>
            </div>
        </main>
    );
};

export default Login;

