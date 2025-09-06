import React from "react";

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
