import React from 'react';

const Input = ({ label, placeholder, type = "text", onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
        {label}
      </label>
      <input 
        onChange={onChange} 
        type={type} 
        placeholder={placeholder} 
        className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-slate-300 transition-all placeholder:text-slate-400"
      />
    </div>
  );
};

export default Input;
