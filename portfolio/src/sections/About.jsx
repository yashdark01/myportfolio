import React from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion"; 
import mern from "../../public/mern-1.webp"

const About = () => {
  return (
    <Element name="about" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        
        <motion.h2
          className="text-5xl font-extrabold text-center mb-12 glow-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          About Me
        </motion.h2>

        <div className=" flex flex-col-reverse lg:flex-row gap-y-6 lg:gap-y-0 lg:space-y-0  lg:space-x-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Hello! I’m Yash Patidar, a passionate Full Stack Developer with a focus on creating dynamic and
              interactive web applications. With expertise in frontend technologies like React.js and backend
              technologies like Node.js, I strive to deliver efficient, scalable, and visually appealing solutions.
            </motion.p>
            <motion.p
              className="text-lg text-gray-300"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              I'm always learning new technologies and expanding my skill set to stay ahead in this ever-evolving
              field. I believe in clean, maintainable code and always aim for best practices in every project I work on.
            </motion.p>
            
            <motion.a
              href="https://drive.google.com/file/d/1FyC8lSff8fWNYS-DddjoAUc3piJF0kGQ/view?usp=sharing" target="__blank" 
              className="mt-8 inline-block bg-cyan-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-cyan-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
             View Resume
            </motion.a>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <motion.img
              src={mern}
              alt="MERN STACK"
              className="rounded-full bg-white w-72 h-72 object-cover shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0px 0px 15px rgba(0, 255, 255, 0.8);
        }
      `}</style>
    </Element>
  );
};

export default About;
