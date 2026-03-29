import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appbar = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }

    axios.get("http://localhost:3000/api/v1/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setFirstName(res.data.firstname);
      setLastName(res.data.lastname);
    }).catch(err => {
      console.error("Failed to fetch profile", err);
    });
  }, [token, navigate]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>

        <span className="text-xl font-extrabold text-slate-800 tracking-tight">Cirtym</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-slate-500 text-sm">Welcome back,</span>
          <span className="font-semibold text-slate-800">{firstName} {lastName}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-indigo-600 font-bold hover:bg-indigo-50 transition-colors cursor-pointer">
            {firstName ? firstName[0].toUpperCase() : 'U'}
          </div>
          {token && (
            <button
              onClick={() => {
                logout();
                navigate('/signin');
              }}
              className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors cursor-pointer ml-2"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Appbar;

