import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Aboutfor from "../assets/Aboutfor.png";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const About = () => {

 


  return (
    <section className="container mx-auto px-4 py-16">
    <h3 className="text-3xl sm:xl font-bold  text-center text-black">About Blog Spot</h3>

      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image Container */}
        <div className="imageBox w-full md:w-1/2">
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <img 
              src={Aboutfor}
              alt="About Blog Spot"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="contentBox w-full md:w-1/2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-black font-black xl tracking-wide">
              Blog <span className="text-blue-600">Spot</span>
            </h2>

            <h2 className="text-3xl font-semibold leading-tight">
              The Smart Balance
              <br />
              Bridging Technology, Health, and Economic Insights
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to <span className="text-blue-600 font-black xl">Blog Spot</span>, your go-to resource for insightful articles and engaging discussions at the intersection of technology, health, and the economy. Our mission is to empower our readers with knowledge and resources that can enhance their lives in a rapidly changing world.
            </p>
          </div>

          <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-white hover:text-black border-2 border-blue-500 transition-all duration-300">
            Get Started
            <ArrowRightAltIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;