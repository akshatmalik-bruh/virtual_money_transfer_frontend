import React, { useState, useEffect } from "react";

const Loader = ({ type = "default" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (type === "initial") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [type]);

  if (type === "initial") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-6 text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce mb-8">
            <span className="text-white text-3xl font-black">C</span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tighter mb-2">Cirtym is loading...</h2>
        <p className="text-slate-500 font-medium mb-8 italic">Transfer money soon</p>
        
        <div className="w-full max-w-xs bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-indigo-600 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-indigo-600 font-bold text-sm tracking-widest">{progress}%</div>
      </div>
    );
  }

  if (type === "payment") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white/80 backdrop-blur-sm fixed inset-0 z-[100]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
          <div className="absolute inset-2 border-4 border-emerald-500 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-600 animate-pulse">₹</span>
          </div>
        </div>
        <p className="mt-8 text-slate-800 font-bold animate-pulse tracking-wide text-lg">
          Processing Payment...
        </p>
      </div>
    );
  }

  // Default loader (Site-site transitions)
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></span>
      </div>
      <p className="mt-4 text-indigo-600 font-black tracking-widest text-xs uppercase animate-pulse">
        Virtym is loading
      </p>
    </div>
  );
};

export default Loader;
