import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const EmailIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const DownloadIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ContactButton = ({ 
  icon, 
  text, 
  href, 
  isDownload = false 
}: { 
  icon: React.ReactNode; 
  text: string; 
  href: string;
  isDownload?: boolean;
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.a
      href={href}
      download={isDownload}
      target={!isDownload ? "_blank" : undefined}
      rel={!isDownload ? "noopener noreferrer" : undefined}
      className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300
        ${isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-white' 
          : 'bg-white hover:bg-gray-100 text-gray-900'
        } shadow-lg hover:shadow-xl`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </motion.a>
  );
};

export const ContactSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full py-20 z-10`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center
          ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Let's <span className="text-cyan-400">Connect</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <ContactButton
            icon={<LinkedInIcon />}
            text="LinkedIn"
            href="https://fr.linkedin.com/in/emmanuel-landau-66ba5328a"
          />
          
          <ContactButton
            icon={<EmailIcon />}
            text="emmanuel.landau@sciencespo.fr"
            href="mailto:emmanuel.landau@sciencespo.fr"
          />
          
          <ContactButton
            icon={<DownloadIcon />}
            text="Download CV"
            href="https://emmanuel-portfolio.s3.us-east-1.amazonaws.com/papers/Emmanuel_LANDAU_CV.pdf"
            isDownload
          />
        </div>
      </div>
    </motion.div>
  );
};