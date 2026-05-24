import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    logo: <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Zm0 4L7 8.7v6.6l5 2.7 5-2.7V8.7L12 6Zm0 3 3 1.7v3.1L12 15.5 9 13.8v-3.1L12 9Z" />,
    moon: <path d="M20.7 15.2A8.5 8.5 0 0 1 8.8 3.3a8.5 8.5 0 1 0 11.9 11.9Z" />,
    sun: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1m0-14.2L17 7M7 17l-2.1 2.1" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    search: <path d="m20 20-4.5-4.5M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bell: <path d="M6 10a6 6 0 0 1 12 0v5l2 2H4l2-2v-5Zm4 10h4" />,
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline'
}) {
  const variants = {
    primary: 'brand-gradient text-[#0b1120] hover:brightness-110 shadow-sm shadow-brand/25',
    secondary: 'bg-brand-soft text-brand-strong hover:bg-brand-soft/70 dark:text-brand-light',
    destructive: 'bg-danger text-white hover:bg-danger-strong',
    ghost: 'bg-transparent text-text hover:bg-subtle',
    outline: 'border border-stroke bg-surface text-text hover:bg-subtle',
  }

  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'brand'
}) {
  const tones = {
    neutral: 'bg-subtle text-muted',
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
    brand: 'bg-brand-soft text-brand-strong dark:text-brand-light',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}
