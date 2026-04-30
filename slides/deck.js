/* Slide-to-slide deck navigation.
   Fetches /slides/ at load, parses the visible deck/slide structure
   out of the DOM (each <details class="deck"> + its <a class="slide-row">
   children), finds the current page, renders a fixed bottom nav pill,
   and binds ArrowLeft / ArrowRight. Rows tagged data-nav-exclude are
   skipped (e.g. dead URLs intentionally listed in the index).
   No manifest in this file — adding a slide row to /slides/ is enough.
*/
(function() {
  const path = window.location.pathname.replace(/\/$/, "");
  const currentSlug = path.replace(/^\/slides\//, "");
  if (!currentSlug || currentSlug === "index" || currentSlug === "") return;

  fetch("/slides/", { credentials: "same-origin" })
    .then(function(r) { return r.ok ? r.text() : Promise.reject(); })
    .then(function(html) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const decks = [];
      doc.querySelectorAll("details.deck").forEach(function(d) {
        const nameEl = d.querySelector(".deck-name");
        const name = nameEl ? nameEl.textContent.trim() : "";
        const slides = [];
        d.querySelectorAll("a.slide-row").forEach(function(a) {
          if (a.hasAttribute("data-nav-exclude")) return;
          const href = a.getAttribute("href") || "";
          const slug = href.replace(/^\/slides\//, "").replace(/\/$/, "");
          if (!slug) return;
          const titleEl = a.querySelector(".slide-title");
          const title = titleEl ? titleEl.textContent.trim() : slug;
          slides.push({ slug: slug, title: title });
        });
        if (slides.length) decks.push({ name: name, slides: slides });
      });

      let deck = null, idx = -1;
      for (let i = 0; i < decks.length; i++) {
        const j = decks[i].slides.findIndex(function(s) { return s.slug === currentSlug; });
        if (j !== -1) { deck = decks[i]; idx = j; break; }
      }
      if (!deck) return;

      mountNav(deck, idx);
    })
    .catch(function() { /* silent: nav is non-essential */ });

  function mountNav(deck, idx) {
    const prev = idx > 0 ? deck.slides[idx - 1] : null;
    const next = idx < deck.slides.length - 1 ? deck.slides[idx + 1] : null;

    const css = [
      ".deck-nav {",
      "  position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);",
      "  background: rgba(255, 255, 255, 0.96);",
      "  backdrop-filter: saturate(180%) blur(8px);",
      "  -webkit-backdrop-filter: saturate(180%) blur(8px);",
      "  border: 1px solid #e0ddd5; border-radius: 999px; padding: 6px 10px;",
      "  display: flex; align-items: center; gap: 4px;",
      "  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
      "  font-size: 12px; color: #1a1a1a; z-index: 9999; user-select: none;",
      "}",
      ".deck-nav a, .deck-nav span.disabled {",
      "  display: inline-flex; align-items: center; justify-content: center;",
      "  min-width: 28px; height: 28px; padding: 0 10px; border-radius: 999px;",
      "  text-decoration: none; color: #1a1a1a;",
      "  transition: background-color 0.12s ease;",
      "}",
      ".deck-nav a:hover { background: #f0eee8; }",
      ".deck-nav span.disabled { color: #c5c0b3; cursor: default; }",
      ".deck-nav .deck-nav-label {",
      "  padding: 0 10px; color: #888; font-size: 11px;",
      "  letter-spacing: 0.04em; white-space: nowrap;",
      "}",
      ".deck-nav .deck-nav-label .deck-nav-deck {",
      "  color: #1a1a1a; font-weight: 600; letter-spacing: 0;",
      "}",
      ".deck-nav .deck-nav-pos {",
      "  font-family: 'SF Mono', Monaco, Menlo, monospace;",
      "  color: #888; padding-left: 6px;",
      "}",
      "@media (max-width: 600px) {",
      "  .deck-nav { font-size: 11px; padding: 4px 6px; }",
      "  .deck-nav a, .deck-nav span.disabled { min-width: 26px; height: 26px; padding: 0 8px; }",
      "  .deck-nav .deck-nav-label { display: none; }",
      "}"
    ].join("\n");
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const nav = document.createElement("nav");
    nav.className = "deck-nav";
    nav.setAttribute("aria-label", "Slide navigation");

    function arrow(direction, target) {
      if (target) {
        const a = document.createElement("a");
        a.href = "/slides/" + target.slug;
        a.textContent = direction === "prev" ? "←" : "→";
        a.title = (direction === "prev" ? "Previous: " : "Next: ") + target.title;
        a.setAttribute("aria-label", a.title);
        return a;
      }
      const s = document.createElement("span");
      s.className = "disabled";
      s.textContent = direction === "prev" ? "←" : "→";
      s.setAttribute("aria-disabled", "true");
      return s;
    }

    nav.appendChild(arrow("prev", prev));

    const indexLink = document.createElement("a");
    indexLink.href = "/slides/";
    indexLink.title = "Back to slides index";
    indexLink.setAttribute("aria-label", indexLink.title);
    indexLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    nav.appendChild(indexLink);

    const label = document.createElement("span");
    label.className = "deck-nav-label";
    label.innerHTML = '<span class="deck-nav-deck"></span><span class="deck-nav-pos"></span>';
    label.querySelector(".deck-nav-deck").textContent = deck.name;
    label.querySelector(".deck-nav-pos").textContent = (idx + 1) + " / " + deck.slides.length;
    nav.appendChild(label);

    nav.appendChild(arrow("next", next));

    document.body.appendChild(nav);

    document.addEventListener("keydown", function(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target && e.target.isContentEditable)) return;
      if (e.key === "ArrowLeft" && prev) {
        window.location.href = "/slides/" + prev.slug;
      } else if (e.key === "ArrowRight" && next) {
        window.location.href = "/slides/" + next.slug;
      }
    });
  }
})();
