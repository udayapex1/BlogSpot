import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { HiMiniHomeModern } from "react-icons/hi2";
import { LiaBlogSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { RiMessageFill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import logo from "../assets/logo.png";


const Navbar = () => {
  // const { blogs } = useAuth();
  const {isAuthenticated} = useAuth();
  // console.log(isAuthenticated)

  const [show, setShow] = useState(false);
  return (
    <>
      <nav className=" w-[100%] z-50 bg-gainsboro py-7 px-4 flex justify-between container mx-auto items-center ">
        <div className="text-xl cursor-pointer flex items-center">
          <img src={logo} width={40} alt="Placeholder" />
          <p className=" font-black">Blog</p>
          <span className="text-blue-600 font-black xl">Spot</span>
        </div>

        {/* Desktop navBar */}
        <div className="">
          <ul className="font-black xl  hidden md:flex gap-10 ">
            <li className=" flex items-center gap-2 hover:text-blue-600 duration-100 hover:scale-110    ">
              <HiMiniHomeModern /> <Link to="/">Home</Link>
            </li>
            <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl ">
              <LiaBlogSolid /> <Link to="/blogs">Blogs</Link>
            </li>
             <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl">
              <IoNewspaper /> <Link to="/news">News</Link>
            </li>

            <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl">
              <FaQuestionCircle /> <Link to="/about">About</Link>
            </li>

            <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl">
              <RiMessageFill /> <Link to="/contact">Contact</Link>
            </li>
          </ul>
          {/* btn */}
          <div className="lg:hidden" onClick={() => setShow(!show)}>
            {!show ? (
              <RiMenu3Fill
                className="hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl"
                size={24}
              />
            ) : (
              <RiCloseFill
                className="hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl"
                size={24}
              />
            )}
          </div>
        </div>
        <div className="hidden md:block space-x-5">
     {isAuthenticated ? (  <Link className="m-2 flex gap-1 items-center " to="/dashboard">
           <MdDashboard/> <p>Dashboard</p>
          </Link>) :(null)}
          {!isAuthenticated ? ( 
         <Link
            className="text-white bg-blue-600 p-1  border-2 rounded-md px-2 border-transparent"
            to="/login"
          >
            Log-in
          </Link>):(null)}
        </div>

        {/* mobile navBar  */}
        {show && (
          <div className=" z-50 shadow-2xl shadow-blue-400/30 transform hover:scale-102 transition ease-in duration-300  bg-white w-[80%] mt-[500px] border border-transparent rounded-md - absolute text-center">
            <ul className="  flex flex-col gap-10 m-8 ">
              <li className="flex items-center gap-2 hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl   ">
                <HiMiniHomeModern />{" "}
                <Link onClick={() => setShow(!show)} to="/">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl ">
                <LiaBlogSolid />{" "}
                <Link onClick={() => setShow(!show)} to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl">
                <IoNewspaper />{" "}
                <Link onClick={() => setShow(!show)} to="/news">
                  News
                </Link>
              </li>

              <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl">
                <FaQuestionCircle />{" "}
                <Link onClick={() => setShow(!show)} to="/about">
                  About
                </Link>
              </li>

              <li className="flex items-center gap-2  hover:text-blue-600 duration-100 hover:scale-110 hover:font-black xl">
                <RiMessageFill />{" "}
                <Link onClick={() => setShow(!show)} to="/contact">
                  Contact
                </Link>
              </li>

              {isAuthenticated ? (  <Link className="m-2 flex gap-1 items-center " to="/dashboard">
           <MdDashboard/> <p>Dashboard</p>
          </Link>) :(null)}
          {!isAuthenticated ? ( 
         <Link
            className="text-white bg-blue-600 p-1  border-2 rounded-md px-2 border-transparent"
            to="/login"
          >
            Log-in
          </Link>):(null)}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
