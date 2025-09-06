import React, { useState } from "react";
import Button from "../components/Button";

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
        const res = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (res.ok) {
            setSuccess("Registration successful! Please login.");
            setName(""); setEmail(""); setPassword("");
        } else {
            setError(data.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#f3f6fb] flex flex-col items-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Register</h1>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                {success && <div className="text-green-600 mb-2">{success}</div>}
                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <select value={role} onChange={e => setRole(e.target.value)} className="px-4 py-2 border rounded">
                        <option value="student">Student</option>
                        <option value="employer">Employer</option>
                    </select>
                    <input type="text" placeholder="Name" className="px-4 py-2 border rounded" required value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="Email" className="px-4 py-2 border rounded" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="px-4 py-2 border rounded" required value={password} onChange={e => setPassword(e.target.value)} />
                    <Button type="submit">Register</Button>
                </form>
                <div className="mt-4 text-sm text-center">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </div>
            </div>
        </main>
    );
};

export default Register;
