import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function MotivationSign({ quote, pill = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex justify-center py-4 sm:py-6"
    >
      <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full sm:rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 backdrop-blur-sm max-w-sm shadow-[0_0_20px_var(--accent-glow)]/30 ${pill ? 'rounded-full' : ''}`}>
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent)] flex-shrink-0" />
        <p className="text-[var(--text-primary)] font-medium text-center text-sm sm:text-base">
          {quote}
        </p>
      </div>
    </motion.div>
  );
}
