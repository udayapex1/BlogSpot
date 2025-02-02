import React, { useState } from "react";
import Myprofile from "../dashboard/Myprofile";
import CreateBlog from "../dashboard/CreateBlog.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import Myblogs from "../dashboard/Myblogs";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout, CiHome } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaBlog } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BarChart2 ,MessageCircle } from "lucide-react";
import axios from "axios";
import Toastify from "toastify-js";
import { IoCreateOutline } from "react-icons/io5";
import "toastify-js/src/toastify.css";
import UpdateBlog from "../dashboard/UpdateBlog.jsx";
import { MdUpdate } from "react-icons/md";
import { BACKEND_URL } from "../../utils.js";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("home");
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar toggle for mobile
  const { profile, setIsAuthenticated } = useAuth();
const navigateTo = useNavigate();


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


  const contentComponents = {
    home: <Myblogs />,
    users: <Myprofile />,
    analytics: <CreateBlog />,
    // messages: <UpdateBlog/>,
  };

  const sidebarButtons = [
    {
      id: "home",
      icon: <FaBlog className="w-5 h-5" />,
      label: "My Blogs",
    },
    {
      id: "users",
      icon: <CgProfile className="w-5 h-5" />,
      label: "View Profile",
    },
    {
      id: "analytics",
      icon: <IoCreateOutline className="w-5 h-5" />,
      label: "Create Blog",
    },
    // { 
    //   id: 'messages', 
    //   icon: <MdUpdate className="w-5 h-5" />, 
    //   label: 'Update Blog' 
    // },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/users/logout`,
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      showToast("User Logout successfully!", "success");

      navigateTo("/login");
      
    } catch (error) {
      console.log(error);
      alert("Failed to logout");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-gray-800 bg-white shadow-md p-2 rounded-full"
        >
          <span className="text-lg"><HiOutlineMenuAlt3/></span>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-40 w-64 sm:relative sm:translate-x-0 transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5 border-b">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="p-4">
          {sidebarButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                setActiveContent(button.id);
                setShowSidebar(false); // Close sidebar on mobile after selection
              }}
              className={`
                flex items-center w-full p-3 mb-2 rounded-lg transition-colors duration-200
                ${activeContent === button.id 
                  ? "bg-blue-500 text-white" 
                  : "hover:bg-gray-100 text-gray-700"}
              `}
            >
              {button.icon}
              <span className="ml-3">{button.label}</span>
            </button>
          ))}
         
          <Link
            to="/"
            className="flex mb-3 items-center gap-4 text-start w-full px-4 py-2 bg-white rounded-lg hover:bg-blue-500  transition duration-300 hover:text-white"
          >
            <CiHome className="w-5 h-5" /> Home
          </Link>
          <button
            onClick={handleLogout}
            className=" flex items-center gap-4 text-start w-full px-4 py-2 bg-white rounded-lg hover:bg-blue-500  transition duration-300 hover:text-white"
          >
            <CiLogout className="w-5 h-5" /> Logout
          </button>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {contentComponents[activeContent]}
      </div>
    </div>
  );
};

export default Dashboard;
