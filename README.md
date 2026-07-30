# Aura

Aura is an interactive web prototype for booking pilates and yoga sessions.
It includes the core customer flow: discover studios, open a studio profile,
choose a booking day and time, review the session, pay, and view bookings.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## GitHub Pages

This repo is ready to publish through GitHub Pages. After pushing it to GitHub,
enable Pages from the repository settings and choose GitHub Actions as the
source. The included workflow builds and deploys Aura automatically on pushes to
`main`.

To create a static package locally:

```bash
npm run package:github
```

## Project Shape

- App screens live in `app/page.tsx`.
- Shared styling lives in `app/globals.css`.
- The GitHub Pages static entry lives in `web/`.
- The GitHub Pages workflow lives in `.github/workflows/deploy-pages.yml`.

## Current Prototype

- The signed-in prototype user is `حصة الدويغري`.
- The explore screen opens a studio profile before booking.
- The booking screen shows upcoming days, repeated month labels, and booked time
  slots as unavailable.
