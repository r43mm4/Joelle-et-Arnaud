// src/components/layout/FloatingNav.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useScrolledPast } from '@/hooks/useScrollProgress';
import { coupleNames } from '@/data/couple';

const NAV_LINKS = [
  { href: '#story',       label: 'Histoire' },
  { href: '#ceremony',    label: 'Cérémonie' },
  { href: '#celebration', label: 'Réception' },
  { href: '#rsvp',        label: 'RSVP' },
];

export function FloatingNav() {
  const isVisible = useScrolledPast(window?.innerHeight ?? 600);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label="Navigation principale"
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md"
          style={{
            background: 'rgba(26, 18, 9, 0.85)',
            borderBottom: '1px solid rgba(201, 169, 110, 0.15)',
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo / Prénoms */}
            <a
              href="#top"
              className="font-display italic text-[var(--color-gold)] text-lg hover:text-[var(--color-gold-light)] transition-colors"
            >
              {coupleNames}
            </a>

            {/* Liens */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-small-caps text-[var(--color-muted)] text-xs tracking-[0.15em] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA RSVP mobile */}
            <a
              href="#rsvp"
              className="md:hidden text-small-caps text-[var(--color-gold)] text-xs tracking-wider border border-[var(--color-gold)]/40 px-4 py-2 hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              RSVP
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
