import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export default function ProfileLinks({ githubUrl, linkedinUrl, onGitHubChange, onLinkedInChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-4 w-full max-w-[720px]"
    >
      <div className="flex-1 relative group">
        <Github className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors z-10" />
        <input
          type="url"
          placeholder="GitHub Profile URL (optional)"
          value={githubUrl || ''}
          onChange={(e) => onGitHubChange?.(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex-1 relative group">
        <Linkedin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors z-10" />
        <input
          type="url"
          placeholder="LinkedIn Profile URL (optional)"
          value={linkedinUrl || ''}
          onChange={(e) => onLinkedInChange?.(e.target.value)}
          className="input"
        />
      </div>
    </motion.div>
  );
}
