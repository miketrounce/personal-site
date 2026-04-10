/* ═══════════════════════════════════════════════════════════════════
   DECK_DATA — ordered selections of slides
   Consumed by /sa/deck/ (picker + presentation)
   ═══════════════════════════════════════════════════════════════════ */

var DECK_DATA = [
  {
    id: 'supply-demand',
    name: 'Supply & Demand in the SA Government Bond Market',
    description: 'The analytical story: who borrows, who buys, and what drives the market',
    slides: [
      'supply',
      'supply-flow',
      'debt-stock',
      'debt-fan',
      'debt-service',
      'yield-level',
      'investor-composition',
      'real-yield',
      'foreign-holdings',
      'yield-vs-foreign',
      'sabo'
    ]
  },
  {
    id: 'all-slides',
    name: 'All Slides',
    description: 'Every slide in the collection, in standard order',
    slides: [
      'supply',
      'supply-flow',
      'debt-stock',
      'debt-fan',
      'loan-debt',
      'debt-service',
      'yield-level',
      'investor-composition',
      'real-yield',
      'foreign-holdings',
      'yield-vs-foreign',
      'sabo'
    ]
  }
];

/* Helper: look up a deck by ID */
function getDeckById(id) {
  for (var i = 0; i < DECK_DATA.length; i++) {
    if (DECK_DATA[i].id === id) return DECK_DATA[i];
  }
  return null;
}
