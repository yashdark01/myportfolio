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
import Cursor from "./components/Cursor";

const App = () => {
  return (
    <div>
      <Cursor/>
      <Navbar />
      <Home />
      <About />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
       
        <Experience />
        <Skills />
      </motion.div>  
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
