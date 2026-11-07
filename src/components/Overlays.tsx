import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { scrollStore, smooth } from '../store'

const CHAPTERS = [
  { tag: 'UK Series · Terminal Block Assembly', title: 'Assembled with\nquiet precision.', copy: 'Fully automatic assembly of UK2.5, UK5 and UK10 DIN rail terminal blocks — feeding, assembling and inspecting in one controlled line.', stat: '20–30', unit: 'pcs / min', side: 'l', hero: true },
  { tag: '01 — Feed', title: 'Every part,\nin order.', copy: 'Vibrating feeders deliver parts consistently. A touchscreen lets operators change over between block models fast.', stat: '2.5 · 5 · 10', unit: 'UK block models', side: 'r' },
  { tag: '02 — Assemble', title: 'Copper in.\nScrew locked.', copy: 'Copper inserts are seated and screws driven under torque control, so block ten thousand matches block one.', stat: 'Torque', unit: 'controlled locking', side: 'l' },
  { tag: '03 — Inspect', title: 'Judged on\nevery cycle.', copy: 'High-precision sensors check each block and non-conforming units are sorted out automatically.', stat: '≥ 99.9%', unit: 'rated yield', side: 'r' },
  { tag: '04 — Inside', title: 'Engineered\nto be read.', copy: 'Omron PLC control, a full transparent safety cover, emergency stop and automatic error alarms.', stat: '2 kW', unit: 'AC 220V · 50/60 Hz', side: 'l' },
]
const STEP = 1 / (CHAPTERS.length - 1)

function Chapter({ i, data }: { i: number; data: (typeof CHAPTERS)[number] }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(
    () =>
      scrollStore.subscribe((p) => {
        const node = ref.current
        if (!node) return
        const c = i * STEP
        const inn = i === 0 ? 1 : smooth(p, c - 0.1, c - 0.05)
        const out = i === CHAPTERS.length - 1 ? 0 : smooth(p, c + 0.05, c + 0.1)
        const a = inn * (1 - out)
        node.style.opacity = String(a)
        node.style.visibility = a > 0.01 ? 'visible' : 'hidden'
        node.style.transform = `translateY(${((1 - inn) * 28 - out * 28).toFixed(1)}px)`
        node.setAttribute('aria-hidden', a > 0.01 ? 'false' : 'true')
      }),
    [i],
  )
  return (
    <article ref={ref} className={`chapter chapter--${data.side}${data.hero ? ' chapter--hero' : ''}`} style={{ opacity: 0, visibility: 'hidden' }}>
      <p className="mono chapter__tag">{data.tag}</p>
      <h1 className="chapter__title">{data.title}</h1>
      <p className="chapter__copy">{data.copy}</p>
      <p className="chapter__stat"><b>{data.stat}</b><span className="mono">{data.unit}</span></p>
    </article>
  )
}

export function Chapters() {
  return <div className="chapters">{CHAPTERS.map((c, i) => <Chapter key={c.tag} i={i} data={c} />)}</div>
}

export function Rail() {
  const ticks = useRef<(HTMLLIElement | null)[]>([])
  const bar = useRef<HTMLElement>(null)
  const cue = useRef<HTMLDivElement>(null)
  useEffect(
    () =>
      scrollStore.subscribe((p) => {
        const active = Math.round(p / STEP)
        ticks.current.forEach((t, i) => t?.setAttribute('data-on', String(i === active)))
        if (bar.current) bar.current.style.transform = `scaleY(${p})`
        if (cue.current) cue.current.style.opacity = String(1 - smooth(p, 0, 0.04))
      }),
    [],
  )
  return (
    <>
      <nav className="rail" aria-label="Walkthrough progress">
        <i className="rail__track"><em ref={bar} /></i>
        <ol>
          {CHAPTERS.map((c, i) => (
            <li key={c.tag} ref={(n) => { ticks.current[i] = n }} style={{ '--i': i } as CSSProperties}>
              <span className="mono">{i === 0 ? 'UK' : c.tag.slice(5)}</span>
            </li>
          ))}
        </ol>
      </nav>
      <div className="cue mono" ref={cue}>Scroll to explore <i /></div>
    </>
  )
}
