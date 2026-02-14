import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i / 12) * 360,
  color: ['#FF8A3D', '#34D399', '#a78bfa', '#fbbf24'][i % 4],
  delay: i * 0.02,
}));

export default function ConfettiBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {PARTICLES.map(({ id, angle, color, delay }) => (
        <motion.div
          key={id}
          className="absolute w-2 h-2 rounded-full left-1/2 top-1/2"
          style={{
            backgroundColor: color,
            originX: '50%',
            originY: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.cos((angle * Math.PI) / 180) * 60],
            y: [0, Math.sin((angle * Math.PI) / 180) * 60],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
