/**
 * React stand-in for the design's <image-slot> custom element, with the same
 * attribute API (shape / radius / placeholder / style). It renders the image
 * when `src` is set and otherwise draws image-slot.js's empty state, so the
 * layout holds its shape until real art is dropped in.
 */
import type { CSSProperties } from 'react'

type Shape = 'rect' | 'rounded' | 'circle' | 'pill'

export type ImageSlotProps = {
  id?: string
  src?: string
  alt?: string
  placeholder?: string
  shape?: Shape
  /** Corner radius in px for shape="rounded"; string form matches the design's attribute. */
  radius?: number | string
  style?: CSSProperties
}

function cornerRadius(shape: Shape, radius: number | string): string | undefined {
  if (shape === 'circle') return '50%'
  if (shape === 'pill') return '9999px'
  if (shape === 'rect') return undefined
  const n = typeof radius === 'number' ? radius : parseFloat(radius)
  return `${Number.isFinite(n) ? n : 12}px`
}

export function ImageSlot({
  id,
  src,
  alt = '',
  placeholder = 'Drop an image',
  shape = 'rounded',
  radius = 12,
  style,
}: ImageSlotProps) {
  const borderRadius = cornerRadius(shape, radius)

  return (
    <div id={id} className="image-slot" style={{ ...style, borderRadius }}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <>
          <div className="image-slot__ring" style={{ borderRadius }} />
          <div className="image-slot__empty">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <circle cx="8.5" cy="10" r="1.6" />
              <path d="M4 17l4.5-4.5 3.5 3 3-2.5L20 17" />
            </svg>
            <span>{placeholder}</span>
          </div>
        </>
      )}
    </div>
  )
}
