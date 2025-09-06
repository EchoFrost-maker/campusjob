import React from "react";
import ProfileCard from "../components/ProfileCard";

const StudentDashboard = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <ProfileCard name="Student Name" role="Student" skills={["React", "Design", "Marketing"]} resumeUrl="#" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-2">My Applications</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Campus Ambassador - <span className="text-blue-600">Applied</span></li>
                        <li>Intern - Web Developer - <span className="text-green-600">Shortlisted</span></li>
                    </ul>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-2">Payment History</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Campus Ambassador - ৳100 - <span className="text-green-600">Success</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
);

export default StudentDashboard;
