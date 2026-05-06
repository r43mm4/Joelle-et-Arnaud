// src/components/sections/CountdownSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { weddingDate, coupleData } from '@/data/couple';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center gap-2"
    >
      <span className="font-display text-5xl md:text-7xl font-light text-[var(--color-gold)] tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-small-caps text-[var(--color-muted)] text-xs tracking-[0.2em]">
        {label}
      </span>
    </motion.div>
  );
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(weddingDate);
  const { partner1, partner2 } = coupleData;

  return (
    <section
      id="countdown"
      aria-label="Compte à rebours"
      className="section-padding bg-[var(--color-ivory-warm)] kente-pattern"
    >
      <div className="container-wedding text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeInUp}
            className="text-small-caps text-[var(--color-gold)] text-sm tracking-[0.25em] mb-4"
          >
            Le grand jour dans
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="text-section-title font-display italic font-light text-[var(--color-dark)] mb-12"
          >
            {isExpired
              ? `${partner1.firstName} & ${partner2.firstName} sont mariés ! 🎉`
              : 'Notre union approche'}
          </motion.h2>

          {!isExpired && (
            <motion.div
              variants={staggerContainer}
              className="flex items-center justify-center gap-8 md:gap-16"
            >
              <CountdownUnit value={days}    label="Jours" />
              <Separator />
              <CountdownUnit value={hours}   label="Heures" />
              <Separator />
              <CountdownUnit value={minutes} label="Minutes" />
              <Separator />
              <CountdownUnit value={seconds} label="Secondes" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Separator() {
  return (
    <span
      className="text-[var(--color-gold)] font-display text-3xl md:text-5xl font-light self-start mt-2"
      aria-hidden
    >
      ·
    </span>
  );
}
