import { useEffect, useState } from 'react'
import { ComponentShowcase } from './components/ComponentShowcase'
import {
  AppHeader,
  DocsNavigation,
  InviteModal,
  Overview,
  type Theme,
} from './components/docs-shell'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const storedTheme = window.localStorage.getItem('tide-theme') ?? window.localStorage.getItem('axiom-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
    return 'dark'
  })
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('tide-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!modalOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  return (
    <div className="min-h-screen bg-canvas text-text">
      <AppHeader
        onToggleTheme={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))}
        theme={theme}
      />
      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-stroke px-5 py-8 lg:block">
          <DocsNavigation />
        </aside>
        <main className="min-w-0 flex-1 px-4 pb-16 sm:px-8 xl:px-12">
          <Overview />
          <ComponentShowcase onOpenModal={() => setModalOpen(true)} />
        </main>
      </div>
      {modalOpen && <InviteModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default App
