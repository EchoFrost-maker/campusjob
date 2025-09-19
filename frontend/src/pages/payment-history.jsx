import React, { useState, useEffect } from "react";
import { getPayments } from "../utils/api";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const pays = await getPayments();
                setPayments(pays);
            } catch (err) {
                setError('Failed to load payment history');
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) return <div className="text-center py-12">Loading payment history...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-blue-700 to-green-600 mb-4 drop-shadow">Payment History</h1>
                <ul className="list-disc list-inside text-gray-700">
                    {payments.length > 0 ? payments.map(payment => (
                        <li key={payment.id}>
                            {payment.description} - ৳{payment.amount} - <span className="text-green-600 font-bold">{payment.status}</span>
                        </li>
                    )) : (
                        <li>No payment history available</li>
                    )}
                </ul>
            </div>
        </main>
    );
};

export default PaymentHistory;

