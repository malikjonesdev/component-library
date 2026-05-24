import { useState } from 'react'
import { DocSection, type PropRow } from './docs-shell'
import { Badge, Button, Icon } from './ui'

const buttonProps: PropRow[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline'", defaultValue: "'primary'" },
  { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'" },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
]

const fieldProps: PropRow[] = [
  { name: 'label', type: 'string', defaultValue: '-' },
  { name: 'error', type: 'string', defaultValue: 'undefined' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
]

const tabProps: PropRow[] = [
  { name: 'value', type: 'string', defaultValue: '-' },
  { name: 'onValueChange', type: '(value) => void', defaultValue: '-' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'" },
]

const accordionItems = [
  {
    title: 'Does Tide support keyboard navigation?',
    body: 'Yes. Controls expose visible focus states and native keyboard interactions wherever possible.',
  },
  {
    title: 'Can design tokens be customized?',
    body: 'Semantic color tokens keep every component aligned across light and dark themes.',
  },
  {
    title: 'Is the layout responsive?',
    body: 'Navigation collapses on smaller screens while examples and API tables reflow cleanly.',
  },
]

const tabContent = {
  preview: {
    title: 'Live preview',
    text: 'Components render against semantic surface and border tokens.',
  },
  accessibility: {
    title: 'Accessibility',
    text: 'Roles, labels, keyboard focus, and sufficient contrast are built into examples.',
  },
  install: {
    title: 'Install',
    text: 'Import a primitive and customize it through variants and tokens.',
  },
}

export function ComponentShowcase({ onOpenModal }: { onOpenModal: () => void }) {
  const [noticeVisible, setNoticeVisible] = useState(true)
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>('preview')
  const [selectedPlan, setSelectedPlan] = useState('Pro workspace')
  const [email, setEmail] = useState('')

  return (
    <>
      <DocSection
        code={'<Button variant="primary">Save changes</Button>\n<Button variant="outline">Cancel</Button>'}
        description="Action controls with clear hierarchy, predictable focus treatment, and five semantic variants."
        id="buttons"
        preview={
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-stroke pt-5">
              <Button className="min-h-9 px-3 py-1.5" variant="primary">Small</Button>
              <Button disabled>Disabled</Button>
              <p className="text-xs text-muted">Tab to inspect focus states.</p>
            </div>
          </div>
        }
        props={buttonProps}
        states={['default', 'hover', 'focus-visible', 'disabled', 'loading']}
        title="Buttons"
      />

      <DocSection
        code={'<Card title="Starter">\n  <Badge tone="success">Active</Badge>\n</Card>'}
        description="Surface containers and compact status labels establish information hierarchy."
        id="cards"
        preview={
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="glass-panel rounded-xl border border-stroke p-4">
              <div className="flex justify-between gap-2">
                <p className="font-semibold">Design system</p>
                <Badge tone="success">Active</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">42 reusable patterns maintained by your team.</p>
              <Button className="mt-4 min-h-9" variant="outline">Open project</Button>
            </article>
            <article className="glass-panel rounded-xl border border-stroke p-4">
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">New</Badge>
                <Badge tone="warning">Review</Badge>
              </div>
              <p className="mt-4 text-sm font-medium">Release readiness</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-subtle">
                <div className="h-full w-3/4 rounded-full bg-brand" />
              </div>
            </article>
          </div>
        }
        props={[
          { name: 'padding', type: "'none' | 'md' | 'lg'", defaultValue: "'md'" },
          { name: 'elevated', type: 'boolean', defaultValue: 'false' },
        ]}
        states={['default', 'selected', 'interactive', 'status']}
        title="Cards & Badges"
      />

      <DocSection
        code={'<Input label="Work email" required />\n<Input label="Project URL" error="Enter a valid URL" />'}
        description="Inputs provide explicit labels, descriptions, validation feedback, and accessible focus rings."
        id="inputs"
        preview={
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <label className="block text-sm font-medium">
              Work email
              <input
                className="mt-2 block w-full rounded-lg border border-stroke bg-canvas px-3.5 py-2.5 text-sm placeholder:text-faint"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                type="email"
                value={email}
              />
              <span className="mt-1.5 block text-xs text-muted">We will never share your email.</span>
            </label>
            <label className="block text-sm font-medium">
              Project URL
              <input
                aria-describedby="url-error"
                aria-invalid="true"
                className="mt-2 block w-full rounded-lg border border-danger bg-canvas px-3.5 py-2.5 text-sm"
                defaultValue="not-a-url"
                type="text"
              />
              <span className="mt-1.5 block text-xs text-danger" id="url-error">Enter a valid URL.</span>
            </label>
          </form>
        }
        props={fieldProps}
        states={['empty', 'filled', 'focus', 'invalid', 'disabled']}
        title="Inputs"
      />

      <DocSection
        code={'<Alert tone="success">Changes saved successfully.</Alert>\n<Spinner aria-label="Loading" />'}
        description="Feedback communicates outcomes immediately and uses more than color alone."
        id="alerts"
        preview={
          <div className="space-y-3" aria-live="polite">
            {noticeVisible && (
              <div className="flex gap-3 rounded-xl border border-success/20 bg-success-soft p-4 text-sm text-success">
                <Icon className="mt-0.5 h-5 w-5 shrink-0" name="check" />
                <div className="flex-1">
                  <p className="font-semibold">Deployment complete</p>
                  <p className="mt-1 opacity-90">Production is now serving version 2.4.</p>
                </div>
                <button aria-label="Dismiss notification" onClick={() => setNoticeVisible(false)} type="button">
                  <Icon className="h-4 w-4" name="close" />
                </button>
              </div>
            )}
            {!noticeVisible && (
              <Button onClick={() => setNoticeVisible(true)} variant="outline">Restore alert</Button>
            )}
            <div className="flex items-center gap-3 rounded-xl border border-stroke p-4 text-sm text-muted">
              <span aria-label="Loading" className="h-5 w-5 animate-spin rounded-full border-2 border-brand/25 border-t-brand" role="status" />
              Synchronizing component tokens...
            </div>
          </div>
        }
        props={[
          { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'" },
          { name: 'dismissible', type: 'boolean', defaultValue: 'false' },
        ]}
        states={['information', 'success', 'warning', 'loading', 'dismissed']}
        title="Alerts & Loaders"
      />

      <DocSection
        code={'<Modal open={open} onClose={close} title="Invite member" />'}
        description="Modal dialogs focus the user on a decision and support Escape-key dismissal."
        id="modal"
        preview={
          <div className="rounded-xl border border-stroke bg-gradient-to-br from-brand-soft to-accent-soft p-5">
            <div className="flex min-h-28 items-center justify-center rounded-lg bg-canvas/40">
              <Button onClick={onOpenModal}>Open modal</Button>
            </div>
          </div>
        }
        props={[
          { name: 'open', type: 'boolean', defaultValue: 'false' },
          { name: 'onClose', type: '() => void', defaultValue: '-' },
          { name: 'title', type: 'string', defaultValue: '-' },
        ]}
        states={['closed', 'open', 'confirming', 'escape-dismiss']}
        title="Modal"
      />

      <DocSection
        code={'<Table columns={columns} data={members} caption="Team members" />'}
        description="Tables keep dense operational data legible, aligned, and responsive."
        id="table"
        preview={
          <div className="overflow-x-auto rounded-xl border border-stroke">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Team member access</caption>
              <thead className="bg-subtle text-muted">
                <tr>
                  {['Member', 'Role', 'Status', 'Last active'].map((cell) => (
                    <th className="px-4 py-3 font-medium" key={cell}>{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke">
                {[
                  ['Olivia Chen', 'Designer', 'Active', 'Today'],
                  ['Mason Lee', 'Developer', 'Review', 'Yesterday'],
                  ['Amara Cole', 'Manager', 'Active', '2h ago'],
                ].map(([name, role, status, active]) => (
                  <tr className="bg-surface/60" key={name}>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{name}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">{role}</td>
                    <td className="px-4 py-3"><Badge tone={status === 'Active' ? 'success' : 'warning'}>{status}</Badge></td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">{active}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        props={[
          { name: 'columns', type: 'Column[]', defaultValue: '-' },
          { name: 'data', type: 'Row[]', defaultValue: '[]' },
          { name: 'caption', type: 'string', defaultValue: '-' },
        ]}
        states={['loading', 'populated', 'empty', 'sorted']}
        title="Tables"
      />

      <DocSection
        code={'<Accordion items={faq} allowMultiple={false} />'}
        description="Native disclosure interactions make frequently asked questions easy to scan and operate."
        id="accordion"
        preview={
          <div className="divide-y divide-stroke overflow-hidden rounded-xl border border-stroke">
            {accordionItems.map((item, index) => (
              <details className="group bg-surface/60 p-4" key={item.title} open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {item.title}
                  <Icon className="h-4 w-4 shrink-0 transition group-open:rotate-180" name="chevron" />
                </summary>
                <p className="pt-3 text-sm leading-6 text-muted">{item.body}</p>
              </details>
            ))}
          </div>
        }
        props={[
          { name: 'items', type: 'Item[]', defaultValue: '[]' },
          { name: 'allowMultiple', type: 'boolean', defaultValue: 'false' },
        ]}
        states={['collapsed', 'expanded', 'focus-visible']}
        title="Accordions"
      />

      <DocSection
        code={'<Tabs value="preview" onValueChange={setValue} />'}
        description="Tabs organize related content without making users leave their current context."
        id="tabs"
        preview={
          <div>
            <div aria-label="Documentation views" className="flex border-b border-stroke" role="tablist">
              {(Object.keys(tabContent) as (keyof typeof tabContent)[]).map((tab) => (
                <button
                  aria-controls={`panel-${tab}`}
                  aria-selected={activeTab === tab}
                  className={`border-b-2 px-4 pb-3 pt-1 text-sm font-medium capitalize transition ${activeTab === tab ? 'border-brand text-brand-strong dark:text-brand-light' : 'border-transparent text-muted hover:text-text'}`}
                  id={`tab-${tab}`}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
            <div
              aria-labelledby={`tab-${activeTab}`}
              className="rounded-b-xl bg-canvas p-5"
              id={`panel-${activeTab}`}
              role="tabpanel"
            >
              <p className="font-semibold">{tabContent[activeTab].title}</p>
              <p className="mt-2 text-sm text-muted">{tabContent[activeTab].text}</p>
            </div>
          </div>
        }
        props={tabProps}
        states={['inactive', 'active', 'focus', 'disabled']}
        title="Tabs"
      />

      <DocSection
        code={'<Select label="Workspace" options={plans} value={plan} />'}
        description="Dropdowns surface choices efficiently while preserving a visible field label."
        id="dropdown"
        preview={
          <label className="block max-w-sm text-sm font-medium">
            Workspace plan
            <select
              className="mt-2 block w-full appearance-none rounded-lg border border-stroke bg-canvas px-3.5 py-2.5 text-sm"
              onChange={(event) => setSelectedPlan(event.target.value)}
              value={selectedPlan}
            >
              <option>Starter workspace</option>
              <option>Pro workspace</option>
              <option>Enterprise workspace</option>
            </select>
            <span className="mt-2 block text-xs text-muted">Selected: {selectedPlan}</span>
          </label>
        }
        props={[
          { name: 'options', type: 'Option[]', defaultValue: '[]' },
          { name: 'value', type: 'string', defaultValue: '-' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false' },
        ]}
        states={['closed', 'open', 'selected', 'disabled']}
        title="Dropdowns"
      />

      <DocSection
        code={'<Sidebar activeItem="Dashboard" collapsible />\n<Nav notifications={3} />'}
        description="Navigation patterns scale from compact products to full application workspaces."
        id="navigation"
        preview={
          <div className="overflow-hidden rounded-xl border border-stroke bg-canvas/50">
            <div className="glass-panel flex h-12 items-center border-b border-stroke px-4">
              <span className="font-semibold">Workspace</span>
              <button aria-label="3 notifications" className="relative ml-auto rounded-lg p-2 text-muted" type="button">
                <Icon className="h-4 w-4" name="bell" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger" />
              </button>
            </div>
            <div className="flex min-h-36">
              <nav aria-label="Example sidebar" className="glass-panel w-36 border-r border-stroke p-2 text-sm">
                {['Dashboard', 'Projects', 'Settings'].map((item, index) => (
                  <a
                    className={`block rounded-md px-3 py-2 ${index === 0 ? 'bg-brand-soft text-brand-strong dark:text-brand-light' : 'text-muted'}`}
                    href="#navigation"
                    key={item}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div className="flex-1 p-4">
                <div className="h-3 w-24 rounded bg-subtle" />
                <div className="mt-4 h-2 w-full rounded bg-subtle" />
                <div className="mt-2 h-2 w-2/3 rounded bg-subtle" />
              </div>
            </div>
          </div>
        }
        props={[
          { name: 'items', type: 'NavItem[]', defaultValue: '[]' },
          { name: 'activeItem', type: 'string', defaultValue: '-' },
          { name: 'collapsible', type: 'boolean', defaultValue: 'true' },
        ]}
        states={['expanded', 'collapsed', 'active route', 'mobile drawer']}
        title="Navigation & Sidebars"
      />
    </>
  )
}
