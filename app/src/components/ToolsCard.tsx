import type { Tool } from '../data/types'
import { Icon, TONE_COLOR } from './Icon'

export function ToolsCard({ tools }: { tools: Tool[] }) {
  return (
    <section className="card">
      <div className="card__title card__title--ruled">Tools Quick Access</div>

      <div className="tools__grid">
        {tools.map((tool) => (
          <button type="button" className="reset-btn tool" key={tool.id}>
            <Icon name={tool.icon} size={24} color={TONE_COLOR[tool.tone]} />
            <div className="tool__label">{tool.label}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
