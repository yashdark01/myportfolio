import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [activeLink, setActiveLink] = useState(""); 

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (window.scrollY > lastScrollY && !isMenuOpen) {
          setIsVisible(false); 
        } else {
          setIsVisible(true); 
        }
        setLastScrollY(window.scrollY);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMenuOpen]);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className={`fixed top-0 w-full bg-black/90 text-white p-4 md:p-6 flex justify-between items-center z-50 transition-transform duration-300 shadow-lg ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >

      <div className="text-2xl font-bold">Yash</div>


      <div className="hidden md:flex justify-center space-x-8 md:space-x-12">
        {["home", "about", "skills", "experience", "projects", "contact"].map(
          (item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={500}
              className={`relative text-lg cursor-pointer hover:text-zinc-700 transition-all ease-in-out duration-300 group ${
                activeLink === item ? "text-cyan-500" : ""
              }`} 
              onSetActive={() => handleSetActiveLink(item)} 
            >
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-800 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          )
        )}
      </div>

     
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl focus:outline-none z-50 relative"
        >
          {isMenuOpen ? <FaTimes className="transition-transform duration-300" /> : <FaBars />}
        </button>
      </div>
      
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/95 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {["home", "about", "skills", "experience", "projects", "contact"].map(
          (item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={500}
              className="text-xl text-white cursor-pointer hover:text-cyan-500 transition-all ease-in-out duration-300"
              onClick={() => {
                setIsMenuOpen(false); 
                handleSetActiveLink(item);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
