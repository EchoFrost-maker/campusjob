import React, { useState } from "react";
import Button from "../components/Button";
import { register } from "../utils/api";
import { UserPlus, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";

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
            console.error("Registration error:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("Registration failed. Please check your connection and try again.");
            }
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 relative z-10">
                <div className="text-center mb-6">
                    <UserPlus className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Register</h1>
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
                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    >
                        <option value="student" className="bg-slate-800">Student</option>
                        <option value="employer" className="bg-slate-800">Employer</option>
                        <option value="admin" className="bg-slate-800">Admin</option>
                    </select>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-blue-100 placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <UserPlus size={18} />
                        Register
                    </button>
                </form>
                <div className="mt-6 text-sm text-center text-blue-200/80">
                    Already have an account? <a href="/login" className="text-blue-300 hover:text-blue-200 transition-colors duration-200 underline">Login</a>
                </div>
            </div>
        </main>
    );
};

export default Register;
