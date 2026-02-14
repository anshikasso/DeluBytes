import { motion } from 'framer-motion';
import { X, Clock, Sparkles, Play, Check } from 'lucide-react';

export default function TaskCard({ task, onClose, onComplete, isCompleted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl glass-card card-lg shadow-2xl border border-[var(--card-border)]"
      >
        <div className="stack card-pad-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[var(--text-primary)]">{task?.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-[var(--text-secondary)]">
                  <Clock className="w-4 h-4" />
                  <span>Complete in {task?.days} days</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/6 text-[var(--text-secondary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed">{task?.description}</p>

          <div>
            <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Skills gained
            </p>
            <p className="text-sm text-[var(--text-primary)]">
              Based on this task: practical experience, problem-solving, time management
            </p>
          </div>

          {!isCompleted ? (
            <motion.button
              onClick={() => { onComplete?.(); onClose(); }}
              className="btn btn-accent w-full justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4" />
              Mark as Complete
            </motion.button>
          ) : (
            <div className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[var(--mint)]/20 text-[var(--mint)] font-medium">
              <Check className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
