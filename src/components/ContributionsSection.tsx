import { useEffect, useMemo, useRef, useState } from 'react'
import contributions from '../data/contributions.json'

// GitHub's dark palette, straight from their legend.
const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const GAP = 3
const MIN_CELL = 11
const MAX_CELL = 22

export default function ContributionsSection() {
  const weeks = contributions.weeks
  const total = contributions.totalContributions
  const scroller = useRef<HTMLDivElement>(null)
  const [cell, setCell] = useState(MIN_CELL)

  // Scale the grid to the width of the panel so there is no dead space.
  useEffect(() => {
    const element = scroller.current
    if (!element) return
    const measure = () => {
      const available = element.clientWidth
      const columns = Math.max(weeks.length, 1)
      setCell(Math.min(MAX_CELL, Math.max(MIN_CELL, (available - (columns - 1) * GAP) / columns)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [weeks.length])

  const activeDays = useMemo(
    () => weeks.flatMap((week) => week.days).filter((day) => day.count > 0).length,
    [weeks],
  )

  const monthLabels = useMemo(
    () =>
      weeks.map((week, index) => {
        const month = new Date(`${week.firstDay}T00:00:00Z`).getUTCMonth()
        const previous =
          index > 0 ? new Date(`${weeks[index - 1].firstDay}T00:00:00Z`).getUTCMonth() : month
        return month === previous ? '' : MONTHS[month]
      }),
    [weeks],
  )

  const tooltip = (date: string, count: number) => {
    const day = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
    return count === 0
      ? `No contributions on ${day}.`
      : `${count} contribution${count === 1 ? '' : 's'} on ${day}.`
  }

  const updated = new Date(contributions.generatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-violet-400/30 hover:shadow-[0_24px_60px_-28px_rgba(168,85,247,0.5)]">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-display text-4xl font-bold text-white">{total.toLocaleString()}</p>
        <p className="text-sm text-zinc-400">
          contributions in the last year · {activeDays} active days
        </p>
      </div>

      <div ref={scroller} className="mt-6 overflow-x-auto pb-2">
        {weeks.length > 0 ? (
          <div className="inline-block">
            <div className="mb-1 flex gap-2">
              <div className="w-[26px] shrink-0" />
              <div className="flex" style={{ gap: GAP }}>
                {monthLabels.map((label, index) => (
                  <span
                    key={index}
                    className="overflow-visible text-[10px] whitespace-nowrap text-violet-300/60"
                    style={{ width: cell }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex shrink-0 flex-col" style={{ gap: GAP }}>
                {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, index) => (
                  <span
                    key={index}
                    className="w-[26px] overflow-visible text-[9px] whitespace-nowrap text-zinc-600"
                    style={{ height: cell, lineHeight: `${cell}px` }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex" style={{ gap: GAP }}>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col" style={{ gap: GAP }}>
                    {week.days.map((day) => (
                      <span
                        key={day.date}
                        title={tooltip(day.date, day.count)}
                        aria-label={tooltip(day.date, day.count)}
                        role="img"
                        className="rounded-[2px] transition hover:ring-1 hover:ring-white/70"
                        style={{
                          width: cell,
                          height: cell,
                          backgroundColor: LEVEL_COLORS[day.level],
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No contribution data yet — run `npm run contrib`.</p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between text-[11px] text-zinc-600">
        <span>Updated {updated}</span>
        <span className="flex items-center gap-1">
          Less
          {LEVEL_COLORS.map((color, level) => (
            <span
              key={level}
              className="h-[11px] w-[11px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          More
        </span>
      </div>
    </div>
  )
}
