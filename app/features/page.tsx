'use client'

import { useServerAction } from '@yedoma-labs/sir-forms'
import { useState, useEffect } from 'react'
import {
  computed,
  crossTabSync,
  createSnapshots,
  createOptimisticUpdates,
} from '@yedoma-labs/ichchi-state'
import { formStore, useFormState } from '@/lib/formStore'
import { incrementLikes, addTodoOptimistic } from './actions'
import { storeLogger } from '@/lib/clientLogger'
import Link from 'next/link'

// ─── Module-level setup (unchanged) ─────────────────────────────────────────

const submissionStats = computed(formStore, (state) => ({
  hasSubmissions: state.submissionCount > 0,
  isActive: state.submissionCount >= 3,
  lastWeek: state.recentSubmissions.filter(s => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return new Date(s.timestamp).getTime() > weekAgo
  }).length,
}))

if (typeof window !== 'undefined') {
  crossTabSync(formStore, { key: 'yedoma-labs-demo-sync', syncDelay: 100 })
}

const snapshots = createSnapshots(formStore)
const optimistic = createOptimisticUpdates(formStore)

// ─── Feature Components ──────────────────────────────────────────────────────

function LikeButton() {
  const [likes, setLikes] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const executeAction = useServerAction(incrementLikes)

  const handleLike = async () => {
    setLoading(true)
    setError(null)
    const result = await executeAction({ count: likes })
    setLoading(false)
    if (result.success && result.data) {
      setLikes(result.data.count)
    } else if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div style={{ background:'#0a0f1e',borderRadius:'12px',padding:'1.5rem',border:'1px solid #1e293b',height:'100%' }}>
      <div style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(99,102,241,0.12)',border:'1px solid rgba(99,102,241,0.3)',padding:'0.25rem 0.65rem',borderRadius:'2rem',marginBottom:'0.75rem' }}>
        <span style={{ color:'#a78bfa',fontSize:'0.7rem',fontWeight:700 }}>useServerAction</span>
      </div>
      <h3 style={{ color:'#e2e8f0',marginBottom:'0.4rem',fontSize:'1rem',fontWeight:700 }}>🚀 Server Action Hook</h3>
      <p style={{ color:'#64748b',fontSize:'0.78rem',marginBottom:'1.25rem',lineHeight:1.5 }}>
        Wrapped server action with automatic error boundary and loading state.
      </p>
      <div style={{ display:'flex',alignItems:'center',gap:'1rem' }}>
        <button
          type="button"
          onClick={handleLike}
          disabled={loading}
          style={{
            padding:'0.75rem 1.5rem',fontSize:'1.25rem',
            background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'white',
            border:'none',borderRadius:'10px',cursor:loading ? 'not-allowed' : 'pointer',
            opacity:loading ? 0.6 : 1,fontWeight:700,
          }}
        >
          {loading ? '⏳' : '👍'} {likes}
        </button>
        {loading && <span style={{ color:'#64748b',fontSize:'0.8rem' }}>Loading…</span>}
      </div>
      {error && <div style={{ color:'#ef4444',marginTop:'0.75rem',fontSize:'0.8rem' }}>Error: {error}</div>}
    </div>
  )
}

