import { motion } from 'framer-motion';

export default function SkillTag({ skill, index = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 16px var(--accent-glow)' }}
      className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--card-border)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--accent)]/40 transition-colors"
    >
      {skill}
    </motion.span>
  );
}
