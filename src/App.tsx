import { lazy, Suspense, useCallback, useState } from 'react'
import { site } from './config/site'
import { CartDrawer } from './components/CartDrawer'
import { Header } from './components/Header'
import { ScrollProgress } from './components/ScrollProgress'
import type { LightboxState } from './components/Lightbox'
import { About } from './sections/About'
import { Collections } from './sections/Collections'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Lookbook } from './sections/Lookbook'
import { CartProvider } from './hooks/useCart'

const Lightbox = lazy(() => import('./components/Lightbox').then((module) => ({ default: module.Lightbox })))

function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phones.map((phone) => `+91${phone.number.replace(/\D/g, '')}`),
    slogan: site.tagline,
    address: site.address,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default function App() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const setLightboxIndex = useCallback((index: number) => {
    setLightbox((current) => (current ? { ...current, index } : current))
  }, [])

  return (
    <CartProvider>
      <JsonLd />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Collections onOpen={(items, index) => setLightbox({ items, index })} />
        <Lookbook onOpen={(items, index) => setLightbox({ items, index })} />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      {lightbox ? (
        <Suspense fallback={null}>
          <Lightbox
            items={lightbox.items}
            index={lightbox.index}
            onClose={closeLightbox}
            onIndex={setLightboxIndex}
          />
        </Suspense>
      ) : null}
    </CartProvider>
  )
}
