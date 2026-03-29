import React from "react";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import Button from "../components/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-center px-4">
      <h1 className="text-9xl font-extrabold text-indigo-100 relative">
        404
        <span className="absolute inset-0 flex items-center justify-center text-indigo-600 text-4xl">
            Whoops!
        </span>
      </h1>
      <Heading heading="Oops! Page not found" />
      <p className="mt-4 text-slate-600 max-w-md">
        This transaction was not authorized or the page you're looking for doesn't exist anymore. Let's get you back.
      </p>
      <div className="mt-10">
        <Link to="/dashboard">
          <Button text="Take me to Dashboard" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
