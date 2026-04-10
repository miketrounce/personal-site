/* ═══════════════════════════════════════════════════════════════════
   SLIDES — fetches slide metadata from the content API,
   attaches chart renderers from chart-renderers.js.
   Consumed by /sa/slides/ (browse view).
   ═══════════════════════════════════════════════════════════════════ */

var CONTENT_API = 'https://api.miketrounce.com/api/content';
var SLIDE_DATA = [];

function loadSlides(callback) {
  fetch(CONTENT_API + '/slides/')
    .then(function(r) { return r.json(); })
    .then(function(slides) {
      SLIDE_DATA = slides.map(function(s) {
        return {
          id: s.slug,
          title: s.title,
          description: s.chart.description,
          chartName: s.chart.title,
          eyebrow: '',
          bullets: s.bullets,
          buildChart: CHART_RENDERERS[s.chart.slug] || function() {}
        };
      });
      if (callback) callback();
    });
}

function getSlideById(id) {
  for (var i = 0; i < SLIDE_DATA.length; i++) {
    if (SLIDE_DATA[i].id === id) return SLIDE_DATA[i];
  }
  return null;
}
