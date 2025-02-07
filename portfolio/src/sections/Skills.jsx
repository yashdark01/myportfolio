import React from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaCss3Alt, FaDatabase, FaJsSquare, FaGitSquare } from "react-icons/fa"; // Corrected icons
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const skills = [
  {
    name: "React.js",
    level: 80,
    icon: <FaReact size={30} />,
    description:
      "Used for building dynamic user interfaces and single-page applications with a reactive approach.",
  },
  {
    name: "Node.js",
    level: 80,
    icon: <FaNodeJs size={30} />,
    description: "Backend JavaScript runtime used for building scalable applications and APIs.",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    icon: <FaCss3Alt size={30} />,
    description: "Utility-first CSS framework used to create responsive and modern user interfaces.",
  },
  {
    name: "MongoDB",
    level: 75,
    icon: <FaDatabase size={30} />,
    description: "NoSQL database used for scalable data storage in backend applications.",
  },
  {
    name: "JavaScript",
    level: 90,
    icon: <FaJsSquare size={30} />,
    description:
      "Programming language for building interactive web applications and server-side logic.",
  },
  {
    name: "Express.js",
    level: 80,
    icon: <FaGitSquare size={30} />,
    description:
      "Minimal and flexible Node.js web application framework used for building robust APIs and backend services.",
  },
];

const softSkills = [
  { name: "Communication", level: 80 },
  { name: "Problem Solving", level: 85 },
  { name: "Teamwork", level: 90 },
  { name: "Leadership", level: 75 },
  { name: "Time Management", level: 90 },
  { name: "Adaptability", level: 90 },
];

const certifications = [
  {
    title: "MERN Stack Certification",
    link: "https://drive.google.com/file/d/1bfQGh-mu-Xd7VwA-g-UfjPdRIgUjb4L_/view?usp=sharing",
    icon: <FaReact size={30} />,
  },
  {
    title: "Full Stack Development Certification",
    link: "https://drive.google.com/file/d/1qYoMDvkR9KY2-OBPCbPy0hwpukH8RV7d/view?usp=sharing",
    icon: <FaNodeJs size={30} />,
  },
];



const Skills = () => {
  return (
    <Element name="skills" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
      <motion.div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center mb-12 glow-text">My Skills</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center">
                <div className="text-white text-4xl">{skill.icon}</div>
              </div>

              <div className="z-20">
                <h3 className="text-2xl font-semibold text-center mb-4">{skill.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{skill.description}</p>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg text-gray-400">Proficiency</span>
                  <span className="text-lg font-semibold text-gray-200">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-cyan-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-4xl font-extrabold text-center mt-20 mb-8 glow-text">Soft Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 group"
            >
              <h4 className="text-xl font-semibold mb-4">{skill.name}</h4>
              <div className="w-24 h-24 mx-auto">
                <CircularProgressbar
                  value={skill.level}
                  text={`${skill.level}%`}
                  strokeWidth={10}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

       
        <h3 className="text-4xl font-extrabold text-center mt-20 mb-8 glow-text">Certifications</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg w-64 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl text-cyan-500 mb-4">{cert.icon}</div>
              <h4 className="text-lg font-semibold text-white mb-4">{cert.title}</h4>
              <motion.a
              href={cert.link} target="__blank"
              download
              className="mt-8 inline-block bg-cyan-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-cyan-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
             View Certificate
            </motion.a>
            </div>
          ))}
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

export default Skills;
