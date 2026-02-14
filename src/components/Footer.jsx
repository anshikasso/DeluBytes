import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 border-t border-[var(--card-border)] mt-auto"
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Compass className="w-6 h-6 text-[var(--accent)]" />
          <span className="font-semibold text-[var(--text-primary)]">Personal Career Navigator</span>
        </div>
        <p className="text-sm muted">Your AI-powered Career Co-Pilot — Build, adapt, and grow.</p>
      </div>
    </motion.footer>
  );
}
