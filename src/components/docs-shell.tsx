import { useState, type ReactNode } from 'react'
import { Badge, Button, Icon } from './ui'

export type Theme = 'light' | 'dark'
export type PropRow = { name: string; type: string; defaultValue: string }

const navItems = [
  { id: 'buttons', label: 'Buttons', group: 'Components' },
  { id: 'cards', label: 'Cards & badges', group: 'Components' },
  { id: 'inputs', label: 'Inputs', group: 'Forms' },
  { id: 'alerts', label: 'Alerts & loaders', group: 'Feedback' },
  { id: 'modal', label: 'Modal', group: 'Overlays' },
  { id: 'table', label: 'Table', group: 'Data display' },
  { id: 'accordion', label: 'Accordion', group: 'Disclosure' },
  { id: 'tabs', label: 'Tabs', group: 'Navigation' },
  { id: 'dropdown', label: 'Dropdown', group: 'Overlays' },
  { id: 'navigation', label: 'Navigation & sidebar', group: 'Navigation' },
]

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-stroke bg-code p-4 text-[13px] leading-6 text-code-text">
      <code>{children}</code>
    </pre>
  )
}

function PropTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stroke">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-subtle text-muted">
          <tr>
            <th className="px-3 py-2.5 font-medium">Prop</th>
            <th className="px-3 py-2.5 font-medium">Type</th>
            <th className="px-3 py-2.5 font-medium">Default</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stroke bg-surface">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="px-3 py-2.5 font-mono text-brand-strong dark:text-brand-light">{row.name}</td>
              <td className="px-3 py-2.5 font-mono text-muted">{row.type}</td>
              <td className="px-3 py-2.5 font-mono text-text">{row.defaultValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocSection({
  id,
  title,
  description,
  preview,
  code,
  props,
  states,
}: {
  id: string
  title: string
  description: string
  preview: ReactNode
  code: string
  props: PropRow[]
  states: string[]
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="scroll-mt-24 py-9" id={id}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-text" id={`${id}-title`}>
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-2xl border border-stroke p-5 shadow-panel">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Preview</h3>
            <Badge tone="brand">Interactive</Badge>
          </div>
          {preview}
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Usage</h3>
            <Code>{code}</Code>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Props</h3>
            <PropTable rows={props} />
          </div>
          <div className="glass-panel rounded-xl border border-stroke p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">States</h3>
            <div className="flex flex-wrap gap-2">
              {states.map((state) => (
                <Badge key={state}>{state}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DocsNavigation({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean
  onNavigate?: () => void
}) {
  const groups = [...new Set(navItems.map((item) => item.group))]

  return (
    <nav aria-label="Component documentation" className={mobile ? 'px-4 pb-5' : ''}>
      {groups.map((group) => (
        <div className="mb-7" key={group}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-faint">{group}</p>
          {navItems
            .filter((item) => item.group === group)
            .map((item) => (
              <a
                className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-subtle hover:text-text focus-visible:bg-subtle"
                href={`#${item.id}`}
                key={item.id}
                onClick={onNavigate}
              >
                {item.label}
              </a>
            ))}
        </div>
      ))}
    </nav>
  )
}

export function AppHeader({
  theme,
  onToggleTheme,
}: {
  theme: Theme
  onToggleTheme: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-stroke bg-canvas/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6">
        <button
          aria-expanded={menuOpen}
          aria-label="Open component navigation"
          className="rounded-lg p-2 text-muted hover:bg-subtle lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <a className="flex items-center gap-2.5 font-bold tracking-tight" href="#" aria-label="Tide UI home">
          <span className="brand-gradient brand-glow grid h-9 w-9 place-items-center rounded-xl text-[#0b1120]">
            <Icon name="logo" />
          </span>
          <span>Tide UI</span>
        </a>
        <div className="glass-panel hidden h-9 max-w-sm flex-1 items-center gap-2 rounded-lg border border-stroke px-3 text-sm text-faint md:flex lg:ml-9">
          <Icon className="h-4 w-4" name="search" />
          Search components...
          <kbd className="ml-auto rounded border border-stroke px-1.5 py-0.5 text-[11px]">/</kbd>
        </div>
        <button
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="glass-panel ml-auto rounded-lg border border-stroke p-2.5 text-muted transition hover:border-brand/40 hover:text-text"
          onClick={onToggleTheme}
          type="button"
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} />
        </button>
      </div>
      {menuOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-auto border-t border-stroke bg-canvas pt-5 lg:hidden">
          <DocsNavigation mobile onNavigate={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}

export function Overview() {
  return (
    <section className="border-b border-stroke pb-10 pt-10 sm:pt-14" id="tokens">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>Components</span>
        <span>/</span>
        <span className="text-text">Overview</span>
        <Badge tone="brand">v2.4</Badge>
      </div>
      <div className="mt-7 grid gap-8 xl:grid-cols-[1fr_auto] xl:items-end">
        <div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Build interfaces with a <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">calmer current</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
            Tide UI is a dark-first React and Tailwind component system with reusable
            variants, documented APIs, accessible states, and ocean-toned design tokens.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button>
              Get started <Icon className="h-4 w-4" name="arrow" />
            </Button>
            <Button variant="outline">View on GitHub</Button>
          </div>
        </div>
        <div className="grid min-w-[280px] grid-cols-3 gap-3">
          {[
            ['10+', 'Components'],
            ['WCAG', 'Focused'],
            ['2', 'Themes'],
          ].map(([number, label]) => (
            <div className="glass-panel rounded-xl border border-stroke p-4 text-center shadow-panel" key={label}>
              <p className="text-xl font-bold text-text">{number}</p>
              <p className="mt-1 text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function InviteModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      aria-labelledby="invite-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-overlay p-4"
      role="dialog"
    >
      <div className="glass-panel w-full max-w-md rounded-2xl border border-stroke p-6 shadow-dialog">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold" id="invite-title">Invite member</h2>
            <p className="mt-1 text-sm text-muted">Grant access to this component workspace.</p>
          </div>
          <button
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-muted hover:bg-subtle"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>
        <label className="mt-6 block text-sm font-medium">
          Email address
          <input
            autoFocus
            className="mt-2 block w-full rounded-lg border border-stroke bg-canvas px-3.5 py-2.5 text-sm"
            placeholder="teammate@company.com"
            type="email"
          />
        </label>
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose} variant="ghost">Cancel</Button>
          <Button onClick={onClose}>Send invite</Button>
        </div>
      </div>
    </div>
  )
}
