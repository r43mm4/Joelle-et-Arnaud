// src/app/page.tsx
// One-page assembly — ordre des sections figé, ne pas modifier sans mise à jour du .cursor/rules

import { HeroSection }       from '@/components/sections/HeroSection';
import { CountdownSection }  from '@/components/sections/CountdownSection';
import { StorySection }      from '@/components/sections/StorySection';
import { CeremonySection }   from '@/components/sections/CeremonySection';
import { CelebrationSection} from '@/components/sections/CelebrationSection';
import { GallerySection }    from '@/components/sections/GallerySection';
import { RsvpSection }       from '@/components/sections/RsvpSection';
import { ClosingSection }    from '@/components/sections/ClosingSection';
import { FloatingNav }       from '@/components/layout/FloatingNav';

export default function WeddingPage() {
  return (
    <main id="top" className="relative">
      {/* Navigation flottante (apparaît après scroll du Hero) */}
      <FloatingNav />

      {/* 1. Annonce principale */}
      <HeroSection />

      {/* 2. Compte à rebours */}
      <CountdownSection />

      {/* 3. Histoire du couple */}
      <StorySection />

      {/* 4. Cérémonie coutumière */}
      <CeremonySection />

      {/* 5. Réception / Fête */}
      <CelebrationSection />

      {/* 6. Galerie photos */}
      <GallerySection />

      {/* 7. RSVP */}
      <RsvpSection />

      {/* 8. Citation finale */}
      <ClosingSection />
    </main>
  );
}
