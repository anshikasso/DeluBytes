import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import { analyzeProfile } from '../api/careerApi';

export default function ResumeUpload({ onUploadComplete, githubUrl, linkedinUrl, role }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processUpload(file);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) processUpload(file);
  };

  const processUpload = async (file) => {
    setFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 80));
    }, 200);

    try {
      const result = await analyzeProfile({
        resumeFile: file,
        githubUrl: githubUrl || undefined,
        linkedinUrl: linkedinUrl || undefined,
        role: role || 'Full Stack Developer',
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setIsUploading(false);
        onUploadComplete?.(result);
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err.message || 'Analysis failed. Please try again.');
      setUploadProgress(0);
      setTimeout(() => {
        setIsUploading(false);
        setError(null);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[720px]"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </motion.div>
      )}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && document.getElementById('resume-input')?.click()}
        className={`relative rounded-[24px] card-lg cursor-pointer transition-all duration-300 glass-card ${isDragging ? 'scale-[1.02] shadow-[0_12px_48px_rgba(249,115,22,0.18)] ring-2 ring-[var(--accent)]/30' : ''}`}
        whileHover={!isUploading ? { y: -4, boxShadow: '0 18px 60px rgba(0,0,0,0.12)' } : {}}
        whileTap={!isUploading ? { scale: 0.995 } : {}}
      >
        <input
          id="resume-input"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileSelect}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!isUploading ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <motion.div
                className="w-[72px] h-[72px] rounded-2xl bg-[var(--hero-icon-bg,#F5D2B8)] flex items-center justify-center flex-shrink-0"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Upload className="w-9 h-9 text-[var(--hero-accent,#F97316)]" strokeWidth={2} />
              </motion.div>
              <div className="stack">
                <p className="text-[var(--hero-text,#1E293B)] font-semibold text-lg">Drop your resume here</p>
                <p className="helper">PDF or Word (DOC, DOCX)</p>
              </div>
              <motion.button
                onClick={(e) => { e.stopPropagation(); document.getElementById('resume-input')?.click(); }}
                className="btn btn-accent"
                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(249,115,22,0.18)' }}
                whileTap={{ scale: 0.98 }}
              >
                Upload from Desktop
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-4 border-[#F97316]/30 border-t-[#F97316]"
              />
              <Loader2 className="w-10 h-10 text-[#F97316] animate-spin -mt-20" />
              <div className="row">
                <FileText className="w-5 h-5 text-[var(--mint)]" />
                <p className="text-[var(--text-primary)] font-medium truncate max-w-[280px]">{fileName}</p>
              </div>
              <div className="w-full max-w-sm h-2 bg-[var(--hero-input-bg,#F3EDE7)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--mint)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="helper">AI is analyzing your resume...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
