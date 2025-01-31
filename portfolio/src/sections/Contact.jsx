import { Element } from "react-scroll";
import React from "react";
const Contact = () => (
  <Element name="contact" className="h-screen flex items-center justify-center bg-blue-600 text-white">
    <div className="text-center">
      <h2 className="text-4xl font-bold">Contact Me</h2>
      <p className="text-lg mt-4">Let's work together! Reach out via email or social media.</p>
    </div>
  </Element>
);

export default Contact;