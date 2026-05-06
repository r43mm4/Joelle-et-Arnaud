// src/components/sections/RsvpSection.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';
import { coupleData } from '@/data/couple';
import { formatDateShort } from '@/lib/utils';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

export function RsvpSection() {
  const { rsvp } = coupleData;

  if (!rsvp.enabled) return null;

  const whatsappUrl = rsvp.whatsappNumber
    ? `https://wa.me/${rsvp.whatsappNumber.replace(/\D/g, '')}?text=Bonjour%2C+je+confirme+ma+pr%C3%A9sence+%C3%A0+votre+mariage+%F0%9F%8E%89`
    : null;

  return (
    <section
      id="rsvp"
      aria-label="Confirmer sa présence"
      className="section-padding bg-[var(--color-dark)] relative overflow-hidden"
    >
      {/* Fond décoratif */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, var(--color-gold) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-kente-red) 0%, transparent 50%)',
        }}
        aria-hidden
      />

      <div className="container-wedding relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p variants={fadeInUp} className="text-small-caps text-[var(--color-gold)] text-sm tracking-[0.25em] mb-4">
            Votre présence
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-section-title font-display italic font-light text-white mb-6">
            Serez-vous des nôtres ?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[var(--color-muted)] font-body leading-relaxed mb-2">
            {rsvp.message}
          </motion.p>
          {rsvp.deadline && (
            <motion.p variants={fadeInUp} className="text-[var(--color-gold)]/70 font-body text-sm mb-12">
              Date limite : {formatDateShort(rsvp.deadline)}
            </motion.p>
          )}

          {/* Boutons de confirmation */}
          <motion.div variants={staggerContainer} className="flex flex-col sm:flex-row gap-4 justify-center">
            {whatsappUrl && (
              <motion.a
                variants={fadeInUp}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-dark)] font-body font-medium tracking-wider text-sm uppercase rounded-none transition-all hover:bg-[var(--color-gold-light)]"
                style={{ boxShadow: 'var(--shadow-gold)' }}
              >
                <MessageCircle className="w-4 h-4" aria-hidden />
                Confirmer via WhatsApp
              </motion.a>
            )}

            {rsvp.email && (
              <motion.a
                variants={fadeInUp}
                href={`mailto:${rsvp.email}?subject=Confirmation%20de%20pr%C3%A9sence%20%E2%80%94%20Mariage%20Jo%C3%ABlle%20%26%20Arnaud`}
                className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-gold)]/40 text-[var(--color-gold)] font-body font-medium tracking-wider text-sm uppercase rounded-none transition-all hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5"
              >
                <Mail className="w-4 h-4" aria-hidden />
                Confirmer par Email
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
