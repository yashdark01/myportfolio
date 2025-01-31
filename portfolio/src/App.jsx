import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Skills />
        <Experience />
      </motion.div>  
      <Projects />
      <Contact />
    </div>
  );
};

export default App;