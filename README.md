# INNO360 · The Jujutsu Chapter

Jujutsu Kaisen inspired website for ESEC's INNO360 hackathon on 15 October 2026. The visual system uses manga ink, parchment, crimson seals, brush lettering, Japanese domain names, and Gojo/Sukuna artwork across the landing page and event routes.

## Run locally

Use Node.js 22.12+ (or 20.19+).

```sh
npm ci
npm run dev
```

```sh
npm run lint   # TypeScript check
npm run build  # Production output in dist/
```

Bun users can install with the included `bun.lock`. The esbuild dependency matches Vite 8's supported peer range.

## Content and behavior

- Event details, bus routes, payment instructions, and the official Google Form link live in `src/config/constants.ts`.
- `/` is the manga cover; `/portal` and `/event` contain the complete event guide.
- `/register` provides squad selection and registration instructions. `/status` provides reporting guidance and clearly requires coordinator verification; there is no connected registration roster API.
- `/review` and `/reviews` show the review countdown.
- Domain selection persists locally. Sound is opt-in. Keyboard focus, Escape dismissal, touch layouts, and reduced motion are supported.
- The Cursed Technique Lab has four distinct character scenes and interactive Infinity, Ten Shadows, Resonance, and Black Flash effects. Ambient cursed embers, a moving chant ribbon, talisman drift, seal reveals, animated domain changes, and button slashes run throughout the site. The fixed animation control pauses movement and offers an explicit opt-in on devices requesting reduced motion. Offscreen character effects pause automatically.
- Hosting must rewrite application routes to `index.html` for direct page visits.

See [ARTWORK.md](ARTWORK.md) for source assets and image-generation details.
See [TECHNIQUE-ARTWORK.md](TECHNIQUE-ARTWORK.md) for the four new illustrations and their generation prompts.
