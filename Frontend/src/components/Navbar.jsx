import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-rose-500">
          StaysHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-rose-500">Home</Link>
          <Link to="/login" className="hover:text-rose-500">Login</Link>
          <Link
            to="/signup"
            className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link to="/signup" onClick={() => setOpen(false)}>Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;