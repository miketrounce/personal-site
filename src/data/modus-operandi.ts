export interface ProcessStep {
  label: string;
  description: string;
}

export const process: ProcessStep[] = [
  {
    label: 'Interviews',
    description: 'Founder interviews, typically five one-hour sessions, transcribed and dropped into a raw folder in Obsidian.',
  },
  {
    label: 'Synthesis',
    description: 'An LLM turns the raw transcripts into wikis — structured, cross-linked context on the project.',
  },
  {
    label: 'Delivery',
    description: 'The polished output goes to the founder in a private GitHub repo they have read access to.',
  },
];
