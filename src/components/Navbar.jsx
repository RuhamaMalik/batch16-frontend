import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthorized } from '../utils/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // User icon click handler
  const handleUserClick = () => {
    if (isAuthorized) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              MyLogo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium text-gray-700">
            <Link to="/" className="hover:text-indigo-600 transition duration-200">Home</Link>
            <Link to="/about" className="hover:text-indigo-600 transition duration-200">About Us</Link>
            <Link to="/blog" className="hover:text-indigo-600 transition duration-200">Blog</Link>
            <Link to="/posts" className="hover:text-indigo-600 transition duration-200">Posts</Link>
            <Link to="/faqs" className="hover:text-indigo-600 transition duration-200">FAQs</Link>
          </div>

          {/* User Icon (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleUserClick}
              className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition duration-200"
              title={isAuthorized ? "Go to Dashboard" : "Login / Signup"}
            >
              {/* SVG User Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* Mobile Hamburgermenu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* User Icon for Mobile  */}
            <button
              onClick={handleUserClick}
              className="p-2 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Cross Icon when open
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon when closed
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-medium text-gray-700">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-indigo-600 hover:bg-gray-50">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-indigo-600 hover:bg-gray-50">About Us</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-indigo-600 hover:bg-gray-50">Blog</Link>
            <Link to="/posts" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-indigo-600 hover:bg-gray-50">Posts</Link>
            <Link to="/faqs" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-indigo-600 hover:bg-gray-50">FAQs</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;