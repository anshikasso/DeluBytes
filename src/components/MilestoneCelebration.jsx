import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ConfettiBurst from './ConfettiBurst';

export default function MilestoneCelebration({ title, message, onContinue, showConfetti = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      {showConfetti && <ConfettiBurst />}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md rounded-2xl glass-card p-8 sm:p-10 shadow-2xl border border-[var(--card-border)] text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-[var(--accent)]" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">{message}</p>
        <motion.button
          onClick={onContinue}
          className="w-full py-3 px-6 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue Journey →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
