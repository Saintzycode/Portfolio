import { useEffect } from 'react'
import { profile } from './data/profile'
import { projects } from './data/projects'
import { badges } from './data/badges'
import contributions from './data/contributions.json'
import SonarBackground from './components/SonarBackground'
import SectionHeading from './components/SectionHeading'
import BadgesSection from './components/BadgesSection'
import ContributionsSection from './components/ContributionsSection'
import ProjectCard from './components/ProjectCard'

const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Badges', href: '#badges' },
  { label: 'Contributions', href: '#contributions' },
]

const stats = [
  { value: projects.length, label: 'projects' },
  { value: badges.length, label: 'certifications' },
  { value: contributions.totalContributions, label: 'contributions this year' },
]

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      {/* sonar field — the whole page sits on top of it */}
      <SonarBackground baseOpacity={0.22} pingEvery={3} spacing={30} ringWidth={110} />

      {/* gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-40 h-[38rem] w-[38rem] rounded-full bg-indigo-600/40 blur-[130px] animate-[drift_22s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-48 h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/30 blur-[140px] animate-[drift_28s_ease-in-out_infinite_reverse]" />
        <div className="absolute -bottom-52 left-1/4 h-[32rem] w-[32rem] rounded-full bg-violet-600/25 blur-[150px] animate-[drift_34s_ease-in-out_infinite]" />
      </div>

      {/* floating nav */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <a href="#top" className="px-3 py-1.5 font-display text-sm font-semibold text-white">
            {profile.name}
          </a>
          <span className="mx-1 h-4 w-px bg-white/10" />
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden rounded-full px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white sm:block"
            >
              {item.label}
            </a>
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

      <main id="top">
        {/* hero */}
        <section className="flex min-h-screen flex-col items-center justify-center py-28 text-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6">
            <p className="text-xs font-semibold tracking-[0.35em] text-violet-300/80 uppercase sm:text-sm">
              {profile.role}
            </p>

            <h1 className="mt-7 font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-br from-white via-violet-200 to-indigo-400 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-zinc-400 sm:text-lg">{profile.tagline}</p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 backdrop-blur transition hover:border-violet-400/50 hover:bg-white/10 hover:shadow-[0_0_34px_-8px_rgba(168,85,247,0.7)]"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {stats.map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 backdrop-blur"
                >
                  <span className="font-display font-semibold text-white">{stat.value}</span> {stat.label}
                </span>
              ))}
            </div>

            <p className="mt-16 text-xs tracking-[0.3em] text-zinc-600 uppercase">Scroll</p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6">
          {/* projects */}
          <section id="projects" className="scroll-mt-28 py-20">
            <div className="reveal">
              <SectionHeading index="01" label="Projects" title="Things I've built" />
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* badges */}
          <section id="badges" className="scroll-mt-28 py-20">
            <div className="reveal">
              <SectionHeading index="02" label="Badges" title="Certifications earned" />
              <BadgesSection />
            </div>
          </section>

          {/* contributions */}
          <section id="contributions" className="scroll-mt-28 py-20">
            <div className="reveal">
              <SectionHeading index="03" label="Contributions" title="Activity on GitHub" />
              <ContributionsSection />
            </div>
          </section>
        </div>
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
