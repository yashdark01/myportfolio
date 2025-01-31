import React from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-gray-900 text-white p-6 flex justify-center space-x-8 z-40">
      <Link
        to="home"
        smooth={true}
        duration={500}
        className="relative text-lg cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
        Home
      </Link>
      <Link
        to="about"
        smooth={true}
        duration={500}
        className="relative text-lg cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
        About
      </Link>
      <Link
        to="skills"
        smooth={true}
        duration={500}
        className="relative text-lg cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
        Skills
      </Link>
      <Link
        to="experience"
        smooth={true}
        duration={500}
        className="relative text-lg cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
        Experience
      </Link>
      <Link
        to="projects"
        smooth={true}
        duration={500}
        className="relative text-lg cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
        Projects
      </Link>
      <Link
        to="contact"
        smooth={true}
        duration={500}
        className="relative text-lg cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;