import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-bold text-violet-400/80">404</p>
      <h1 className="mt-6 font-display text-2xl font-semibold text-white">Nothing here</h1>
      <p className="mt-3 text-zinc-400">That page does not exist — or it never did.</p>
      <Link
        to="/"
        className="mt-8 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 transition hover:border-violet-400/50 hover:bg-white/10"
      >
        Back home
      </Link>
    </div>
  )
}
