import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Loader2, AlertCircle, Sparkles } from 'lucide-react';
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
    if (file && file.type === 'application/pdf') {
      processUpload(file);
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
      processUpload(file);
    }
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
      className="w-full"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400"
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
        className={`
          relative rounded-2xl border-2 border-dashed p-12 sm:p-16
          glass-card cursor-pointer transition-all duration-300
          ${isDragging ? 'border-[var(--accent)] scale-[1.02] shadow-[0_0_32px_var(--accent-glow)]' : 'border-[var(--card-border)]'}
        `}
        whileHover={!isUploading ? { scale: 1.01, boxShadow: '0 0 24px var(--accent-glow)' } : {}}
        whileTap={!isUploading ? { scale: 0.99 } : {}}
      >
        <input
          id="resume-input"
          type="file"
          accept=".pdf,application/pdf"
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
                className="w-20 h-20 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <Upload className="w-10 h-10 text-[var(--accent)]" strokeWidth={2} />
              </motion.div>
              <div className="space-y-2">
                <p className="text-[var(--text-primary)] font-semibold text-xl">
                  Drag & drop your resume here
                </p>
                <p className="text-[var(--text-secondary)] text-base">
                  or click to browse • PDF only
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--accent)]">
                <Sparkles className="w-4 h-4" />
                <span>AI analyzes skills instantly</span>
              </div>
              <motion.button
                onClick={(e) => { e.stopPropagation(); document.getElementById('resume-input')?.click(); }}
                className="px-8 py-3.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
                whileHover={{ scale: 1.03 }}
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
                className="w-16 h-16 rounded-full border-4 border-[var(--accent)]/30 border-t-[var(--accent)]"
              />
              <Loader2 className="w-10 h-10 text-[var(--accent)] animate-spin -mt-20" />
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--mint)]" />
                <p className="text-[var(--text-primary)] font-medium truncate max-w-[200px]">
                  {fileName}
                </p>
              </div>
              <div className="w-full max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--mint)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                AI is analyzing your resume...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
