// src/components/sections/ClosingSection.tsx
'use client';

import { motion } from 'framer-motion';
import { coupleData, coupleNames } from '@/data/couple';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

export function ClosingSection() {
  const { closingQuote, social } = coupleData;

  return (
    <section
      id="closing"
      aria-label="Message final"
      className="section-padding bg-[var(--color-ivory-warm)] relative"
    >
      <div className="container-wedding">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Ornement */}
          <motion.div variants={fadeInUp} className="mb-10" aria-hidden>
            <span className="text-[var(--color-gold)] text-4xl font-display">✦</span>
          </motion.div>

          {/* Quote */}
          {closingQuote && (
            <motion.blockquote variants={fadeInUp} className="mb-10">
              <p className="font-display italic text-2xl md:text-3xl font-light text-[var(--color-dark)] leading-relaxed">
                &ldquo;{closingQuote.text}&rdquo;
              </p>
              {closingQuote.author && (
                <footer className="mt-4">
                  <cite className="text-small-caps text-[var(--color-muted)] text-xs tracking-widest not-italic">
                    — {closingQuote.author}
                  </cite>
                </footer>
              )}
            </motion.blockquote>
          )}

          {/* Noms */}
          <motion.p variants={fadeInUp} className="font-display italic text-4xl text-[var(--color-gold)] font-light">
            {coupleNames}
          </motion.p>

          {/* Hashtag */}
          {social?.hashtag && (
            <motion.p variants={fadeInUp} className="mt-6 text-[var(--color-muted)] font-body text-sm tracking-wider">
              {social.hashtag}
            </motion.p>
          )}

          {/* Lien retour en haut */}
          <motion.div variants={fadeInUp} className="mt-14">
            <a
              href="#top"
              className="text-small-caps text-[var(--color-gold)] text-xs tracking-[0.2em] hover:text-[var(--color-gold-dark)] transition-colors"
            >
              ↑ Revenir en haut
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
