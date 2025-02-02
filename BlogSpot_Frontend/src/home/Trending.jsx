import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Trending = () => {
  const { blogs } = useAuth();
  // console.log("Blogs from AuthProvider:", blogs);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="m-10">
      <div className="container px-4 py-8 mx-auto ">
        <h4 className="text-3xl font-bold mb-8">Trending Blogs</h4>
        <Carousel
          responsive={responsive}
          autoPlay={true} // Enables automatic scrolling
          autoPlaySpeed={900} // Sets the delay to 3 seconds
          infinite={true} // Enables infinite looping
          transitionDuration={1000} // Sets the scrolling animation duration to 1 second
          arrows={true} // Optional: Add navigation arrows
          showDots={false} // Optional: Add dot indicators for navigation
        >
          {blogs && blogs.length > 0 ? (
            blogs.slice(0, 8).map((blog) => (
              <Link
              to={`/blog/${blog._id}`}
                key={blog._id}
                className="block  my-5  bg-white border-transparent rounded-lg  overflow-hidden shadow-md mx-2"
              >
                <img
                  src={blog.blogImage?.url}
                  alt={blog.title || "Blog Image"}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold mb-2">{blog.title}</h1>
                  <span className="bg-blue-500 text-white text-xs uppercase font-bold px-2 py-1 rounded-full">
                    {blog.category || "Uncategorized"}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-12 text-center">
              <p className="text-gray-600 text-lg font-medium bg-gray-100 py-4 px-6 border-transparent rounded-md shadow-md">
                🚫 No blogs available at the moment. Please check back later!
              </p>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default Trending;
