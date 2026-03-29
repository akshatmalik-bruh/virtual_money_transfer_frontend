import React, { useState } from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import Input from '../components/Input';
import Button from '../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Transfer = () => {
    const [amount, setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    
    const queryParams = new URLSearchParams(location.search);
    const receiverId = queryParams.get('id');
    const receiverName = queryParams.get('name');

    const handleTransfer = async () => {
        if (amount <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid amount' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('http://localhost:3000/api/v1/account/transfer', 
                { to: receiverId, amount: amount },
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            
            if (response.status === 200) {
                setMessage({ type: 'success', text: `Successfully transferred ₹${amount} to ${receiverName}` });
                setTimeout(() => navigate('/dashboard'), 2000);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Transfer failed. Please check your balance.";
            setMessage({ type: 'error', text: errorMsg });
        } finally {

            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 animate-in zoom-in duration-500">
            {isLoading && <Loader type="payment" />}
            
            <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative">
                {/* Decorative background behind header */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-indigo-600 to-violet-700 pointer-events-none"></div>

                <div className="relative pt-12 pb-8 px-8 text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center text-4xl font-black mb-4 backdrop-blur-md border-[3px] border-white/30 shadow-xl shadow-indigo-900/20 brand-font">
                        {receiverName ? receiverName[0].toUpperCase() : '?'}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight brand-font">{receiverName}</h2>
                    <p className="text-indigo-100 text-sm font-medium mt-1 opacity-90">Secure Instant Payment</p>
                </div>

                <div className="p-8 space-y-6">
                    {message.text && (
                        <div className={`p-4 rounded-2xl text-sm font-medium text-center ${
                            message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input 
                            type="number" 
                            label="Transaction Amount" 
                            placeholder="₹ 0.00" 
                            onChange={(e) => setAmount(Number(e.target.value))} 
                        />
                        <div className="pt-4 flex flex-col gap-3">
                            <Button 
                                text={isLoading ? "Processing..." : "Confirm Transfer"} 
                                onClick={handleTransfer} 
                                disabled={isLoading}
                            />
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="text-slate-500 text-sm font-medium hover:text-slate-800 transition-colors"
                            >
                                Cancel Transaction
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transfer;