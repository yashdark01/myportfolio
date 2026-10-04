# 3DViz portfolio integration

Status: implemented phase by phase.

## Phase 1 — Source and rights audit — complete

- Reviewed the `3dviz-pro-max` workflow, Fourier study, brain study, and MIT license.
- Reused the mathematical construction idea, not the original demo presentation.
- Excluded the BodyParts3D anatomy mesh because it has separate CC BY-SA terms and is unnecessarily heavy for a portfolio hero.

## Phase 2 — Visual system — complete

- Product persona: a live seven-term odd-harmonic Fourier phasor chain and synchronized trace.
- Applied AI persona: an original procedural neural topology with two-lobe silhouette, 76 nodes, links, and traveling inference pulses.
- Shared dark emerald/cyan palette, purposeful studio lights, restrained wire surfaces, and one consistent camera.

## Phase 3 — Interaction and motion — complete

- Existing persona tabs now control the 3D state.
- Mode changes morph scale, position, and rotation instead of hard-cutting.
- Pointer movement creates subtle spatial parallax.
- Existing GSAP scroll choreography moves and scales the complete 3D stage on scroll.
- Fourier phase, neural pulses, floats, and particles each explain their respective systems.

## Phase 4 — Performance and access — complete

- 3D is dynamically imported and never server-rendered.
- Device-pixel ratio is capped and geometry is shared/instanced.
- Rendering parks when the hero leaves the viewport.
- Reduced-motion, data-saving, low-core, and small-screen visitors receive a lightweight CSS fallback.
- The canvas is decorative and removed from the accessibility tree; persona controls remain native keyboard-accessible tabs.

## Phase 5 — Validation — complete

- TypeScript/production build.
- Responsive viewport sweep.
- Browser inspection of Product/Fourier, Applied AI/neural, and scroll states.
- Console/runtime error check.

## Source notes

- 3DViz Pro Max repository: MIT for repository-authored code and data.
- Fourier definition adapted from the repository study: odd harmonic `2k + 1` with amplitude proportional to `1 / (2k + 1)`.
- Neural topology is an original abstract network and does not claim anatomical accuracy.
