export const profile = {
  name: 'MOON19HT',
  eyebrow: 'Personal systems portfolio',
  tagline: 'Builds in motion',
  statement:
    '작게 검증하고 빠르게 구현하는 개발자. systems, automation, and motion-led interfaces.',
  location: 'Seoul, KR / GitHub Pages',
  cta: {
    label: 'View GitHub',
    href: 'https://github.com/moon19ht',
  },
  secondaryCta: {
    label: 'Contact',
    href: 'mailto:hello@moon19ht.dev',
  },
  signals: [
    {
      label: 'Systems',
      value: 'Full-stack surfaces',
      detail: 'Interfaces, services, and deployment paths designed as one working system.',
    },
    {
      label: 'Automation',
      value: 'Repeatable workflows',
      detail: 'Small tools and scripts that compress setup, validation, and shipping loops.',
    },
    {
      label: 'Motion',
      value: 'Remotion-led identity',
      detail: 'Video and interface motion used to explain structure, timing, and intent.',
    },
  ],
  rhythm: [
    {
      step: 'Prototype',
      text: 'Define the smallest visible version that can prove the idea.',
    },
    {
      step: 'Verify',
      text: 'Run the build, inspect the interaction, and remove weak assumptions.',
    },
    {
      step: 'Ship',
      text: 'Leave a compact surface that is fast to revisit and easy to extend.',
    },
  ],
  contact: {
    heading: 'Selected work is still moving.',
    text: 'For collaboration, experiments, or project context, start with GitHub.',
    links: [
      { label: 'GitHub', href: 'https://github.com/moon19ht' },
      { label: 'Email placeholder', href: 'mailto:hello@moon19ht.dev' },
    ],
  },
} as const;

export type Profile = typeof profile;
