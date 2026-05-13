/* ═══════════════════════════════════════════════════════
   Joëlle & Arnaud — Script Final
   ═══════════════════════════════════════════════════════ */

const CONFIG = {
  eventTitle: "Mariage — Joëlle & Arnaud",
  eventDateISO: "2026-06-20",
  civilTime: "17:00",
  partyTime: "22:00",
  locationLabel: "Houa, Bandjoun, Cameroun",
  contactEmail: "Joëllearnaud2009@gmail.com",
  contactPhone: "+237655730056",
  photoShareUrl: "",
};

/* ── UTILS ─────────────────────────────────────────────── */
function pad2(n) {
  return String(n).padStart(2, "0");
}

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2400);
}

function getAddr() {
  const l1 =
    document.getElementById("addrLine1")?.textContent?.trim() ||
    "Houa, Bandjoun";
  const l2 =
    document.getElementById("addrLine2")?.textContent?.trim() ||
    "Région de l'Ouest";
  const l3 =
    document.getElementById("addrLine3")?.textContent?.trim() || "Cameroun";
  return [l1, l2, l3].filter(Boolean).join(", ");
}

function getMapsSearchUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getAddr())}`;
}

function getMapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(getAddr())}`;
}

/* ── CURSEUR CUSTOM ────────────────────────────────────── */
function initCursor() {
  const cur = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  if (!cur || !dot) return;

  // Désactivé sur touch
  if (window.matchMedia("(pointer: coarse)").matches) {
    cur.style.display = "none";
    dot.style.display = "none";
    return;
  }

  let mx = 0,
    my = 0,
    cx = 0,
    cy = 0,
    dx = 0,
    dy = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true },
  );

  const IA = "a, button, input, select, textarea, label, [role=button]";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(IA)) cur.classList.add("hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(IA)) cur.classList.remove("hover");
  });
  document.addEventListener("mousedown", () => cur.classList.add("click"));
  document.addEventListener("mouseup", () => cur.classList.remove("click"));
  document.addEventListener("mouseleave", () => {
    cur.style.opacity = "0";
    dot.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cur.style.opacity = "1";
    dot.style.opacity = "1";
  });

  (function loop() {
    cx = lerp(cx, mx, 0.13);
    cy = lerp(cy, my, 0.13);
    dx = lerp(dx, mx, 0.5);
    dy = lerp(dy, my, 0.5);
    cur.style.left = cx + "px";
    cur.style.top = cy + "px";
    dot.style.left = dx + "px";
    dot.style.top = dy + "px";
    requestAnimationFrame(loop);
  })();
}

/* ── PARTICULES CANVAS ─────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  const ctx = canvas.getContext("2d");
  let w = 0,
    h = 0,
    pts = [];

  const N = window.innerWidth < 500 ? 22 : 36;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function mkPt() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.2,
      sx: (Math.random() - 0.5) * 0.22,
      sy: -(Math.random() * 0.32 + 0.07),
      o: Math.random() * 0.38 + 0.06,
      od: (Math.random() > 0.5 ? 1 : -1) * 0.0022,
    };
  }

  function init() {
    pts = Array.from({ length: N }, mkPt);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.sx;
      p.y += p.sy;
      p.o += p.od;
      if (p.o < 0.04 || p.o > 0.55) p.od *= -1;
      if (p.y < -8) {
        p.y = h + 8;
        p.x = Math.random() * w;
      }
      if (p.x < -8 || p.x > w + 8) p.x = Math.random() * w;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,162,74,${p.o})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();
  new ResizeObserver(() => {
    resize();
  }).observe(canvas);
}

/* ── COUNTDOWN — synchrone, zéro flash ─────────────────── */
function calcCD() {
  const diff = new Date("2026-06-20T09:00:00") - new Date();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff % 864e5) / 36e5),
    m: Math.floor((diff % 36e5) / 6e4),
    s: Math.floor((diff % 6e4) / 1e3),
  };
}

function renderCD() {
  const { d, h, m, s } = calcCD();
  const map = { cdDays: d, cdHours: h, cdMins: m, cdSecs: s };
  for (const [id, val] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (!el) continue;
    const str = pad2(val);
    if (el.textContent !== str) {
      el.textContent = str;
      if (id === "cdSecs") {
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
        setTimeout(() => el.classList.remove("tick"), 180);
      }
    }
  }
}

function initCountdown() {
  renderCD(); // synchrone — premier rendu immédiat
  setInterval(renderCD, 1000);
}

