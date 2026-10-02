# Inno360 2026

Website for the 12-hour multi-department hackathon at Erode Sengunthar Engineering College.

- **Date:** 15th October 2026
- **Venue:** Kailaimani A. Munusamy Mudaliyar Arangam, ESEC, Perundurai, Tamil Nadu
- **Themes:** EcoThon (environment and sustainability; all streams of engineering) and CADathon (Civil Engineering students only; planning, structural design and construction)
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

The countdown targets the beginning of 15 October in India time; it does not specify an event start time. Teams have 3 or 4 members. The fee is ₹250 per student, paid once per team (₹750 or ₹1,000). Submit one form with one payment transaction ID and proof. Confirm the registration deadline and prize amounts with the coordinators.

The organizer supplied the institutional logos. Header artwork is a conceptual illustration, not a photograph of the college. Asset notes are in [LOGO-ASSETS.md](LOGO-ASSETS.md) and [HEADER-ASSET.md](HEADER-ASSET.md).

## Campus gallery and visitor counter

Official college photographs and student projects are credited in [CAMPUS-SOURCES.md](CAMPUS-SOURCES.md). The hosted Hits.sh badge counts page views across public HTTPS deployments, not unique people. Local previews do not increment the count. No API key or environment variable is required; if the counter service is unavailable, the rest of the site continues to work.
