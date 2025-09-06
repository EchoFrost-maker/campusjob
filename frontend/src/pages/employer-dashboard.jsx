import React from "react";
import ProfileCard from "../components/ProfileCard";

const EmployerDashboard = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <ProfileCard name="ABC Company" role="Employer" skills={["HR", "Recruitment"]} />
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-2">Manage Jobs</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Campus Ambassador <span className="text-blue-600">(12 Applications)</span></li>
                        <li>Intern - Web Developer <span className="text-blue-600">(5 Applications)</span></li>
                    </ul>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-2">Company Profile</h2>
                    <p className="text-gray-700">Update your company information and logo here.</p>
                </div>
            </div>
        </div>
    </main>
);

export default EmployerDashboard;
