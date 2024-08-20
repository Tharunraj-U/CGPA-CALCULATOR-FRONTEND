import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-100 via-pink-800 to-pink-300 p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl rounded-md fixed top-0 left-0 w-full z-50">
      <ul className="flex space-x-8 justify-center items-center">
        <li>
          <Link
            to="/home"
            className={`text-white font-bold text-lg tracking-wide hover:text-yellow-300 transition-colors duration-300 ${location.pathname === '/home' ? 'underline decoration-yellow-300 decoration-4 underline-offset-8' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/cgpa-calculator"
            className={`text-white font-bold text-lg tracking-wide hover:text-yellow-300 transition-colors duration-300 ${location.pathname === '/cgpa-calculator' ? 'underline decoration-yellow-300 decoration-4 underline-offset-8' : ''}`}
          >
            CGPA Calculator
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`text-white font-bold text-lg tracking-wide hover:text-yellow-300 transition-colors duration-300 ${location.pathname === '/profile' ? 'underline decoration-yellow-300 decoration-4 underline-offset-8' : ''}`}
          >
            Update Profile
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`text-white font-bold text-lg tracking-wide hover:text-yellow-300 transition-colors duration-300 ${location.pathname === '/about' ? 'underline decoration-yellow-300 decoration-4 underline-offset-8' : ''}`}
          >
            About
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-white font-bold text-lg tracking-wide hover:text-yellow-300 transition-colors duration-300"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
