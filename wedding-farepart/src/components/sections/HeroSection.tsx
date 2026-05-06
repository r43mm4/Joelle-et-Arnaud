// src/components/sections/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { coupleData, coupleNames, mainEvent } from '@/data/couple';
import { formatDateShort } from '@/lib/utils';
import { fadeInUp, fadeIn, staggerContainer, fadeInUpDelayed } from '@/lib/animations';

export function HeroSection() {
  const { partner1, partner2, social } = coupleData;

  return (
    <section
      id="hero"
      aria-label="Faire-part de mariage"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-dark)]"
    >
      {/* ── Fond : Image hero + overlay ── */}
      {coupleData.heroImage && (
        <>
          <Image
            src={coupleData.heroImage}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-dark)]/60 via-transparent to-[var(--color-dark)]/80" />
        </>
      )}

      {/* ── Motif Kente en overlay ── */}
      <div className="absolute inset-0 kente-pattern pointer-events-none" />

      {/* ── Contenu principal ── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Accroche */}
        <motion.p
          variants={fadeInUp}
          className="text-small-caps text-[var(--color-gold)] mb-6 tracking-[0.25em] text-sm"
        >
          Avec joie & amour, nous vous convions à
        </motion.p>

        {/* Prénom 1 */}
        <motion.h1
          variants={fadeIn}
          className="text-hero text-white font-display italic font-light leading-none"
        >
          {partner1.firstName}
        </motion.h1>

        {/* Séparateur & */}
        <motion.div
          variants={fadeInUpDelayed(0.2)}
          className="my-4 flex items-center justify-center gap-6"
        >
          <div className="h-px w-20 bg-[var(--color-gold)] opacity-60" />
          <span className="text-[var(--color-gold)] font-display italic text-4xl">&</span>
          <div className="h-px w-20 bg-[var(--color-gold)] opacity-60" />
        </motion.div>

        {/* Prénom 2 */}
        <motion.p
          variants={fadeIn}
          className="text-hero text-white font-display italic font-light leading-none"
          aria-hidden // h1 contient déjà les deux prénoms sémantiquement via le contexte
        >
          {partner2.firstName}
        </motion.p>

        {/* Date et lieu */}
        <motion.div
          variants={fadeInUpDelayed(0.4)}
          className="mt-12 space-y-3"
        >
          <p className="text-small-caps text-[var(--color-gold-light)] text-lg tracking-widest">
            {formatDateShort(mainEvent.date)}
          </p>
          <p className="text-[var(--color-muted)] font-body text-base tracking-[0.15em] uppercase">
            {mainEvent.venue.name} · {mainEvent.venue.city}
          </p>
        </motion.div>

        {/* Hashtag */}
        {social?.hashtag && (
          <motion.p
            variants={fadeInUpDelayed(0.6)}
            className="mt-8 text-[var(--color-gold)]/50 font-body text-sm tracking-wider"
          >
            {social.hashtag}
          </motion.p>
        )}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[var(--color-muted)] text-xs tracking-[0.2em] uppercase font-body">
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-[var(--color-gold)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
