import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { CiUser } from "react-icons/ci";
import { GoLock, GoUnlock } from "react-icons/go"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  // Hardcoded credentials
  const validCredentials = {
    username: "admin",
    password: "password123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === validCredentials.username && password === validCredentials.password) {
      // Successful login
      setSuccess(true); 
      setError("");
      setTimeout(() => {
        navigate("/calculator"); 
      }, 1000); 
    } else {
      // Invalid login
      setError("Invalid email and password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('bg-1.jpg')` }}
      ></div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 pr-10 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <CiUser className="absolute right-3 top-3 text-white text-lg cursor-pointer" />
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 pr-10 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-white text-lg cursor-pointer"
            >
              {showPassword ? <GoUnlock /> : <GoLock />}
            </span>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Success Message */}
          {success && (
            <p className="text-white text-center mb-4 p-2 bg-opacity-40 bg-green-600 rounded-lg">
              Login successful!
            </p>
          )}

          <div className="flex justify-between items-center text-white text-sm mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#8a6045] hover:bg-[#2F1A0F] text-white p-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white text-sm mt-4">
          Don't have an account?{" "}
          <a href="#" className="underline hover:text-[#b98e74]">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
