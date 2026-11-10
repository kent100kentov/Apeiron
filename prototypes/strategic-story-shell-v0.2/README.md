# Apeiron — «Право на шлях» / Strategic Story Shell 0.2

**Status: narrative testbed, not the canonical story engine.** This is a new, isolated prototype. It does **not** import the old Last Lantern code. The original stays intact at `prototypes/last-lantern/`.

## Hosting

Upload these four files into a separate folder on a plain static web host:
- `index.html`
- `style.css`
- `engine.js`
- `view.js`

Or download the `Apeiron-Strategic-Shell-v0.2.zip` archive attached in the development conversation and upload the complete `apeiron-story/` folder. Set directories to `755`, files to `644`; use HTTPS. No PHP, database, fonts, photos, CDN, external media or Service Worker are required.

## Scope

Three meaningful decisions, four endings: city control, shared surface crossing with alternating access, independent passage through the Depths, and unresolved settlement. A personal mystery hooks into the overarching arc. All interactive strings and actions are localized into UA/EN. The layout prioritizes visible decisions on portrait phones and shows the map below the narrative.

The chapter is deliberately authored and finite. **It is not a simulation of infinite nested worlds** or of autonomous NPCs. A true persistent narrative engine remains an architectural task.

Game state is obtained by replaying validated command IDs. The save is a versioned command log under localStorage key `apeiron.storytest.v2`, avoiding collisions with `apeiron.last-lantern.v1`. There is no server-side tracking and nothing is uploaded off-device.

## Testing

Run `node --test tests/engine.test.cjs` from this folder. It enumerates all legal choices and checks that the four different endings, command replay, illegal commands and immutable transition state are consistent.

A browser smoke script `tests/smoke.py` uses Python Playwright and Chromium to check 390px mobile and 1280px desktop, UA/EN, branching, rendered endings, JavaScript exceptions and horizontal overflow. It can be run where Playwright and Chromium are installed.

The test environment blocked local file/HTTP navigation, so the smoke script injects the static HTML/CSS/JS in an isolated page. It **does not certify real iOS Safari or localStorage persistence after reload**. Test both on the actual hosting/domain before wider rollout.

## Related design records

- `docs/reviews/DEEPSEEK-SHELL-REVIEW-2026-11-10.md`
- `docs/narrative/STORYTELLER-AUDITION-v0.1.md`
- `docs/narrative/STORY-SHELL-0.2-TRIAL-REPORT.md`

Only the project owner can declare the story canonical. No automatic incorporation into the main Apeiron engine.
