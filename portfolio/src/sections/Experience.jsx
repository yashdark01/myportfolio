import React from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Webintegratorz Technologies Pvt. Ltd.",
    role: "Frontend Developer Intern",
    duration: "Aug 2023 - Present",
    description:
      "Worked on developing responsive UIs using React.js and Tailwind CSS. Implemented Redux for state management and optimized API calls with Axios.",
  },
  {
    company: "Freelance Projects",
    role: "Full Stack Developer",
    duration: "Jan 2023 - Aug 2023",
    description:
      "Developed multiple full-stack applications using React.js, Node.js, and MongoDB. Focused on building scalable and interactive web applications.",
  },
  {
    company: "Personal Projects",
    role: "Self-Learning & Open Source",
    duration: "2022 - Present",
    description:
      "Contributed to open-source projects and built various personal projects to improve problem-solving and development skills.",
  },
];

const Experience = () => {
  return (
    <Element name="experience" className="py-20 bg-gradient-to-t from-black/100 to-black/90 text-zinc-700">
      <motion.div
        className="max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-10 text-white">Experience</h2>
        <div className="relative border-l-4 border-blue-500 pl-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="mb-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute w-4 h-4 bg-blue-500 transition duration-4000  rounded-full -left-2.5"></div>
              <h3 className="text-2xl font-semibold">{exp.role}</h3>
              <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Element>
  );
};

export default Experience;