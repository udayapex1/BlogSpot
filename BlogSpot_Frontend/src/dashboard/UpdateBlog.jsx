import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { BACKEND_URL } from "../../utils";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const showToast = (message, type = "success") => {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: type === "success" ? "#4CAF50" : "#F44336",
      close: true,
    }).showToast();
  };

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showToast("Blog updated successfully!", "success");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      showToast("Failed to update blog. Please try again.", "error");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-2xl font-bold bg-blue-600 text-center text-white py-4 px-6">
          UPDATE BLOG
        </h3>
        <form className="p-6" onSubmit={handleUpdate}>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-3 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Technology">Technology</option>

            </select>
          </div>
          <input
            type="text"
            placeholder="Blog Main Title"
            className="w-full p-3 mb-6 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mb-6">
            <p>*please Reupload Blog Image during Updating</p>
            <label className="block mb-2 font-semibold">Blog Image</label>
            <img
              src={blogImagePreview || blogImage || "/imgPL.webp"}
              alt="Blog Main"
              className="w-full h-48 object-cover mb-2 rounded-md"
            />
            <input
              type="file"
              className="w-full p-3 border rounded-md"
              onChange={changePhotoHandler}
            />
          </div>
          <textarea
            rows="6"
            className="w-full p-3 mb-6 border rounded-md"
            placeholder="Something about your blog at least 200 characters!"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            UPDATE
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
