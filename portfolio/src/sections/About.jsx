import React from "react";
import { Element } from "react-scroll";

const About = () => (
  <Element name="about" className="h-screen flex items-center justify-center bg-gradient-to-t from-black/80 to-black/90 text-zinc-500">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white">About Me</h2>
      <p className="text-lg mt-4">I am a Full Stack Developer specializing in React, Node.js, and MongoDB.</p>
    </div>
  </Element>
);

export default About;