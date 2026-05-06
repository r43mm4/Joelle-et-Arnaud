// src/components/sections/StorySection.tsx
'use client';

import { motion } from 'framer-motion';
import { coupleData } from '@/data/couple';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, viewportConfig } from '@/lib/animations';

export function StorySection() {
  const { story, partner1, partner2 } = coupleData;

  return (
    <section
      id="story"
      aria-label="Notre histoire"
      className="section-padding bg-[var(--color-dark)] relative overflow-hidden"
    >
      {/* Ornement décoratif */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, var(--color-gold), transparent)' }}
        aria-hidden
      />

      <div className="container-wedding">
        {/* En-tête */}
        <motion.div
          className="text-center mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p variants={fadeInUp} className="text-small-caps text-[var(--color-gold)] text-sm tracking-[0.25em] mb-4">
            Notre histoire
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-section-title font-display italic font-light text-white">
            {partner1.firstName} & {partner2.firstName}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-6 text-[var(--color-muted)] font-body max-w-2xl mx-auto leading-relaxed">
            {story.introduction}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne centrale */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)' }}
            aria-hidden
          />

          <div className="space-y-16 md:space-y-24">
            {story.milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  variants={isLeft ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Contenu */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <p className="text-small-caps text-[var(--color-gold)] text-xs tracking-[0.2em] mb-2">
                      {milestone.year}
                    </p>
                    <h3 className="font-display italic text-2xl md:text-3xl text-white font-light mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-[var(--color-muted)] font-body text-sm leading-relaxed max-w-sm mx-auto md:mx-0 md:ml-auto">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Point central */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-full border border-[var(--color-gold)] flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'var(--color-dark-soft)' }}
                    aria-hidden
                  >
                    {milestone.emoji ?? '✦'}
                  </div>

                  {/* Espace opposé (desktop) */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
