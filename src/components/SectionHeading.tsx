export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string
  label: string
  title: string
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span className="font-display text-xs font-semibold tracking-[0.3em] text-violet-300/80 uppercase">
          {index} / {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-400/50 to-transparent" />
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  )
}
