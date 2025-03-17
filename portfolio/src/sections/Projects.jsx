import React, { useState } from "react";
import { Element } from "react-scroll";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Music Player (Spotify Clone)",
    description:
      "A fully functional Spotify Clone built with the MERN stack and ShadCN UI, featuring authentication, playlists, and music controls.",
    fullDescription:
      "Developed a fully functional Spotify Clone using the MERN Stack with a modern UI built using ShadCN. The frontend is built with React.js, while the backend is powered by Node.js and Express.js to handle user authentication, song storage, and playlist management. MongoDB is used as the database to store user data, playlists, and song metadata efficiently. Integrated Redux Toolkit for state management and added features like play/pause controls, Trending Songs, and Made For You playlists.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "ShadCN UI", "Tailwind CSS"],
    githubLink: "https://github.com/yashdark01/spotify.git",
    liveLink: "#",
  },
  {
    title: "Course Enrollment System",
    description:
      "A full-stack application for managing course enrollments. Students can register, log in, browse courses, and enroll. Admins can manage courses and users.",
    fullDescription:
      "In this project, I built a full-stack course enrollment system using React, Node.js, and MongoDB. The system allows students to sign up, log in, browse available courses, and enroll in them. The admin panel enables administrators to manage courses, approve students, and track enrollment data. I implemented user authentication with JWT and ensured the system is responsive using Tailwind CSS.",
    technologies: ["React.js", "Node.js", "MongoDB", "JWT", "Tailwind CSS"],
    githubLink: "https://github.com/yashdark01/project-1",
    liveLink: "https://project-1-two-gamma.vercel.app/",
  },
  {
    title: "SNS Website",
    description: "An animated UI design built with React, showcasing smooth transitions and interactive elements.",
    fullDescription: "This project focuses on creating an engaging user interface with smooth animations, responsive design, and interactive components. Built using React, it includes modern UI elements like animated buttons, dynamic cards, and seamless page transitions for an enhanced user experience.",
    technologies: ["React.js", "CSS Animations", "Framer Motion", "Responsive Design"],
    githubLink: "https://github.com/yashdark01/sns-website",
    liveLink: "https://sns-website-nine.vercel.app/"
  }
];

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Element name="projects" className="min-h-screen bg-gradient-to-t from-black via-gray-800 to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center mb-12 glow-text">My Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-12">
          {projects.map((project, index) => (
            <div key={index} className="relative bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 relative group">
              
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-gray-300 mt-4">{project.description}</p>

              <div className="flex flex-wrap gap-4 mt-4">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-gray-700 text-cyan-500 hover:text-cyan-300 hover:scale-110 px-4 py-2 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => toggleDescription(index)}
                className="absolute bottom-6 left-6 text-cyan-400 mt-4 text-lg font-semibold hover:text-cyan-500"
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>

              {expandedIndex === index && (
                <p className="text-gray-400 mt-4">{project.fullDescription}</p>
              )}

              <div className="absolute bottom-6 right-6 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} className="text-cyan-400 hover:text-cyan-500 transition-colors" />
                </a>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className = {`${project.liveLink === '#' ? "hidden" : "block"} `}>
                  <FaExternalLinkAlt size={30} className="text-cyan-400 hover:text-cyan-500 transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0px 0px 15px rgba(0, 255, 255, 0.8);
        }
      `}</style>
    </Element>
  );
};

export default Projects;
