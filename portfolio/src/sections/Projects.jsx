import { Element } from "react-scroll";
import React from "react";
const Projects = () => (
  <Element name="projects" className="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="text-center">
      <h2 className="text-4xl font-bold">Projects</h2>
      <p className="text-lg mt-4">Here are some of my recent works.</p>
    </div>
  </Element>
);

export default Projects;