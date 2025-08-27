import React, { useState, useEffect } from 'react';
import profileImage from '../../assets/profile2.jpg';

const About = () => {
  // Custom typing effect hook
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    'Fullstack Developer',
    'App Developer',
    'Data Scientist',
    'AI/ML Engineer',
  ];

  useEffect(() => {
    const currentText = texts[textIndex];
    const shouldDelete = isDeleting;
    
    const timeout = setTimeout(() => {
      if (!shouldDelete && currentIndex < currentText.length) {
        setDisplayText(currentText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (shouldDelete && currentIndex > 0) {
        setDisplayText(currentText.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!shouldDelete && currentIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (shouldDelete && currentIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, shouldDelete ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textIndex, texts]);

  // Custom tilt effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -20;
    const rotateY = (x - centerX) / centerX * 20;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          {/* Greeting */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            Hi, I am
          </h1>
          {/* Name */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Ashutosh Ranjan
          </h2>
          {/* Skills Heading with Typing Effect */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec] leading-tight">
            <span className="text-white">I am a </span>
            <span className="text-[#8245ec]">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </h3>
          {/* About Me Paragraph */}
          <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
            I am a passionate full-stack developer with experience in building scalable and efficient web applications. Alongside expertise in the MERN stack and Next.js, I am actively exploring mobile app development and the exciting fields of AI/ML and data science. I enjoy crafting seamless user experiences, building intelligent systems, and constantly learning new technologies to solve real-world problems.
          </p>
          {/* Resume Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, #8245ec, #a855f7)',
              boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
            }}
          >
            DOWNLOAD CV
          </a>
        </div>
        
        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 border-purple-700 rounded-full cursor-pointer transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)`,
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={profileImage}
              alt="Tarun Kaushik"
              className="w-full h-full rounded-full object-cover"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(130,69,236,0.5))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;