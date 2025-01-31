import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [cursorStyle, setCursorStyle] = useState({
    width: '15px',
    height: '15px',
    backgroundColor: '#fff',
  });

  const [circle1Style, setCircle1Style] = useState({
    width: '30px', // Larger size for circle 1
    height: '30px',
    backgroundColor: 'rgba(0, 123, 255, 0.4)', // Light blue with transparency
  });

  const [circle2Style, setCircle2Style] = useState({
    width: '10px', // Smaller size for circle 2
    height: '10px',
    background: 'radial-gradient(circle, rgba(255, 0, 150, 0.5), rgba(255, 255, 255, 0))', // Gradient effect
  });

  useEffect(() => {
    let timeout1, timeout2;

    const handleMouseMove = (e) => {
      // Set the main cursor position
      const cursor = document.getElementById('cursor');
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;

      // Add the first circle with slight delay
      timeout1 = setTimeout(() => {
        setCircle1Style({
          ...circle1Style,
          top: `${e.clientY + 25}px`, // Offset position
          left: `${e.clientX + 25}px`,
        });
      }, 100);

      // Add the second circle with another delay
      timeout2 = setTimeout(() => {
        setCircle2Style({
          ...circle2Style,
          top: `${e.clientY - 25}px`, // Offset position
          left: `${e.clientX - 25}px`,
        });
      }, 200);
    };

    // Add event listener for mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [circle1Style, circle2Style]);

  return (
    <div>
      {/* Main cursor */}
      <div
        id="cursor"
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          transform: 'translate(-50%, -50%)',
          zIndex: '9999',
          pointerEvents: 'none',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          ...cursorStyle,
        }}
      />

      {/* First additional circle (larger and transparent) */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          transform: 'translate(-50%, -50%)',
          zIndex: '9998',
          pointerEvents: 'none',
          transition: 'top 0.3s, left 0.3s',
          ...circle1Style,
        }}
      />

      {/* Second additional circle (smaller with gradient) */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          transform: 'translate(-50%, -50%)',
          zIndex: '9997',
          pointerEvents: 'none',
          transition: 'top 0.3s, left 0.3s',
          ...circle2Style,
        }}
      />
    </div>
  );
};

export default Cursor;