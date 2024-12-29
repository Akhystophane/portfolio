import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import pythonLogo from '../../../assets/icons/python.svg'
import postgresqlLogo from '../../../assets/icons/postgresql.svg'
import mongodbLogo from '../../../assets/icons/mongodb.svg'
import awsLogo from '../../../assets/icons/aws.svg'
import TechLogo from '../components/TechLogo';

import aftereffectsLogo from '../../../assets/icons/aftereffects.svg';
import blenderLogo from '../../../assets/icons/blender.svg';
import elevenlabsLogo from '../../../assets/icons/elevenlabs.svg';
import midjourneyLogo from '../../../assets/icons/midjourney.svg';

import reactLogo from '../../../assets/icons/react.svg';
import htmlLogo from '../../../assets/icons/html.svg';
import cssLogo from '../../../assets/icons/css.svg';
import javascriptLogo from '../../../assets/icons/javascript.svg';

// Types
interface Technology {
  name: string;
  icon: string;
  description: string;
  category: string;
}

interface Skill {
  title: string;
  description: string;
}

interface SkillsData {
  technologies: {
    [key: string]: Technology[];
  };
  skills: Skill[];
}

const TechSkills = () => {
  const { isDarkMode } = useTheme();
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Backend');

  // Data structure
  const data: SkillsData = {
    technologies: {
      "Backend": [
        { 
          name: "Python", 
          icon: pythonLogo, 
          description: "I use Python with Django for robust backend development, automation tasks (Selenium, Appium), API integrations, and orchestrating multi-language scripts.", 
          category: "Backend" 
        },
        { 
          name: "PostgreSQL", 
          icon: postgresqlLogo, 
          description: "My primary database for managing structured backend data in applications.", 
          category: "Backend" 
        },
        { 
          name: "MongoDB", 
          icon: mongodbLogo, 
          description: "I use MongoDB as a NoSQL database for lighter projects like newsletters or dynamic data storage.", 
          category: "Backend" 
        },
        { 
          name: "AWS", 
          icon: awsLogo, 
          description: "I leverage AWS for hosting (Route 53), email services (SES), and storage solutions (S3).", 
          category: "Backend" 
        },
      ],
      "Frontend": [
        { 
          name: "JavaScript", 
          icon: javascriptLogo, 
          description: "I primarily use TypeScript for safer, maintainable code in dynamic applications.", 
          category: "Frontend" 
        },
        { 
          name: "React", 
          icon: reactLogo, 
          description: "I use React as my go-to framework for creating dynamic user interfaces, often paired with Vite for faster development.", 
          category: "Frontend" 
        },
        { 
          name: "CSS", 
          icon: cssLogo, 
          description: "I rely on TailwindCSS for rapid and efficient styling of modern web applications.", 
          category: "Frontend" 
        },
        { 
          name: "HTML", 
          icon: htmlLogo, 
          description: "I use HTML within React and for creating email templates and custom booklets.", 
          category: "Frontend" 
        },
      ],
      "Content Creation": [
        { 
          name: "Blender", 
          icon: blenderLogo, 
          description: "I use Blender for animating 3D models, primarily for websites and creating videos for social media campaigns.", 
          category: "Content Creation" 
        },
        { 
          name: "After Effects", 
          icon: aftereffectsLogo, 
          description: "I automate and edit engaging videos for social media using ExtendScript in After Effects.", 
          category: "Content Creation" 
        },
        { 
          name: "ElevenLabs", 
          icon: elevenlabsLogo, 
          description: "I generate AI voices for video content and other media projects using ElevenLabs.", 
          category: "Content Creation" 
        },
        { 
          name: "Midjourney", 
          icon: midjourneyLogo, 
          description: "I use Midjourney for AI-powered image creation, including videos, newsletters, and website content.", 
          category: "Content Creation" 
        },
      ],
    },
    
    
    skills: [
      { title: "MVP Development", description: "Creation of minimum viable products and web applications" },
      { title: "API Development", description: "Design, creation and integration of APIs" },
      { title: "Data Analysis", description: "Proficient in statistical modeling, including OLS regressions, IV and Diff-in-Diff analysis." },
      { title: "Email Marketing", description: "Programmatic creation and sending of personalized emails" },
      { title: "Automation", description: "Social media content management and automation via Python" },
      { title: "Content Creation", description: "Creation of engaging 3D and 2D carousels and videos" },
    ]
  };

  return (
    <div className={`w-full py-16 px-4  z-10`}>
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-4xl font-bold text-center mb-4  text-cyan-400">
          Technologies <span className={`${isDarkMode ? ('text-white') : 'text-gray-900'}`}>&</span> Tools 
        </h2>
        <div className={`h-1 w-[25rem] max-w-[80%]  mx-auto rounded-full bg-cyan-400 mb-12`} />


        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(data.technologies).map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all
                  ${selectedCategory === category 
                    ? 'bg-cyan-400 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {selectedCategory && data.technologies[selectedCategory].map((tech) => (
            <motion.div
              key={tech.name}
              className={`relative p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all cursor-pointer`}
              onClick={() => setSelectedTech(tech)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col items-center">
              <TechLogo 
        icon={tech.icon} 
        name={tech.name} 
        isDarkMode={isDarkMode} 
      />
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {tech.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-cyan-400">
            Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.map((skill, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {skill.title}
                </h4>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Details Modal */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`relative p-6 rounded-xl max-w-lg w-full ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedTech(null)}
                >
                  ✕
                </button>
                <div className="flex items-center space-x-4 mb-4">
                  <TechLogo 
        icon={selectedTech.icon} 
        name={selectedTech.name} 
        isDarkMode={isDarkMode} 
      />

                  <h3 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {selectedTech.name}
                  </h3>
                </div>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedTech.description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechSkills;