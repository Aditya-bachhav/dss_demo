import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useInView } from '../hooks'
import { prefersReducedMotion } from '../store'

const A = '/assets/uk/'
const SITE = 'https://dssautotech.com'

function Rv({ children, className = '', d = 0 }: { children: ReactNode; className?: string; d?: number }) {
  const ref = useInView<HTMLDivElement>()
  return <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>
}

export function Navbar() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <a className="nav__logo" href="#home" aria-label="DSS — back to top">DSS</a>
      <div className="nav__links">
        <div className="nav__dd" tabIndex={0}>
          <span>Services <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" /></svg></span>
          <div className="nav__menu">
            <a href={`${SITE}/vision-inspection-system/`}>Vision Inspection System</a>
            <a href={`${SITE}/test-and-measure-solution/`}>Test and Measure Solution</a>
            <a href={`${SITE}/assembly-automation/`}>Assembly Line Automation</a>
            <a href={`${SITE}/industrial-automation/`}>Industrial Automation</a>
            <a href="#home">UK Series TB Assembly Machine</a>
          </div>
        </div>
        <div className="nav__dd" tabIndex={0}>
          <span>Company <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" /></svg></span>
          <div className="nav__menu">
            <a href={`${SITE}/gallery/`}>Gallery</a>
            <a href={`${SITE}/events/`}>Events</a>
            <a href={`${SITE}/career/`}>Career</a>
            <a href={`${SITE}/become-a-partner/`}>Become A Partner</a>
          </div>
        </div>
        <a href={`${SITE}/about-us/`}>About</a>
        <a className="nav__cta" href="#enquire">Request a quote</a>
      </div>
    </nav>
  )
}

const STAGES = [
  ['01-component-feeding', 'Component feeding', 'Vibrating feeders orient and deliver housings and parts to the line.'],
  ['02-positioning-and-assembly', 'Positioning & assembly', 'Housings are seated at the station, ready to receive their parts.'],
  ['03-copper-insert-assembly', 'Copper insert assembly', 'Copper current-carrying parts are placed into the housing.'],
  ['04-screw-locking', 'Screw locking', 'Screws are driven under controlled torque for repeatable clamping.'],
  ['05-quality-inspection', 'Quality inspection', 'High-precision sensors verify every assembled block.'],
  ['06-defect-rejection', 'Defect rejection', 'Automatic NG sorting separates non-conforming units from good output.'],
] as const

export function Process() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(!prefersReducedMotion())
  useEffect(() => {
    if (!auto) return
    const t = window.setInterval(() => setI((v) => (v + 1) % STAGES.length), 5500)
    return () => window.clearInterval(t)
  }, [auto, i])
  return (
    <section className="sec" id="process">
      <Rv className="sec__head">
        <p className="mono eyebrow">The line · six stages</p>
        <h2>From loose parts to <em>inspected product.</em></h2>
      </Rv>
      <Rv className="process">
        <ol className="process__list">
          {STAGES.map(([, t, c], n) => (
            <li key={t} data-on={n === i}>
              <button onClick={() => { setAuto(false); setI(n) }} aria-pressed={n === i}>
                <span className="mono">0{n + 1}</span>
                <strong>{t}</strong>
                <p>{c}</p>
                {n === i && auto && <i className="process__timer" key={i} />}
              </button>
            </li>
          ))}
        </ol>
        <figure className="process__fig">
          {STAGES.map(([f, t], n) => <img key={f} src={`${A}${f}.webp`} alt={t} data-on={n === i} loading="lazy" />)}
          <figcaption className="mono">Stage 0{i + 1} / 06 — illustrative render</figcaption>
        </figure>
      </Rv>
    </section>
  )
}

const MODELS = [
  { id: 'UK2.5', img: 'uk2-5-terminal-block-illustrative', note: 'Compact DIN rail block for dense control wiring.' },
  { id: 'UK5', img: 'uk5-terminal-block-illustrative', note: 'The mid-range workhorse of panel and switchgear builds.' },
  { id: 'UK10', img: 'uk10-terminal-block-illustrative', note: 'Larger conductor capacity for higher-current circuits.' },
]

export function Lineup() {
  const [m, setM] = useState(0)
  return (
    <section className="sec sec--dark" id="lineup">
      <Rv className="lineup">
        <div>
          <p className="mono eyebrow">Compatibility</p>
          <h2>One machine.<br /><em>Three block sizes.</em></h2>
          <p className="lede">Switch between UK2.5, UK5 and UK10 from the touchscreen — no second line required.</p>
          <div className="tabs" role="tablist">
            {MODELS.map((x, n) => (
              <button key={x.id} role="tab" aria-selected={n === m} onClick={() => setM(n)} className="mono">{x.id}</button>
            ))}
          </div>
          <p className="tabs__note">{MODELS[m].note}</p>
        </div>
        <figure className="lineup__fig">
          {MODELS.map((x, n) => <img key={x.id} src={`${A}${x.img}.webp`} alt={`${x.id} terminal block`} data-on={n === m} loading="lazy" />)}
          <figcaption className="mono">{MODELS[m].id} — illustrative</figcaption>
        </figure>
      </Rv>
    </section>
  )
}

const SPECS = [
  ['Applicable', 'UK2.5 / 5 / 10 DIN rail terminal blocks'],
  ['Output', '20–30 pcs/min, yield ≥ 99.9%'],
  ['Power', 'AC 220V · 50Hz/60Hz · 2 kW'],
  ['Air pressure', '≥ 0.6 MPa'],
  ['Dimension', '1500 × 1200 × 2000 mm · 600 kg'],
  ['Control', 'Omron PLC'],
  ['Process', 'Housing feed, copper assembly, torque screw locking, auto NG sorting'],
  ['Safety', 'Emergency stop, full transparent safety cover, error auto alarm'],
]

