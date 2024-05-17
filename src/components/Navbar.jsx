// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="text-white text-lg font-bold">COVID-19 Dashboard - Global Data</div>
                    <div className="flex space-x-4">
                        <Link to="/" className="text-white">Home</Link>
                        <Link to="/us" className="text-white">USA Data</Link>
                        <Link to="/contact" className="text-white">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
