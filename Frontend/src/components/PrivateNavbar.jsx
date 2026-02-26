import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const PrivateNavbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    await dispatch(logoutUser()).unwrap();
    navigate("/");
  };

  const user = useSelector((state) => state.user.userData);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-rose-500">
          StaysHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-rose-500">Home</Link>
          <Link to="/dashboard" className="hover:text-rose-500">
            Dashboard
          </Link>

          {user?.role === "host" && (
            <Link
              to="/add-listing"
              className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600"
            >
              Add Listing
            </Link>
          )}

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-rose-500 text-white rounded-full flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-rose-500 cursor-pointer"
            >
              Logout
            </button>
          </div>
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
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>

          {user?.role === "host" && (
            <Link to="/add-listing" onClick={() => setOpen(false)}>
              Add Listing
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-red-500 font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default PrivateNavbar;