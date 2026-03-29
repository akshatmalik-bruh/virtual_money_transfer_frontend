import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [balance, setBalance] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const balanceRes = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                setBalance(balanceRes.data.balance);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Initial fetch
        fetchData();

        // Start polling every 5 seconds
        const pollInterval = setInterval(fetchData, 5000);

        return () => clearInterval(pollInterval);
    }, [token]);


    useEffect(() => {
        if (!token) return;

        const delayDebounceFn = setTimeout(() => {
            axios.get(`http://localhost:3000/api/v1/user/get?filter=${searchTerm}`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                setUsers(res.data.users);
            });
        }, 300);


        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, token]);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-[0_8px_40px_rgba(79,70,229,0.3)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 w-full text-center md:text-left">
                    <h2 className="text-indigo-100 font-medium tracking-wider uppercase text-sm">Total Balance</h2>
                    <div className="text-5xl md:text-6xl font-black mt-3 tracking-tighter brand-font">
                        ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>

                    <p className="text-indigo-200 mt-4 text-sm font-medium">Safe & Secure Transactions</p>
                </div>

            </div>

            {/* User Search Section */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Quick Transfer</h3>
                        <p className="text-slate-500 text-sm">Send money to your friends instantly</p>
                    </div>
                    <div className="w-full md:w-80">
                        <Input
                            placeholder="Search via name or email..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5 transition-all border border-transparent hover:border-indigo-100 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors brand-font">
                                        {user.firstname[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800 text-lg">{user.firstname} {user.lastname}</div>
                                        <div className="text-sm text-slate-500">{user.emailid}</div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-32">
                                    <Button
                                        text="Send"
                                        onClick={() => navigate(`/transfer?id=${user.id}&name=${user.firstname}`)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center text-slate-400 font-medium">
                            No contacts found. Try searching!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
