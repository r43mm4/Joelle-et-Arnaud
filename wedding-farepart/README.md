# 🎋 Joelle & Arnaud — Faire-Part Mariage Coutumier
**20 Juin 2026 · Houa, Bandjoun · Région de l'Ouest, Cameroun**

---

## Vue d'ensemble

Site one-page de faire-part de mariage coutumier Bamiléké, style traditionnel-chic.
Design premium, mobile-first, animations légères au scroll.

**Stack :** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion

---

## Architecture du projet

```
wedding-farepart/
├── .cursor/
│   └── rules                    # ← Règles Cursor (lire en premier)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Metadata SEO, fonts
│   │   ├── page.tsx             # Assembly des sections
│   │   └── globals.css          # Design tokens CSS
│   ├── components/
│   │   ├── sections/            # 8 sections de la page
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CountdownSection.tsx
│   │   │   ├── StorySection.tsx
│   │   │   ├── CeremonySection.tsx
│   │   │   ├── CelebrationSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── RsvpSection.tsx
│   │   │   └── ClosingSection.tsx
│   │   ├── ui/                  # Composants atomiques
│   │   │   ├── OrnamentDivider.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── Button.tsx
│   │   └── layout/
│   │       └── FloatingNav.tsx
│   ├── data/
│   │   └── couple.ts            # ⚠️ SOURCE DE VÉRITÉ
│   ├── hooks/
│   │   ├── useCountdown.ts
│   │   └── useScrollProgress.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   └── types/
│       └── index.ts             # CoupleData, EventInfo, etc.
├── public/
│   └── images/                  # Photos à placer ici
└── ...configs
```

---

## Ordre des sections

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | `HeroSection` | `#hero` | Annonce plein écran, prénoms, date |
| 2 | `CountdownSection` | `#countdown` | Compte à rebours dynamique |
| 3 | `StorySection` | `#story` | Timeline de l'histoire du couple |
| 4 | `CeremonySection` | `#ceremony` | Infos cérémonie coutumière |
| 5 | `CelebrationSection` | `#celebration` | Infos réception/fête |
| 6 | `GallerySection` | `#gallery` | Photos du couple |
| 7 | `RsvpSection` | `#rsvp` | WhatsApp + Email confirmation |
| 8 | `ClosingSection` | `#closing` | Citation finale |

---

## Plan de développement par étapes

### Étape 1 — Setup (30 min)
```bash
pnpm create next-app@latest wedding-farepart \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd wedding-farepart
pnpm add framer-motion lucide-react clsx tailwind-merge
```
- Copier les fichiers de ce projet
- Remplacer `tailwind.config.ts` et `globals.css`
- Ajouter `.cursor/rules`

### Étape 2 — Données (15 min)
- Éditer `src/data/couple.ts` avec les vraies informations
- Ajouter les photos dans `public/images/`
- Vérifier les types dans `src/types/index.ts`

### Étape 3 — Hero + Layout (1h)
- Finaliser `HeroSection.tsx` avec la vraie photo hero
- Finaliser `FloatingNav.tsx`
- Tester sur mobile (DevTools)

### Étape 4 — Sections cœur (2h)
- `CountdownSection` → tester le compte à rebours
- `StorySection` → compléter les milestones dans `couple.ts`
- `CeremonySection` → vérifier les infos lieu/heure

### Étape 5 — Sections secondaires (1h30)
- `CelebrationSection` → infos réception
- `GallerySection` → ajouter vraies photos
- `RsvpSection` → configurer WhatsApp link

### Étape 6 — Polish (1h)
- Animations au scroll (vérifier sur mobile)
- Typographie et espacement
- Cohérence couleurs
- Test accessibilité (tab navigation, contrast)

### Étape 7 — SEO & Deploy (30 min)
- Générer `og-image.jpg` (1200×630)
- Vérifier metadata dans `layout.tsx`
- Deploy sur Vercel : `vercel --prod`

**Durée totale estimée : 6-8h**

---

## Composants UI à créer (Étape 5-6)

```
src/components/ui/
├── OrnamentDivider.tsx   # Ligne décorative avec symbole central
├── SectionHeader.tsx     # En-tête de section standardisé (label + titre)
└── Button.tsx            # Bouton gold + variante outline
```

### OrnamentDivider
```tsx
<OrnamentDivider symbol="✦" />
// Rendu : ──── ✦ ────
```

### SectionHeader
```tsx
<SectionHeader
  label="Notre histoire"
  title="Joelle & Arnaud"
  subtitle="Texte optionnel..."
  theme="dark" // ou "light"
/>
```

---

## Modèle de données — Réutilisation multi-clients

Pour un **nouveau client**, il suffit de :
1. Dupliquer `src/data/couple.ts`
2. Modifier les valeurs (prénoms, dates, lieux, style...)
3. Changer `theme.culturalOrigin` et `theme.style`
4. Mettre à jour les couleurs dans `globals.css` si palette différente

Le type `CoupleData` dans `src/types/index.ts` supporte :
- N'importe quel nombre d'événements (`events[]`)
- Toutes cultures (champ `culturalOrigin` libre)
- RSVP multi-canal (WhatsApp, email, formulaire)
- Photos optionnelles (graceful fallback)
- Citations et familles optionnelles

---

## Conventions de nommage

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Fichiers composants | PascalCase | `HeroSection.tsx` |
| Fichiers hooks | camelCase avec `use` | `useCountdown.ts` |
| Fichiers utils | camelCase | `utils.ts` |
| Variables CSS | `--color-[nom]` | `--color-gold` |
| Props interface | `[Composant]Props` | `HeroSectionProps` |
| Event handlers | `handle[Action]` | `handleScrollNext` |
| CSS custom classes | `.w-[nom]` | `.w-ornament` |

---

## Bonnes pratiques SEO

- `<title>` unique et descriptif (< 60 chars)
- `<meta description>` (120-160 chars)
- `og:image` à 1200×630px
- `robots: noindex` par défaut (faire-part privé)
- Supprimer `noindex` si on veut partage public
- Structured Data `schema.org/Event` (optionnel)

## Bonnes pratiques accessibilité

- Chaque `<section>` a un `aria-label`
- `<h1>` unique, hiérarchie H1→H2→H3
- `alt=""` sur images décoratives
- `alt` descriptif sur images informatives
- Contraste ≥ 4.5:1 (WCAG AA)
- Focus visible sur tous les interactifs
- `lang="fr"` sur `<html>`
- `<nav aria-label>` sur la navigation

---

## Images requises

Placer dans `public/images/` :

| Fichier | Dimensions | Usage |
|---------|-----------|-------|
| `hero.jpg` | 1920×1080 min | Fond Hero section |
| `joelle.jpg` | 600×600 | Photo portrait Joelle |
| `arnaud.jpg` | 600×600 | Photo portrait Arnaud |
| `gallery-1.jpg` à `gallery-6.jpg` | 800×800 | Galerie |
| `og-image.jpg` | 1200×630 | Partage réseaux sociaux |

---

## Déploiement Vercel

```bash
# 1. Installer Vercel CLI
pnpm add -g vercel

# 2. Login
vercel login

# 3. Déploiement
vercel --prod

# URL obtenue : https://joelle-et-arnaud.vercel.app
```

**Variables d'environnement :** Aucune requise pour la version de base.

---

## Contact & Support

Pour adapter ce template à un nouveau client :
- Modifier uniquement `src/data/couple.ts`
- Mettre à jour les images dans `public/images/`
- Ajuster les couleurs dans `globals.css` si besoin
