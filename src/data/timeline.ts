export interface TimelineEntry {
  dates: string;
  role: string;
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  { dates: '1998 — 2007', role: 'Macro Strategist (Developed Markets)' },
  { dates: '2007 — 2016', role: 'Flows Strategist (Emerging Markets)' },
  { dates: '2016 — 2026', role: 'Data Startups (Trounceflow, Delphos, Exante Data', current: true },
];
