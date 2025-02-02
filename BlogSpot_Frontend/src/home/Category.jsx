import React from 'react';
import { Link } from 'react-router-dom';
import tech from "../assets/tech.jpg"
import download from "../assets/download.jpeg"
import health from "../assets/health.jpeg"
import sports from "../assets/sports.jpg"
import { useAuth } from '../context/AuthProvider';
import codingCategory from '../assets/codingCategory.webp'
import entertainmentBlog from '../assets/entertainmentBlog.webp'


const Category = () => {
  const { blogs } = useAuth();
   
  // const blogArray = blogs?.blogs || [];
  
  const techBlogs = blogs.filter((blog) => blog.category === "Tech" || blog.category === "Technology");
  const cnt1 = techBlogs.length;

  const economyBlogs = blogs.filter((blog) => blog.category === "Economy" || blog.Category === "Buisness" );
  const cnt2 = economyBlogs.length;

  const sportBlog = blogs.filter((blog) => blog.category === "Sports");
  const cnt3 = sportBlog.length;

  const healthBlog = blogs.filter((blog) => blog.category === "Health");
  const cnt4 = healthBlog.length;

  const CodigBlog = blogs.filter((blog) => blog.category === "Coding");
  const cnt5 = CodigBlog.length;

  const entertainmentBlogs = blogs.filter((blog) => blog.category === "Coding");
  const cnt6 = entertainmentBlogs.length;


  const CategoryBlogs = [
    { path: "/techBlogs", title: "Tech", img: tech, avalaible: cnt1 },
    { path: "/health", title: "Health", img: health, avalaible: cnt4 },
    { path: "/sportsBlog", title: "Sports", img: sports, avalaible: cnt3 },
    { path: "/economy", title: "Economy", img: download, avalaible: cnt2 },
    { path: "/coding", title: "Coding", img: codingCategory, avalaible: cnt5 },
    { path: "/entertainment", title: "Entertainment", img: entertainmentBlog, avalaible: cnt6 },


  ];

  return (
    <div className="m-10 flex justify-center items-center">
      <div className="container px-4 py-8 mx-auto">
        <h4 className="text-3xl font-bold mb-8 text-center">Categories</h4>
        <div className="flex flex-wrap gap-4 justify-center">
          {CategoryBlogs.map(({ path, title, img, avalaible }) => (
            <Link
              key={title}
              className="relative group bg-white w-full sm:w-[45%] md:w-[30%] lg:w-[20%] h-40 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
              to={path}
            >
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-30"
              />
              <div className="flex-col absolute inset-0 flex items-center justify-center text-white text-lg font-semibold bg-black bg-opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                {title} <span>Total Blogs : {avalaible}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
