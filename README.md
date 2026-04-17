# Rural HF Pocket Guide

> Offline-capable, zero-login Progressive Web App exposing the essential clinical reference
> content of the **HEARTLAND Protocol v3.3** for primary care clinicians managing heart
> failure in rural and resource-limited US settings.

**Live site:** https://guide.heartlandprotocol.org
**Author:** Vicky Muller Ferreira, MD
**License:** MIT
**Related DOIs:** Zenodo [10.5281/zenodo.18566403](https://doi.org/10.5281/zenodo.18566403)
| OSF [10.17605/OSF.IO/YUSGH](https://doi.org/10.17605/OSF.IO/YUSGH)

## What this is

A lightweight static PWA. Any clinician can reach the content in five seconds on a phone —
no registration, no auth, no account. Once installed on the home screen it works offline.

Reference-only: there are no patient-data inputs. For interactive tools (risk calculator,
titration workflows, reports) see the sibling application at <https://heartlandprotocol.org>.

## Contents

Nine pages, all derived from `HEARTLAND_Protocol v3.3`:

1. Home — quick navigation
2. GDMT quick reference — HFrEF quadruple therapy + HFpEF priority ladder
3. Red flags alert card — six triggers with required actions
4. Telephone titration — 5-step checklist + decision algorithm
5. RPM billing codes (2025) — CPT 99453/99454/99457/99458 + RTM + G0511
6. HEARTLAND risk score — 10 variables, tier thresholds, care pathways
7. Implementation tiers — Tier 1 / Tier 2 / Tier 3 across 8 operational dimensions
8. Pocket card gallery — 10 protocol figures (JPG)
9. About — sources, DOIs, citation, license

## Stack

- Astro 5 (static) + TypeScript strict
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@vite-pwa/astro` (workbox service worker)
- Vanilla CSS tokens mirrored from `heartland-app` (warm cream / navy / coral)

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run preview  # serves dist/ on localhost:4321
```

## Environment variables

| Name | Purpose |
|-|-|
| `PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (optional). When unset, GA is not loaded. |

## Content provenance

All clinical values are mirrored from the HEARTLAND app source of truth:

- `heartland-app/lib/gdmt/constants.ts`
- `heartland-app/lib/remote-monitoring/constants.ts`
- `heartland-app/lib/risk-score/constants.ts`
- `heartland-app/reference/clinical_content.md`
- `Protocol Figures/*.jpg` (10 files)

These are copied, not imported, to keep the two builds decoupled. If the upstream protocol
is updated, re-sync the `src/data/` files and the 10 JPGs under `public/figures/`.

## Deployment

Target host: Vercel, domain `guide.heartlandprotocol.org`. No server-side code — the full
site renders to static HTML + assets. Service worker precaches everything.

## How to cite

> Muller Ferreira V. Rural HF Pocket Guide — HEARTLAND Protocol v3.3 (PWA). 2026.
> doi:10.5281/zenodo.18566403. Available at https://guide.heartlandprotocol.org.

## Disclaimer

This tool is designed for healthcare professionals as a clinical decision support resource.
It does not provide medical diagnoses, treatment recommendations for individual patients, or
replace clinical judgment. Not intended for direct patient care. For professional use only.

The HEARTLAND Risk Stratification Framework is a proposed tool under development. It has not
been validated against clinical outcomes data. Formal validation through registry data is a
defined research objective.
