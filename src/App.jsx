import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import RoadmapSection from './components/RoadmapSection';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

function App() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleResumeUploaded = (result) => {
    setAnalysisResult(result);
    setResumeUploaded(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection onResumeUploaded={handleResumeUploaded} />
        <SkillsSection isVisible={resumeUploaded} skillsData={analysisResult?.skills_categorized} />
        <RoadmapSection isVisible={resumeUploaded} roadmap={analysisResult?.roadmap} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
