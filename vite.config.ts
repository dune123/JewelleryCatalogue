import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site } from './src/config/site'
import { heroItems } from './src/data/catalog'

function siteMeta(): Plugin {
  return {
    name: 'prince-site-meta',
    transformIndexHtml(html) {
      let image = ''
      try {
        const source = heroItems[0]?.sources.at(-1)
        if (source?.jpeg) image = new URL(source.jpeg, site.url).toString()
      } catch {
        image = ''
      }

      const next = html
        .replaceAll('%SITE_NAME%', site.name)
        .replaceAll('%SITE_TITLE%', `${site.name} — ${site.tagline}`)
        .replaceAll('%SITE_DESCRIPTION%', site.description)
        .replaceAll('%SITE_URL%', site.url)
        .replaceAll('%OG_IMAGE%', image)

      if (image) return next
      return next
        .replace(/\s*<meta property="og:image" content="" \/>/, '')
        .replace(/\s*<meta name="twitter:image" content="" \/>/, '')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
})
