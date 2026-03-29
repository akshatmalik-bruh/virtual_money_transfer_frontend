import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import Appbar from "./Appbar";
import { useAuth } from "../context/AuthContext";

const Skeleton = () => {
    return (
        <div className="flex h-screen bg-slate-50">
            <div className="flex-1 flex flex-col overflow-hidden">
                <Appbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-8">
                    <Outlet />
                  
                </main>
            </div>
        </div>
    );
};

export default Skeleton;
