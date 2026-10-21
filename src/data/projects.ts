export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  stack: string[]
  links: ProjectLink[]
  featured: boolean
  /** Base colour of the card's gradient panel. */
  accent: string
}

// TODO: replace with your real projects.
export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    summary: 'One line describing what it does and why it matters.',
    stack: ['Vue', 'TypeScript'],
    links: [
      { label: 'Live site', href: 'https://example.com' },
      { label: 'Source', href: 'https://github.com/Saintzycode/project-one' },
    ],
    featured: true,
    accent: '#6366f1',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    summary: 'One line describing what it does and why it matters.',
    stack: ['Python', 'Flask'],
    links: [{ label: 'Source', href: 'https://github.com/Saintzycode/project-two' }],
    featured: true,
    accent: '#a855f7',
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    summary: 'One line describing what it does and why it matters.',
    stack: ['Flutter', 'Dart'],
    links: [{ label: 'Source', href: 'https://github.com/Saintzycode/project-three' }],
    featured: false,
    accent: '#d946ef',
  },
]
