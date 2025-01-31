import React, { useState, useEffect } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll(".hoverable").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    let animationFrame;
    const smoothTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrame = requestAnimationFrame(smoothTrail);
    };

    smoothTrail();
    
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll(".hoverable").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      cancelAnimationFrame(animationFrame);
    };
  }, [position]);

  return (
    <>
      {/* Main Cursor */}
      <div
        className="cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isHovering ? "scale(2.5)" : "scale(1)",
          background: isHovering ? "rgba(0, 140, 255, 0.8)" : "rgba(0, 191, 255, 0.9)",
        }}
      />

      {/* Smooth Trailing Effect */}
      <div
        className="cursor-trail"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          opacity: isHovering ? 0.5 : 1,
        }}
      />
    </>
  );
};

export default Cursor;
