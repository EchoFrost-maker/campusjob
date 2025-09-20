import React from "react";
import { Building2, User } from "lucide-react";

const ProfileCard = ({ name, role, skills, resumeUrl, description, logo }) => (
    <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="relative">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
                    {logo ? (
                        <img src={logo} alt={`${name} logo`} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <div className="w-full h-full bg-white/90 rounded-xl flex items-center justify-center">
                            {role === 'Employer' ? <Building2 size={32} className="text-gray-600" /> : <User size={32} className="text-gray-600" />}
                        </div>
                    )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {role}
                </div>
            </div>
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {name}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {skills?.map(skill => <span key={skill} className="bg-blue-500/20 text-blue-100 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>)}
                </div>
                {description && <p className="text-blue-100 text-sm leading-relaxed">{description}</p>}
                {resumeUrl && <a href={resumeUrl} className="text-blue-300 hover:text-blue-200 transition-colors duration-200 underline text-sm mt-2 block" target="_blank" rel="noopener noreferrer">View Resume</a>}
            </div>
        </div>
    </div>
);

export default ProfileCard;
