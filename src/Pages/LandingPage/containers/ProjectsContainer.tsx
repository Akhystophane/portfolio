import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ProjectType from '../types/types'
const projects: ProjectType[] = [
  {
    title: 'Astronomos',
    description: 'A dynamic web application that provides personalized astrology insights through videos, text-based content, and interactive conversations with AI-powered chatbots. The backend, developed in Python with Django, utilizes the pyswisseph library, which incorporates NASA’s JPL data to perform precise astrological calculations. The frontend, built with TypeScript and React.js, delivers an intuitive and interactive user interface. User authentication is implemented with Google Firebase, while PostgreSQL is used for secure data management. OpenAI’s API powers the chatbot functionality, allowing users to engage in tailored and conversational astrological experiences.',
    technologies: ['Python (Django)', 'TypeScript (React)', 'Firebase', 'OpenAI API', 'PostgreSQL'],
    link: 'https://astrotest-e074e6c33707.herokuapp.com',
  },
  {
    title: "Caste and Income: A Regression Analysis",
    description: "A project developed for an advanced econometrics class at Sciences Po, replicating Siwan Anderson’s 2011 study, Caste as an Impediment to Trade. This analysis examines why household incomes are higher in villages dominated by lower backward agricultural castes compared to those dominated by upper castes in Uttar Pradesh and Bihar. Using OLS, 2SLS, and probit regressions, the study investigates the exogeneity of caste dominance, its impact on household incomes, and the role of groundwater access in income disparities. Conducted using R, the project emphasizes statistical rigor and regression techniques.",
    technologies: ['R (Studio)', 'Latex', 'RMarkdown'],
    link: 'https://emmanuel-portfolio.s3.us-east-1.amazonaws.com/papers/ADVANCED_ECONOMETRICS.html',
  },

  {
    title: 'Flaunty',
    description: 'A conceptual 3D landing page designed to represent an imagined SaaS platform specializing in no-code website building. The platform is envisioned to help Web3 brands, 3D artists, and businesses easily create interactive 3D websites, such as portfolios and landing pages. The landing page prototype, built using React.js, WebGL, and Three.js with React Three Fiber, showcases how such a platform could present its services through an immersive and visually engaging interface',
    technologies: ['Javascript (React)', 'Three.js', 'WebGL'],
    link: 'https://akhystophane.github.io/flaunty/',
  },
  {
    title: "Visualizing La Fontaine's Fables",
    description: "A digital humanities project who explores the network of characters and fables from La Fontaine's Fables through an interactive 3D visualization, developed for a class at the University of Florida. Built using React and Three.js, the interface highlights the relationships between various animals and the fables they inhabit, providing an engaging and educational perspective on the interconnected themes of the stories. The project demonstrates how digital tools can bring classical literature to life, making complex relationships more accessible and visually intuitive.",
    technologies: ['Javascript (React)', 'Three.js', 'WebGL'],
    link: 'https://akhystophane.github.io/dh_project/',
  },
  {
    title: "Automated Video Generation Service",
    description: "A project aimed at developing a service capable of creating complete videos from text-based scripts. The final output integrates images, video clips, and animated subtitles, all generated and assembled automatically. The service was built using Python, leveraging OpenAI’s API for script processing, Selenium for automated image generation on platforms like MidJourney, and the Pexels API for sourcing stock images and videos. The video editing and animation were automated using Adobe After Effects with ExtendScript. Over 1,000 videos were created using this tool, collectively generating over 2 million views on social media.",
    technologies: ['ExtendScript', 'Python', 'Json'],
  },

  // ... autres projets
];

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-white hover:bg-gray-50'
      } transition-colors duration-300`}>
      <h3 className="text-2xl font-bold mb-3 text-cyan-400">{project.title}</h3>
      <p className="mb-4 opacity-90 line-clamp-[17] lg:line-clamp-[10] xl:line-clamp-[8] hover:line-clamp-none">
        {project.description}
      </p>      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${
              isDarkMode 
                ? 'bg-gray-700 text-cyan-400' 
                : 'bg-cyan-100 text-cyan-800'
            }`}>
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          className="text-cyan-400 hover:text-cyan-500 font-semibold 
            inline-flex items-center gap-2 transition-colors duration-300">
          View Project
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </motion.div>
  );
};

const ProjectsContainer = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
    id='projects'
     className={`py-2 px-4 md:px-8 lg:px-16 z-10 
    ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-cyan-400">Projects</span>
        </motion.h2>
        <div className={`h-1 w-[23rem] max-w-[80%]  mx-auto rounded-full bg-cyan-400 mb-12`} />

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;
