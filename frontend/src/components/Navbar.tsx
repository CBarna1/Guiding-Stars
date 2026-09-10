// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on admin/mentee pages
  const hiddenPaths = [
    '/login',
    '/mentee/login',
    '/mentor/login',
    '/mentee/dashboard',
    '/mentor/portal',
    '/dashboard',
    '/mentors',
    '/mentees',
    '/matches',
    '/progress',
    '/content',
    '/submissions',
    '/mentor-applications',
  ];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 text-white shadow-lg"
      style={{ backgroundColor: '#666565' }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/img/HORIZONTAL.png" alt="Guiding Stars" className="h-12" />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="font-semibold hover:text-orange-300 transition">Home</Link>
          <Link to="/about" className="font-semibold hover:text-orange-300 transition">About</Link>
          <Link to="/team" className="font-semibold hover:text-orange-300 transition">Team</Link>
          <Link to="/testimonials" className="font-semibold hover:text-orange-300 transition">Testimonials</Link>
          <Link to="/contact" className="font-semibold hover:text-orange-300 transition">Contact Us</Link>
          <Link to="/graduation" className="font-semibold hover:text-orange-300 transition">Events</Link>
          <Link to="/blog" className="font-semibold hover:text-orange-300 transition">Blog</Link>

          {/* Apply Now Button */}
          <Link
            to="/apply"
            className="text-white px-6 py-2.5 rounded-lg font-semibold transition"
            style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
          >
            APPLY NOW
          </Link>

          {/* Admin Login */}
          <Link
            to="/login"
            className="text-gray-200 hover:text-white text-sm transition"
            title="Admin Login"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav
          className="lg:hidden px-6 pb-6 space-y-4"
          style={{ backgroundColor: '#575656' }}
        >
          <Link
            to="/"
            className="block font-semibold py-2 border-b border-gray-500 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block font-semibold py-2 border-b border-gray-500 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/team"
            className="block font-semibold py-2 border-b border-gray-500 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Team
          </Link>
          <Link
            to="/testimonials"
            className="block font-semibold py-2 border-b border-gray-500 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            to="/contact"
            className="block font-semibold py-2 border-b border-gray-500 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>

          <Link
            to="/graduation"
            className="block font-semibold py-2 border-b border-gray-500 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/blog"
            className="block font-semibold py-2 border-b border-gray-500 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>

          <Link
            to="/apply"
            className="block text-center text-white py-3 rounded-lg font-semibold transition mt-2"
            style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
            onClick={() => setMobileOpen(false)}
          >
            APPLY NOW
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;