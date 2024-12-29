import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import AboutMe from './containers/AboutMe';
import { ContactSection } from './containers/ContactSection';
import HomeContainer from './containers/HomeContainer'
import ProjectsContainer from './containers/ProjectsContainer'
import TechSkills from './containers/TechSkills';

const LandingPage = () => {
    const { isDarkMode } = useTheme();
  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}  min-h-screen w-full flex flex-col`}>
              <ThemeToggle />

        <HomeContainer />
        <ProjectsContainer />
        <TechSkills />
        <AboutMe />
        <ContactSection />
    </div>
  )
}

export default LandingPage