import { Link, Route, Routes } from 'react-router-dom'
import { profile } from './data/profile'
import { DarkGradientBg } from './components/ui/elegant-dark-pattern'
import ScrollToTop from './components/ScrollToTop'
import HomeView from './views/HomeView'
import ProjectDetail from './views/ProjectDetail'
import NotFound from './views/NotFound'

const nav = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Badges', href: '/#badges' },
  { label: 'Contributions', href: '/#contributions' },
]

// lucide dropped brand icons, so the GitHub mark is inline.
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      {/* static dark gradient — no canvas, no animation loop */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <DarkGradientBg />
      </div>

      <ScrollToTop />

      {/* floating nav */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <Link to="/" className="px-3 py-1.5 font-display text-sm font-semibold text-white">
            {profile.name}
          </Link>
          <span className="mx-1 h-4 w-px bg-white/10" />
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="hidden rounded-full px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white sm:block"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-zinc-950 shadow-[0_2px_12px_-4px_rgba(255,255,255,0.5)] transition hover:bg-zinc-200 active:translate-y-px active:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <GitHubMark className="size-4" />
            GitHub
          </a>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-10 text-sm text-zinc-500">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <span>React · TypeScript · Tailwind CSS</span>
        </div>
      </footer>
    </div>
  )
}
