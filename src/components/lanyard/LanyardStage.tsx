import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import type { LanyardProps } from './Lanyard'

// Client-only boundary: keeps three.js and the WebGL scene out of the initial
// bundle and out of server rendering.
export default function LanyardStage(props: LanyardProps) {
  const [Lanyard, setLanyard] = useState<ComponentType<LanyardProps> | null>(null)

  useEffect(() => {
    let live = true
    const load = () => {
      import('./Lanyard')
        .then((module) => {
          if (live) setLanyard(() => module.default)
        })
        .catch(() => {})
    }
    // ~574 KB of three.js: let the hero paint and its entrance finish first.
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(load, { timeout: 1500 })
      return () => {
        live = false
        cancelIdleCallback(id)
      }
    }
    const id = setTimeout(load, 400)
    return () => {
      live = false
      clearTimeout(id)
    }
  }, [])

  return Lanyard ? <Lanyard {...props} /> : null
}
