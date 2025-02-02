import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../../utils";


const CreateBlog = () => {
  const {profile} = useAuth();
  console.log("From c" ,profile)
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [sourceLink, setSourceLink] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const [errorMessage, setErrorMessage] = useState(""); // For error message
  const [isLoading, setIsLoading] = useState(false); // Loading state
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

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous success message
    setErrorMessage(""); // Clear previous error message
    setIsLoading(true); // Set loading state to true

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    formData.append("sourceLink" ,sourceLink);



    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/blogs/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("this is blog",data);
      setSuccessMessage("Blog created successfully!"); // Set success message
      showToast("Blog Created successfully!", "success");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
      setSourceLink("");
    
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create the blog. Please try again."); // Set error message
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a Blog
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleCreateBlog} className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select 
            required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              disabled={isLoading} // Disable input during loading
            >
              <option value="">Select Category</option>
              <option value="Sports">Sports</option>
              <option value="Technology">Technology</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
            required
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              disabled={isLoading} // Disable input during loading
            />
          </div>

          {/* Blog Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Blog Image
            </label>
            <div className="flex items-center justify-center mb-3">
           { blogImagePreview ? (  <img
                src={blogImagePreview}
                alt="Blog Preview"
                className="w-full max-w-sm h-auto rounded-lg object-cover shadow-md"
              />):(
               <MdOutlinePhotoSizeSelectActual/>)
              }
            </div>
            <input
            required
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              disabled={isLoading} // Disable input during loading
            />
          </div>

          {/* About */}
          <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    About
  </label>
  <textarea
    required
    rows={5}
    placeholder="Write something about your blog"
    value={about}
    onChange={(e) => setAbout(e.target.value)}
    onPaste={(e) => {
      e.preventDefault(); // Prevent default paste behavior
      const text = e.clipboardData.getData("text/plain"); // Get plain text (preserves line breaks)
      setAbout((prev) => prev + text); // Append to existing content
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none resize-none"
    disabled={isLoading} // Disable input during loading
  />
</div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Source Link :
            </label>
            <input
            required
              rows="5"
              placeholder="Write something about your blog"
              value={sourceLink}
              onChange={(e) => setSourceLink(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none resize-none"
              disabled={isLoading} // Disable input during loading
            />
          </div>

          {/* Submit Button */}
          <button
            
            type="submit"
            className={`w-full py-3 px-4 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium rounded-lg transition duration-300`}
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Posting Blog..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
