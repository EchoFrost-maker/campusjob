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
            window.location.href = "/student-profile";
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <main className="min-h-screen bg-[#f3f6fb] flex flex-col items-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Login</h1>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" className="px-4 py-2 border rounded" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="px-4 py-2 border rounded" required value={password} onChange={e => setPassword(e.target.value)} />
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="accent-blue-600" />
                        Save Password
                    </label>
                    <Button type="submit">Login</Button>
                </form>
                <div className="flex justify-between mt-4 text-sm">
                    <a href="/register" className="text-blue-600 hover:underline">Register</a>
                    <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
                </div>
            </div>
        </main>
    );
};

export default Login;
