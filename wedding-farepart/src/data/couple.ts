// src/data/couple.ts
// ⚠️  SOURCE DE VÉRITÉ — Ne modifier QUE ce fichier pour changer les informations du couple
// Pour un nouveau client, dupliquer ce fichier et ajuster les valeurs

import type { CoupleData } from '@/types';

export const coupleData: CoupleData = {
  // ─── IDENTITÉ ────────────────────────────────────────────────────────────
  partner1: {
    firstName: 'Joelle',
    lastName: 'Kamdem',       // À ajuster selon réalité
    nickname: 'Jo',
    photo: '/images/joelle.jpg',
    bio: 'Lumineuse et passionnée, Joelle illumine chaque pièce qu\'elle traverse.',
  },

  partner2: {
    firstName: 'Arnaud',
    lastName: 'Talla',         // À ajuster selon réalité
    nickname: 'Arno',
    photo: '/images/arnaud.jpg',
    bio: 'Chaleureux et déterminé, Arnaud a su conquérir le cœur de Joelle avec patience et sincérité.',
  },

  coupleHashtag: '#JoelleEtArnaud2026',

  // ─── ÉVÉNEMENTS ──────────────────────────────────────────────────────────
  events: [
    {
      type: 'coutumier',
      label: 'Cérémonie Coutumière',
      date: '2026-06-20',
      time: '09h00',
      endTime: '18h00',
      venue: {
        name: 'Houa, Bandjoun',
        address: 'Quartier Houa',
        city: 'Bandjoun',
        region: 'Région de l\'Ouest',
        country: 'Cameroun',
        googleMapsUrl: 'https://maps.google.com/?q=Bandjoun,Cameroon',
        coordinates: {
          lat: 5.3783,
          lng: 10.4073,
        },
      },
      dressCode: 'Tenue traditionnelle Bamiléké ou tenue chic',
      notes: 'Veuillez arriver à l\'heure. La cérémonie débutera ponctuellement.',
    },
    {
      type: 'reception',
      label: 'Réception & Célébration',
      date: '2026-06-20',
      time: '19h00',
      venue: {
        name: 'À préciser',
        address: 'Bandjoun',
        city: 'Bandjoun',
        region: 'Région de l\'Ouest',
        country: 'Cameroun',
      },
      dressCode: 'Tenue de soirée chic',
    },
  ],

  // ─── HISTOIRE ────────────────────────────────────────────────────────────
  story: {
    introduction:
      'Deux âmes, un destin. Ce que le cœur ressent, aucun mot ne peut pleinement l\'exprimer — mais nous essayons quand même.',

    milestones: [
      {
        id: 'rencontre',
        year: '2020',
        title: 'La Rencontre',
        description:
          'Un regard, un sourire, et quelque chose d\'indéfinissable s\'est mis en place. C\'est comme si l\'univers avait tout orchestré.',
        emoji: '✨',
      },
      {
        id: 'premier-voyage',
        year: '2021',
        title: 'Notre Premier Voyage',
        description:
          'Ensemble pour la première fois loin de chez eux. Chaque moment partagé a confirmé ce qu\'ils savaient déjà au fond.',
        emoji: '✈️',
      },
      {
        id: 'fiancailles',
        year: '2024',
        title: 'La Demande',
        description:
          'Arnaud a posé la question que Joelle attendait sans le savoir. Une soirée qui restera gravée dans leurs mémoires pour toujours.',
        emoji: '💍',
      },
      {
        id: 'mariage',
        year: '2026',
        title: 'Le Grand Jour',
        description:
          'Aujourd\'hui, devant leurs familles et amis, Joelle et Arnaud unissent leurs destins selon la tradition Bamiléké.',
        emoji: '🎋',
      },
    ],
  },

  // ─── RSVP ────────────────────────────────────────────────────────────────
  rsvp: {
    enabled: true,
    deadline: '2026-06-01',
    whatsappNumber: '+237600000000', // À remplacer
    email: 'joelle.arnaud.2026@gmail.com', // À remplacer
    maxGuests: 2,
    message:
      'Merci de confirmer votre présence avant le 1er juin 2026. Votre réponse nous aide à organiser au mieux cette journée mémorable.',
  },

  // ─── MÉDIAS ──────────────────────────────────────────────────────────────
  heroImage: '/images/hero.jpg',
  galleryImages: [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
    '/images/gallery-6.jpg',
  ],
  ogImage: '/images/og-image.jpg',

  // ─── THÈME ───────────────────────────────────────────────────────────────
  theme: {
    primaryColor: '#C9A96E',
    accentColor: '#8B1A1A',
    style: 'traditionnel',
    culturalOrigin: 'Bamiléké',
  },

  // ─── SEO ─────────────────────────────────────────────────────────────────
  seo: {
    title: 'Joelle & Arnaud — Mariage Coutumier Bamiléké · 20 Juin 2026',
    description:
      'Avec joie et amour, nous vous convions à célébrer notre union coutumière à Houa, Bandjoun, le 20 juin 2026.',
    locale: 'fr_FR',
  },

  // ─── RÉSEAUX SOCIAUX ─────────────────────────────────────────────────────
  social: {
    hashtag: '#JoelleEtArnaud2026',
  },

  // ─── FAMILLES ────────────────────────────────────────────────────────────
  families: {
    partner1Family: 'La Famille Kamdem',
    partner2Family: 'La Famille Talla',
    message:
      'Les deux familles, unies dans la joie, vous accueillent à bras ouverts pour célébrer cette alliance bénie.',
  },

  // ─── CITATION FINALE ─────────────────────────────────────────────────────
  closingQuote: {
    text: 'L\'amour ne se possède pas, il se célèbre.',
    author: 'Proverbe Bamiléké',
  },
};

// Helpers dérivés — pratiques dans les composants
export const mainEvent = coupleData.events.find((e) => e.type === 'coutumier')!;
export const receptionEvent = coupleData.events.find((e) => e.type === 'reception');
export const weddingDate = new Date(mainEvent.date + 'T' + mainEvent.time.replace('h', ':'));
export const coupleNames = `${coupleData.partner1.firstName} & ${coupleData.partner2.firstName}`;
