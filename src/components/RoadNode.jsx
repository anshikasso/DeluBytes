import { motion } from 'framer-motion';
import { Lock, Circle, Check, Star } from 'lucide-react';

export default function RoadNode({ task, index, status, isMilestone, onClick }) {
  const isLocked = status === 'locked';
  const isActive = status === 'active';
  const isDone = status === 'done';

  const size = isMilestone ? 'w-14 h-14' : 'w-12 h-12';
  const iconSize = isMilestone ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => !isLocked && onClick?.()}
      disabled={isLocked}
      className={`
        flex flex-col items-center justify-center transition-all
        ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
    >
      <motion.div
        className={`
          ${size} rounded-full flex items-center justify-center
          border-2 transition-all duration-300
          ${isDone ? 'bg-[var(--mint)] border-[var(--mint)] shadow-[0_0_20px_var(--mint-glow)]' : ''}
          ${isActive ? 'bg-[var(--accent)]/20 border-[var(--accent)] shadow-[0_0_24px_var(--accent-glow)]' : ''}
          ${isLocked ? 'bg-white/5 border-white/20' : ''}
          ${!isLocked && !isDone && !isActive ? 'border-[var(--accent)]/50 hover:border-[var(--accent)] hover:shadow-[0_0_16px_var(--accent-glow)]' : ''}
        `}
        whileHover={!isLocked ? { scale: 1.1 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
      >
        {isDone ? (
          <Check className={`${iconSize} text-white`} strokeWidth={3} />
        ) : isLocked ? (
          <Lock className={`${iconSize} text-[var(--text-secondary)]`} />
        ) : isMilestone ? (
          <Star className={`${iconSize} text-[var(--accent)]`} fill="currentColor" />
        ) : (
          <Circle className={`${iconSize} ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`} strokeWidth={2} />
        )}
      </motion.div>
      <div className="mt-3 text-center min-w-[120px] max-w-[160px]">
        <p className={`text-sm font-medium truncate ${isLocked ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
          {task?.title}
        </p>
        <span className="text-xs text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full mt-1 inline-block">
          {task?.days}d
        </span>
      </div>
    </motion.button>
  );
}
