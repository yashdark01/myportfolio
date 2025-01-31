import React, { useState } from "react";
import { Element } from "react-scroll";
import { FaSuitcase } from "react-icons/fa"; // Icon for job experiences

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "Webintegratorz Technologies Pvt. Ltd.",
    duration: "January 2024 - Present",
    description:
      "Worked on various web development projects using React, Tailwind CSS, and Node.js. Responsible for building responsive web pages and handling front-end development tasks.",
    fullDescription:
      "In this role, I have developed several responsive web pages and contributed to large-scale projects, ensuring performance optimization and implementing new features. I have also collaborated with UI/UX designers to create smooth user interactions and cross-browser compatibility. I integrated third-party APIs and worked on improving the accessibility of websites.",
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express.js", "Socket.io", "Git/GitHub"],
  },
  {
    title: "Full Stack Developer",
    company: "Freelance",
    duration: "July 2023 - Present",
    description:
      "Developed full-stack applications with React for the frontend and Node.js with Express for the backend. Implemented real-time functionality and database management using MongoDB.",
    fullDescription:
      "As a full-stack developer, I was responsible for creating both front-end and back-end solutions. On the front end, I used React to build dynamic user interfaces while integrating them with back-end APIs using Express and Node.js. I used MongoDB for the database and Socket.io for real-time communication. I focused on building scalable, interactive, and secure applications.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
  },
  
];

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Element name="experience" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center mb-12 glow-text">My Experience</h2>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative p-8 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              {/* Experience Heading */}
              <div className="absolute top-0 left-0 -translate-x-16">
                <FaSuitcase size={40} className="text-cyan-500" />
              </div>
              <h3 className="text-3xl font-semibold">{exp.title}</h3>
              <h4 className="text-lg font-light text-gray-400">{exp.company}</h4>
              <p className="text-sm text-gray-400 my-2">{exp.duration}</p>
              <p className="text-gray-300 mb-4">{exp.description}</p>

              {/* Technologies Used */}
              <div className="flex flex-wrap gap-4">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-gray-700 text-cyan-500 px-4 py-2 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Read More / Less Button */}
              <button
                onClick={() => toggleDescription(index)}
                className="text-cyan-400 mt-4 text-lg font-semibold"
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>

              {/* Full Description */}
              {expandedIndex === index && (
                <p className="text-gray-400 mt-4">{exp.fullDescription}</p>
              )}
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

export default Experience;