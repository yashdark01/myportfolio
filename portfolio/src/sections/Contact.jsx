import React, { useState } from "react";
import { Element } from "react-scroll";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(""); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Thank you for reaching out! I will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Element name="contact" className="h-full bg-gradient-to-t from-black via-gray-800 to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center mb-12 glow-text">Contact Me</h2>

        
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1 text-center lg:text-left">
            <p className="text-lg mb-6">
              I'm always open to new opportunities! You can reach me via the form below or on my social media. I look forward to hearing from you.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-gray-400">yashpatidar9691@gmail.com</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <p className="text-gray-400">+91 7987386670</p>
              </div>
            </div>
          </div>

          
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center">Send Me a Message</h3>
              {formStatus && <p className="text-green-500 text-center mb-4">{formStatus}</p>}
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium" htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium" htmlFor="message">Your Message</label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg"
                    rows="4"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-cyan-500 text-white rounded-lg text-xl font-semibold hover:bg-cyan-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
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

export default Contact;
