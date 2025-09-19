import React, { useState } from "react";
import Button from "../components/Button";
import { register } from "../utils/api";

const Register = () => {
    const [role, setRole] = useState("student");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            await register(name, email, password, role);
            setSuccess("Registration successful! Please login.");
            setName(""); setEmail(""); setPassword("");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed");
            }
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
            <div className="max-w-md w-full bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-8">
                <h1 className="text-2xl font-bold text-blue-100 mb-4">Register</h1>
                {error && <div className="text-red-400 mb-2">{error}</div>}
                {success && <div className="text-green-400 mb-2">{success}</div>}
                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <select value={role} onChange={e => setRole(e.target.value)} className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 focus:outline-none focus:border-blue-400/50">
                        <option value="student" className="bg-slate-800">Student</option>
                        <option value="employer" className="bg-slate-800">Employer</option>
                    </select>
                    <input type="text" placeholder="Name" className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50" required value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="Email" className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50" required value={password} onChange={e => setPassword(e.target.value)} />
                    <Button type="submit">Register</Button>
                </form>
                <div className="mt-4 text-sm text-center text-blue-200/80">
                    Already have an account? <a href="/login" className="text-blue-300 hover:underline">Login</a>
                </div>
            </div>
        </main>
    );
};

export default Register;

