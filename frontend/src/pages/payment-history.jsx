import React, { useState, useEffect } from "react";
import { getPayments } from "../utils/api";
import { CreditCard, Loader2, AlertCircle } from "lucide-react";

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

    if (loading) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 text-white">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-lg">Loading payment history...</span>
                </div>
            </div>
        </main>
    );

    if (error) return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-red-300/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 text-red-200">
                    <AlertCircle size={24} />
                    <span className="text-lg">{error}</span>
                </div>
            </div>
        </main>
    );

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

