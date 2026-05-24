# Tide UI

Tide UI is a React component-system showcase built with TypeScript, Tailwind CSS, and Vite. It presents reusable interface patterns in a documentation-style layout with live examples, usage snippets, props tables, and visible component states.

## Features

- Interactive component documentation with previews, usage examples, props, and states.
- Dark-first theme with a persisted light-mode toggle.
- Responsive documentation layout with desktop sidebar and mobile navigation drawer.
- Accessible interaction details including visible focus styles, form labels, validation messages, table caption, native disclosures, modal semantics, and Escape-key dialog dismissal.
- Semantic design tokens mapped into Tailwind utilities through Tailwind CSS v4.

## Component Showcase

The application documents and demonstrates:

- Buttons with `primary`, `secondary`, `destructive`, `outline`, and `ghost` variants
- Cards and badges
- Form inputs and invalid-field feedback
- Alerts and loading indicators
- Modal dialog
- Data table
- Accordion disclosures
- Tabs
- Select dropdown
- Application navigation and sidebar patterns

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS 4 with `@tailwindcss/vite`
- Vite 8
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address reported by Vite, typically:

```text
http://localhost:5173/
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Type-check the project and create a production bundle in `dist/`. |
| `npm run preview` | Serve the production bundle locally. |
| `npm run lint` | Run ESLint over the project source. |

## Project Structure

```text
src/
  components/
    ComponentShowcase.tsx  # Documented interactive component examples
    docs-shell.tsx          # Header, sidebar, overview, doc layout, modal
    ui.tsx                  # Button, badge, and icon primitives
  App.tsx                   # Theme and modal state; page composition
  index.css                 # Tide tokens, Tailwind theme mapping, global effects
  main.tsx                  # React entry point
```

## Theme System

Tide UI defaults to dark mode and stores the selected theme in local storage using `tide-theme`. Color tokens are defined in `src/index.css` and exposed as semantic Tailwind colors, allowing component classes such as `bg-canvas`, `bg-surface`, `text-muted`, and `text-brand-strong`.

Core dark-mode palette:

| Token | Value | Usage |
| --- | --- | --- |
| Canvas | `#0B1120` | Primary page background |
| Surface | `#111827` | Panels and component surfaces |
| Brand | `#2DD4BF` | Primary teal accent |
| Accent | `#38BDF8` | Gradient and secondary highlight |
| Text | `#F8FAFC` | Main foreground text |
| Muted | `#94A3B8` | Secondary copy and labels |

Custom presentation helpers include:

- `.glass-panel` for blurred translucent surfaces
- `.brand-gradient` for teal-to-sky accents
- `.brand-glow` for restrained luminous emphasis

## Application Architecture

`App.tsx` owns only page-level concerns: the active theme and whether the example invite modal is open. `docs-shell.tsx` composes the documentation experience, including navigation and the reusable documentation section wrapper. `ComponentShowcase.tsx` contains local state for interactive examples such as tabs, alerts, input values, and dropdown selection. Basic visual primitives live in `ui.tsx`.

This separation keeps component examples easy to extend without expanding the application root.

## Accessibility Notes

- All interactive elements receive visible keyboard focus styling.
- Inputs use visible labels and the invalid URL sample uses `aria-invalid` and `aria-describedby`.
- The table preview includes an accessible caption.
- Alerts use an `aria-live` region for state changes.
- The modal uses `role="dialog"` and `aria-modal`, focuses its input on open, disables background scrolling, and closes on `Escape`.
- Accordion examples use native `details` and `summary` interactions.

## Adding A Component Demo

1. Add its interactive preview and metadata in `src/components/ComponentShowcase.tsx`.
2. Wrap it with `DocSection` to provide a consistent preview, usage, props, and states layout.
3. Add the section link to `navItems` in `src/components/docs-shell.tsx`.
4. Use semantic token utilities instead of fixed color values when styling the example.

## Production Build

Create the optimized production output:

```bash
npm run build
```

The bundled application is written to `dist/` and can be tested locally with:

```bash
npm run preview
```