function ComputedStats() {
  const [stats, setStats] = useState(submissionStats.get())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const unsub = submissionStats.subscribe(setStats)
    return unsub
  }, [])

  return (
    <div style={{ background:'#0a0f1e',borderRadius:'12px',padding:'1.5rem',border:'1px solid #1e293b',height:'100%' }}>
      <div style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(16,185,129,0.12)',border:'1px solid rgba(16,185,129,0.3)',padding:'0.25rem 0.65rem',borderRadius:'2rem',marginBottom:'0.75rem' }}>
        <span style={{ color:'#34d399',fontSize:'0.7rem',fontWeight:700 }}>computed()</span>
      </div>
      <h3 style={{ color:'#e2e8f0',marginBottom:'0.4rem',fontSize:'1rem',fontWeight:700 }}>🧮 Computed Values</h3>
      <p style={{ color:'#64748b',fontSize:'0.78rem',marginBottom:'1.25rem',lineHeight:1.5 }}>
        Auto-updating derived state from formStore — updates whenever the store changes.
      </p>
      {!mounted ? (
        <p style={{ color:'#334155',fontSize:'0.8rem' }}>Loading…</p>
      ) : (
        <div style={{ display:'flex',flexDirection:'column',gap:'0.5rem' }}>
          {[
            { label:'Has submissions',         value: stats.hasSubmissions ? '✅ Yes' : '❌ No',       color: stats.hasSubmissions ? '#10b981' : '#475569' },
            { label:'Active user (3+)',         value: stats.isActive ? '🔥 Yes' : '❌ No',           color: stats.isActive ? '#f59e0b' : '#475569' },
            { label:'Submissions this week',    value: String(stats.lastWeek),                        color: '#a78bfa' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',background:'#1e293b',borderRadius:'6px',padding:'0.5rem 0.75rem' }}>
              <span style={{ color:'#64748b',fontSize:'0.78rem' }}>{label}</span>
              <span style={{ color,fontSize:'0.82rem',fontWeight:700,fontFamily:'monospace' }}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TimeTravelDebugger() {
  const [snapshotList, setSnapshotList] = useState<any[]>([])

  const createSnapshot = () => {
    const id = `snapshot-${Date.now()}`
    snapshots.create(id, `Manual snapshot at ${new Date().toLocaleTimeString()}`)
    setSnapshotList(snapshots.list())
  }

  const restore = (id: string) => {
    if (snapshots.restore(id)) alert(`Restored to snapshot: ${id}`)
  }

  const showDiff = (id: string) => {
    const diff = snapshots.diff(id)
    storeLogger.info('Snapshot diff', { diff })
    alert(`Check console for diff from snapshot ${id}`)
  }

  return (
    <div style={{ background:'#0a0f1e',borderRadius:'12px',padding:'1.5rem',border:'1px solid #1e293b',height:'100%' }}>
      <div style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(245,158,11,0.12)',border:'1px solid rgba(245,158,11,0.3)',padding:'0.25rem 0.65rem',borderRadius:'2rem',marginBottom:'0.75rem' }}>
        <span style={{ color:'#fbbf24',fontSize:'0.7rem',fontWeight:700 }}>createSnapshots()</span>
      </div>
      <h3 style={{ color:'#e2e8f0',marginBottom:'0.4rem',fontSize:'1rem',fontWeight:700 }}>⏱️ Time-Travel Debugging</h3>
      <p style={{ color:'#64748b',fontSize:'0.78rem',marginBottom:'1.25rem',lineHeight:1.5 }}>
        Snapshot and restore state at any point in time.
      </p>
      <button
        type="button"
        onClick={createSnapshot}
        style={{ background:'linear-gradient(135deg,#78350f,#f59e0b)',color:'white',border:'none',borderRadius:'8px',padding:'0.55rem 1.1rem',fontSize:'0.8rem',fontWeight:700,cursor:'pointer',marginBottom:'1rem' }}
      >
        📸 Create Snapshot
      </button>
      <div style={{ maxHeight:'200px',overflowY:'auto',display:'flex',flexDirection:'column',gap:'0.4rem' }}>
        {snapshotList.length === 0 ? (
          <p style={{ color:'#334155',fontSize:'0.78rem' }}>No snapshots yet. Create one above!</p>
        ) : snapshotList.map((snap) => (
          <div key={snap.id} style={{ background:'#1e293b',borderRadius:'6px',padding:'0.6rem 0.75rem',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.75rem' }}>
            <div>
              <div style={{ color:'#e2e8f0',fontSize:'0.78rem',fontWeight:600 }}>{snap.label}</div>
              <div style={{ color:'#475569',fontSize:'0.65rem',fontFamily:'monospace' }}>{new Date(snap.timestamp).toLocaleString()}</div>
            </div>
            <div style={{ display:'flex',gap:'0.4rem',flexShrink:0 }}>
              <button type="button" onClick={() => restore(snap.id)} style={{ padding:'0.2rem 0.5rem',background:'rgba(16,185,129,0.2)',border:'1px solid rgba(16,185,129,0.4)',borderRadius:'4px',color:'#10b981',fontSize:'0.65rem',cursor:'pointer' }}>↩️ Restore</button>
              <button type="button" onClick={() => showDiff(snap.id)}  style={{ padding:'0.2rem 0.5rem',background:'rgba(99,102,241,0.2)',border:'1px solid rgba(99,102,241,0.4)',borderRadius:'4px',color:'#a78bfa',fontSize:'0.65rem',cursor:'pointer' }}>🔍 Diff</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OptimisticTodoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [pending, setPending] = useState<Set<string>>(new Set())

  const addTodo = async () => {
    if (!newTodo.trim()) return
    const id = `todo-${Date.now()}`
    setPending(prev => new Set(prev).add(id))
    setTodos(prev => [...prev, newTodo])
    const todoText = newTodo
    setNewTodo('')
    try {
      await optimistic.optimistic(
        id,
        (state) => ({ ...state }),
        async () => {
          const result = await addTodoOptimistic({ text: todoText })
          if (!result.success) throw new Error('Failed to add todo')
          return result
        },
      )
      setPending(prev => { const n = new Set(prev); n.delete(id); return n })
    } catch {
      setTodos(prev => prev.filter(t => t !== todoText))
      setPending(prev => { const n = new Set(prev); n.delete(id); return n })
      alert('Failed to add todo — rolled back')
    }
  }

  return (
    <div style={{ background:'#0a0f1e',borderRadius:'12px',padding:'1.5rem',border:'1px solid #1e293b',height:'100%' }}>
      <div style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(139,92,246,0.12)',border:'1px solid rgba(139,92,246,0.3)',padding:'0.25rem 0.65rem',borderRadius:'2rem',marginBottom:'0.75rem' }}>
        <span style={{ color:'#c4b5fd',fontSize:'0.7rem',fontWeight:700 }}>optimistic()</span>
      </div>
      <h3 style={{ color:'#e2e8f0',marginBottom:'0.4rem',fontSize:'1rem',fontWeight:700 }}>⚡ Optimistic Updates</h3>
      <p style={{ color:'#64748b',fontSize:'0.78rem',marginBottom:'1.25rem',lineHeight:1.5 }}>
        Instant UI updates with automatic rollback on failure.
      </p>
      <div style={{ display:'flex',gap:'0.5rem',marginBottom:'1rem' }}>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="New todo…"
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          style={{ flex:1,padding:'0.55rem 0.75rem',background:'#1e293b',border:'1px solid #334155',borderRadius:'7px',color:'#e2e8f0',fontSize:'0.85rem' }}
        />
        <button type="button" onClick={addTodo} style={{ padding:'0.55rem 1rem',background:'linear-gradient(135deg,#4c1d95,#8b5cf6)',color:'white',border:'none',borderRadius:'7px',cursor:'pointer',fontSize:'0.85rem',fontWeight:700,flexShrink:0 }}>Add</button>
      </div>
      <div style={{ display:'flex',flexDirection:'column',gap:'0.4rem',maxHeight:180,overflowY:'auto' }}>
        {todos.length === 0 ? (
          <p style={{ color:'#334155',fontSize:'0.78rem' }}>No todos yet. Add one above!</p>
        ) : todos.map((todo, idx) => (
          <div key={idx} style={{ background:'#1e293b',borderRadius:'6px',padding:'0.5rem 0.75rem',display:'flex',alignItems:'center',gap:'0.5rem',opacity:pending.size > 0 ? 0.7 : 1,transition:'opacity 0.2s' }}>
            <span style={{ color:'#a78bfa',fontSize:'0.65rem' }}>●</span>
            <span style={{ color:'#e2e8f0',fontSize:'0.82rem' }}>{todo}</span>
            {pending.size > 0 && <span style={{ marginLeft:'auto',color:'#64748b',fontSize:'0.7rem' }}>⏳</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  const formState = useFormState()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <style>{`
        html, body { background: #0f172a !important; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>

      <div style={{ background:'#0f172a',minHeight:'100vh',color:'#e2e8f0' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',padding:'2rem' }}>

          {/* Hero */}
          <div style={{
            background:'linear-gradient(135deg,#0f0c29,#1e1b4b,#0f172a)',
            borderRadius:'24px',padding:'3rem',marginBottom:'1.5rem',
            border:'1px solid rgba(139,92,246,0.25)',position:'relative',overflow:'hidden',
          }}>
            <div style={{ position:'absolute',top:0,left:0,right:0,bottom:0,background:'radial-gradient(ellipse at 80% 50%,rgba(139,92,246,0.12) 0%,transparent 60%)',pointerEvents:'none' }} />
            <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:'1.5rem',position:'relative' }}>
              <div>
                <div style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(139,92,246,0.12)',border:'1px solid rgba(139,92,246,0.3)',padding:'0.3rem 0.8rem',borderRadius:'2rem',marginBottom:'1rem' }}>
                  <code style={{ color:'#c4b5fd',fontSize:'0.75rem',fontWeight:700 }}>@yedoma-labs/ichchi-state</code>
                </div>
                <h1 style={{ fontSize:'clamp(1.75rem,4vw,3rem)',fontWeight:900,margin:'0 0 0.5rem',background:'linear-gradient(135deg,#e2e8f0,#c4b5fd,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1.05 }}>
                  Advanced Features
                </h1>
                <p style={{ color:'#94a3b8',fontSize:'1rem',margin:'0 0 1.5rem',maxWidth:500 }}>
                  Computed values, time-travel debugging, optimistic updates, and cross-tab sync — all powered by ichchi-state.
                </p>
                <div style={{ display:'flex',gap:'0.6rem',flexWrap:'wrap' }}>
                  {['Computed Values','Time-Travel Debug','Optimistic Updates','Cross-Tab Sync','useServerAction','Atomic State'].map(t => (
                    <span key={t} style={{ padding:'0.3rem 0.7rem',background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.25)',borderRadius:'6px',color:'#c4b5fd',fontSize:'0.72rem',fontWeight:700 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize:'5rem',lineHeight:1,animation:'float 4s ease-in-out infinite',flexShrink:0 }}>🚀</div>
            </div>
          </div>

          <div style={{ marginBottom:'1.5rem' }}>
            <Link href="/" style={{ color:'#8b5cf6',textDecoration:'none',fontSize:'0.85rem' }}>← All Demos</Link>
          </div>

          {/* Feature Grid */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:'1.25rem',marginBottom:'1.5rem' }}>
            <LikeButton />
            <ComputedStats />
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:'1.25rem',marginBottom:'1.5rem' }}>
            <TimeTravelDebugger />
            <OptimisticTodoList />
          </div>

          {/* Cross-Tab Sync banner */}
          <div style={{
            background:'linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.1))',
            border:'1px solid rgba(16,185,129,0.3)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1.5rem',
          }}>
            <h3 style={{ color:'#34d399',marginBottom:'0.5rem',fontSize:'1rem',fontWeight:700 }}>📡 Cross-Tab Sync Active</h3>
            <p style={{ color:'#64748b',fontSize:'0.85rem',marginBottom:'0.5rem' }}>
              Open this page in multiple tabs and submit the contact form on the home page.
              All tabs sync automatically via localStorage BroadcastChannel events!
            </p>
            {mounted && (
              <p style={{ color:'#a78bfa',fontSize:'0.85rem',fontFamily:'monospace',margin:0 }}>
                Current submission count: <strong style={{ color:'#c4b5fd' }}>{formState.submissionCount}</strong>
              </p>
            )}
          </div>

          {/* Footer */}
          <div style={{ textAlign:'center',padding:'2rem 1rem',borderTop:'1px solid #1e293b',color:'#334155' }}>
            <p style={{ marginBottom:'0.5rem' }}>
              <span style={{ background:'linear-gradient(135deg,#c4b5fd,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',fontWeight:800,fontSize:'1rem' }}>
                ichchi-state advanced features
              </span>
            </p>
            <p style={{ fontSize:'0.8rem' }}>
              <Link href="/" style={{ color:'#8b5cf6',textDecoration:'none' }}>← Yedoma Labs Demo Hub</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
