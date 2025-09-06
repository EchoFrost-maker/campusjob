import React from "react";

const Contact = () => (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-400 flex flex-col items-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-blue-700 to-green-600 mb-4 drop-shadow">Contact Us</h1>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Your Name" className="px-4 py-2 border rounded" required />
                <input type="email" placeholder="Your Email" className="px-4 py-2 border rounded" required />
                <textarea placeholder="Your Message" className="px-4 py-2 border rounded" rows={4} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send Message</button>
            </form>
        </div>
    </main>
);

export default Contact;
