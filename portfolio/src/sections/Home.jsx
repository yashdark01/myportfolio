import { Element } from "react-scroll";
import React from "react";
import { motion } from "framer-motion";

const Home = () => (
  <Element name="home" className="h-screen relative z-10 text-gray-300 overflow-hidden bg-black">
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-95"></div>

    {/* Content */}
    <motion.div
      className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Profile Circle with Neon Glow */}
      <motion.div
        className="bg-gradient-to-r from-blue-700 to-blue-900 p-2 rounded-full shadow-blue animate-glow"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="bg-gradient-radial from-gray-800 to-black p-2 rounded-full">
          <div className="size-48 rounded-full bg-black border-4 border-blue-600 overflow-hidden">
            <img
              src="https://via.placeholder.com/150" // Replace with your profile image URL
              alt="Yash Patidar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Name with Animated Font */}
      <motion.h1
        className="text-5xl font-extrabold text-white mt-6 animated-gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Hi, I'm <span className="text-blue-400">Yash Patidar</span>
      </motion.h1>

      {/* Typing Effect for Subtitle */}
      <motion.p
        className="text-2xl mt-3 text-gray-400 typing-effect"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Full Stack Developer | Building Interactive Web Experiences
      </motion.p>

      {/* Intro Paragraph */}
      <motion.p
        className="text-lg mt-4 text-gray-400 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        I specialize in building fast, modern, and scalable web applications using the latest technologies.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <a
          href="#contact"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Get in Touch
        </a>
      </motion.div>
    </motion.div>

    {/* CSS for Animated Font */}
    <style jsx>{`
      /* Gradient Text Animation */
      .animated-gradient-text {
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #f43f5e);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientText 3s infinite alternate;
      }

      @keyframes gradientText {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }

      /* Typing Effect */
      .typing-effect {
        overflow: hidden;
        white-space: nowrap;
        border-right: 2px solid #3b82f6;
        width: 0;
        animation: typing 3s steps(40, end) forwards, blink 0.8s infinite;
      }

      @keyframes typing {
        from { width: 0; }
        to { width: 100%; }
      }

      @keyframes blink {
        50% { border-color: transparent; }
      }
    `}</style>
  </Element>
);

export default Home;