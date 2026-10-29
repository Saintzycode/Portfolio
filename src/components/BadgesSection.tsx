import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { badges, type Badge } from '../data/badges'

const initials = (title: string) =>
  title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z0-9&+]+$/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

export default function BadgesSection() {
  const [broken, setBroken] = useState<Record<string, boolean>>({})
  const [active, setActive] = useState<Badge | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Native <dialog> gives us Escape-to-close and focus handling for free.
  useEffect(() => {
    if (active) dialogRef.current?.showModal()
  }, [active])

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {badges.map((badge) => (
          <li key={badge.id}>
            <button
              type="button"
              onClick={() => setActive(badge)}
              className="group flex h-full w-full items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_24px_60px_-24px_rgba(251,191,36,0.45)]"
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
                    alt=""
                    className="relative h-full w-full object-contain"
                    onError={() => setBroken((prev) => ({ ...prev, [badge.id]: true }))}
                  />
                )}
              </span>

              <span className="min-w-0">
                <span className="block font-display font-semibold text-white">{badge.title}</span>
                <span className="mt-1 block text-sm text-zinc-400">{badge.issuer}</span>
                <span className="mt-0.5 block text-xs text-zinc-500">Issued {badge.issued}</span>
                <span className="mt-2 inline-block text-sm font-medium text-amber-300/90 transition group-hover:text-amber-200">
                  View certificate →
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) event.currentTarget.close()
        }}
        aria-labelledby="badge-preview-title"
        className="m-auto max-h-[92vh] w-[min(92vw,64rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#0e0c1a] p-0 text-white backdrop:bg-black/80"
      >
        {active && (
          <div>
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <p id="badge-preview-title" className="font-display font-semibold">
                  {active.title}
                </p>
                <p className="mt-0.5 text-sm text-zinc-400">
                  {active.issuer} · Issued {active.issued}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close certificate"
                className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <img
              src={active.certificate ?? active.image}
              alt={active.title}
              className="max-h-[78vh] w-full bg-white object-contain"
            />
            {active.href && (
              <a
                href={active.href}
                target="_blank"
                rel="noreferrer"
                className="block border-t border-white/10 px-5 py-3 text-sm font-medium text-amber-300 transition hover:text-amber-200"
              >
                Verify credential →
              </a>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
