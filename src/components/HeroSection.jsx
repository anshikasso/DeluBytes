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
    <section className="min-h-screen flex flex-col items-center justify-center hero-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-10 container"
      >
        <h1 className="font-extrabold tracking-tight text-[var(--text-primary)]" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.06 }}>
          Personal Career Navigator
        </h1>
        <p className="mt-3 muted font-medium max-w-xl mx-auto" style={{ fontSize: '18px', marginTop: '12px' }}>
          Your AI-powered Career Co-Pilot
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex flex-col items-center container"
        style={{ gap: '28px', marginTop: '28px' }}
      >
        <div className="hero-card glass-card w-full max-w-3xl">
          <ResumeUpload
            onUploadComplete={handleUploadComplete}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
          />
          <div className="mt-4">
            <ProfileLinks
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
              onGitHubChange={setGitHubUrl}
              onLinkedInChange={setLinkedInUrl}
            />
          </div>
        </div>
      </motion.div>

      {showAnalysisLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl p-10 sm:p-12 bg-[#F8F5F2] shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-4 border-[#F97316]/30 border-t-[#F97316]"
            />
            <p className="text-[#1E293B] font-semibold">AI analyzing your profile...</p>
            <p className="text-[#64748B] text-sm">Identifying skills and gaps</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
