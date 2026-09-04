'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Flame,
  Menu,
  MoreHorizontal,
  Play,
  Search,
  Settings,
  Target,
  Trophy,
  X,
  Zap,
} from 'lucide-react'

const decks = [
  { title: 'Validate BST', tag: 'Trees', cards: 7, done: 4, tone: 'cyan' },
  { title: 'Binary Search', tag: 'Arrays', cards: 5, done: 2, tone: 'amber' },
  { title: 'Number of Islands', tag: 'Graphs', cards: 10, done: 8, tone: 'violet' },
  { title: 'Two Pointers', tag: 'Patterns', cards: 6, done: 3, tone: 'blue' },
]

const nav = [
  { label: 'Overview', icon: BarChart3 },
  { label: 'Study decks', icon: BookOpen },
  { label: 'All Q&A', icon: Brain },
]

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [role, setRole] = useState('Software Engineer')
  const [started, setStarted] = useState(false)
  const [reviewed, setReviewed] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-sidebar px-5 py-6 transition-transform duration-200 lg:static lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Code2 size={19} /></div>
              <span className="font-mono text-lg font-bold tracking-tight">forge<span className="text-primary">.</span></span>
            </div>
            <button className="rounded-lg p-2 text-muted-foreground lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>
          </div>
          <p className="mt-12 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
          <nav className="mt-3 flex flex-col gap-1" aria-label="Workspace navigation">
            {nav.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${active === label ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                <Icon size={17} />{label}
              </button>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-1">
            <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"><Settings size={17} />Settings</button>
            <div className="mt-4 flex items-center gap-3 border-t border-border px-2 pt-5">
              <div className="grid size-9 place-items-center rounded-full bg-secondary font-mono text-xs font-bold">AK</div>
              <div className="min-w-0"><p className="truncate text-sm font-semibold">Alex Kim</p><p className="truncate text-xs text-muted-foreground">Candidate workspace</p></div>
              <MoreHorizontal size={16} className="ml-auto text-muted-foreground" />
            </div>
          </div>
        </aside>

        {mobileOpen && <button className="fixed inset-0 z-20 bg-foreground/20 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}

        <section className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-border px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-accent lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button><p className="text-sm text-muted-foreground">{active} <span className="px-2 text-border">/</span> <span className="text-foreground">Today</span></p></div>
            <div className="flex items-center gap-2"><button className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-accent sm:flex"><Search size={14} /> Search <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd></button><button className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-accent" aria-label="Notifications"><Clock3 size={16} /></button></div>
          </header>

          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">Thursday, September 4</p><h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">Good morning, Alex.</h1><p className="mt-2 max-w-xl text-pretty leading-6 text-muted-foreground">A focused session today is enough to keep your thinking sharp.</p></div><label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">Preparing for <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none"><option>Software Engineer</option><option>Senior Engineer</option><option>Systems Design</option></select><ChevronDown size={14} className="-ml-7 pointer-events-none" /></label></div>

            <div className="mt-10 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
              <section className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"><div className="flex flex-col justify-between gap-8 p-6 sm:p-8 md:flex-row"><div className="max-w-md"><div className="flex items-center gap-2 text-primary"><Zap size={16} fill="currentColor" /><span className="font-mono text-xs font-bold uppercase tracking-wider">Recommended next</span></div><h2 className="mt-5 text-2xl font-bold tracking-tight">Pattern recognition</h2><p className="mt-3 leading-6 text-muted-foreground">Practice the mental models behind common coding problems. Build signal, not just speed.</p><div className="mt-7 flex flex-wrap items-center gap-3"><button onClick={() => setStarted(!started)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">{started ? 'Session active' : 'Start 10 min session'}<Play size={15} fill="currentColor" /></button><span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Clock3 size={14} /> 10 min</span></div></div><div className="flex min-w-[150px] flex-col justify-end"><div className="font-mono text-5xl font-bold tracking-tighter">4<span className="text-lg text-muted-foreground"> / 10</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[40%] rounded-full bg-primary" /></div><p className="mt-2 text-xs text-muted-foreground">questions completed</p></div></div></section>
              <section className="rounded-2xl border border-border bg-secondary/60 p-6 sm:p-8"><div className="flex items-start justify-between"><div><p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">Current focus</p><h2 className="mt-4 text-xl font-bold">Trees & graphs</h2></div><div className="grid size-10 place-items-center rounded-xl bg-card text-primary"><Target size={19} /></div></div><div className="mt-8 flex items-end justify-between"><div><p className="font-mono text-3xl font-bold">68%</p><p className="mt-1 text-xs text-muted-foreground">topic accuracy</p></div><span className="rounded-full bg-card px-2.5 py-1 text-xs font-bold text-primary">+8% this week</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-card"><div className="h-full w-[68%] rounded-full bg-primary" /></div></section>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={BookOpen} label="Cards reviewed" value="24" detail="this week" /><Metric icon={Target} label="Accuracy" value="72%" detail="across all topics" /><Metric icon={Flame} label="Best session" value="18" detail="cards in 10 min" /><Metric icon={Trophy} label="Strongest topic" value="Arrays" detail="84% accuracy" /></div>

            <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">Continue learning</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Your study decks</h2></div><button onClick={() => setActive('Study decks')} className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">View all decks <ArrowRight size={15} /></button></div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{decks.map((deck) => <Deck key={deck.title} {...deck} />)}</div>

            <section className="mt-10 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-lg bg-secondary text-primary"><Brain size={16} /></div><h2 className="font-bold">Needs review</h2></div><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">You missed a few questions on recursive tree traversal. A quick review now could make the pattern stick.</p></div><button onClick={() => setReviewed(!reviewed)} className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-bold hover:bg-accent">{reviewed ? 'Added to session' : 'Review 6 cards'}<ArrowRight size={15} /></button></section>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ icon: Icon, label, value, detail }: { icon: typeof BookOpen; label: string; value: string; detail: string }) { return <div className="rounded-2xl border border-border bg-card p-5"><Icon size={17} className="text-primary" /><p className="mt-5 text-xs font-semibold text-muted-foreground">{label}</p><p className="mt-1 font-mono text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div> }
function Deck({ title, tag, cards, done, tone }: { title: string; tag: string; cards: number; done: number; tone: string }) { const toneClass = tone === 'cyan' ? 'bg-cyan' : tone === 'amber' ? 'bg-amber' : tone === 'violet' ? 'bg-violet' : 'bg-blue'; return <button className="group rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-1 hover:shadow-md"><div className={`mb-8 h-1 w-10 rounded-full ${toneClass}`} /><div className="flex items-start justify-between gap-3"><div><span className="rounded-md bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{tag}</span><h3 className="mt-3 font-bold">{title}</h3></div><ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-1" /></div><div className="mt-7 flex items-center justify-between text-xs text-muted-foreground"><span>{done} of {cards} reviewed</span><span>{Math.round((done / cards) * 100)}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${(done / cards) * 100}%` }} /></div></button> }
