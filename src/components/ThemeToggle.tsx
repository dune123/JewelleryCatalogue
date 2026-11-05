import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)]"
    >
      {isDark ? <Sun className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} /> : <Moon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} />}
    </button>
  )
}
