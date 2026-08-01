export interface TimelineEntry {
  dates: string;
  role: string;
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  { dates: '1998 — 2007', role: 'Macro Strategist (DM)' },
  { dates: '2007 — 2016', role: 'Flows Strategist (EM)' },
  { dates: '2016 — 2026', role: 'Flow Data Entrepreneur', current: true },
];
