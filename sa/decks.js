/* ═══════════════════════════════════════════════════════════════════
   DECKS — fetches deck metadata from the content API,
   attaches chart renderers from chart-renderers.js.
   Consumed by /sa/deck/ (picker + presentation).
   ═══════════════════════════════════════════════════════════════════ */

var CONTENT_API = 'https://api.miketrounce.com/api/content';
var DECK_DATA = [];

function loadDecks(callback) {
  fetch(CONTENT_API + '/decks/')
    .then(function(r) { return r.json(); })
    .then(function(decks) {
      DECK_DATA = decks.map(function(d) {
        return {
          id: d.slug,
          name: d.title,
          description: d.description,
          slideCount: d.slide_count
        };
      });
      if (callback) callback();
    });
}

function loadDeck(slug, callback) {
  fetch(CONTENT_API + '/decks/' + slug + '/')
    .then(function(r) { return r.json(); })
    .then(function(deck) {
      if (deck.error) { callback(null); return; }
      var deckSlides = deck.slides.map(function(s) {
        return {
          id: s.slug,
          title: s.title,
          eyebrow: deck.eyebrow,
          bullets: s.bullets,
          buildChart: CHART_RENDERERS[s.chart.slug] || function() {}
        };
      });
      callback({ id: deck.slug, name: deck.title, eyebrow: deck.eyebrow, slides: deckSlides });
    });
}

function getDeckById(id) {
  for (var i = 0; i < DECK_DATA.length; i++) {
    if (DECK_DATA[i].id === id) return DECK_DATA[i];
  }
  return null;
}
