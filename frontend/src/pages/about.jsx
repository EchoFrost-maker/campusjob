import React from "react";

const About = () => (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-2 py-8">
        <div className="max-w-2xl w-full bg-slate-800/70 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl p-8">
            <h1 className="text-3xl font-extrabold text-blue-100 mb-4 drop-shadow">About Campus Job Portal</h1>
            <p className="text-blue-200/80 mb-2">Campus Job Portal is dedicated to connecting students with the best campus jobs and internships. We help students start their career journey with opportunities tailored for them, and help employers find the right talent for their needs.</p>
            <p className="text-blue-200/80">Our platform is secure, easy to use, and trusted by thousands of students and employers across the country.</p>
        </div>
    </main>
);

export default About;

