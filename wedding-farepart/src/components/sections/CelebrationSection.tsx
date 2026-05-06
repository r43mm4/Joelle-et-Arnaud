// src/components/sections/CelebrationSection.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { coupleData } from '@/data/couple';
import { formatDate } from '@/lib/utils';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

export function CelebrationSection() {
  const { events } = coupleData;
  const reception = events.find((e) => e.type === 'reception');

  if (!reception) return null;

  return (
    <section
      id="celebration"
      aria-label="Réception et célébration"
      className="section-padding bg-[var(--color-dark-soft)] relative overflow-hidden"
    >
      {/* Motif décoratif */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-kente-red), transparent)' }}
        aria-hidden
      />

      <div className="container-wedding relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p variants={fadeInUp} className="text-small-caps text-[var(--color-gold)] text-sm tracking-[0.25em] mb-4">
            {reception.label}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-section-title font-display italic font-light text-white mb-12">
            La Fête Continue
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="flex flex-col sm:flex-row items-center justify-center gap-12"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
              <Clock className="w-6 h-6 text-[var(--color-gold)]" aria-hidden />
              <p className="text-small-caps text-[var(--color-muted)] text-xs tracking-wider">Heure</p>
              <p className="font-display text-2xl text-white font-light">
                {reception.time}
              </p>
            </motion.div>

            <div className="w-px h-16 bg-[var(--color-gold)]/20 hidden sm:block" aria-hidden />

            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
              <MapPin className="w-6 h-6 text-[var(--color-gold)]" aria-hidden />
              <p className="text-small-caps text-[var(--color-muted)] text-xs tracking-wider">Lieu</p>
              <p className="font-display text-2xl text-white font-light">
                {reception.venue.name}
              </p>
              <p className="text-[var(--color-muted)] text-sm">{reception.venue.city}</p>
            </motion.div>
          </motion.div>

          {reception.dressCode && (
            <motion.div
              variants={fadeInUp}
              className="mt-12 p-6 border border-[var(--color-gold)]/20"
            >
              <p className="text-small-caps text-[var(--color-gold)] text-xs tracking-widest mb-2">
                Dress code
              </p>
              <p className="font-display italic text-white text-xl font-light">
                {reception.dressCode}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
