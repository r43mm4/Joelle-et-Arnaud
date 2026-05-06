// src/types/index.ts
// Modèle de données réutilisable pour tout site de faire-part

export interface Person {
  firstName: string;
  lastName: string;
  nickname?: string;
  title?: string; // "Dr.", "Ing.", etc.
  photo?: string; // path vers l'image
  bio?: string;   // courte description pour la section Story
}

export interface EventInfo {
  type: 'ceremony' | 'reception' | 'coutumier' | 'religieux' | 'civil';
  label: string;       // "Cérémonie Coutumière", "Réception", etc.
  date: string;        // ISO 8601: "2026-06-20"
  time: string;        // "10h00"
  endTime?: string;    // "18h00"
  venue: {
    name: string;      // "Chefferie de Bandjoun"
    address: string;
    city: string;
    region?: string;
    country?: string;
    googleMapsUrl?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  dressCode?: string;
  notes?: string;      // Instructions particulières
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  emoji?: string;
  photo?: string;
}

export interface RsvpConfig {
  enabled: boolean;
  deadline: string;         // ISO 8601
  formUrl?: string;         // Lien externe (Google Form, Tally, etc.)
  whatsappNumber?: string;  // Pour RSVP par WhatsApp
  email?: string;
  maxGuests?: number;       // Limite par invitation
  message?: string;         // Message d'intro du formulaire
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  hashtag?: string;         // "#JoelleEtArnaud2026"
}

export interface CoupleData {
  // Identité
  partner1: Person;
  partner2: Person;
  coupleHashtag: string;

  // Événements (peut en avoir plusieurs)
  events: EventInfo[];

  // Histoire
  story: {
    introduction: string;   // Citation ou texte d'intro
    milestones: StoryMilestone[];
  };

  // RSVP
  rsvp: RsvpConfig;

  // Médias
  heroImage?: string;
  galleryImages?: string[];
  ogImage?: string;

  // Identité visuelle
  theme: {
    primaryColor: string;   // ex: "#C9A96E"
    accentColor: string;
    style: 'traditionnel' | 'moderne' | 'mixte' | 'nature' | 'luxe';
    culturalOrigin?: string; // "Bamiléké", "Yoruba", "Wolof", etc.
  };

  // SEO
  seo: {
    title: string;
    description: string;
    locale: string;         // "fr_FR"
  };

  // Réseaux sociaux
  social?: SocialLinks;

  // Informations famille (pour certains styles coutumiers)
  families?: {
    partner1Family?: string; // "Famille Tchinda"
    partner2Family?: string; // "Famille Kenfack"
    message?: string;
  };

  // Quote finale
  closingQuote?: {
    text: string;
    author?: string;
  };
}
