import { Element } from "react-scroll";
import React from "react";

const Home = () => (
  <Element
    name="home"
    className="h-screen relative z-10 text-zinc-500 overflow-hidden"
  >
    {/* Diagonal background sections */}
    <div className="absolute  inset-0 bg-gradient-to-t from-black/90 to-black/100 clip-path-triangle"></div>

    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
      {/* Profile Circle */}
      <div className=" bg-radial from-black/20 to-black/100 p-4 rounded-full m-6">
        <div className=" bg-radial from-bg-white/20 to-bg-white/5 p-4 rounded-full">
          <div className="bg-radial from-black/40 to-black/100 p-4 rounded-full">
            <div className="w-32 h-32 rounded-full bg-white border-4 border-blue-600 overflow-hidden">
              <img
                src="https://via.placeholder.com/150" // Replace with your profile image URL
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Name and Description */}
      <h1 className="text-4xl font-bold text-white">Hi, I'm Yash Patidar</h1>
      <p className="text-xl mt-4">
        Full Stack Developer | Building Interactive Web Experiences
      </p>

      {/* Intro Paragraph */}
      <div className="mt-6">
        <p className="text-lg">
          I'm focused on creating modern, responsive websites with the latest
          technologies.
        </p>
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
