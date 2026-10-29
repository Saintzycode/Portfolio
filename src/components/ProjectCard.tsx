import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { asset } from '../lib/asset'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_24px_60px_-24px_rgba(168,85,247,0.55)]">
      <div
        className="relative h-40 overflow-hidden"
        style={{
          background: `radial-gradient(120% 120% at 15% 10%, ${project.accent}cc 0%, ${project.accent}33 45%, transparent 75%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {project.image ? (
          <img src={asset(project.image)} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <span className="absolute bottom-2 left-4 font-display text-7xl font-bold text-white/15 select-none">
            {project.title[0]}
          </span>
        )}
        {project.featured && (
          <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold text-white">
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-violet-300"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400">{project.summary}</p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-4 pt-1">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 cursor-pointer text-sm font-medium text-violet-300 transition hover:text-white hover:underline"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
