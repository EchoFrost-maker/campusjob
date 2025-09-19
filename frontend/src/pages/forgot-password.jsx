import React from "react";
import Button from "../components/Button";

const ForgotPassword = () => (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
        <div className="max-w-md w-full bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-blue-100 mb-4">Forgot Password</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Enter your email" className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-blue-400/20 rounded text-blue-100 placeholder-blue-300/60 focus:outline-none focus:border-blue-400/50" required />
                <Button type="submit">Send Reset Link</Button>
            </form>
            <div className="mt-4 text-sm text-center text-blue-200/80">
                <a href="/login" className="text-blue-300 hover:underline">Back to Login</a>
            </div>
        </div>
    </main>
);

export default ForgotPassword;

