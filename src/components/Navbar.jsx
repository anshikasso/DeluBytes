import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 nav-bar"
    >
      <div className="container flex items-center justify-between py-4">
        <motion.span
          className="text-lg font-bold text-[var(--text-primary)]"
          whileHover={{ scale: 1.02 }}
        >
          Career Navigator
        </motion.span>

        <motion.button
          onClick={toggleTheme}
          className="btn btn-ghost"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white"
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-white" strokeWidth={2.2} />
            ) : (
              <Sun className="w-4 h-4 text-white" strokeWidth={2.2} />
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.nav>
  );
}
