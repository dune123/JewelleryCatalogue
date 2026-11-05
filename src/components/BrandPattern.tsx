import { markSvg } from '../assets/logo/mark'

const logoFiles = import.meta.glob('../assets/logo/*.{svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function symbolFile() {
  const entries = Object.entries(logoFiles)
  const preferred = entries.find(([file]) => file.split('/').pop()?.toLowerCase() === 'symbol.svg')
  return preferred?.[1] ?? null
}

type BrandPatternProps = {
  className?: string
  size?: number
  opacity?: number
}

export function BrandPattern({ className = '', size = 96, opacity = 0.055 }: BrandPatternProps) {
  const file = symbolFile()
  const image = file
    ? `url("${file}")`
    : `url("data:image/svg+xml,${encodeURIComponent(markSvg('#C49A6C'))}")`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-repeat ${className}`}
      style={{
        backgroundImage: image,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  )
}
