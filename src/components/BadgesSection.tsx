import { useState } from 'react'
import { badges } from '../data/badges'

const initials = (title: string) =>
  title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z0-9&+]+$/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

export default function BadgesSection() {
  const [broken, setBroken] = useState<Record<string, boolean>>({})

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {badges.map((badge) => (
        <li key={badge.id}>
          <a
            href={badge.href}
            target={badge.href ? '_blank' : undefined}
            rel={badge.href ? 'noreferrer' : undefined}
            className="group flex h-full items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_24px_60px_-24px_rgba(251,191,36,0.45)]"
          >
            <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.02] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
              <span className="absolute inset-0 rounded-2xl bg-amber-300/10 opacity-0 blur-md transition group-hover:opacity-100" />
              {broken[badge.id] ? (
                <span className="relative font-display text-xl font-bold text-amber-300">
                  {initials(badge.title)}
                </span>
              ) : (
                <img
                  src={badge.image}
                  alt={badge.title}
                  className="relative h-full w-full object-contain"
                  onError={() => setBroken((prev) => ({ ...prev, [badge.id]: true }))}
                />
              )}
            </span>

            <span className="min-w-0">
              <span className="block font-display font-semibold text-white">{badge.title}</span>
              <span className="mt-1 block text-sm text-zinc-400">{badge.issuer}</span>
              <span className="mt-0.5 block text-xs text-zinc-500">Issued {badge.issued}</span>
              {badge.href && (
                <span className="mt-2 inline-block text-sm font-medium text-amber-300/90 transition group-hover:text-amber-200">
                  View credential →
                </span>
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
