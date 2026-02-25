/**
 * main.js — Portfolio Script
 * ─────────────────────────────────────────────────────────────────
 * Responsibilities:
 *  1. Typed terminal animation
 *  2. Navigation: scroll-spy, hamburger menu, back-to-top
 *  3. Render Tech Stack cards from data
 *  4. Render Project accordion cards from project-data.js
 *  5. Scroll-triggered entrance animations (AOS-lite)
 *  6. Animated counter for stats
 *  7. Contact form validation & submission
 *  8. Photo fallback handling
 * ─────────────────────────────────────────────────────────────────
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   1. DATA — TECH STACK
═══════════════════════════════════════════════════════════ */

const STACK = [
  {
    icon: "◈",
    name: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript ES6+", "React 18", "Vite", "Context API", "React Router"],
  },
  {
    icon: "◇",
    name: "Styling",
    skills: ["TailwindCSS", "CSS Grid", "Flexbox", "CSS Variables", "Responsive Design", "Animations"],
  },
  {
    icon: "⬡",
    name: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "WebSockets", "JWT Auth", "Middleware"],
  },
  {
    icon: "◉",
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Prisma ORM", "SQL Queries"],
  },
  {
    icon: "◈",
    name: "DevOps & Tools",
    skills: ["Docker", "Git & GitHub", "GitHub Actions", "Vercel", "Railway", "Linux CLI"],
  },
  {
    icon: "◇",
    name: "Learning Now",
    skills: ["TypeScript", "Next.js 14", "AWS EC2/S3", "Kubernetes", "System Design"],
  },
];

/* ═══════════════════════════════════════════════════════════
   2. TERMINAL ANIMATION
═══════════════════════════════════════════════════════════ */

const TERMINAL_SEQUENCE = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "Akuegbo Iheanyi Ejeagba — Full-Stack Developer", cls: "t-success" },
  { type: "gap" },
  { type: "prompt", text: "cat skills.json | jq .frontend" },
  { type: "output", text: '[ "HTML", "CSS", "JavaScript", "React" ]', cls: "t-info" },
  { type: "gap" },
  { type: "prompt", text: "cat skills.json | jq .backend" },
  { type: "output", text: '[ "Node.js", "Express", "PostgreSQL" ]', cls: "t-info" },
  { type: "gap" },
  { type: "prompt", text: "git log --oneline -3" },
  { type: "output", text: "a1b2c3d ✓ feat: ship inventory API" },
  { type: "output", text: "d4e5f6g ✓ fix: optimise DB queries -40ms" },
  { type: "output", text: "h7i8j9k ✓ chore: Dockerise for prod" },
  { type: "gap" },
  { type: "prompt", text: "echo $STATUS" },
  { type: "output", text: "Available for opportunities ✓", cls: "t-success" },
];

function runTerminal() {
  const container = document.getElementById("terminalOutput");
  if (!container) return;

  let lineIndex = 0;
  let charIndex = 0;
  let currentEl = null;

  function nextLine() {
    if (lineIndex >= TERMINAL_SEQUENCE.length) {
      // Show final cursor
      const cursor = document.createElement("p");
      cursor.innerHTML = `<span class="t-prompt">$</span> <span class="t-cursor">▋</span>`;
      container.appendChild(cursor);
      return;
    }

    const item = TERMINAL_SEQUENCE[lineIndex];

    if (item.type === "gap") {
      container.appendChild(document.createElement("br"));
      lineIndex++;
      setTimeout(nextLine, 80);
      return;
    }

    const p = document.createElement("p");

    if (item.type === "prompt") {
      p.innerHTML = `<span class="t-prompt">$</span><span class="t-cmd"> </span>`;
      container.appendChild(p);
      currentEl = p.querySelector(".t-cmd");
      typeChars(item.text, currentEl, () => {
        lineIndex++;
        setTimeout(nextLine, 120);
      });
    } else {
      p.className = `t-output ${item.cls || ""}`;
      container.appendChild(p);
      currentEl = p;
      typeChars(item.text, currentEl, () => {
        lineIndex++;
        setTimeout(nextLine, 60);
      });
    }

    container.scrollTop = container.scrollHeight;
  }

  function typeChars(text, el, onDone) {
    if (charIndex >= text.length) {
      charIndex = 0;
      onDone();
      return;
    }
    el.textContent += text[charIndex];
    charIndex++;
    container.scrollTop = container.scrollHeight;
    setTimeout(() => typeChars(text, el, onDone), charIndex === 1 ? 60 : 28);
  }

  setTimeout(nextLine, 600);
}

/* ═══════════════════════════════════════════════════════════
   3. NAV: HAMBURGER + SCROLL SPY + BACK TO TOP
═══════════════════════════════════════════════════════════ */

