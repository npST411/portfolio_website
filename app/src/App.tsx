import { Box } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import NavBar from './components/layout/NavBar';
import ScrollProgress from './components/layout/ScrollProgress';
import AboutMe from './sections/AboutMe';
import WorkExperience from './sections/Experience';
import Contact from './sections/Contact';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills';
import { BG, TEXT } from './theme/colors';

const App = () => {
  return (
    // Respect the OS "reduce motion" setting for every animation
    <MotionConfig reducedMotion="user">
      <Box sx={{ backgroundColor: BG, color: TEXT, minHeight: '100vh', overflowX: 'hidden' }}>
        <ScrollProgress />

        {/* Navigation Bar */}
        <NavBar />

        {/* Sections */}
        <AboutMe />
        <Skills />
        <Projects />
        <WorkExperience />
        <Contact />
      </Box>
    </MotionConfig>
  );
};

export default App;
