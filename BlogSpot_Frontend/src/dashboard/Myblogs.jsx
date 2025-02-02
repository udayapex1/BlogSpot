import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Edit2, Trash2, Image } from "lucide-react";
import { BACKEND_URL } from "../../utils";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);

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

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
        showToast("Failed to fetch blogs", "error");
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/blogs/delete/${id}`, {
        withCredentials: true,
      });

      showToast("Blog Deleted successfully!", "success");
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete blog", "error");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {blog?.blogImage?.url ? (
                <img
                  src={blog.blogImage.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Image className="text-gray-400" size={48} />
                </div>
              )}

              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex justify-between mt-4 space-x-2">
                  <Link
                    to={`/blog/update/${blog._id}`}
                    className="flex items-center justify-center flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg py-2 transition-colors"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center justify-center flex-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg py-2 transition-colors"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className=" text-gray-500 text-lg">You haven't posted any blogs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
