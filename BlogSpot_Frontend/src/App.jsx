import React from "react";
import Navbar from "../src/component/Navbar.jsx";
import FooterSection from "../src/component/FooterSection.jsx";
import Home from "../src/component/Home.jsx";
import Blogs from "../src/pages/Blogs.jsx";
import About from "../src/pages/About.jsx";
import Contact from "../src/pages/Contact.jsx";
import Creators from "../src/pages/Creators.jsx";
import Login from "../src/pages/Login.jsx";
import Register from "../src/pages/Register.jsx";
import DashBoard from "../src/pages/DashBoard.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";
import TechBlogs from "./home/TechBlogs.jsx";
import Health from "./home/Health.jsx";
import SportsBlog from "./home/SportsBlog.jsx";
import EconomyBlogs from "./home/EconomyBlogs.jsx";
import News from "./home/News.jsx";
import Myblogs from "./dashboard/Myblogs.jsx";
import UpdateBlog from "./dashboard/UpdateBlog.jsx"
import DetailedBlogs from "./pages/DetailedBlogs.jsx";
import CodingBlogs from "./home/CodingBlogs.jsx";
import EntertainmentBlogs from "./home/EntertainmentBlogs.jsx";
function App() {
  const location = useLocation();
  const hideNavAndFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  const { blogs } = useAuth();
  return (
    <>
      <div className="">
        {!hideNavAndFooter && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/creators" element={<Creators />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/techBlogs" element={<TechBlogs />} />
          <Route path="/coding" element={<CodingBlogs />} />
          <Route path="/entertainment" element={<EntertainmentBlogs />} />


          <Route path="/health" element={<Health />} />x``
         <Route path="/sportsBlog" element={<SportsBlog />} />
          <Route path="/economy" element={<EconomyBlogs />} />
          <Route path="/news" element={<News />} />

          <Route path="/myblogs" element={<Myblogs />} />


// to update Blogs
          <Route path="/blog/update/:id" element={< UpdateBlog/>} />
          // for detailed blogs :
          <Route path="/blog/:id" element={<DetailedBlogs/>} />




        </Routes>

      

        {!hideNavAndFooter && <FooterSection />}
      </div>
    </>
  );
}

export default App;
