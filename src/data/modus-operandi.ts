export interface ProcessStep {
  label: string;
  description: string;
}

export const process: ProcessStep[] = [
  {
    label: 'Ingestion',
    description: 'Meeting transcripts, Slide decks and other assets, point-in-time.',
  },
  {
    label: 'Synthesis',
    description: 'An LLM processes the ever-increasing number of assets into a constant set of ever-up-to-date wikis.',
  },
  {
    label: 'Dossier',
    description: 'The wikis are processed into a single dossier which goes to the founder in a private GitHub repo they have read access to.',
  },
];
