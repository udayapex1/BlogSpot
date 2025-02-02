import axios from "axios";
import { BACKEND_URL } from "../../utils";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
   
    
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/blogs/all-blogs`);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  
   
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const  useAuth = () => useContext(AuthContext);