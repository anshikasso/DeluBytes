import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-14 sm:py-16 px-6 sm:px-8 border-t border-[var(--card-border)] mt-auto"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-[var(--accent)]" />
          <span className="font-semibold text-[var(--text-primary)]">
            Personal Career Navigator
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Your AI-powered Career Co-Pilot — Build, adapt, and grow.
        </p>
      </div>
    </motion.footer>
  );
}
