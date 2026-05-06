// src/components/sections/CeremonySection.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Shirt } from 'lucide-react';
import { coupleData, mainEvent } from '@/data/couple';
import { formatDate } from '@/lib/utils';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

export function CeremonySection() {
  const { families } = coupleData;

  return (
    <section
      id="ceremony"
      aria-label="Cérémonie coutumière"
      className="section-padding bg-[var(--color-ivory)]"
    >
      <div className="container-wedding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-3xl mx-auto text-center"
        >
          {/* En-tête */}
          <motion.p variants={fadeInUp} className="text-small-caps text-[var(--color-gold)] text-sm tracking-[0.25em] mb-4">
            {mainEvent.label}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-section-title font-display italic font-light text-[var(--color-dark)]">
            La Cérémonie
          </motion.h2>

          {/* Message des familles */}
          {families?.message && (
            <motion.p variants={fadeInUp} className="mt-6 text-[var(--color-earth)] font-body leading-relaxed italic">
              {families.message}
            </motion.p>
          )}

          {/* Séparateur */}
          <motion.div variants={fadeInUp} className="ornament-line my-10 text-[var(--color-gold)]">
            <span className="font-display text-xl">✦</span>
          </motion.div>

          {/* Infos pratiques */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Date & Heure */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
              <Clock className="w-6 h-6 text-[var(--color-gold)]" aria-hidden />
              <div>
                <p className="text-small-caps text-[var(--color-muted)] text-xs tracking-wider mb-1">Date</p>
                <p className="font-display text-lg text-[var(--color-dark)] capitalize">
                  {formatDate(mainEvent.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="font-body text-sm text-[var(--color-gold)] mt-1">
                  {mainEvent.time}{mainEvent.endTime ? ` – ${mainEvent.endTime}` : ''}
                </p>
              </div>
            </motion.div>

            {/* Lieu */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
              <MapPin className="w-6 h-6 text-[var(--color-gold)]" aria-hidden />
              <div>
                <p className="text-small-caps text-[var(--color-muted)] text-xs tracking-wider mb-1">Lieu</p>
                <p className="font-display text-lg text-[var(--color-dark)]">{mainEvent.venue.name}</p>
                <p className="font-body text-sm text-[var(--color-muted)] mt-1">
                  {mainEvent.venue.city}, {mainEvent.venue.region}
                </p>
                {mainEvent.venue.googleMapsUrl && (
                  <a
                    href={mainEvent.venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-[var(--color-gold)] underline underline-offset-2 hover:text-[var(--color-gold-dark)] transition-colors"
                  >
                    Voir sur la carte
                  </a>
                )}
              </div>
            </motion.div>

            {/* Dress code */}
            {mainEvent.dressCode && (
              <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
                <Shirt className="w-6 h-6 text-[var(--color-gold)]" aria-hidden />
                <div>
                  <p className="text-small-caps text-[var(--color-muted)] text-xs tracking-wider mb-1">Tenue</p>
                  <p className="font-display text-lg text-[var(--color-dark)]">Dress Code</p>
                  <p className="font-body text-sm text-[var(--color-muted)] mt-1">{mainEvent.dressCode}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Note */}
          {mainEvent.notes && (
            <motion.p variants={fadeInUp} className="mt-10 text-[var(--color-muted)] font-body text-sm italic">
              {mainEvent.notes}
            </motion.p>
          )}

          {/* Noms des familles */}
          {(families?.partner1Family || families?.partner2Family) && (
            <motion.div variants={fadeInUp} className="mt-12 pt-10 border-t border-[var(--color-border)]">
              <p className="text-small-caps text-[var(--color-muted)] text-xs tracking-wider mb-4">
                Organisé par
              </p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {families.partner1Family && (
                  <span className="font-display italic text-xl text-[var(--color-earth)]">
                    {families.partner1Family}
                  </span>
                )}
                {families.partner1Family && families.partner2Family && (
                  <span className="text-[var(--color-gold)]">&</span>
                )}
                {families.partner2Family && (
                  <span className="font-display italic text-xl text-[var(--color-earth)]">
                    {families.partner2Family}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
