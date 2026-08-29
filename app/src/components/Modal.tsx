import { useEffect, type ReactNode } from 'react'

type ModalProps = {
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
  width?: number
}

export function Modal({ title, subtitle, onClose, children, width = 560 }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="sp-modal-scrim" onClick={onClose} role="presentation">
      <div
        className="sp-modal"
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sp-modal__head">
          <div>
            <div className="sp-modal__title">{title}</div>
            {subtitle && <div className="sp-modal__subtitle">{subtitle}</div>}
          </div>
          <button type="button" className="sp-icon-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6E6A62" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="sp-modal__body">{children}</div>
      </div>
    </div>
  )
}
