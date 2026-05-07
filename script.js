/* ═══════════════════════════════════════════════════════════
   Joëlle & Arnaud — Script Premium v2
   ═══════════════════════════════════════════════════════════ */

/* ── CONFIGURATION ───────────────────────────────────────── */
const CONFIG = {
  eventTitle:       "Mariage — Joëlle & Arnaud",
  eventDateISO:     "2026-06-20",
  civilTime:        "09:00",
  partyTime:        "19:00",
  locationLabel:    "Houa, Bandjoun, Cameroun",
  rsvpEmail:        "joelle.arnaud.2026@gmail.com",
  rsvpDeadline:     "1er juin 2026",
  photoShareUrl:    "",
  contactEmail:     "contact@example.com",
  contactPhone:     "+237 000 000 000",
  hashtag:          "#JoelleEtArnaud2026",
};

/* ── UTILS ───────────────────────────────────────────────── */
function pad2(n) { return String(n).padStart(2, "0"); }

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2400);
}

function getAddressString() {
  const l1 = document.getElementById("addrLine1")?.textContent?.trim() || "Houa, Bandjoun";
  const l2 = document.getElementById("addrLine2")?.textContent?.trim() || "Région de l'Ouest";
  const l3 = document.getElementById("addrLine3")?.textContent?.trim() || "Cameroun";
  return [l1, l2, l3].filter(Boolean).join(", ");
}

/* ── CURSEUR CUSTOM ──────────────────────────────────────── */
function initCursor() {
  const cursor    = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");
  if (!cursor || !cursorDot) return;

  // Détection touch — désactiver le curseur custom
  if (window.matchMedia("(pointer: coarse)").matches) {
    cursor.style.display = "none";
    cursorDot.style.display = "none";
    document.documentElement.style.cursor = "auto";
    document.querySelectorAll("a, button, select").forEach(el => el.style.cursor = "auto");
    return;
  }

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  let dotX = 0, dotY = 0;
  let rafId;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Hover state sur éléments interactifs
  const interactives = "a, button, [role=button], input, select, textarea, label";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(interactives)) cursor.classList.add("hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(interactives)) cursor.classList.remove("hover");
  });

  // Click state
  document.addEventListener("mousedown", () => cursor.classList.add("click"));
  document.addEventListener("mouseup",   () => cursor.classList.remove("click"));

  // Smooth follow avec lerp
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateCursor() {
    curX = lerp(curX, mouseX, 0.14);
    curY = lerp(curY, mouseY, 0.14);
    dotX = lerp(dotX, mouseX, 0.55);
    dotY = lerp(dotY, mouseY, 0.55);

    cursor.style.left    = curX + "px";
    cursor.style.top     = curY + "px";
    cursorDot.style.left = dotX + "px";
    cursorDot.style.top  = dotY + "px";

    rafId = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Masquer quand souris quitte la fenêtre
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorDot.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursorDot.style.opacity = "1";
  });
}

/* ── CANVAS PARTICULES ───────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  const PARTICLES = 38;
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      size: Math.random() * 1.4 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.4 + 0.1),
      opacity: Math.random() * 0.5 + 0.1,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
    };
  }

  function initParticlesArr() {
    particles = Array.from({ length: PARTICLES }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += p.opacityDir;

      if (p.opacity <= 0.05 || p.opacity >= 0.6) p.opacityDir *= -1;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5 || p.x > W + 5) p.x = Math.random() * W;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  initParticlesArr();
  draw();

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
}

/* ── COUNTDOWN — calcul synchrone (zéro flash) ───────────── */
function calcCountdown() {
  const target = new Date("2026-06-20T09:00:00");
  const diff   = target - new Date();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true };
  return {
    d:       Math.floor(diff / 864e5),
    h:       Math.floor((diff % 864e5) / 36e5),
    m:       Math.floor((diff % 36e5) / 6e4),
    s:       Math.floor((diff % 6e4) / 1e3),
    expired: false,
  };
}

function renderCountdown(prev) {
  const { d, h, m, s, expired } = calcCountdown();
  const ids = { cdDays: d, cdHours: h, cdMins: m, cdSecs: s };

  for (const [id, val] of Object.entries(ids)) {
    const el = document.getElementById(id);
    if (!el) continue;
    const str = pad2(val);
    if (el.textContent !== str) {
      el.textContent = str;
      // Micro-animation tick sur les secondes uniquement
      if (id === "cdSecs") {
        el.classList.remove("tick");
        void el.offsetWidth; // reflow pour reset
        el.classList.add("tick");
        setTimeout(() => el.classList.remove("tick"), 200);
      }
    }
  }

  if (expired) {
    const title = document.querySelector(".cd-title");
    if (title) title.textContent = "Joëlle & Arnaud sont mariés ! 🎉";
  }
}

function initCountdown() {
  renderCountdown(null); // Premier render synchrone = zéro flash
  setInterval(renderCountdown, 1000);
}

