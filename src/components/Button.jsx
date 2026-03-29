import React from 'react';

const Button = ({ text, onClick, disabled }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 brand-font tracking-wide`}
    >
      {text}
    </button>
  );
};

export default Button;
