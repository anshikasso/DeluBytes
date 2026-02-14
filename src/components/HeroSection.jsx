import { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeUpload from './ResumeUpload';
import ProfileLinks from './ProfileLinks';

export default function HeroSection({ onResumeUploaded }) {
  const [showAnalysisLoader, setShowAnalysisLoader] = useState(false);
  const [githubUrl, setGitHubUrl] = useState('');
  const [linkedinUrl, setLinkedInUrl] = useState('');

  const handleUploadComplete = (analysisResult) => {
    setShowAnalysisLoader(true);
    setTimeout(() => {
      setShowAnalysisLoader(false);
      onResumeUploaded?.(analysisResult);
      setTimeout(() => {
        document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }, 500);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 sm:px-8 sm:pt-32 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-5 tracking-tight">
          Personal Career Navigator
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed" style={{ marginTop: '16px' }}>
          Your AI-powered Career Co-Pilot
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-2xl flex flex-col items-center gap-12 sm:gap-16"
      >
        <ResumeUpload
          onUploadComplete={handleUploadComplete}
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
        />
        <ProfileLinks
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          onGitHubChange={setGitHubUrl}
          onLinkedInChange={setLinkedInUrl}
        />
      </motion.div>

      {showAnalysisLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl p-10 sm:p-12 glass-card shadow-2xl flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-4 border-[var(--accent)]/30 border-t-[var(--accent)]"
            />
            <p className="text-[var(--text-primary)] font-semibold">AI analyzing your profile...</p>
            <p className="text-[var(--text-secondary)] text-sm">Identifying skills and gaps</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
