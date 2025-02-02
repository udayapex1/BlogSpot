import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { BACKEND_URL } from "../../utils";


const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {isAuthenticated,setIsAuthenticated , setProfile} = useAuth();


  const showToast = (message, type = "success") => {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top", // 'top' or 'bottom'
      position: "center", // 'left', 'center', or 'right'
      backgroundColor: type === "success" ? "blue" : "red",
      close: true,
    }).showToast();
  };
  
  

  const LogIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

     
    
      showToast("User Login successfully!", "success");

      // navigate('/dashboard');
      navigate('/');
      // window.location.reload();

      // Optional: Save token or user data
      // localStorage.setItem("token", data.token);

      setProfile(data);
      setIsAuthenticated(true);
      setRole("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Login failed. incorrct email or password.");
      
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-8">
        <form onSubmit={LogIn}>
          <div className="text-2xl cursor-pointer items-center text-center">
            <span>
              Blog
              <span className="text-blue-600 select-none font-black xl">
                Spot
              </span>
            </span>
          </div>
          <h1 className="font-black xl select-none">Login</h1>
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            required
            className="w-full mb-2 mt-5 py-1 border rounded-md"
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            {/* <option value="Student">Student</option> */}
          </select>
          <div className="mb-2">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              className="text-left w-full mt-4 p-1 border rounded-md"
              type="email"
              placeholder="Enter your email"
              value={email}
            />
          </div>
          <div className="mb-2">
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="text-left w-full mt-4 p-1 border rounded-md"
              type="password"
              placeholder="Enter your password"
              value={password}
            />
          </div>
          <button
            type="submit"
            className={`w-[100%] bg-blue-600 p-3 text-white font-black xl mt-4 rounded-md ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-black duration-500 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
          <br />
          <br />
          <div className="text-center">
            Not registered?{" "}
            <Link className="font-black xl text-blue-700" to="/register">
              Register
            </Link>
          </div>
          <div className="flex justify-end">
            <button className="flex items-center justify-between bg-blue-600 text-white font-black xl px-4 p-2  rounded-md">
              <IoMdArrowRoundBack /> <Link to="/">Back</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;