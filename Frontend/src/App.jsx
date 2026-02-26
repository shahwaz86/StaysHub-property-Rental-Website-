import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateNavbar from "./components/PrivateNavbar";
import AddListing from "./listing/AddListing";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/protected";
import ListingDetails from "./listing/ListingDetails";
import MyBookings from "./listing/MyBookings";

function App() {
  const user = useSelector((state) => state.user.userData);

  return (
    <>
      <ToastContainer />
      {user ? <PrivateNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-listing" element={<ProtectedRoute><AddListing /></ProtectedRoute>} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/my-booking" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

      </Routes>
    </>
  );
}

export default App;