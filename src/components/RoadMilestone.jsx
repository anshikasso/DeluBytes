import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import ConfettiBurst from './ConfettiBurst';

export default function RoadMilestone({ title, description, days, index }) {
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    if (completed) return;
    setCompleted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] transition-all duration-300 ${
        completed ? 'opacity-70 border-[var(--mint)]/50 shadow-[0_0_20px_var(--mint-glow)]' : ''
      }`}
    >
      <AnimatePresence>
        {showConfetti && <ConfettiBurst key="confetti" />}
      </AnimatePresence>
      <motion.button
        onClick={handleComplete}
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
          completed
            ? 'bg-[var(--mint)] border-[var(--mint)]'
            : 'border-[var(--text-secondary)]/40 hover:border-[var(--accent)]'
        }`}
        whileHover={!completed ? { scale: 1.1 } : {}}
        whileTap={{ scale: 0.95 }}
      >
        {completed ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          </motion.div>
        ) : null}
      </motion.button>
      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className={`font-semibold text-[var(--text-primary)] text-base sm:text-lg ${completed ? 'line-through' : ''}`}>
          {title}
        </h4>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">{description}</p>
        <span className="inline-block mt-3 text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full">
          Complete in {days} days
        </span>
      </div>
    </motion.div>
  );
}
