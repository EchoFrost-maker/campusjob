import React from "react";
import Button from "../components/Button";

const ForgotPassword = () => (
    <main className="min-h-screen bg-[#f3f6fb] flex flex-col items-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-8">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Forgot Password</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Enter your email" className="px-4 py-2 border rounded" required />
                <Button type="submit">Send Reset Link</Button>
            </form>
            <div className="mt-4 text-sm text-center">
                <a href="/login" className="text-blue-600 hover:underline">Back to Login</a>
            </div>
        </div>
    </main>
);

export default ForgotPassword;
