import { useCallback, useEffect, useRef, useState } from 'react'
import { useLenisScroll, usePointerMotion } from './hooks'
import { lenisRef, scrollToTarget } from './lenis'
import { scrollStore } from './store'
import Scene from './components/Scene'
import { Loader, SceneBoundary } from './components/Chrome'
import { Chapters, Rail } from './components/Overlays'
import { Navbar, Process, Lineup, Specs, Calculator, Applications, Enquiry, Footer } from './components/Sections'

export default function App() {
  const stageRef = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)
  const handleDone = useCallback(() => setReady(true), [])
  const handleError = useCallback(() => setSceneFailed(true), [])

  useLenisScroll(stageRef)
  usePointerMotion()

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (ready) lenis.start()
    else lenis.stop()
  }, [ready])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href') ?? ''
      event.preventDefault()
      if (hash === '#home' || hash === '#') scrollToTarget(0)
      else if (document.querySelector(hash)) scrollToTarget(hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    scrollStore.set(0)
  }, [])

  return (
    <main id="home" className={ready ? 'is-ready' : ''}>
      <a className="skip-link" href="#process">Skip to content</a>
      <Loader forceDone={sceneFailed} onDone={handleDone} />
      <Navbar />
      <section className="stage" ref={stageRef} aria-label="UK Series machine walkthrough">
        <div className="stage__pin">
          <div className="stage__scene">
            <SceneBoundary onError={handleError}>
              <Scene />
            </SceneBoundary>
          </div>
          <div className="stage__grid" aria-hidden="true" />
          <Chapters />
          <Rail />
        </div>
      </section>
      <Process />
      <Lineup />
      <Specs />
      <Calculator />
      <Applications />
      <Enquiry />
      <Footer />
    </main>
  )
}
