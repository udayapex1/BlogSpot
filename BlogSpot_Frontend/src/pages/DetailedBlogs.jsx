import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Calendar, 
    Tag, 
    User 
} from 'lucide-react';
import CopyUrlButton from '../component/CopyUrlButton';
import { BACKEND_URL } from '../../utils';

const DetailedBlogs = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState();


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/api/blogs/single-blog/${id}`);
                setBlog(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogs();
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Blog Image */}
                <div className="w-full h-96 overflow-hidden">
                    <img 
                        src={blog?.blogImage?.url} 
                        alt={blog?.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Blog Content */}
                <div className="p-8 space-y-6">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {blog?.title}
                    </h1>

                    {/* Category and Description */}
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center text-gray-600">
                            <Tag className="mr-2 text-blue-500" />
                            <span className="text-lg font-medium">
                                {blog?.category}
                            </span>
                        </div>
                    </div>

                    {/* About/Content */}
                    <div className="prose max-w-none text-gray-700">
                        <p className="leading-relaxed">
                            {blog?.about}
                        </p>
                    </div>

                    {/* Author Details */}
                    <div className="border-t pt-6 mt-6 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
  
  {/* Author Section */}
                        <div className="flex items-center gap-3 justify-center">
                            <img 
                            src={blog?.adminPhoto} 
                            alt="Author" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                            />
                            <div className="flex flex-col items-center lg:items-start gap-1">
                            <div className="flex">
                                <User className="mr-2 text-gray-500" size={18} />
                                <span className="font-semibold text-gray-700">
                                Posted By: {blog?.adminName}
                                </span>
                            </div>
                            <div className="flex">
                                <Calendar className="mr-2 text-gray-500" size={16} />
                                <span>Posted At: {new Date(blog?.createdAt).toLocaleDateString()}</span>
                            </div>
                            </div>
                        </div>

                        {/* Button Section */}
                        <div className="flex flex-col sm:flex-row lg:flex-row items-center text-gray-600 text-sm space-y-3 sm:space-y-0 sm:space-x-3">
                            <a 
                            href={blog?.sourceLink} 
                            className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition duration-200 text-center"
                            >
                            Read More
                            </a>
                            <CopyUrlButton />
                        </div>

                        </div>

                    </div>
                </div>  
            </div>
     
    );
};

export default DetailedBlogs;
