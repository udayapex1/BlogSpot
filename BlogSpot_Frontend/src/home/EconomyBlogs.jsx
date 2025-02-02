import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
const EconomyBlogs = () => {
  const { blogs } = useAuth();
        // const blogArray = blogs?.blogs || [];
           
        const CategoryWiseBlogs = blogs.filter((blog) => blog.category === "Economy" || blog.category == "Buisness");
        const count = CategoryWiseBlogs.length;
  
  
     return (
       
        <div>
             <div className="m-10 flex justify-center items-center flex-col">
                      {/* <h1 className="text-2xl font-bold mb-6">Total Blogs Available: {count}</h1> */}
                      <p className="m-5 w-[50%] p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-center rounded-lg">
                        Total Blogs Available: {count}
                        </p>
                      <div className="container mx-auto px-4 py-8">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                          {CategoryWiseBlogs && CategoryWiseBlogs.length > 0 ? (
                            CategoryWiseBlogs.map((blog) => (
                              <Link
                                to={`/blog/${blog._id}`}
                                key={blog._id}
                                className="bg-white border-transparent rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
                              >
                                <img
                                  src={blog?.blogImage?.url}
                                  alt={blog.title || "Blog Image"}
                                  className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-6 bg-gray-100">
                                  {/* Title */}
                                  <p className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300">
                                    {blog.title}
                                  </p>
                                  {/* Category */}
                                  <p className="text-sm font-black text-indigo-500 mt-2">
                                    {blog.category || "Uncategorized"}
                                  </p>
                                  {/* Author Info */}
                                  <div className="flex items-center m-4 bg-gray-200 p-2 border-transparent rounded-full">
                                    <img
                                      src={blog.adminPhoto}
                                      alt="Admin"
                                      className="h-10 w-10 rounded-full border-2 mr-3"
                                    />
                                    <p className="text-sm font-medium text-gray-700">
                                      {blog.adminName}
                                    </p>
                                  </div>
                                  {/* Created At */}
                                  <p className="text-sm text-gray-500 mt-3">
                                    <span className="font-semibold text-gray-700">
                                      Created At:{" "}
                                    </span>
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <p className="text-center text-gray-600 mt-8 text-lg font-medium bg-gray-100 py-4 px-6 rounded-md shadow-md">
                              🚫 No blogs available at the moment. Please check back later!
                            </p>
                          )}
                        </div>
                    
                      </div>
                    </div>
          </div>
       
     )
}

export default EconomyBlogs