/* ── NAVIGATION FLOTTANTE ────────────────────────────────── */
function initNav() {
  const nav        = document.getElementById("nav");
  const stickyDate = document.getElementById("stickyDate");
  if (!nav) return;

  const heroHeight = () => window.innerHeight * 0.65;

  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;

      // Nav flottante
      if (y > heroHeight()) nav.classList.add("visible");
      else                   nav.classList.remove("visible");

      // Sticky date banner (apparaît après le hero, disparaît quand la nav est là)
      if (stickyDate) {
        if (y > window.innerHeight * 0.3 && y <= heroHeight()) stickyDate.classList.add("show");
        else stickyDate.classList.remove("show");
      }

      lastScroll = y;
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // check initial
}

/* ── REVEAL AU SCROLL ────────────────────────────────────── */
function initReveal() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach(el => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { root: null, threshold: 0.1, rootMargin: "-40px" }
  );

  els.forEach(el => io.observe(el));
}

/* ── TIMELINE ANIMÉE (ligne SVG progress) ────────────────── */
function initTimeline() {
  const wrap     = document.querySelector(".timeline-wrap");
  const progress = document.getElementById("tlProgress");
  if (!wrap || !progress) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    progress.setAttribute("y2", "100%");
    return;
  }

  const items = wrap.querySelectorAll(".tl-item");
  const dots  = wrap.querySelectorAll(".tl-dot");
  const TOTAL = items.length;

  function updateProgress() {
    const wrapRect = wrap.getBoundingClientRect();
    const svgH     = wrapRect.height;
    if (svgH <= 0) return;

    // Calcule quelle fraction de la timeline est visible
    const viewH    = window.innerHeight;
    const entered  = Math.max(0, viewH * 0.7 - wrapRect.top);
    const fraction = Math.min(1, Math.max(0, entered / svgH));
    const pct      = Math.round(fraction * 100);

    progress.setAttribute("y2", pct + "%");

    // Allume les dots au passage
    dots.forEach((dot, i) => {
      const dotRect = dot.getBoundingClientRect();
      const dotMid  = dotRect.top + dotRect.height / 2;
      if (dotMid < viewH * 0.75) {
        dot.style.boxShadow = "0 0 0 10px rgba(201,169,110,.18), 0 0 20px rgba(201,169,110,.2)";
        dot.style.borderColor = "var(--gold)";
      } else {
        dot.style.boxShadow = "0 0 0 7px rgba(201,169,110,.09)";
      }
    });
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

/* ── ACCORDÉON ───────────────────────────────────────────── */
function initAccordion() {
  const root = document.getElementById("storyAccordion");
  if (!root) return;

  root.addEventListener("click", e => {
    const btn = e.target.closest(".acc-btn");
    if (!btn) return;

    const isOpen = btn.getAttribute("aria-expanded") === "true";

    // Ferme tous les autres
    root.querySelectorAll(".acc-btn[aria-expanded='true']").forEach(b => {
      if (b !== btn) b.setAttribute("aria-expanded", "false");
    });

    btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
  });
}

/* ── ICS CALENDRIER ──────────────────────────────────────── */
function toICSDate(date) {
  const y  = date.getUTCFullYear();
  const m  = pad2(date.getUTCMonth() + 1);
  const d  = pad2(date.getUTCDate());
  const hh = pad2(date.getUTCHours());
  const mm = pad2(date.getUTCMinutes());
  return `${y}${m}${d}T${hh}${mm}00Z`;
}

function escapeICS(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function buildICS({ title, dateISO, time, durationMinutes, location }) {
  const start = new Date(`${dateISO}T${time}:00`);
  const startUTC = new Date(start.getTime() - start.getTimezoneOffset() * 60_000);
  const endUTC   = new Date(startUTC.getTime() + durationMinutes * 60_000);
  const uid      = Math.random().toString(16).slice(2) + "@joelle-arnaud";
  const now      = new Date();

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Joelle-Arnaud-2026//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(now)}`,
    `DTSTART:${toICSDate(startUTC)}`,
    `DTEND:${toICSDate(endUTC)}`,
    `SUMMARY:${escapeICS(title)}`,
    `LOCATION:${escapeICS(location)}`,
    `DESCRIPTION:${escapeICS("Faire-part numérique : " + window.location.href)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(filename, content) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function attachCalendar(el, opts) {
  if (!el) return;
  el.addEventListener("click", e => {
    e.preventDefault();
    downloadICS("joelle-arnaud.ics", buildICS(opts));
    toast("Événement téléchargé ✓");
  });
}

function initCalendar() {
  const civil = {
    title:           `${CONFIG.eventTitle} — Cérémonie coutumière`,
    dateISO:         CONFIG.eventDateISO,
    time:            CONFIG.civilTime,
    durationMinutes: 600,
    location:        CONFIG.locationLabel,
  };
  const party = {
    title:           `${CONFIG.eventTitle} — Réception`,
    dateISO:         CONFIG.eventDateISO,
    time:            CONFIG.partyTime,
    durationMinutes: 480,
    location:        CONFIG.locationLabel,
  };
  const full = {
    title:           CONFIG.eventTitle,
    dateISO:         CONFIG.eventDateISO,
    time:            CONFIG.civilTime,
    durationMinutes: 900,
    location:        CONFIG.locationLabel,
  };

  attachCalendar(document.getElementById("calendarBtn"),       full);
  attachCalendar(document.getElementById("civilCalendarLink"), civil);
  attachCalendar(document.getElementById("partyCalendarLink"), party);
  attachCalendar(document.getElementById("civilCalendarLink2"),civil);
  attachCalendar(document.getElementById("partyCalendarLink2"),party);
}

/* ── MAPS ────────────────────────────────────────────────── */
function initMaps() {
  const btn = document.getElementById("mapsBtn");
  if (!btn) return;
  btn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getAddressString())}`;
}

/* ── COPIE ADRESSE ───────────────────────────────────────── */
function initCopyAddress() {
  const btn = document.getElementById("copyAddrBtn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(getAddressString());
      toast("Adresse copiée ✓");
    } catch {
      toast("Copie impossible — vérifiez les permissions.");
    }
  });
}

