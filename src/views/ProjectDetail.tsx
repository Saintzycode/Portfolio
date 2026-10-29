import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getProject, neighbours } from '../data/projects'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  const { previous, next } = neighbours(slug)

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-violet-300/80 uppercase">
          {project.year} · {project.role}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg text-zinc-400">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </header>

      <div
        className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-white/10"
        style={{
          background: `radial-gradient(120% 120% at 15% 10%, ${project.accent}cc 0%, ${project.accent}33 45%, transparent 75%)`,
        }}
      >
        {project.image ? (
          <img src={project.image} alt={project.title} className="size-full object-cover" />
        ) : (
          <span className="absolute bottom-4 left-6 font-display text-8xl font-bold text-white/15 select-none">
            {project.title[0]}
          </span>
        )}
      </div>

      <div className="mt-10 space-y-5">
        {project.description.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-zinc-300">
            {paragraph}
          </p>
        ))}
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-10 space-y-6">
          {project.gallery.map((src) => (
            <img
              key={src}
              src={src}
              alt={`${project.title} screenshot`}
              className="w-full rounded-2xl border border-white/10"
            />
          ))}
        </div>
      )}

      {project.highlights.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-white">Highlights</h2>
          <ul className="mt-4 space-y-2.5">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-zinc-300">
                <Check className="mt-0.5 size-4 shrink-0 text-violet-400" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12 flex flex-wrap gap-5">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer text-sm font-medium text-violet-300 transition hover:text-white hover:underline"
          >
            {link.label} →
          </a>
        ))}
      </div>

      <nav className="mt-20 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
        {previous && (
          <Link
            to={`/projects/${previous.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/40"
          >
            <span className="flex items-center gap-2 text-xs text-zinc-500">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Previous
            </span>
            <span className="mt-2 block font-display text-sm font-semibold text-zinc-200 group-hover:text-white">
              {previous.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            to={`/projects/${next.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right transition hover:border-violet-400/40 sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-2 text-xs text-zinc-500">
              Next
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
            <span className="mt-2 block font-display text-sm font-semibold text-zinc-200 group-hover:text-white">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  )
}
