import { Logo } from '../assets/logo/Logo'
import { BrandPattern } from '../components/BrandPattern'
import { site } from '../config/site'

export function Footer() {
  return (
    <footer className="relative bg-night text-ivory">
      <div className="relative h-24 overflow-hidden border-y border-ivory/10">
        <BrandPattern size={72} opacity={0.16} />
      </div>
      <div className="shell flex flex-col items-center px-6 py-16 text-center sm:py-20">
        <Logo variant="vertical" tone="light" className="[--logo-size:2.35rem]" />
        <p className="mt-8 max-w-sm font-label text-[0.7rem] font-medium uppercase tracking-[0.32em] text-ivory/80">
          {site.tagline}
        </p>
        <p className="mt-10 text-sm text-ivory/75">© {site.name}</p>
      </div>
    </footer>
  )
}
