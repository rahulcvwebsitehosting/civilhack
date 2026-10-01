# Inno360 2026

Website for the 12-hour multi-department hackathon at Erode Sengunthar Engineering College.

- **Date:** 15 October 2026
- **Venue:** ESEC Auditorium, Perundurai, Tamil Nadu
- **Themes:** EcoThon (environment and sustainability; all departments) and CADathon (Civil Engineering students only; planning, structural design and construction)
- **Registration:** [Google Form](https://forms.gle/kfuoLc2KXwoyYVcZ8)

The site includes an animated civil engineering header, transparent institutional logos, a date countdown, touch effects, a CAD-style cursor, mobile navigation and registration links throughout the page. Reduced-motion preferences are supported, with a manual motion toggle.

## Run locally

No build step or dependencies are required. With Python installed:

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173 in your browser.

## Files

- `dist/index.html` — event content
- `dist/style.css`, `dist/civil.css`, `dist/event.css` — layout and styling
- `dist/event.js` — date countdown, motion settings and pointer effects
- `dist/assets/` — supplied logos, transparent versions and generated header artwork

Deploy the contents of `dist/` on a static web host. Publishing this repository does not deploy the website.

## Deploy on Vercel

Import this repository in Vercel and keep the **Root Directory** at the repository root (`./`). The included `vercel.json` selects the static-site configuration, skips installation and building, and serves `dist/`.

If an existing Vercel project failed before this configuration was added, deploy the latest `main` commit. Clear any Root Directory override pointing to `dist`; the configuration already selects that output directory. No environment variables are required.

## Event details

The countdown targets the beginning of 15 October in India time; it does not specify an event start time. Confirm team size, registration deadline, fee basis and prize amounts with the student coordinators listed on the website.

The organizer supplied the institutional logos. Header artwork is a conceptual illustration, not a photograph of the college. Asset notes are in [LOGO-ASSETS.md](LOGO-ASSETS.md) and [HEADER-ASSET.md](HEADER-ASSET.md).
