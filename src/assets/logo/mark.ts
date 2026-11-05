/** Shared geometry for the placeholder symbol. Stroke colour is injected by the caller. */
export function markSvg(stroke: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M16 27.5L23.2 16.8L32 24.2L40.8 16.8L48 27.5" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M15 27.5H49" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/><path d="M32 31.2L47.2 41.2L32 55.2L16.8 41.2Z" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/><path d="M32 31.2V55.2" stroke="${stroke}" stroke-width="0.95" stroke-linecap="round"/></svg>`
}
