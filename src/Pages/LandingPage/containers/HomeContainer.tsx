import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { RobotModel } from '../components/RobotModel';
import { AmbientLight, HemisphereLight, PointLight } from 'three'
import { Environment, SpotLight, Stage } from '@react-three/drei';

extend({AmbientLight, PointLight})

const HomeContainer = () => {
  const { isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    {
      size: 'w-8 h-8 ',
      position: 'right-1/4 top-1/3',
      duration: 4,
      delay: 0,
      color: isDarkMode ? 'bg-cyan-400/30' : 'bg-cyan-400/50'
    },
    {
      size: 'w-12 h-12',
      position: 'left-1/3 top-1/2',
      duration: 3,
      delay: 1,
      color: isDarkMode ? 'bg-purple-400/30' : 'bg-purple-400/50'
    },
    {
      size: 'w-6 h-6',
      position: 'right-1/3 bottom-1/3',
      duration: 5,
      delay: 0.5,
      color: isDarkMode ? 'bg-blue-400/30' : 'bg-blue-400/50'
    },
    {
      size: 'w-4 h-4',
      position: 'left-1/4 top-1/3',
      duration: 6,
      delay: 1.5,
      color: isDarkMode ? 'bg-teal-400/30' : 'bg-teal-400/50'
    },
    {
      size: 'w-10 h-10',
      position: 'right-1/2 top-1/4',
      duration: 4.5,
      delay: 2,
      color: isDarkMode ? 'bg-indigo-400/30' : 'bg-indigo-400/50'
    },
    {
      size: 'w-5 h-5',
      position: 'left-1/2 bottom-1/4',
      duration: 3.5,
      delay: 0.7,
      color: isDarkMode ? 'bg-pink-400/30' : 'bg-pink-400/50'
    }
  ];

  return (
    <main className={`min-h-screen w-full relative  ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background pattern using CSS Grid */}
      <div 
        className="fixed inset-0 " 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? '#1f293760' : '#e5e7eb60'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? '#1f293760' : '#e5e7eb60'} 1px, transparent 1px)
          `,
          backgroundSize: '35px 35px'
        }}
      />



      {/* Floating Elements */}
      <div className='-z-5'>
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, -20, 0],
            x: [-5, 5, -5]
          }}
          transition={{
            opacity: { duration: 0.5, delay: element.delay },
            y: {
              duration: element.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            x: {
              duration: element.duration * 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          className={`fixed ${element.position} ${element.size} rounded-full ${element.color} backdrop-blur-sm -z-5`}
          style={{
            transform: `translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%)`
          }}
        />
      ))}
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen w-full flex flex-col items-center z-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-20 text-center  px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cyan-400">
            Hi, I'm Emmanuel
          </h1>
          <p className={`text-sm md:text-2xl ${
            isDarkMode ? 'text-gray-100' : 'text-gray-700'
          }`}>
            A third-year Bachelor’s student at Sciences Po Paris, majoring in <span className='text-cyan-400 font-semibold'>Economics</span> with a minor in Trade and International Finance.
Passionate about <span className='text-cyan-400 font-semibold'>web development</span> and <span className='text-cyan-400 font-semibold'>entrepreneurship</span>, I focus on building practical tools and exploring creative tech projects.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <div className="relative flex-1 w-full">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            className="!absolute inset-0 "
            style={{ position: 'absolute' }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            
    {/* Multiple spotlights pour bien éclairer votre robot sous différents angles */}


  
    <Stage 
    intensity={4} 
    environment="city"
    shadows
    adjustCamera={false}  // pour ne pas que la caméra bouge automatiquement
  />  

  {/* Lumière ambiante forte pour s'assurer qu'aucune partie n'est trop sombre */}
  <Stage 
    intensity={4} 
    environment="city"
    shadows
    adjustCamera={false}  />     
  <RobotModel mousePosition={mousePosition} />          

        </Canvas>

        </div>


      </div>
                        {/* Button */}
        <div   className="absolute bottom-6 md:bottom-24  mb-16 w-full flex  justify-center items-center z-10"
>
          <motion.a
            href='#projects'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-cyan-400 hover:bg-cyan-500 md:text-xl text-white px-10 py-4 md:px-14 md:py-6 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Explore my projects
          </motion.a>
        </div>
    </main>
  );
};

export default HomeContainer;