/* ── PARTAGE PHOTOS ──────────────────────────────────────── */
function initPhotoShare() {
  const openBtn  = document.getElementById("photoShareBtn");
  const copyBtn  = document.getElementById("copyPhotoShareBtn");
  const hint     = document.getElementById("photoShareHint");
  const url      = String(CONFIG.photoShareUrl || "").trim();

  if (openBtn) {
    if (url) {
      openBtn.href = url;
    } else {
      openBtn.addEventListener("click", e => {
        e.preventDefault();
        toast("Le lien de partage sera ajouté prochainement.");
      });
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      if (!url) { toast("Le lien de partage n'est pas encore disponible."); return; }
      try {
        await navigator.clipboard.writeText(url);
        toast("Lien copié ✓");
      } catch {
        toast("Copie impossible — vérifiez les permissions.");
      }
    });
  }

  if (hint) {
    hint.textContent = url
      ? "Scannez ou cliquez pour partager vos photos."
      : "Le lien définitif sera ajouté prochainement.";
  }
}

/* ── RSVP ────────────────────────────────────────────────── */
function initRSVP() {
  // Scroll vers le form depuis le bouton hero
  const heroBtn = document.getElementById("rsvpBtn");
  const infos   = document.getElementById("infos");
  if (heroBtn && infos) {
    heroBtn.addEventListener("click", () => {
      infos.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const first = document.querySelector("#rsvpForm input, #rsvpForm select");
        if (first) first.focus();
      }, 600);
    });
  }

  // Soumission du formulaire
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data       = new FormData(form);
    const name       = String(data.get("name")       || "").trim();
    const attendance = String(data.get("attendance") || "").trim();
    const message    = String(data.get("message")    || "").trim();

    if (!name || !attendance) {
      toast("Merci de remplir les champs obligatoires.");
      return;
    }

    const subject = encodeURIComponent(`RSVP — ${name || "Invité(e)"}`);
    const body    = encodeURIComponent(
      [
        `Nom : ${name || "—"}`,
        `Présence : ${attendance || "—"}`,
        message ? `\nMessage :\n${message}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );

    window.location.href = `mailto:${encodeURIComponent(CONFIG.rsvpEmail)}?subject=${subject}&body=${body}`;
  });

  // Validation visuelle en temps réel
  form.querySelectorAll("input[required], select[required]").forEach(el => {
    el.addEventListener("blur", () => {
      if (!el.value.trim()) {
        el.style.borderColor = "rgba(200, 80, 80, 0.5)";
        el.style.boxShadow   = "0 0 0 3px rgba(200, 80, 80, 0.1)";
      } else {
        el.style.borderColor = "";
        el.style.boxShadow   = "";
      }
    });
    el.addEventListener("input", () => {
      el.style.borderColor = "";
      el.style.boxShadow   = "";
    });
  });
}

/* ── SMOOTH SCROLL NAV LINKS ─────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id     = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ── FOOTER ANNÉE ────────────────────────────────────────── */
function initFooter() {
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();

  const deadline = document.getElementById("rsvpDeadlineLabel");
  if (deadline) deadline.textContent = CONFIG.rsvpDeadline;

  const emailBtn = document.getElementById("contactEmailBtn");
  if (emailBtn) emailBtn.href = `mailto:${CONFIG.contactEmail}`;

  const phoneBtn = document.getElementById("contactPhoneBtn");
  if (phoneBtn) phoneBtn.href = `tel:${CONFIG.contactPhone.replace(/\s/g, "")}`;
}

/* ── INIT GLOBAL ─────────────────────────────────────────── */
function init() {
  // Synchrone en premier (évite tout flash)
  initCountdown();
  initFooter();
  initMaps();

  // DOM-dépendant
  initCursor();
  initParticles();
  initNav();
  initReveal();
  initTimeline();
  initAccordion();
  initCalendar();
  initCopyAddress();
  initPhotoShare();
  initRSVP();
  initSmoothScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
