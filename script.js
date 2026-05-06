const DEFAULTS = {
  eventTitle: "Mariage — Joëlle & Arnaud",
  eventDateISO: "2026-09-12",
  eventStartTime: "15:30",
  durationMinutes: 60,
  locationLabel: "Montréal, CANADA",
  addressLines: ["Mairie de …", "1 rue …", "75000 …"],
  rsvpEmailTo: "contact@example.com",
  rsvpDeadlineLabel: "15 août 2026",
  photoShareUrl: "",
};

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toICSDateUTC(date) {
  const y = date.getUTCFullYear();
  const m = pad2(date.getUTCMonth() + 1);
  const d = pad2(date.getUTCDate());
  const hh = pad2(date.getUTCHours());
  const mm = pad2(date.getUTCMinutes());
  const ss = pad2(date.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

function buildIcs({ title, startLocal, durationMinutes, location, description }) {
  const dtStart = new Date(startLocal.getTime() - startLocal.getTimezoneOffset() * 60_000);
  const dtEnd = new Date(dtStart.getTime() + durationMinutes * 60_000);
  const uid = `${Math.random().toString(16).slice(2)}@wedding-farepart`;
  const now = new Date();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding-farepart//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDateUTC(now)}`,
    `DTSTART:${toICSDateUTC(dtStart)}`,
    `DTEND:${toICSDateUTC(dtEnd)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function escapeIcs(s) {
  return String(s)
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => el.classList.remove("show"), 2200);
}

function getAddressString() {
  const a1 = document.getElementById("addrLine1")?.textContent?.trim() || DEFAULTS.addressLines[0];
  const a2 = document.getElementById("addrLine2")?.textContent?.trim() || DEFAULTS.addressLines[1];
  const a3 = document.getElementById("addrLine3")?.textContent?.trim() || DEFAULTS.addressLines[2];
  return [a1, a2, a3].filter(Boolean).join(", ");
}

function setupMapsLink() {
  const maps = document.getElementById("mapsBtn");
  if (!maps) return;
  const query = encodeURIComponent(getAddressString());
  maps.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function setupCopyAddress() {
  const btn = document.getElementById("copyAddrBtn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const text = getAddressString();
    try {
      await navigator.clipboard.writeText(text);
      toast("Adresse copiée.");
    } catch {
      toast("Copie impossible (permissions navigateur).");
    }
  });
}

function setupPhotoShare() {
  const btn = document.getElementById("photoShareBtn");
  const copyBtn = document.getElementById("copyPhotoShareBtn");
  const hint = document.getElementById("photoShareHint");
  const url = String(DEFAULTS.photoShareUrl || "").trim();

  if (btn) {
    btn.href = url || "#";
    if (!url) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Lien de partage non défini pour l’instant.");
      });
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      if (!url) {
        toast("Lien de partage non défini pour l’instant.");
        return;
      }
      try {
        await navigator.clipboard.writeText(url);
        toast("Lien copié.");
      } catch {
        toast("Copie impossible (permissions navigateur).");
      }
    });
  }

  if (hint) {
    hint.textContent = url ? "Scannez ou cliquez pour partager vos photos." : "Le lien/QR final sera ajouté ensuite.";
  }
}

function setupRSVP() {
  const btn = document.getElementById("rsvpBtn");
  const form = document.getElementById("rsvpForm");
  if (btn && form) {
    btn.addEventListener("click", () => {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      form.querySelector("input,select,textarea")?.focus();
    });
  }

  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const attendance = String(data.get("attendance") || "").trim();
    const message = String(data.get("message") || "").trim();
    const to = DEFAULTS.rsvpEmailTo;

    const subject = encodeURIComponent(`RSVP — ${name || "Invité(e)"}`);
    const body = encodeURIComponent(
      [
        `Nom: ${name || "-"}`,
        `Présence: ${attendance || "-"}`,
        message ? "" : "",
        message ? "Message:" : "",
        message || "",
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${body}`;
  });
}

