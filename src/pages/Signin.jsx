import React, { useState } from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [emailid, setEmailid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden p-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-10 border border-slate-100 relative z-10 transition-all">
                <div className="text-center mb-10 space-y-2">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-600/30 brand-font">
                        C
                    </div>
                    <Heading heading="Welcome back" />
                    <Subheading subheading="Enter your details to access Cirtym" />
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 flex items-center gap-2">
                        <span className="text-xl">⚠️</span> {error}
                    </div>
                )}

                <div className="space-y-5">
                    <Input
                        onChange={(e) => setEmailid(e.target.value)}
                        label="Email Address"
                        placeholder="you@example.com"
                    />
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder="••••••••"
                        type="password"
                    />

                    <div className="pt-4">
                        <Button
                            onClick={async () => {
                                try {
                                    const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                                        emailid,
                                        password
                                    });
                                    if (response.status === 200) {
                                        login(response.data.token);
                                        navigate("/dashboard");
                                    }
                                } catch (err) {
                                    const msg = err.response?.data?.msg || "Invalid credentials. Please try again.";
                                    setError(msg);
                                }
                            }}
                            text="Sign In"
                        />
                    </div>
                </div>

                <div className="mt-8 text-center text-slate-500 text-sm font-medium">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signin;
