/**
 * React stand-in for the design's <image-slot> element.
 *
 * In the prototype these were drag-and-drop placeholders. Here a slot renders
 * the image when `src` is supplied and otherwise draws the same dashed empty
 * state, so the layout holds its shape until real art is wired up.
 */
import { ImagePlaceholderIcon } from './icons'

type Shape = 'rect' | 'rounded' | 'circle' | 'pill'

type ImageSlotProps = {
  src?: string
  alt?: string
  /** Empty-state caption, mirroring the design's `placeholder` attribute. */
  placeholder?: string
  shape?: Shape
  /** Corner radius in px for shape="rounded". */
  radius?: number
  className?: string
}

function borderRadius(shape: Shape, radius: number): string | undefined {
  switch (shape) {
    case 'circle':
      return '50%'
    case 'pill':
      return '9999px'
    case 'rounded':
      return `${radius}px`
    case 'rect':
      return undefined
  }
}

export function ImageSlot({
  src,
  alt = '',
  placeholder = 'Drop an image',
  shape = 'rounded',
  radius = 12,
  className,
}: ImageSlotProps) {
  const style = { borderRadius: borderRadius(shape, radius) }

  return (
    <div className={className ? `image-slot ${className}` : 'image-slot'} style={style}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <>
          <div className="image-slot__ring" style={style} />
          <div className="image-slot__empty">
            <ImagePlaceholderIcon />
            <span>{placeholder}</span>
          </div>
        </>
      )}
    </div>
  )
}
