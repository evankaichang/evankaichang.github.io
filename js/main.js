/* ==========================================================================
   main.js — renders the site from the data in js/projects.js.
   You shouldn't need to edit this file to add a project.
   ========================================================================== */

(function () {
  "use strict";

  /* --- Small helpers ----------------------------------------------------- */

  const $ = (sel) => document.querySelector(sel);

  // Escape anything that came out of projects.js before it touches innerHTML.
  const esc = (str) =>
    String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const list = (v) => (Array.isArray(v) ? v : []);

  /* --- Theme ------------------------------------------------------------- */

  const toggle = $("#theme-toggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    toggle.textContent = theme === "dark" ? "☀" : "☾";
    try { localStorage.setItem("theme", theme); } catch (e) { /* private mode */ }
  }

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  toggle.addEventListener("click", function () {
    applyTheme(
      document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
  });

  /* --- Hero + footer ----------------------------------------------------- */

  const cfg = typeof siteConfig === "object" && siteConfig ? siteConfig : {};

  document.title = (cfg.name || "Portfolio") + " — Projects";
  $("#hero-role").textContent = cfg.role || "";
  $("#hero-name").textContent = cfg.name || "";
  $("#hero-tagline").textContent = cfg.tagline || "";

  const links = [
    cfg.email && { label: "Email", href: "mailto:" + cfg.email },
    cfg.resumeUrl && { label: "Resume", href: cfg.resumeUrl },
    cfg.linkedinUrl && { label: "LinkedIn", href: cfg.linkedinUrl },
    cfg.githubUrl && { label: "GitHub", href: cfg.githubUrl },
  ].filter(Boolean);

  $("#hero-links").innerHTML = links
    .map(function (l) {
      const ext = /^https?:/.test(l.href)
        ? ' target="_blank" rel="noopener"'
        : "";
      return '<a href="' + esc(l.href) + '"' + ext + ">" + esc(l.label) + "</a>";
    })
    .join("");

  $("#footer-text").innerHTML =
    esc(cfg.name || "") +
    " &middot; " +
    new Date().getFullYear() +
    (cfg.email
      ? ' &middot; <a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + "</a>"
      : "");

  /* --- Data -------------------------------------------------------------- */

  const all = (typeof projects !== "undefined" ? list(projects) : []).filter(
    function (p) { return p && p.title; }
  );

  const grid = $("#grid");
  let activeTag = "All";

  /* --- Filters ----------------------------------------------------------- */

  const tags = ["All"];
  all.forEach(function (p) {
    list(p.tags).forEach(function (t) {
      if (tags.indexOf(t) === -1) tags.push(t);
    });
  });

  const filtersEl = $("#filters");
  if (tags.length > 1) {
    filtersEl.innerHTML = tags
      .map(function (t) {
        return (
          '<button class="filter" type="button" aria-pressed="' +
          (t === activeTag) +
          '" data-tag="' + esc(t) + '">' + esc(t) + "</button>"
        );
      })
      .join("");

    filtersEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      activeTag = btn.dataset.tag;
      filtersEl.querySelectorAll(".filter").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.tag === activeTag));
      });
      renderGrid();
    });
  }

  /* --- Cards ------------------------------------------------------------- */

  function cover(p) {
    const img = list(p.images)[0];
    if (!img) return '<div class="card-media-empty">Photos coming soon</div>';
    return (
      '<img src="' + esc(img.src) + '" alt="' +
      esc(img.caption || p.title) + '" loading="lazy">'
    );
  }

  function cardHTML(p, index) {
    const badge =
      p.status === "in-progress" ? '<span class="badge">In progress</span>' : "";
    const meta = [p.role, p.year].filter(Boolean).join(" · ");

    return (
      '<button class="card" type="button" data-index="' + index + '">' +
        '<div class="card-media">' + cover(p) + badge + "</div>" +
        '<div class="card-body">' +
          (meta ? '<span class="card-role">' + esc(meta) + "</span>" : "") +
          '<h3 class="card-title">' + esc(p.title) + "</h3>" +
          (p.summary || p.subtitle
            ? '<p class="card-summary">' + esc(p.summary || p.subtitle) + "</p>"
            : "") +
          (list(p.tags).length
            ? '<div class="tags">' +
              list(p.tags).map(function (t) {
                return '<span class="tag">' + esc(t) + "</span>";
              }).join("") +
              "</div>"
            : "") +
        "</div>" +
      "</button>"
    );
  }

  function renderGrid() {
    const shown = all
      .map(function (p, i) { return { p: p, i: i }; })
      .filter(function (x) {
        return activeTag === "All" || list(x.p.tags).indexOf(activeTag) !== -1;
      });

    grid.innerHTML = shown.length
      ? shown.map(function (x) { return cardHTML(x.p, x.i); }).join("")
      : '<p class="empty-state">No projects with that tag yet.</p>';
  }

  renderGrid();

  /* --- Detail modal ------------------------------------------------------ */

  const modal = $("#modal");
  const modalBody = $("#modal-body");
  let current = null;   // project being shown
  let slide = 0;        // index of the visible gallery image
  let lastFocused = null;

  function detailHTML(p) {
    const imgs = list(p.images);
    const meta = [p.role, p.year].filter(Boolean).join(" · ");

    let html = "";
    if (meta) html += '<p class="detail-role">' + esc(meta) + "</p>";
    html += '<h2 class="detail-title" id="modal-title">' + esc(p.title) + "</h2>";
    if (p.subtitle) html += '<p class="detail-subtitle">' + esc(p.subtitle) + "</p>";
    if (p.summary) html += '<p class="detail-summary">' + esc(p.summary) + "</p>";

    if (imgs.length) {
      html +=
        '<div class="gallery">' +
          '<div class="gallery-main">' +
            '<img id="gallery-img" src="' + esc(imgs[0].src) + '" alt="' +
              esc(imgs[0].caption || p.title) + '">' +
          "</div>" +
          '<p class="gallery-caption" id="gallery-caption">' +
            esc(imgs[0].caption || "") +
          "</p>" +
          (imgs.length > 1
            ? '<div class="thumbs" id="thumbs">' +
              imgs.map(function (im, i) {
                return (
                  '<button class="thumb" type="button" data-slide="' + i +
                  '" aria-current="' + (i === 0) + '" aria-label="Photo ' + (i + 1) + '">' +
                  '<img src="' + esc(im.src) + '" alt="" loading="lazy"></button>'
                );
              }).join("") +
              "</div>"
            : "") +
        "</div>";
    }

    const sections = list(p.sections).filter(function (s) {
      return s && list(s.items).length;
    });

    if (sections.length) {
      html +=
        '<div class="detail-sections">' +
        sections.map(function (s) {
          return (
            "<div><h3>" + esc(s.heading || "") + "</h3><ul>" +
            list(s.items).map(function (it) {
              return "<li>" + esc(it) + "</li>";
            }).join("") +
            "</ul></div>"
          );
        }).join("") +
        "</div>";
    }

    if (list(p.tags).length) {
      html +=
        '<div class="detail-tags">' +
        list(p.tags).map(function (t) {
          return '<span class="tag">' + esc(t) + "</span>";
        }).join("") +
        "</div>";
    }

    return html;
  }

  function showSlide(i) {
    const imgs = list(current && current.images);
    if (!imgs.length) return;
    slide = (i + imgs.length) % imgs.length;

    const img = $("#gallery-img");
    const cap = $("#gallery-caption");
    if (img) {
      img.src = imgs[slide].src;
      img.alt = imgs[slide].caption || current.title;
    }
    if (cap) cap.textContent = imgs[slide].caption || "";

    const thumbs = document.querySelectorAll("#thumbs .thumb");
    thumbs.forEach(function (t) {
      t.setAttribute("aria-current", String(Number(t.dataset.slide) === slide));
    });
  }

  function openProject(index) {
    current = all[index];
    if (!current) return;
    slide = 0;
    lastFocused = document.activeElement;

    modalBody.innerHTML = detailHTML(current);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-panel").scrollTop = 0;
    $(".modal-close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    modalBody.innerHTML = "";
    current = null;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    if (card) openProject(Number(card.dataset.index));
  });

  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { closeModal(); return; }
    const thumb = e.target.closest(".thumb");
    if (thumb) showSlide(Number(thumb.dataset.slide));
  });

  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowRight") showSlide(slide + 1);
    else if (e.key === "ArrowLeft") showSlide(slide - 1);
  });
})();