/* ── NAV FLOTTANTE ─────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  let ticking = false;
  const check = () => {
    nav.classList.toggle("visible", window.scrollY > window.innerHeight * 0.6);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(check);
        ticking = true;
      }
    },
    { passive: true },
  );
  check();
}

/* ── REVEAL AU SCROLL ──────────────────────────────────── */
function initReveal() {
  const els = [...document.querySelectorAll(".reveal")];
  if (!els.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "-24px" },
  );

  els.forEach((el) => io.observe(el));
}

/* ── ICS CALENDRIER ────────────────────────────────────── */
function toICSDate(d) {
  const u = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return u.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
}

function buildICS({ title, dateISO, time, dur, loc }) {
  const s = new Date(`${dateISO}T${time}:00`);
  const e = new Date(s.getTime() + dur * 60000);
  const esc = (v) =>
    String(v)
      .replace(/[\\,;]/g, (c) => "\\" + c)
      .replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//JoelleArnaud2026//FR",
    "BEGIN:VEVENT",
    `UID:${Math.random().toString(36).slice(2)}@ja2026`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(s)}`,
    `DTEND:${toICSDate(e)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(loc)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function dlICS(name, content) {
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/calendar;charset=utf-8" }),
  );
  Object.assign(document.createElement("a"), {
    href: url,
    download: name,
  }).dispatchEvent(new MouseEvent("click"));
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function attachCal(id, opts) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    dlICS("joelle-arnaud.ics", buildICS(opts));
    toast("Événement téléchargé ✓");
  });
}

function initCalendar() {
  const base = { dateISO: CONFIG.eventDateISO, loc: CONFIG.locationLabel };
  attachCal("calendarBtn", {
    ...base,
    title: CONFIG.eventTitle,
    time: CONFIG.civilTime,
    dur: 900,
  });
  attachCal("civilCal", {
    ...base,
    title: `${CONFIG.eventTitle} — Cérémonie`,
    time: CONFIG.civilTime,
    dur: 540,
  });
  attachCal("partyCal", {
    ...base,
    title: `${CONFIG.eventTitle} — Réception`,
    time: CONFIG.partyTime,
    dur: 480,
  });
}

/* ── ITINÉRAIRE : Maps ou fiche téléchargeable ─────────── */
function initMapsSheet() {
  const menuBtn = document.getElementById("mapsMenuBtn");
  const sheet = document.getElementById("mapsSheet");
  const backdrop = document.getElementById("mapsBackdrop");
  const closeBtn = document.getElementById("mapsSheetClose");
  const openLink = document.getElementById("mapsOpenLink");
  const dlBtn = document.getElementById("mapsDownloadBtn");
  if (!menuBtn || !sheet || !backdrop) return;

  const setOpen = (open) => {
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    sheet.hidden = !open;
    backdrop.hidden = !open;
    document.body.classList.toggle("sheet-open", open);
    if (open) {
      if (openLink) openLink.href = getMapsSearchUrl();
      (openLink || closeBtn)?.focus({ preventScroll: true });
    } else {
      menuBtn.focus({ preventScroll: true });
    }
  };

  menuBtn.addEventListener("click", () => setOpen(true));
  closeBtn?.addEventListener("click", () => setOpen(false));
  backdrop.addEventListener("click", () => setOpen(false));

  openLink?.addEventListener("click", () => {
    setTimeout(() => setOpen(false), 400);
  });

  dlBtn?.addEventListener("click", () => {
    const addr = getAddr();
    const text = [
      "Mariage — Joëlle & Arnaud",
      "Date : samedi 20 juin 2026",
      "",
      "Adresse du lieu",
      addr,
      "",
      "Carte Google Maps (lieu)",
      getMapsSearchUrl(),
      "",
      "Itinéraire depuis votre position",
      getMapsDirectionsUrl(),
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), {
      href: url,
      download: "joelle-arnaud-lieu.txt",
    }).dispatchEvent(new MouseEvent("click"));
    setTimeout(() => URL.revokeObjectURL(url), 800);
    toast("Fiche téléchargée ✓");
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !sheet.hidden) setOpen(false);
  });
}

/* ── COPIE ADRESSE ─────────────────────────────────────── */
function initCopyAddr() {
  const btn = document.getElementById("copyAddrBtn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(getAddr());
      toast("Adresse copiée ✓");
    } catch {
      toast("Copie impossible — vérifiez les permissions.");
    }
  });
}

/* ── PARTAGE PHOTOS + QR CODE ──────────────────────────── */
/* Met en place le placeholder textuel si pas de lien —
   et vide le qr-grid CSS hérité de l'HTML au chargement */
