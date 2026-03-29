import React from 'react';

const Subheading = ({ subheading, children }) => {
  return (
    <div className="flex gap-2 justify-center mt-3 text-slate-500 font-medium text-base md:text-lg">
      <h2>{subheading}</h2>
      {children}
    </div>
  );
};

export default Subheading;
