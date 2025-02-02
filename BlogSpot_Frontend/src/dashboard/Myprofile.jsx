import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Camera, Edit, MapPin, Briefcase, Mail, Phone } from "lucide-react";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";

function MyProfile() {
  const { profile } = useAuth();
  const navigateTo = useNavigate();
    const showToast = (message, type = "success") => {
      Toastify({
        text: message,
        duration: 3000,
        gravity: "top", 
        position: "center", 
        backgroundColor: type === "success" ? "blue" : "red",
        close: true,
      }).showToast();
    };
    console.log(profile)
  const user = profile?.user;
    const id =  profile.user._id;
  const handleDeleteAccount = async (e) =>{
      e.preventDefault();
      const confirmDelete = window.confirm("Are you sure you want to delete Your Account ?");
      if (!confirmDelete) return;
      try {
        axios.get(`${BACKEND_URL}/api/users/delteAccount/${id}`,{withCredentials:true});
        showToast("Profile Deleted successfully!", "success");

        navigateTo("/");
        window.location.reload();
        
      } catch (error) {
        console.log(error);
        showToast("Failed to delete Profile", "error");
      }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md sm:max-w-lg md:max-w-2xl group">
        {/* Profile Header Section */}
        <div className="relative h-40 sm:h-48 md:h-64">
          {/* Cover Photo */}
          <img
            src={user.photo?.url || "/default-cover.jpg"}
            alt="Cover"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-110"
          />

          {/* Profile Picture */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 sm:translate-y-1/4 md:translate-y-1/2">
            <div className="relative">
              <img
                src={user.photo?.url || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="pt-16 sm:pt-20 px-6 pb-8 text-center">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
              {user.name || user.userName}
            </h2>
          </div>

          <div className="space-y-4 mt-4 text-left sm:text-center">
            {user.email && (
              <div className="flex items-center sm:justify-center text-gray-600 transition-transform duration-300 hover:scale-105">
                <Mail className="w-5 h-5 mr-2 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
                <span>{user.email}</span>
              </div>
            )}

            {user.phone && (
              <div className="flex items-center sm:justify-center text-gray-600 transition-transform duration-300 hover:scale-105">
                <Phone className="w-5 h-5 mr-2 text-green-500 group-hover:rotate-12 transition-transform duration-300" />
                <span>{user.phone}</span>
              </div>
            )}

            {user.profession && (
              <div className="flex items-center sm:justify-center text-gray-600 transition-transform duration-300 hover:scale-105">
                <Briefcase className="w-5 h-5 mr-2 text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
                <span>{user.profession}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={handleDeleteAccount} className=" bg-red-500 p-2 text-white font-bold rounded-md hover:bg-black duration-500" > Delete Account</button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default MyProfile;
