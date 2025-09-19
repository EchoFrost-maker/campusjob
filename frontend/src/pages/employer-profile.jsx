import React from "react";
import ProfileCard from "../components/ProfileCard";

const EmployerProfile = () => (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12">
        <div className="max-w-2xl w-full">
            <ProfileCard name="ABC Company" role="Employer" skills={["HR", "Recruitment"]} />
            <div className="bg-white rounded-xl shadow p-6 mt-6">
                <h2 className="font-bold text-lg mb-2">Edit Company Profile</h2>
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Company Name" className="px-4 py-2 border rounded" />
                    <input type="email" placeholder="Email" className="px-4 py-2 border rounded" />
                    <input type="text" placeholder="Industry" className="px-4 py-2 border rounded" />
                    <input type="file" className="px-4 py-2 border rounded" />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
                </form>
            </div>
        </div>
    </main>
);

export default EmployerProfile;

