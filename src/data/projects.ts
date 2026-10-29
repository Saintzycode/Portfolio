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
  /** Additional screenshots, shown full-width on the project page. */
  gallery?: string[]
}

export const projects: Project[] = [
  {
    slug: 'studyflow',
    title: 'StudyFlow',
    summary: 'Offline-first Pomodoro study timer with tasks, subjects and streak statistics.',
    description: [
      'A study timer for students that keeps everything on the device: focus sessions, tasks grouped by subject, and statistics that show whether the habit is actually sticking.',
      'The decision that mattered most was the countdown. Remaining time is never accumulated from ticks — it is computed from wall-clock timestamps, so a throttled, dropped or late frame cannot make the timer drift. Alongside it sit tasks, subjects, session history and settings, each a provider over a repository that owns all the SQL.',
      'Data flows one way: widgets to providers to repositories to SQLite. Deleting a subject or task nulls the reference in history instead of destroying it, so old sessions keep their time without a dangling link.',
    ],
    highlights: [
      'Wall-clock Pomodoro engine that stays accurate when the OS throttles frames',
      'Statistics with a daily bar chart, subject donut, 12-week heat map and streaks',
      'SQLite schema with enforced foreign keys; deletions null references instead of erasing history',
      'Glassmorphism design system built from reusable widgets, not one-off screens',
    ],
    year: 2026,
    role: 'Solo developer',
    stack: ['Flutter', 'Dart', 'SQLite', 'Provider'],
    links: [{ label: 'Source', href: 'https://github.com/Saintzycode/StudyFlow' }],
    featured: true,
    accent: '#6366f1',
  },
  {
    slug: 'supplytrack',
    title: 'SupplyTrack',
    summary: 'School-supplies inventory system with stock movements, distribution and exports.',
    description: [
      'A web inventory system for a school-supplies distributor. It tracks items, stock movements, suppliers, schools and the distribution of supplies to schools, with separate admin and staff roles.',
      'Stock levels are never written directly. Every stock-in, stock-out, adjustment and distribution inserts a transaction row, and MySQL triggers update on-hand quantity, raise low-stock alerts, reject negative stock and create the stock-out for a distribution line. Reports are drawn from the same library as the on-screen tables, so the PDF and Excel exports always match what you see.',
      'Built with plain PHP 8 and PDO on XAMPP — no framework, no Composer, no build step. CSRF tokens on every POST, prepared statements throughout, escaped output, bcrypt hashing and login lockout guard the admin side.',
    ],
    highlights: [
      'Database triggers enforce stock invariants: no negative stock, automatic low-stock alerts',
      'Three reports with server-side PDF and Excel export, generated from the on-screen queries',
      'Admin and staff permissions enforced server-side, not just by hiding menu links',
      'Zero-install deployment: copy into htdocs and import the schema',
    ],
    year: 2026,
    role: 'Solo developer',
    stack: ['PHP', 'MySQL', 'Bootstrap', 'Chart.js'],
    links: [{ label: 'Source', href: 'https://github.com/Saintzycode/SupplyTrack' }],
    featured: true,
    accent: '#f59e0b',
  },
  {
    slug: 'budgetko',
    title: 'BudgetKo',
    summary: 'Offline Android finance app for wallets, budgets, savings goals and insights.',
    description: [
      'A personal finance app that keeps wallets, spending, budgets and savings goals in one place, entirely on the device — no account, no sync, no telemetry.',
      'Recording a transaction is the whole product, so Quick Add is a calculator with a docked number pad, the amount always visible, and the note offered as an optional prompt on the way out. Backups export the database to a versioned JSON file; restore validates the file before touching anything, then wipes and reinserts in a single transaction, so a corrupt import cannot leave a half-empty database.',
      'Flutter and Dart with Riverpod, GoRouter and Drift over SQLite. Budget rollover is computed from history rather than stored, so changing the setting reinterprets existing data without a migration.',
    ],
    highlights: [
      'Quick Add built around one-handed entry with a docked calculator keypad',
      'Versioned JSON backup and a transactional, validated restore',
      'Computed budget rollover: changing the setting needs no schema migration',
      'Local notifications for large transactions and budget limits, with an in-app inbox',
    ],
    year: 2026,
    role: 'Solo developer',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Drift'],
    links: [{ label: 'Source', href: 'https://github.com/Saintzycode/Budgetko' }],
    featured: false,
    accent: '#10b981',
    image: '/projects/budgetko-1.jpg',
    gallery: ['/projects/budgetko-2.jpg', '/projects/budgetko-3.jpg'],
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)

export const neighbours = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1 || projects.length < 2) return { previous: undefined, next: undefined }
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}
