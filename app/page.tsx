import Link from 'next/link'

const DEMOS = [
  {
    href: '/sir-forms',
    icon: '⚡',
    title: 'sir-forms',
    tag: 'v0.2.0',
    desc: 'Type-safe React forms — FormProvider, field hooks, server actions, React 19 compatible',
    gradient: 'linear-gradient(135deg, #0d0221, #1e0a3c, #0d1b4b)',
    accent: '#8b5cf6',
    border: 'rgba(139,92,246,0.3)',
    btnGrad: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  },
  {
    href: '/features',
    icon: '🚀',
    title: 'ichchi-state',
    tag: 'Advanced',
    desc: 'Computed values, time-travel debugging, optimistic updates, cross-tab sync',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    accent: '#a78bfa',
    border: 'rgba(167,139,250,0.3)',
    btnGrad: 'linear-gradient(135deg, #6366f1, #a78bfa)',
  },
  {
    href: '/config',
    icon: '⚙️',
    title: 'turar-config',
    tag: 'v0.2.0',
    desc: 'Hot reload, YAML/TOML support, type-safe env validation with bylyt-env-guard',
    gradient: 'linear-gradient(135deg, #001a2d, #002040, #001a1a)',
    accent: '#06b6d4',
    border: 'rgba(6,182,212,0.3)',
    btnGrad: 'linear-gradient(135deg, #0284c7, #06b6d4)',
  },
  {
    href: '/suruy',
    icon: '✍️',
    title: 'suruy-form-actions',
    tag: 'v0.1.0',
    desc: 'Server Actions with progressive enhancement — file uploads, Zod, zero-dep validator, ~3KB',
    gradient: 'linear-gradient(135deg, #1a0a00, #2d1400, #1a0a1a)',
    accent: '#fb923c',
    border: 'rgba(249,115,22,0.3)',
    btnGrad: 'linear-gradient(135deg, #f97316, #ef4444)',
  },
  {
    href: '/comparison',
    icon: '⚖️',
    title: 'Library Comparison',
    tag: 'sir-forms vs suruy',
    desc: 'Feature comparison table and side-by-side code examples for both form libraries',
    gradient: 'linear-gradient(135deg, #1a0030, #2d0050, #1a1a00)',
    accent: '#e879f9',
    border: 'rgba(232,121,249,0.3)',
    btnGrad: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    href: '/hybrid',
    icon: '🔄',
    title: 'Hybrid Forms',
    tag: 'Best of both',
    desc: 'Combine suruy-form-actions server validation with sir-forms client state management',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #1a0a1a)',
    accent: '#f5576c',
    border: 'rgba(245,87,108,0.3)',
    btnGrad: 'linear-gradient(135deg, #667eea, #f5576c)',
  },
  {
    href: '/logging',
    icon: '📝',
    title: 'suruk-logger',
    tag: 'Interactive',
    desc: 'Structured logging with Pino — 5-10x faster than Winston, child loggers, redaction',
    gradient: 'linear-gradient(135deg, #001a00, #002d00, #001a10)',
    accent: '#10b981',
    border: 'rgba(16,185,129,0.3)',
    btnGrad: 'linear-gradient(135deg, #059669, #10b981)',
  },
  {
    href: '/chrono-tz',
    icon: '⏰',
    title: 'tuuru-chrono-tz',
    tag: 'v0.1.0',
    desc: 'TypeScript-first date/time — 568 IANA timezones, 10 locales, immutable API, zero deps, <20KB',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    accent: '#6366f1',
    border: 'rgba(99,102,241,0.3)',
    btnGrad: 'linear-gradient(135deg, #6366f1, #a78bfa)',
  },
]

