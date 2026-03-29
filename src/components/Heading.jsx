import React from 'react';

const Heading = ({ heading }) => {
  return (
    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight brand-font">
      {heading}
    </h1>
  );
};

export default Heading;
