import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  const loading = useSelector((state) => state.user.loading);
      const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email, password, role} = formData;
    try{
      await dispatch(loginUser({email, password, role})).unwrap();
      navigate("/");
      toast.success("login successfully");

    }
    catch(err){
      console.log(err);
      // navigate("/login");
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-rose-500"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-rose-500"
          />

          <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-3 rounded-lg">
            <option value="user">User</option>
            <option value="host">Host</option>
          </select>

          <button disabled={loading} className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link to="/signup" className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span className="text-rose-500 cursor-pointer">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;