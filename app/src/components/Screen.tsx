import type { ReactNode } from 'react'

/**
 * The <main> column for every screen other than the dashboard. Same metrics as
 * the design's main element, so the shell never shifts between routes.
 */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <main
      className="sp-main"
      style={{ flex: '1', minWidth: '1120px', padding: '34px 44px 44px', display: 'flex', flexDirection: 'column', gap: '26px' }}
    >
      {children}
    </main>
  )
}
