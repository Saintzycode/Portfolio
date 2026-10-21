import { useEffect, useRef } from 'react'
import { SonarGrid, type SonarGridProps } from './ui/sonar-grid'

/**
 * Full-page sonar field. The canvas sits behind the content (it is fixed and
 * pointer-transparent), so taps are forwarded to it as synthetic pointer events
 * — otherwise the content would swallow every click.
 */
export default function SonarBackground(props: Omit<SonarGridProps, 'ref'>) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const forward = (event: PointerEvent) => {
      if (!event.isTrusted) return
      hostRef.current?.dispatchEvent(
        new PointerEvent('pointerdown', {
          clientX: event.clientX,
          clientY: event.clientY,
          bubbles: true,
        }),
      )
    }
    window.addEventListener('pointerdown', forward)
    return () => window.removeEventListener('pointerdown', forward)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <SonarGrid ref={hostRef} className="size-full" {...props} />
    </div>
  )
}