const LIBRARIES = [
  { name: '@yedoma-labs/sir-forms', version: 'v0.2.0', desc: 'Type-safe server actions (React 19 compatible)', color: '#8b5cf6' },
  { name: '@yedoma-labs/suruy-form-actions', version: 'v0.1.0', desc: 'Progressive enhancement forms (~3KB, zero deps validator)', color: '#fb923c' },
  { name: '@yedoma-labs/ichchi-state', version: 'latest', desc: 'Atomic state management with persistence & cross-tab sync', color: '#a78bfa' },
  { name: '@yedoma-labs/bylyt-env-guard', version: 'latest', desc: 'Environment variable validation with type safety', color: '#06b6d4' },
  { name: '@yedoma-labs/suruk-logger', version: 'latest', desc: 'Winston-compatible Pino wrapper (5-10x faster)', color: '#10b981' },
  { name: '@yedoma-labs/turar-config', version: 'v0.2.0', desc: 'Hot reload config — YAML, TOML, JSON, Vault integration', color: '#38bdf8' },
  { name: '@yedoma-labs/tuuru-chrono-tz', version: 'v0.1.0', desc: 'TypeScript-first date/time with IANA timezone support (zero deps, <20KB)', color: '#6366f1' },
]

export default function Home() {
  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', minHeight: '100vh' }}>
      <style>{`
        html, body { background: #0f172a !important; }
        * { box-sizing: border-box; }
        h1, h2, h3, h4 { color: #f1f5f9; }
        p { color: #94a3b8; }
        a { text-decoration: none; }
      `}</style>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        borderRadius: '28px', padding: '4rem 3rem', marginBottom: '3.5rem',
        border: '1px solid rgba(99,102,241,0.2)', position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: '-80px', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '15%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(245,87,108,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#6366f1', background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)', borderRadius: '100px', padding: '0.35rem 1rem',
            marginBottom: '1.5rem',
          }}>
            @yedoma-labs
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#f1f5f9', marginBottom: '1rem', lineHeight: 1.1 }}>
            TypeScript Stack Demo
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Interactive playground for every <strong style={{ color: '#a78bfa' }}>@yedoma-labs</strong> npm package — forms, state, config, logging, date/time, and more.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Next.js 16', 'React 19', 'TypeScript', 'Server Actions'].map(tag => (
              <span key={tag} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '0.3rem 0.9rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Demo grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {DEMOS.map(({ href, icon, title, tag, desc, gradient, accent, border, btnGrad }) => (
          <div key={href} style={{
            background: gradient, borderRadius: '20px', padding: '2rem',
            border: `1px solid ${border}`, display: 'flex', flexDirection: 'column',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{icon}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <h2 style={{ color: '#f1f5f9', margin: 0, fontSize: '1.2rem' }}>{title}</h2>
              <span style={{ background: `${accent}20`, color: accent, fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '100px', border: `1px solid ${accent}40` }}>
                {tag}
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.5, flex: 1, marginBottom: '1.5rem' }}>
              {desc}
            </p>
            <Link href={href} style={{
              display: 'block', textAlign: 'center', padding: '0.65rem 1.5rem',
              background: btnGrad, color: 'white', fontWeight: 700,
              borderRadius: '10px', fontSize: '0.875rem',
              boxShadow: `0 4px 15px ${accent}30`,
            }}>
              View Demo →
            </Link>
          </div>
        ))}
      </div>

      {/* Libraries footer */}
      <footer style={{ borderTop: '1px solid #1e293b', paddingTop: '3rem' }}>
        <h2 style={{ color: '#f1f5f9', marginBottom: '1.5rem', fontSize: '1.5rem' }}>📦 Libraries Used</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {LIBRARIES.map(({ name, version, desc, color }) => (
            <div key={name} style={{ background: 'rgba(30,41,59,0.5)', borderRadius: '10px', padding: '1rem', border: `1px solid ${color}20`, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '4px', borderRadius: '2px', background: color, alignSelf: 'stretch', flexShrink: 0 }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'monospace' }}>{name}</span>
                  <span style={{ color, fontSize: '0.7rem', fontWeight: 700 }}>{version}</span>
                </div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.4 }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.875rem', color: '#94a3b8' }}>
          🔒 <strong style={{ color: '#f59e0b' }}>bylyt-env-guard:</strong> Demo mode enabled — form submissions logged to server console instead of making real API calls.
        </div>
      </footer>
    </main>
  )
}
