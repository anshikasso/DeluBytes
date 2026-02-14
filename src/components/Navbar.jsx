import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 sm:px-8 sm:py-6"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.span
          className="text-lg font-semibold text-[var(--text-primary)]"
          whileHover={{ scale: 1.02 }}
        >
          Career Navigator
        </motion.span>

        <motion.button
          onClick={toggleTheme}
          className="relative w-14 h-8 rounded-full glass-card flex items-center p-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute left-1 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center"
            animate={{ x: isDark ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            ) : (
              <Sun className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.nav>
  );
}
