import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { blogs } = useAuth();
  const blogRefs = useRef([]);

  useEffect(() => {
    blogRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%", // Triggers animation when element is near viewport
              toggleActions: "play none none reverse", // Plays once and reverses when scrolling back up
              once: false, // Allows animation to happen multiple times
            },
          }
        );
      }
    });
  }, [blogs]);

  return (
    <div className="flex flex-col items-center m-10 text-center">
      <p className="m-5 w-[50%] p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg">
        Blogs
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 3).map((blog, index) => (
            <Link to={`/blog/${blog._id}`} key={index}>
              <div
                ref={(el) => (blogRefs.current[index] = el)}
                className="bg-white border-transparent rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt="Blog Image"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6 bg-gray-100">
                  <p className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300">
                    {blog.title}
                  </p>
                  <p className="text-sm font-black text-indigo-500 mt-2">
                    {blog.category}
                  </p>
                  <div className="flex items-center m-4 bg-gray-200 p-2 border-transparent rounded-full">
                    <img
                      src={blog?.adminPhoto}
                      alt="Admin"
                      className="h-10 w-10 rounded-full border-2 mr-3"
                    />
                    <p className="text-sm font-medium text-gray-700">
                      {blog.adminName || blog.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    <span className="font-semibold text-gray-700">Created At:{" "}</span>
                    {blog.createdAt}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No blogs available</div>
        )}
      </div>

      <Link
        to="/blogs"
        className="m-5 w-[50%] p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg"
      >
        <p>See All Blogs</p>
      </Link>
    </div>
  );
};

export default Hero;
