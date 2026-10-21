export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  /** Full story, one paragraph per entry. */
  description: string[]
  /** Concrete outcomes, shown as a checklist. */
  highlights: string[]
  year: number
  role: string
  stack: string[]
  links: ProjectLink[]
  featured: boolean
  /** Base colour of the card's gradient panel. */
  accent: string
  /** Optional screenshot in public/projects/ — the gradient panel is used when missing. */
  image?: string
}

// TODO: replace with your real projects.
export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    summary: 'One line describing what it does and why it matters.',
    description: [
      'Two or three paragraphs on the problem this solves, who it was for, and why it was worth building. Write it the way you would explain it to another developer: the constraint, the approach, the trade-off you accepted.',
      'The second paragraph is where the interesting part goes — what nearly went wrong, what you measured, what you would do differently. A project page that only lists features is a project page nobody reads.',
      'Close with where it ended up: who uses it, what it changed, and whether you still maintain it.',
    ],
    highlights: [
      'The result that mattered, with a number in it',
      'The decision you are proudest of',
      'The thing you learned building it',
    ],
    year: 2025,
    role: 'Solo developer',
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
    description: [
      'Two or three paragraphs on the problem this solves, who it was for, and why it was worth building. Write it the way you would explain it to another developer: the constraint, the approach, the trade-off you accepted.',
      'The second paragraph is where the interesting part goes — what nearly went wrong, what you measured, what you would do differently.',
      'Close with where it ended up: who uses it, what it changed, and whether you still maintain it.',
    ],
    highlights: ['Outcome with a number', 'The tricky bit', 'What you would change'],
    year: 2025,
    role: 'Solo developer',
    stack: ['Python', 'Flask'],
    links: [{ label: 'Source', href: 'https://github.com/Saintzycode/project-two' }],
    featured: true,
    accent: '#a855f7',
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    summary: 'One line describing what it does and why it matters.',
    description: [
      'Two or three paragraphs on the problem this solves, who it was for, and why it was worth building.',
      'The second paragraph is where the interesting part goes — what nearly went wrong, what you measured, what you would do differently.',
      'Close with where it ended up: who uses it, what it changed, and whether you still maintain it.',
    ],
    highlights: ['Outcome with a number', 'The tricky bit', 'What you would change'],
    year: 2024,
    role: 'Solo developer',
    stack: ['Flutter', 'Dart'],
    links: [{ label: 'Source', href: 'https://github.com/Saintzycode/project-three' }],
    featured: false,
    accent: '#d946ef',
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)

export const neighbours = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}
