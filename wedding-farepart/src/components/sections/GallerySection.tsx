// src/components/sections/GallerySection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { coupleData } from '@/data/couple';
import { fadeInUp, scaleIn, staggerContainer, viewportConfig } from '@/lib/animations';

export function GallerySection() {
  const { galleryImages, partner1, partner2 } = coupleData;

  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <section
      id="gallery"
      aria-label="Galerie photos"
      className="section-padding bg-[var(--color-ivory)]"
    >
      <div className="container-wedding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <p className="text-small-caps text-[var(--color-gold)] text-sm tracking-[0.25em] mb-4">
              Nos moments
            </p>
            <h2 className="text-section-title font-display italic font-light text-[var(--color-dark)]">
              Galerie
            </h2>
          </motion.div>

          {/* Grille masonry-like */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {galleryImages.map((src, index) => (
              <motion.div
                key={src}
                variants={scaleIn}
                className={`relative overflow-hidden bg-[var(--color-ivory-warm)] ${
                  index === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''
                }`}
                style={{
                  aspectRatio: index === 0 ? '4/5' : '1/1',
                }}
              >
                <Image
                  src={src}
                  alt={`Photo de ${partner1.firstName} et ${partner2.firstName}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-[var(--color-gold)]/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