export function Specs() {
  return (
    <section className="sec" id="specs">
      <Rv className="sec__head">
        <p className="mono eyebrow">Technical specification</p>
        <h2>The numbers, <em>on one page.</em></h2>
      </Rv>
      <div className="specs">
        <Rv className="specs__big">
          <div><b>20–30</b><span className="mono">pcs / min</span></div>
          <div><b>≥99.9<small>%</small></b><span className="mono">rated yield</span></div>
          <div><b>600<small>kg</small></b><span className="mono">1500 × 1200 × 2000 mm</span></div>
        </Rv>
        <Rv className="specs__table" d={120}>
          <dl>{SPECS.map(([k, v]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>)}</dl>
        </Rv>
      </div>
    </section>
  )
}

export function Calculator() {
  const [rate, setRate] = useState(25)
  const [hrs, setHrs] = useState(8)
  const [shifts, setShifts] = useState(2)
  const [up, setUp] = useState(85)
  const day = Math.round(rate * 60 * hrs * shifts * (up / 100))
  const fmt = (n: number) => n.toLocaleString('en-IN')
  const row = (label: string, val: string, el: ReactNode) => (
    <label className="calc__row"><span className="mono">{label}<b>{val}</b></span>{el}</label>
  )
  return (
    <section className="sec sec--dark" id="calculator">
      <Rv className="calc">
        <div>
          <p className="mono eyebrow">Capacity planner</p>
          <h2>Size the line <em>before you call.</em></h2>
          <p className="lede">An indicative estimate from the rated output range. Real throughput depends on block model, changeovers and operating pattern.</p>
        </div>
        <div className="calc__panel">
          {row('Rate', `${rate} pcs/min`, <input type="range" min={20} max={30} value={rate} onChange={(e) => setRate(+e.target.value)} />)}
          {row('Hours per shift', `${hrs} h`, <input type="range" min={4} max={12} value={hrs} onChange={(e) => setHrs(+e.target.value)} />)}
          {row('Shifts per day', `${shifts}`, <input type="range" min={1} max={3} value={shifts} onChange={(e) => setShifts(+e.target.value)} />)}
          {row('Effective uptime', `${up}%`, <input type="range" min={60} max={100} value={up} onChange={(e) => setUp(+e.target.value)} />)}
          <div className="calc__out">
            <span className="mono">Estimated output / day</span>
            <b>{fmt(day)}</b>
            <span className="mono">≈ {fmt(day * 26)} per 26-day month · per machine</span>
          </div>
        </div>
      </Rv>
    </section>
  )
}

const APPS = [
  ['terminal-block-manufacturing', 'Terminal block manufacturers', 'Raise output on UK-series production without adding labour.'],
  ['switchgear-manufacturing', 'Switchgear manufacturers', 'Consistent, inspected blocks for protection and distribution gear.'],
  ['control-panel-manufacturing', 'Control panel builders', 'Dependable components feeding panel wiring at scale.'],
]

export function Applications() {
  return (
    <section className="sec" id="applications">
      <Rv className="sec__head">
        <p className="mono eyebrow">Who it is for</p>
        <h2>Built for <em>electrical manufacturing.</em></h2>
      </Rv>
      <div className="apps">
        {APPS.map(([f, t, c], n) => (
          <Rv key={f} d={n * 120} className="app">
            <img src={`${A}${f}.webp`} alt={t} loading="lazy" />
            <h3>{t}</h3>
            <p>{c}</p>
          </Rv>
        ))}
      </div>
    </section>
  )
}

export function Enquiry() {
  const [f, setF] = useState({ name: '', company: '', model: 'UK5', volume: '', msg: '' })
  const set = (k: string) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const href = `mailto:info@dssautotech.com?subject=${encodeURIComponent(`UK Series enquiry — ${f.company || f.name}`)}&body=${encodeURIComponent(
    `Name: ${f.name}\nCompany: ${f.company}\nBlock model: ${f.model}\nTarget volume (pcs/day): ${f.volume}\n\n${f.msg}`,
  )}`
  return (
    <section className="sec sec--amber" id="enquire">
      <Rv className="enq">
        <div>
          <p className="mono eyebrow">Next step</p>
          <h2>Talk to the people who build it.</h2>
          <p className="lede">Tell us your block model and volume. DSS will respond with configuration options and a quotation.</p>
          <p className="mono enq__meta">+91 72280 18518<br />+91 94269 97343<br />info@dssautotech.com</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="enq__form">
          <input placeholder="Your name" value={f.name} onChange={set('name')} aria-label="Your name" />
          <input placeholder="Company" value={f.company} onChange={set('company')} aria-label="Company" />
          <select value={f.model} onChange={set('model')} aria-label="Block model">
            <option>UK2.5</option><option>UK5</option><option>UK10</option><option>Multiple</option>
          </select>
          <input placeholder="Target volume (pcs / day)" value={f.volume} onChange={set('volume')} aria-label="Target volume" />
          <textarea placeholder="Anything else we should know" rows={3} value={f.msg} onChange={set('msg')} aria-label="Message" />
          <a className="btn" href={href}>Send enquiry →</a>
        </form>
      </Rv>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot mono">
      <span>DSS Automation Technologies Pvt. Ltd. · 81/15, GIDC, Makarpura, Vadodara, Gujarat 390010</span>
      <span>Concept by ARCEAUS — unsolicited design study. Renders are illustrative.</span>
    </footer>
  )
}
