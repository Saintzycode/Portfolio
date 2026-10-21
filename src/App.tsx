import { Link, Route, Routes } from 'react-router-dom'
import { profile } from './data/profile'
import SonarBackground from './components/SonarBackground'
import ScrollToTop from './components/ScrollToTop'
import HomeView from './views/HomeView'
import ProjectDetail from './views/ProjectDetail'
import NotFound from './views/NotFound'

const nav = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Badges', href: '/#badges' },
  { label: 'Contributions', href: '/#contributions' },
]

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      {/* sonar field — the whole page sits on top of it */}
      <SonarBackground baseOpacity={0.22} pingEvery={3} spacing={30} ringWidth={110} />

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
            className="ml-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3.5 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
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
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>React · TypeScript · Tailwind CSS</span>
        </div>
      </footer>
    </div>
  )
}
