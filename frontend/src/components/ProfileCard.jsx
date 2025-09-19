import React from "react";

const ProfileCard = ({ name, role, skills, resumeUrl, description, logo }) => (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-2">
        {logo ? (
            <img src={logo} alt={`${name} logo`} className="w-16 h-16 rounded-full object-cover mb-2" />
        ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700 mb-2">
                {name?.[0]}
            </div>
        )}
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="text-gray-500 text-sm mb-2">{role}</div>
        <div className="flex flex-wrap gap-2 mb-2">
            {skills?.map(skill => <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{skill}</span>)}
        </div>
        {description && <p className="text-gray-700 text-sm mb-2">{description}</p>}
        {resumeUrl && <a href={resumeUrl} className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">View Resume</a>}
    </div>
);

export default ProfileCard;
