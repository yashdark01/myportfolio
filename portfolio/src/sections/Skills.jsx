import React from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", level: "90%", color: "bg-orange-500" },
  { name: "CSS", level: "85%", color: "bg-blue-500" },
  { name: "JavaScript", level: "80%", color: "bg-yellow-500" },
  { name: "React.js", level: "85%", color: "bg-cyan-500" },
  { name: "Node.js", level: "75%", color: "bg-green-500" },
];

const Skills = () => {
  return (
    <Element name="skills" className="py-20  text-white bg-gradient-to-t from-black/90 to-black/80">
      <motion.div
        className="max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-10">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-6 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">{skill.name}</h3>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-3 overflow-hidden">
                <motion.div
                  className={`${skill.color} h-3 rounded-full`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: skill.level }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Element>
  );
};

export default Skills;