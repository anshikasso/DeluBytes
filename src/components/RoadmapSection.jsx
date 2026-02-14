import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoadNode from './RoadNode';
import TaskCard from './TaskCard';
import MilestoneCelebration from './MilestoneCelebration';
import ProgressRing from './ProgressRing';
import MotivationSign from './MotivationSign';
import ConfettiBurst from './ConfettiBurst';

const FALLBACK_MILESTONES = [
  { id: 1, title: 'Set up your dev environment', description: 'Install Node.js, Git, and VS Code.', days: 1 },
  { id: 2, title: 'Complete fundamentals course', description: 'Arrays, objects, functions, async/await.', days: 5 },
  { id: 3, title: 'Build a portfolio project', description: 'Create a small app to showcase your skills.', days: 12 },
  { id: 4, title: 'Prepare for interviews', description: 'Practice problem-solving and behavioral questions.', days: 25 },
  { id: 5, title: 'Apply to 5+ roles', description: 'Tailor your resume and send applications.', days: 30 },
];

const MOTIVATION_PILLS = [
  "Great start! Momentum begins.",
  "You're building real skills.",
  "Consistency beats intensity.",
];

const MILESTONE_CARDS = [
  { at: 3, title: "🎉 Week 1 Completed!", message: "You've built your foundation. Keep going." },
  { at: 6, title: "🎉 Week 2 Completed!", message: "Your skills are growing. Stay consistent." },
];

export default function RoadmapSection({ isVisible, roadmap }) {
  const [completedIds, setCompletedIds] = useState(new Set());
  const [activeTask, setActiveTask] = useState(null);
  const [showCelebration, setShowCelebration] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!isVisible) return null;

  const milestones = roadmap && roadmap.length > 0 ? roadmap : FALLBACK_MILESTONES;
  const total = milestones.length;
  const completedCount = completedIds.size;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;
  const nextTask = milestones.find((_, i) => !completedIds.has(i));
  const nextMilestone = nextTask ? nextTask.title : 'All done!';

  const getStatus = (idx) => {
    if (completedIds.has(idx)) return 'done';
    const lastCompleted = Math.max(-1, ...completedIds);
    if (idx === lastCompleted + 1) return 'active';
    return 'locked';
  };

  const handleComplete = (idx) => {
    setCompletedIds((prev) => new Set([...prev, idx]));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
    setActiveTask(null);

    const card = MILESTONE_CARDS.find((m) => m.at === idx + 1);
    if (card) setTimeout(() => setShowCelebration(card), 400);
  };

  const isMilestone = (idx) => [2, 5, milestones.length - 1].includes(idx);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="section-padding"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            30-Day Career Roadmap
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mb-12 max-w-xl mx-auto">
            Your personalized learning path — a journey to bridge skill gaps
          </p>

          <div className="inline-block p-8 rounded-2xl glass-card">
            <ProgressRing
              percent={percent}
              daysElapsed={Math.min(completedCount * 3, 30)}
              nextMilestone={nextMilestone}
            />
          </div>
        </motion.div>

        <div className="relative">
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
              <ConfettiBurst />
            </div>
          )}

          {/* Vertical road timeline */}
          <div className="relative flex flex-col items-center">
            {/* Glowing path line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-[var(--accent)]/40 via-[var(--accent)]/20 to-[var(--mint)]/40 rounded-full opacity-80" />

            {milestones.map((task, idx) => (
              <div key={idx} className="relative w-full flex flex-col items-center py-5 sm:py-6">
                <div className="relative z-10 w-full max-w-sm flex justify-center">
                  <RoadNode
                    task={task}
                    index={idx}
                    status={getStatus(idx)}
                    isMilestone={isMilestone(idx)}
                    onClick={() => setActiveTask({ task, idx })}
                  />
                </div>
                {(idx === 1 || idx === 3) && (
                  <MotivationSign quote={MOTIVATION_PILLS[idx === 1 ? 0 : 1]} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeTask && (
            <TaskCard
              task={activeTask.task}
              isCompleted={completedIds.has(activeTask.idx)}
              onClose={() => setActiveTask(null)}
              onComplete={() => handleComplete(activeTask.idx)}
            />
          )}
          {showCelebration && (
            <MilestoneCelebration
              title={showCelebration.title}
              message={showCelebration.message}
              showConfetti={true}
              onContinue={() => setShowCelebration(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
