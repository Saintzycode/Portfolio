import { useEffect } from 'react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { badges } from '../data/badges'
import contributions from '../data/contributions.json'
import SectionHeading from '../components/SectionHeading'
import BadgesSection from '../components/BadgesSection'
import ContributionsSection from '../components/ContributionsSection'
import ProjectCard from '../components/ProjectCard'
import LanyardStage from '../components/lanyard/LanyardStage'

const stats = [
  { value: projects.length, label: 'projects' },
  { value: badges.length, label: 'certifications' },
  { value: contributions.totalContributions, label: 'contributions this year' },
]

export default function HomeView() {
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
    <>
      {/* hero */}
      <section className="relative flex min-h-screen items-center justify-center py-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-xs font-semibold tracking-[0.35em] text-violet-300/80 uppercase sm:text-sm">
              {profile.role}
            </p>

            <h1 className="mt-7 font-display text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-br from-white via-violet-200 to-indigo-400 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-zinc-400 sm:text-lg">{profile.tagline}</p>

            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
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

            <div className="mt-12 flex flex-wrap justify-center gap-3 lg:justify-start">
              {stats.map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 backdrop-blur"
                >
                  <span className="font-display font-semibold text-white">{stat.value}</span>{' '}
                  {stat.label}
                </span>
              ))}
            </div>

            <p className="mt-16 text-xs tracking-[0.3em] text-zinc-600 uppercase">Scroll</p>
          </div>

          <div className="h-[400px] w-full max-w-md justify-self-center sm:h-[480px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2 lg:max-w-none">
            <LanyardStage frontImage="/card-front.jpg" size={0.5} breeze={0} />
          </div>
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
            <SectionHeading index="02" label="Badges" title="Certifications and badges" />
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
    </>
  )
}
