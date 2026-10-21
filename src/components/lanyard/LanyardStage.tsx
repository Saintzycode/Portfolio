import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import type { LanyardProps } from './Lanyard'

// Client-only boundary: keeps three.js and the WebGL scene out of the initial
// bundle and out of server rendering.
export default function LanyardStage(props: LanyardProps) {
  const [Lanyard, setLanyard] = useState<ComponentType<LanyardProps> | null>(null)

  useEffect(() => {
    let live = true
    import('./Lanyard')
      .then((module) => {
        if (live) setLanyard(() => module.default)
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [])

  return Lanyard ? <Lanyard {...props} /> : null
}