function initQRBox() {
  const box = document.getElementById("qrBox");
  if (!box) return;
  const url = String(CONFIG.photoShareUrl || "").trim();
  if (!url) {
    /* Pas encore de lien : afficher un message sobre */
    box.innerHTML =
      '<p class="qr-placeholder-text">Le QR code<br>sera disponible<br>prochainement</p>';
  }
  /* Si url présent, renderQR() remplacera le contenu */
}

function renderQR(url) {
  const box = document.getElementById("qrBox");
  if (!box || !url) return;

  /* Charge qrcode.js depuis CDN uniquement si besoin */
  function generate() {
    box.innerHTML = ""; /* efface le placeholder CSS */

    const wrap = document.createElement("div");
    wrap.className = "qr-canvas-wrap";
    box.appendChild(wrap);

    QRCode.toCanvas(
      document.createElement("canvas"),
      url,
      {
        width: 200,
        margin: 1,
        color: {
          dark: "#0B1B4A",
          light: "#ffffff",
        },
      },
      (err, canvas) => {
        if (err) {
          console.error("QR error:", err);
          return;
        }
        canvas.className = "qr-canvas";
        wrap.appendChild(canvas);
      },
    );
  }

  if (window.QRCode) {
    generate();
  } else {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js";
    s.onload = generate;
    s.onerror = () =>
      console.warn("QR lib non chargée — vérifier la connexion.");
    document.head.appendChild(s);
  }
}

function initPhoto() {
  const openBtn = document.getElementById("photoShareBtn");
  const copyBtn = document.getElementById("copyPhotoShareBtn");
  const hint = document.getElementById("photoShareHint");
  const url = String(CONFIG.photoShareUrl || "").trim();

  /* Lien d'ouverture */
  if (openBtn) {
    if (url) {
      openBtn.href = url;
    } else {
      openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Lien bientôt disponible.");
      });
    }
  }

  /* Copie du lien */
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      if (!url) {
        toast("Lien pas encore configuré.");
        return;
      }
      try {
        await navigator.clipboard.writeText(url);
        toast("Lien copié ✓");
      } catch {
        toast("Copie impossible.");
      }
    });
  }

  /* Hint textuel */
  if (hint) {
    hint.textContent = url
      ? "Scannez ou cliquez pour partager vos photos."
      : "Le lien sera ajouté prochainement.";
  }

  /* Génération QR */
  if (url) renderQR(url);
}

/* ── RSVP ──────────────────────────────────────────────── */
function initRSVP() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  // Validation visuelle champs requis
  form.querySelectorAll("[required]").forEach((el) => {
    el.addEventListener("blur", () => {
      const empty = !el.value.trim();
      el.style.borderColor = empty ? "rgba(200,162,74,.5)" : "";
      el.style.boxShadow = empty ? "0 0 0 3px rgba(200,162,74,.12)" : "";
    });
    el.addEventListener("input", () => {
      el.style.borderColor = "";
      el.style.boxShadow = "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const att = String(fd.get("attendance") || "").trim();
    const msg = String(fd.get("message") || "").trim();

    if (!name || !att) {
      toast("Merci de remplir les champs obligatoires.");
      return;
    }

    const sub = encodeURIComponent(`RSVP — ${name}`);
    const body = encodeURIComponent(
      [`Nom : ${name}`, `Présence : ${att}`, msg ? `\nMessage :\n${msg}` : ""]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${encodeURIComponent(CONFIG.rsvpEmail)}?subject=${sub}&body=${body}`;
  });
}

/* ── CONTACT ───────────────────────────────────────────── */
function initContact() {
  const emailBtn = document.getElementById("contactEmailBtn");
  const phoneBtn = document.getElementById("contactPhoneBtn");
  if (emailBtn && CONFIG.contactEmail)
    emailBtn.href = `mailto:${CONFIG.contactEmail}`;
  if (phoneBtn && CONFIG.contactPhone)
    phoneBtn.href = `tel:${CONFIG.contactPhone.replace(/\s/g, "")}`;
}

/* ── SMOOTH SCROLL interne ─────────────────────────────── */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ── INIT ──────────────────────────────────────────────── */
function init() {
  // Synchrone en premier (évite flash)
  initCountdown();
  initMapsSheet();

  // Interactivité
  initCursor();
  initParticles();
  initNav();
  initReveal();
  initCalendar();
  initCopyAddr();
  initQRBox();
  initPhoto();
  initRSVP();
  initContact();
  initScroll();
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", init)
  : init();
