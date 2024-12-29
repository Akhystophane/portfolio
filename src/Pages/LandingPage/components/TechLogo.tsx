import { motion } from 'framer-motion';

interface LogoProps {
  icon: string;
  name: string;
  isDarkMode: boolean;
}

const TechLogo = ({ icon, name, isDarkMode }: LogoProps) => {
  return (
    <motion.div
      className={`relative w-16 h-16 mb-4 rounded-xl transition-all duration-300 group
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
        hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
      `}
      whileHover={{ scale: 1.05 }}
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100
          ${isDarkMode 
            ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/20' 
            : 'bg-gradient-to-r from-cyan-200/30 to-cyan-300/30'
          }
        `}
      />

      {/* Logo container */}
      <div className="relative w-full h-full flex items-center justify-center p-3">
        <img 
          src={icon} 
          alt={name} 
          className={`w-full h-full object-contain transition-transform duration-300
            ${isDarkMode ? 'brightness-100' : 'brightness-90'}
            group-hover:brightness-110
          `}
        />
      </div>
    </motion.div>
  );
};

export default TechLogo;