# DSS UK Series — interactive product showcase (ARCEAUS concept)

React + Three.js (R3F) + Lenis. `npm install && npm run dev`, `npm run build`.

- `src/components/Scene.tsx` — 3D machine, camera path from `model/*-points.json`
- `src/components/Overlays.tsx` — 5 scroll-driven chapters (edit copy in `CHAPTERS`) + progress rail
- `src/components/Sections.tsx` — nav, process stepper, block-size tabs, specs, capacity planner, enquiry (mailto), footer
- `src/styles.css` — tokens at top (graphite / ivory / amber)

## Deploying on Vercel

The 20 MB `.glb` must be committed as a normal file (no Git LFS). After pulling this update run:
`git rm --cached public/model/industrial_assembly_machine.glb && git add .gitattributes public/model/industrial_assembly_machine.glb`
The Draco decoder is self-hosted in `public/draco`.

Specs are taken from dssautotech.com/uk-series-tb-assembly-machine. Imagery in `public/assets/uk` is illustrative.
