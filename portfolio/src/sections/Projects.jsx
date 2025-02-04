import React, { useState } from "react";
import { Element } from "react-scroll";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // Icons for GitHub and External links

const projects = [
  {
    title: "Course Enrollment System",
    description:
      "A full-stack application for managing course enrollments. Students can register, log in, browse courses, and enroll. Admins can manage courses and users.",
    fullDescription:
      "In this project, I built a full-stack course enrollment system using React, Node.js, and MongoDB. The system allows students to sign up, log in, browse available courses, and enroll in them. The admin panel enables administrators to manage courses, approve students, and track enrollment data. I implemented user authentication with JWT and ensured the system is responsive using Tailwind CSS.",
    technologies: ["React.js", "Node.js", "MongoDB", "JWT", "Tailwind CSS"],
    githubLink: "https://github.com/yashdark01/project-1",
    liveLink: "#",
  },
  {
    title: "SNS Website",
    description: "An animated UI design built with React, showcasing smooth transitions and interactive elements.",
    fullDescription: "This project focuses on creating an engaging user interface with smooth animations, responsive design, and interactive components. Built using React, it includes modern UI elements like animated buttons, dynamic cards, and seamless page transitions for an enhanced user experience.",
    technologies: ["React.js", "CSS Animations", "Framer Motion", "Responsive Design"],
    githubLink: "https://github.com/yashdark01/sns-website",
    liveLink: "https://sns-website-nine.vercel.app/"
  },
  {
    title: "Project Two",
    description:
      "A responsive e-commerce website built with React and Stripe API for payments. Includes product listing, cart, and checkout functionality.",
    fullDescription:
      "This e-commerce site allows users to browse products, add them to the cart, and proceed to checkout using Stripe for payment processing. It is built with React and uses the Stripe API for secure transactions. I also optimized the site for mobile devices, ensuring a seamless user experience across all screen sizes.",
    technologies: ["React.js", "Stripe API", "CSS", "JavaScript"],
    githubLink: "https://github.com/username/project-two",
    liveLink: "https://project-two.com",
  },
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

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 relative group">
              {/* Project Title and Short Description */}
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-gray-300 mt-4">{project.description}</p>

              {/* Technologies Used */}
              <div className="flex flex-wrap gap-4 mt-4">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-gray-700 text-cyan-500 hover:text-cyan-300 hover:scale-110 px-4 py-2 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Read More / Less Button */}
              <button
                onClick={() => toggleDescription(index)}
                className="text-cyan-400 mt-4 text-lg font-semibold hover:text-cyan-500"
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>

              {/* Full Description */}
              {expandedIndex === index && (
                <p className="text-gray-400 mt-4">{project.fullDescription}</p>
              )}

              {/* GitHub and Live Link Icons */}
              <div className="absolute bottom-6 right-6 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} className="text-cyan-400 hover:text-cyan-500 transition-colors" />
                </a>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
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