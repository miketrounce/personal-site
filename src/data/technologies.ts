export interface TechCategory {
  label: string;
  description: string;
}

export const technologies: TechCategory[] = [
  {
    label: 'Stack',
    description:
      'Python and Django on the backend, with Django admin for internal tooling. HTML, CSS, and JavaScript on the frontend, with some React. Never a particularly frontend-heavy build.',
  },
  {
    label: 'Database',
    description: 'PostgreSQL.',
  },
  {
    label: 'Infrastructure',
    description:
      'DigitalOcean for compute and managed databases, Amazon S3 for object storage, Nginx in front of the app, and Cloudflare for DNS and CDN.',
  },
  {
    label: 'Background jobs',
    description: 'Celery for scheduling, with RabbitMQ as the message broker.',
  },
  {
    label: 'Web scraping',
    description: 'Selenium and headless browser automation.',
  },
  {
    label: 'Tooling & process',
    description:
      'GitHub for source control, Jira for workflow, Jenkins for deployments, and Postman for API testing on Trounceflow. No AI coding assistance until late in the timeline.',
  },
  {
    label: 'Scale',
    description: 'DigitalOcean spend of roughly $500 a month across compute and databases.',
  },
];
