import type { Banner } from '../data/types'
import { ImageSlot } from './ImageSlot'

export function RootedBanner({ banner }: { banner: Banner }) {
  return (
    <section className="banner">
      <ImageSlot
        className="banner__art"
        src={banner.artUrl}
        alt=""
        placeholder="Illustration"
        shape="rounded"
        radius={10}
      />
      <div className="banner__text">
        <div className="banner__title">{banner.title}</div>
        <div className="banner__body">{banner.body}</div>
      </div>
      <button type="button" className="reset-btn banner__cta">
        {banner.ctaLabel}
      </button>
    </section>
  )
}
