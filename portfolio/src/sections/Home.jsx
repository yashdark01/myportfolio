import { Element } from "react-scroll";
import React from "react";

const Home = () => (
  <Element
    name="home"
    className="h-screen relative z-10 text-white overflow-hidden"
  >
    {/* Diagonal background sections */}
    <div className="absolute  inset-0 bg-gradient-to-r from-blue-500 to-purple-600 clip-path-triangle"></div>

    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
      {/* Profile Circle */}
      <div className="w-32 h-32 rounded-full bg-white mb-6 border-4 border-blue-600 overflow-hidden">
        <img
          src="https://via.placeholder.com/150" // Replace with your profile image URL
          alt="Yash Patidar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name and Description */}
      <h1 className="text-4xl font-bold">Hi, I'm Yash Patidar</h1>
      <p className="text-xl mt-4">Full Stack Developer | Building Interactive Web Experiences</p>

      {/* Intro Paragraph */}
      <div className="mt-6">
        <p className="text-lg">I'm focused on creating modern, responsive websites with the latest technologies.</p>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <a
          href="#contact"
          className="inline-block bg-blue-700 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-lg transition-all duration-300 ease-in-out"
        >
          Get in Touch
        </a>
      </div>
    </div>
  </Element>
);

export default Home;