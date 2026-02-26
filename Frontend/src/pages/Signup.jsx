import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../redux/slice/userSlice";

const Signup = () => {
  const loading = useSelector((state) => state.user.loading);
     const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const {name, email, password, role} = formData;

    try{
      await dispatch(registerUser({name, email, password, role})).unwrap();
      navigate("/");
      toast.success("signup successfully");
    }
    catch(err){
    toast.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4">
          <input
            type="text"
             name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg focus:outline-rose-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:outline-rose-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-rose-500"
          />

            <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-3 rounded-lg">
            <option value="user">User</option>
            <option value="host">Host</option>
          </select>

          <button disabled={loading} className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600" onClick={handleSubmit}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <Link to="/login" className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span className="text-rose-500 cursor-pointer">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;