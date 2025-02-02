import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Hero from "../home/Hero.jsx";
import Trending from "../home/Trending.jsx";
import Category from '../home/Category.jsx' 
import Creator from "../home/Creator.jsx";
import About from "../pages/About.jsx";
import ContactSection from "../pages/Contact.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";




const Home = () => {
  const [isHide , setHide] = useState(true)
  const [countdown, setCountdown] = useState(2);


  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    // Start a timer that decreases the countdown value every second
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Stop the timer when it reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearInterval(timer);
  }, []);

  useGSAP(()=>{
    
    gsap.utils.toArray([".heading", ".textContainer", ".expButton" ,".hero"]).forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });
    });
    
  })

setTimeout(() => setHide(false), 5000);
  return (
    <>
 <div className="relative overflow-hidden">
  <div className="bg-gradient-to-r from-[#0f172a] to-[#334155] p-10 sm:p-20 md:p-40">
    <div className="flex flex-col gap-5 sm:gap-10 max-w-4xl mx-auto relative z-10">
      {/* Heading without Glassmorphism */}
      <div>
        <h1 className="heading text-3xl sm:text-4xl md:text-5xl font-black text-white text-center">
          Stay Ahead in the World of Technology
        </h1>
      </div>
      {/* Glassmorphism Effect on Description */}
      <div className="textContainer bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <p className="text-white text-lg text-center">
          Your gateway to the latest trends, innovations, and insights in tech.
          From AI breakthroughs to coding tips, we empower you with knowledge to
          thrive in a tech-driven world.
        </p>
      </div>
      <div className="flex justify-center">
        <button className="expButton bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg sm:text-xl py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
          Explore Now
        </button>
      
      </div>
    </div>
    {/* Decorative Blur Background */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
  </div>
</div>   


      <Hero  />
    <Trending/>
    {!isHide ?   <Category/>: <p className="text-center" >Loading please wait {countdown}......</p>}
   
    <Creator/>
    <About/>
    <h3 className="text-3xl sm:xl font-bold  text-center text-black mt-10 mb-3 ">Contact Us</h3>
    
    <ContactSection/>
      </>
    
  );
};

export default Home;
