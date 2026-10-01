# Rural HF Pocket Guide

> Offline-capable, zero-login Progressive Web App exposing the essential clinical reference
> content of the **HEARTLAND Protocol**, incorporating Toolkit V3.4.1 operational clarifications, for professionals studying heart
> failure in rural and resource-limited US settings.

**Live site:** https://guide.heartlandprotocol.org
**Author:** Vicky Muller Ferreira, MD
**License:** dual — code MIT ([`LICENSE`](LICENSE)); clinical content CC BY-NC 4.0
([`LICENSE-CONTENT.md`](LICENSE-CONTENT.md))
**Last published guide archive:** Zenodo [10.5281/zenodo.23074675](https://doi.org/10.5281/zenodo.23074675)
(v0.2.1; all versions: [10.5281/zenodo.19634992](https://doi.org/10.5281/zenodo.19634992))
The current v0.2.2 source adds operational clarification and local-readiness material; its successor archive is pending publication.
**Related DOIs:** HEARTLAND Implementation Toolkit V3.4.1 —
[10.5281/zenodo.23076249](https://doi.org/10.5281/zenodo.23076249)
| Cureus article — [10.7759/cureus.104817](https://doi.org/10.7759/cureus.104817)
| OSF [10.17605/OSF.IO/YUSGH](https://doi.org/10.17605/OSF.IO/YUSGH)

## What this is

A lightweight static PWA. Any clinician can reach the content in five seconds on a phone —
no registration, no auth, no account. Once installed on the home screen it works offline.

Reference-only: there are no patient-data inputs. For interactive tools (risk calculator,
titration workflows, reports) see the sibling application at <https://heartlandprotocol.org>.

## Contents

Ten reference pages with selected Toolkit V3.4.1 operational clarifications. The gallery identifies two revised V3.4.1 cards separately from preserved historical figures; it does not authorize prototype distribution to patients.

1. Home — quick navigation
2. GDMT quick reference — HFrEF quadruple therapy + HFpEF priority ladder
3. Red flags alert card — six triggers with required actions
4. Telephone titration — 5-step checklist + decision algorithm
5. RPM billing codes (CY2026) — CPT 99445/99453/99454/99457/99458/99470 + RTM
6. HEARTLAND risk score — 10 variables, tier thresholds, care pathways
7. Implementation tiers — Tier 1 / Tier 2 / Tier 3 across 8 operational dimensions
8. Pocket card gallery — 10 current links (two versioned PNG cards and eight preserved JPG figures)
9. About — sources, DOIs, citation, license
10. Local readiness — four-step guide, referral contexts and downloadable 12-scenario training pack

## Stack

- Astro 7 (static) + TypeScript strict; Node.js 22.12 or later
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@vite-pwa/astro` (workbox service worker)
- Vanilla CSS tokens mirrored from `heartland-app` (warm cream / navy / coral)

Compatibility note: `@vite-pwa/astro` 1.2.0 still declares an Astro peer range ending at 5.
The package override selects the patched Astro 7.3.5 for this project; this is not a claim
of upstream support. A clean install, static build, generated-worker contract and isolated
Chromium offline navigation were checked for this combination. Re-run these checks when
either integration changes; do not remove offline behavior to make an upgrade pass.

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
- `heartland-app/lib/implementation/constants.ts`
- Versioned figures under `Protocol Figures/` (retain historical originals)

These are copied, not imported, to keep the two builds decoupled. If the upstream protocol
is updated, re-sync the affected `src/data/` files and explicitly map versioned figures under `public/figures/`.

## Deployment

Target host: Vercel, domain `guide.heartlandprotocol.org`. No server-side code — the full
site renders to static HTML + assets. Service worker precaches everything.

## How to cite

The citation below identifies the immutable v0.2.1 source archive, not the newer v0.2.2 source. See [RELEASE_NOTES_v0.2.2.md](RELEASE_NOTES_v0.2.2.md) for the operational clarifications. Historical versions remain preserved in Zenodo.

> Muller Ferreira V. Rural HF Pocket Guide (Version 0.2.1) [software]. Zenodo; 2026.
> doi:10.5281/zenodo.23074675. Available at https://guide.heartlandprotocol.org.

## Software preservation

Software Heritage snapshot (archived 2026-08-25): [`swh:1:snp:6f3d4e96dcde1ebeffa2b7e05865facf6c87a6e5`](https://archive.softwareheritage.org/swh:1:snp:6f3d4e96dcde1ebeffa2b7e05865facf6c87a6e5/)

This persistent SWHID identifies the repository snapshot captured on that date; archival does not imply endorsement or validation.

## Disclaimer

This tool is designed for healthcare professionals as an educational implementation-support resource.
It does not provide medical diagnoses, treatment recommendations for individual patients, or
replace clinical judgment. Not intended for direct patient care. For professional use only.

The HEARTLAND Risk Stratification Framework is a proposed tool under development. It has not
been validated against clinical outcomes data. Formal validation through registry data is a
defined research objective.
