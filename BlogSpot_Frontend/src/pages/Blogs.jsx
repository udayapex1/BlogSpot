import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../utils';


const Blogs = () => {

 const [blogs , setBlogs] = useState();

 const[total ,setTotal] = useState();

 useEffect(()=>{
   
  const fetchBlog = async () =>{

    try {
      const {data} = await axios.get(`${BACKEND_URL}/api/blogs/all-blogs`);

      let totalBlog = data.length;
      // console.log(totalBlog)

     
      setTotal(totalBlog)
      setBlogs(data)
    } catch (error) {
        console.log(error)
    }
  }
     fetchBlog();

 },[])



 return (
  <div className="m-10 text-center">
    <p className="m-5 text-white p-4 bg-black rounded-lg font-black">
      Total Blogs: {total}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Link 
            to={`/blog/${blog._id}`} 
            key={index} // Correct key placement
          >
            <div className="bg-white border-transparent rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105">
              {/* Blog Image */}
              <img
                src={blog?.blogImage?.url || "placeholder-image.jpg"}
                alt="Blog Image"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {/* Blog Content */}
              <div className="p-6 bg-gray-100 h-full flex flex-col justify-between">
                {/* Title */}
                <p className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300">
                  {blog.title || "Untitled Blog"}
                </p>
                {/* Category */}
                <p className="text-sm font-black text-indigo-500 mt-2">
                  {blog.category || "Uncategorized"}
                </p>
                {/* Author Info */}
                <div className="flex items-center mt-4 bg-gray-200 p-2 rounded-full">
                  <img
                    src={blog?.adminPhoto || "default-avatar.png"}
                    alt="Admin"
                    className="h-10 w-10 rounded-full border-2 mr-3"
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {blog.adminName || "Unknown Admin"}
                  </p>
                </div>
                {/* Created At */}
                <p className="text-sm text-gray-500 mt-3">
                  <span className="font-semibold text-gray-700">Created At: </span>
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Date not available"}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No blogs available
        </div>
      )}
    </div>
  </div>
);

}

export default Blogs