# Apeiron — watercolor lighthouse visual option v0.1

**Status:** archived visual option / design reference; **not activated**.  
**Date:** 2026-11-12 (Europe/Kyiv).  
**Project:** independent `kent100kentov/Apeiron`; no association with Kazigo.

## User's direction
- User provided a complete HTML game mockup for “Останній ліхтар” and four lighthouse image sheets/reference photos.
- Request: integrate **a single beautiful watercolor scene**, not all four image sheets.
- Chosen direction: an illustrated book/map with a prominent watercolor lighthouse, sea, sand, clouds and light; compact location labels instead of large photo cards.
- User explicitly ordered: “Закомить как вариант. Без открытия work” and reiterated Apeiron is a standalone project.
- Keep this as a **variant**, not a canonical artistic direction or replacement of current game.

## Experiment
`apeiron-visual.css` is a **CSS-only** optional layer for the **user-supplied HTML mockup**. It doesn't alter RNG, inventory, saves, dialogue choices or game rules. Responsive behavior targets portrait Safari. Do **not** assume compatibility with other prototype shells without checking markup.

The original higher-resolution watercolor asset and standalone preview are preserved in the conversation's **Apeiron_Visual_Patch_v01.zip**, under `assets/lighthouse-watercolor.webp` and `preview.html`. **The image binary is not included in this Git commit**; this is an archived source/design option, not a deployable standalone package. To reproduce the appearance, place the image in `assets/lighthouse-watercolor.webp` beside this CSS and load the CSS after the mockup’s styles, e.g. `<link rel="stylesheet" href="./apeiron-visual.css?v=01">`. The real production game must not be modified without a separate request.

## Boundaries
- Reference imagery is user-supplied; assess reproduction/commercial rights before public shipping.
- No PWA/service worker, GitHub Actions or deployment.
- Do not revive older domestic “rope/parcel” tasks as the strategic game’s main direction. This artwork is solely a UI/visual experiment.
- No browser device QA or integration test is claimed for this commit.
