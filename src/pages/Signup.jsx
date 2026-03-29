import React, { useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Button from '../components/Button';
import Subheading from '../components/Subheading';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailid, setEmailid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                firstname: firstName,
                lastname: lastName,
                emailid: emailid,
                password: password
            });
            if (response.status === 200 || response.status === 201) {
                navigate('/signin');
            }
        } catch (err) {
            const msg = err.response?.data?.msg || "Something went wrong. Please check your details.";
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden p-4 py-12">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-10 border border-slate-100 relative z-10 transition-all">
                <div className="text-center mb-10 space-y-2">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-600/30 brand-font">
                        C
                    </div>
                    <Heading heading="Create an Account" />
                    <Subheading subheading="Join Cirtym to manage your money smartly" />
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 flex items-center gap-2">
                         <span className="text-xl">⚠️</span> {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <Input
                        onChange={(e) => setFirstName(e.target.value)}
                        label="First Name"
                        placeholder="John"
                    />
                    <Input
                        onChange={(e) => setLastName(e.target.value)}
                        label="Last Name"
                        placeholder="Doe"
                    />
                </div>

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
                        <Button text="Create Free Account" onClick={handleSignup} />
                    </div>
                </div>

                <div className="mt-8 text-center text-slate-500 text-sm font-medium">
                    Already part of the family?{" "}
                    <Link to="/signin" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
