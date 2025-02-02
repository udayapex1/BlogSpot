import React, { useState } from "react";
import { useForm } from "react-hook-form";
import contact from '../assets/contact.png'
import axios from "axios";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "82446110-7211-4b75-ac11-2108bb4955c9",
      userName: data.userName,
      email: data.email,
      message: data.message,
    };

    setLoading(true);

    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      alert("Message sent successfully");
      reset();
    } catch (error) {
      console.log("Error in sending message", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" id="Contact">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start  justify-between gap-12 lg:gap-16">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
            <div className="text-center lg:text-left w-full">
              <h2 className="text-base sm:text-lg font-bold text-blue-600 tracking-wide mb-4">
                CONTACT
              </h2>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6">
                Get In Touch With Us.
              </h1>
              <p className="text-[#878794] text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
                We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, please reach out to us using the form below or through the contact details provided.
              </p>
            </div>
            <div className="" >
              <img
                className="w-full h-48 sm:h-64 lg:h-[400px] object-cover rounded-2xl "
                src={contact}
                alt="Contact Us"
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 lg:p-10 w-full max-w-xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder-slate-400 text-sm transition-colors duration-200"
                    {...register("userName", { required: true })}
                  />
                  {errors.userName && (
                    <span className="text-red-600 text-xs mt-1">This field is required</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder-slate-400 text-sm transition-colors duration-200"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-600 text-xs mt-1">This field is required</span>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    placeholder="Enter your message..."
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder-slate-400 text-sm resize-none transition-colors duration-200"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <span className="text-red-600 text-xs mt-1">This field is required</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto min-w-[160px] px-8 py-3.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 border border-transparent hover:border-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;