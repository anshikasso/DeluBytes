import { motion } from 'framer-motion';
import SkillTag from './SkillTag';
import { Brain, Code, Wrench, Layers, Sparkles } from 'lucide-react';

const CATEGORY_ICONS = {
  Skills: Brain,
  Languages: Code,
  Tools: Wrench,
  Frameworks: Layers,
  Extracurricular: Sparkles,
  Activities: Sparkles,
};

const FALLBACK_SKILLS = {
  Skills: ['Problem Solving', 'Communication', 'Adaptability'],
  Languages: ['JavaScript', 'Python', 'SQL'],
  Tools: ['Git', 'VS Code'],
  Frameworks: ['React', 'Node.js'],
  Extracurricular: [],
};

export default function SkillsSection({ isVisible, skillsData }) {
  if (!isVisible) return null;

  const data = skillsData && Object.keys(skillsData).length > 0 ? skillsData : FALLBACK_SKILLS;

  return (
    <motion.section
      id="skills-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="section-padding"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            Skill Analysis
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ marginTop: '12px' }}>
            Based on your resume and profile, here are your identified competencies
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-10">
          {Object.entries(data).map(([category, skills], catIndex) => {
            const Icon = CATEGORY_ICONS[category] || Brain;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * catIndex }}
                className="rounded-2xl p-6 sm:p-8 glass-card"
              >
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--card-border)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-[14px]">
                  {skills && skills.length > 0 ? (
                    skills.map((skill, idx) => (
                      <SkillTag
                        key={`${skill}-${idx}`}
                        skill={typeof skill === 'string' ? skill : String(skill)}
                        index={idx}
                      />
                    ))
                  ) : (
                    <span className="text-[var(--text-secondary)] text-sm">No skills identified in this category</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