function initNav() {
  const nav          = document.getElementById("nav");
  const hamburger    = document.getElementById("navHamburger");
  const overlay      = document.getElementById("navOverlay");
  const backToTop    = document.getElementById("backToTop");
  const navLinks     = document.querySelectorAll(".nav__link[data-section]");
  const sections     = document.querySelectorAll("section[id]");

  // Scroll effects
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;

      // Nav border
      nav.classList.toggle("scrolled", y > 60);

      // Back to top
      backToTop.classList.toggle("visible", y > 500);

      // Scroll spy
      let current = "";
      sections.forEach(sec => {
        if (y >= sec.offsetTop - 140) current = sec.id;
      });
      navLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.section === current);
      });

      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  // Back to top click
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hamburger toggle
  function openMenu() {
    hamburger.classList.add("open");
    overlay.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  hamburger?.addEventListener("click", () => {
    hamburger.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Build mobile menu links inside overlay
  if (overlay) {
    const mobileItems = [
      { href: "#about",    label: "About" },
      { href: "#stack",    label: "Tech Stack" },
      { href: "#projects", label: "Projects" },
      { href: "#contact",  label: "Contact" },
      { href: "assets/resume.pdf", label: "Resume ↓", download: true, accent: true },
    ];

    mobileItems.forEach(item => {
      const a = document.createElement("a");
      a.href = item.href;
      if (item.download) a.setAttribute("download", "");
      a.textContent = item.label;
      a.style.cssText = `
        font-size: 1.5rem;
        font-family: var(--font-display);
        font-weight: 800;
        color: ${item.accent ? "var(--c-accent)" : "var(--c-text)"};
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--c-border);
        letter-spacing: -0.02em;
        transition: color 0.15s;
      `;
      a.addEventListener("click", closeMenu);
      overlay.appendChild(a);
    });
  }

  // ESC to close
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ═══════════════════════════════════════════════════════════
   4. RENDER TECH STACK
═══════════════════════════════════════════════════════════ */

function renderStack() {
  const container = document.getElementById("stackCategories");
  if (!container) return;

  container.innerHTML = STACK.map((cat, i) => `
    <div class="stack__cat" data-aos data-aos-delay="${i * 60}">
      <div class="stack__cat-header">
        <span class="stack__cat-icon" aria-hidden="true">${cat.icon}</span>
        <span class="stack__cat-name">${cat.name}</span>
      </div>
      <div class="stack__skills" role="list" aria-label="${cat.name} skills">
        ${cat.skills.map(s => `<span class="stack__skill" role="listitem">${s}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* ═══════════════════════════════════════════════════════════
   5. RENDER PROJECTS
═══════════════════════════════════════════════════════════ */

function renderProjects() {
  const container = document.getElementById("projectsList");
  if (!container || typeof PROJECTS === "undefined") return;

  container.innerHTML = PROJECTS.map((p, i) => `
    <article class="proj-card" id="proj-${i}" role="listitem" data-aos>
      <button
        class="proj-card__trigger"
        aria-expanded="false"
        aria-controls="proj-body-${i}"
        onclick="toggleProject(${i})"
      >
        <div class="proj-card__meta">
          <div class="proj-card__num">// ${p.id}</div>
          <h3 class="proj-card__name">${p.title}</h3>
          <p class="proj-card__desc">${p.description}</p>
          <div class="proj-card__tags" aria-label="Technologies used">
            ${p.tags.map(t => `<span class="proj-card__tag">${t}</span>`).join("")}
          </div>
        </div>
        <span class="proj-card__chevron" aria-hidden="true">▾</span>
      </button>

      <div class="proj-card__body" id="proj-body-${i}" role="region" aria-labelledby="proj-${i}-heading">
        <div class="proj-card__body-inner">
          <div class="proj-card__content">
            <div class="proj-detail">
              <h4>The Problem</h4>
              <p>${p.problem}</p>
            </div>
            <div class="proj-detail">
              <h4>My Solution</h4>
              <p>${p.solution}</p>
            </div>
            <div class="proj-detail">
              <h4>Key Highlights</h4>
              <ul>
                ${p.highlights.map(h => `<li>${h}</li>`).join("")}
              </ul>
            </div>
            <div class="proj-card__actions">
              <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
                View Code ↗
              </a>
              ${p.live
                ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Live Demo ↗</a>`
                : `<span class="btn btn--ghost" style="opacity:0.4;cursor:not-allowed;">No Live Demo</span>`
              }
            </div>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

/* global toggle — called from inline onclick */
function toggleProject(index) {
  const card = document.getElementById(`proj-${index}`);
  const body = document.getElementById(`proj-body-${index}`);
  const btn  = card?.querySelector(".proj-card__trigger");
  if (!card || !body) return;

  const isOpen = card.classList.contains("open");

  // Close all
  document.querySelectorAll(".proj-card").forEach(c => c.classList.remove("open"));
  document.querySelectorAll(".proj-card__trigger").forEach(b => b.setAttribute("aria-expanded", "false"));

  // Toggle clicked
  if (!isOpen) {
    card.classList.add("open");
    btn?.setAttribute("aria-expanded", "true");
    // Smooth scroll to card after expansion delay
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
  }
}

/* ═══════════════════════════════════════════════════════════
   6. SCROLL REVEAL (AOS-lite)
═══════════════════════════════════════════════════════════ */

function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll("[data-aos]").forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   7. ANIMATED COUNTERS
═══════════════════════════════════════════════════════════ */

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.round(increment * step);
        el.textContent = current;
        if (step >= steps) {
          el.textContent = target;
          clearInterval(timer);
        }
      }, duration / steps);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   8. CONTACT FORM
═══════════════════════════════════════════════════════════ */

function initContactForm() {
  const form       = document.getElementById("contactForm");
  const submitBtn  = document.getElementById("submitBtn");
  const success    = document.getElementById("formSuccess");

  if (!form) return;

  const fields = {
    name:    { el: document.getElementById("name"),    error: document.getElementById("nameError"),    msg: "Please enter your name." },
    email:   { el: document.getElementById("email"),   error: document.getElementById("emailError"),   msg: "Please enter a valid email." },
    subject: { el: document.getElementById("subject"), error: document.getElementById("subjectError"), msg: "Please enter a subject." },
    message: { el: document.getElementById("message"), error: document.getElementById("messageError"), msg: "Please enter a message (10+ characters)." },
  };

  // Live validation — clear error on input
  Object.values(fields).forEach(({ el, error }) => {
    el?.addEventListener("input", () => {
      el.classList.remove("error");
      if (error) error.textContent = "";
    });
  });

  function validate() {
    let valid = true;

    if (!fields.name.el?.value.trim()) {
      showError(fields.name); valid = false;
    }

    const emailVal = fields.email.el?.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailOk) {
      showError(fields.email); valid = false;
    }

    if (!fields.subject.el?.value.trim()) {
      showError(fields.subject); valid = false;
    }

    if (!fields.message.el?.value.trim() || fields.message.el.value.trim().length < 10) {
      showError(fields.message); valid = false;
    }

    return valid;
  }

  function showError(field) {
    field.el?.classList.add("error");
    if (field.error) field.error.textContent = field.msg;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      /**
       * TO CONNECT THIS FORM:
       * 1. Go to https://formspree.io and create a free account
       * 2. Create a form, get your endpoint URL
       * 3. Replace the URL below with your endpoint
       * 4. Remove the simulate block below
       */

      // ─────────────────────────────────────────────────────────────────

      // ── REAL SUBMISSION (uncomment when ready) ──
      const res = await fetch("https://formspree.io/f/xvzbdkvw", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      // ───────────────────────────────────────────

      // Success
      form.reset();
      success.classList.add("visible");
      submitBtn.style.display = "none";
      setTimeout(() => {
        success.classList.remove("visible");
        submitBtn.style.display = "";
      }, 6000);

    } catch (err) {
      console.error("Form error:", err);
      alert("Something went wrong. Please email me directly at alex@example.com");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   9. PHOTO FALLBACK
═══════════════════════════════════════════════════════════ */

function initPhotoFallbacks() {
  const heroImg    = document.getElementById("profileImg");
  const heroFb     = document.getElementById("photoFallback");
  const aboutImg   = document.getElementById("aboutPhoto");
  const aboutFb    = document.getElementById("aboutFallback");

  function handleError(img, fallback) {
    if (!img || !fallback) return;
    img.style.display = "none";
    fallback.style.display = "flex";
  }

  heroImg?.addEventListener("error",  () => handleError(heroImg,  heroFb));
  aboutImg?.addEventListener("error", () => handleError(aboutImg, aboutFb));

  // Also trigger if src is empty/placeholder
  [{ img: heroImg, fb: heroFb }, { img: aboutImg, fb: aboutFb }].forEach(({ img, fb }) => {
    if (img && (!img.src || img.src === window.location.href)) {
      handleError(img, fb);
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   10. FOOTER YEAR
═══════════════════════════════════════════════════════════ */

function initFooter() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════════════════
   INIT — Boot everything in order
═══════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initFooter();
  initPhotoFallbacks();
  initNav();
  renderStack();
  renderProjects();

  // AOS runs after render so dynamically-created elements are included
  requestAnimationFrame(() => {
    initAOS();
    initCounters();
  });

  initContactForm();
  runTerminal();
});