function setupCalendar() {
  const btn = document.getElementById("calendarBtn");
  const civilLink = document.getElementById("civilCalendarLink");
  const partyLink = document.getElementById("partyCalendarLink");
  const civilLink2 = document.getElementById("civilCalendarLink2");
  const partyLink2 = document.getElementById("partyCalendarLink2");

  function attach(el, { title, dateISO, time, durationMinutes, location }) {
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const startLocal = new Date(`${dateISO}T${time}:00`);
      const ics = buildIcs({
        title,
        startLocal,
        durationMinutes,
        location,
        description: `Infos: ${window.location.href}`,
      });
      downloadText("joelle-arnaud.ics", ics);
    });
  }

  attach(btn, {
    title: DEFAULTS.eventTitle,
    dateISO: DEFAULTS.eventDateISO,
    time: DEFAULTS.eventStartTime,
    durationMinutes: DEFAULTS.durationMinutes,
    location: DEFAULTS.locationLabel,
  });

  attach(civilLink, {
    title: `${DEFAULTS.eventTitle} — Union civile`,
    dateISO: DEFAULTS.eventDateISO,
    time: DEFAULTS.eventStartTime,
    durationMinutes: DEFAULTS.durationMinutes,
    location: DEFAULTS.locationLabel,
  });

  attach(partyLink, {
    title: `${DEFAULTS.eventTitle} — Réception`,
    dateISO: DEFAULTS.eventDateISO,
    time: "18:30",
    durationMinutes: 270,
    location: "Salle …",
  });

  attach(civilLink2, {
    title: `${DEFAULTS.eventTitle} — Union civile`,
    dateISO: DEFAULTS.eventDateISO,
    time: DEFAULTS.eventStartTime,
    durationMinutes: DEFAULTS.durationMinutes,
    location: DEFAULTS.locationLabel,
  });

  attach(partyLink2, {
    title: `${DEFAULTS.eventTitle} — Réception`,
    dateISO: DEFAULTS.eventDateISO,
    time: "18:30",
    durationMinutes: 270,
    location: "Salle …",
  });
}

function setupReveal() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (els.length === 0) return;

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduce) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { root: null, threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}

function setupAccordion() {
  const root = document.getElementById("storyAccordion");
  if (!root) return;

  root.addEventListener("click", (e) => {
    const btn = e.target?.closest?.(".accItem");
    if (!btn) return;
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
  });
}

function hydrateLabels() {
  const year = new Date().getFullYear();
  const footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = String(year);

  const deadline = document.getElementById("rsvpDeadlineLabel");
  if (deadline) deadline.textContent = DEFAULTS.rsvpDeadlineLabel;

  const civilDate2 = document.getElementById("civilDateLabel2");
  if (civilDate2) civilDate2.textContent = document.getElementById("civilDateLabel")?.textContent || "12 septembre 2026";
  const civilTime2 = document.getElementById("civilTimeLabel2");
  if (civilTime2) civilTime2.textContent = document.getElementById("civilTimeLabel")?.textContent || "15:30";

  const partyDate2 = document.getElementById("partyDateLabel2");
  if (partyDate2) partyDate2.textContent = document.getElementById("partyDateLabel")?.textContent || "12 septembre 2026";
  const partyTime2 = document.getElementById("partyTimeLabel2");
  if (partyTime2) partyTime2.textContent = document.getElementById("partyTimeLabel")?.textContent || "18:30";
  const partyPlace2 = document.getElementById("partyPlaceLabel2");
  if (partyPlace2) partyPlace2.textContent = document.getElementById("partyPlaceLabel")?.textContent || "Salle …";

  setupMapsLink();
}

hydrateLabels();
setupRSVP();
setupCalendar();
setupCopyAddress();
setupPhotoShare();
setupReveal();
setupAccordion();

