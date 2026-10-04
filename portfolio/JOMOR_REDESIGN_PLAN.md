# Jomor-inspired Portfolio Redesign Plan

Reference: [Jomor Design — Made in Webflow](https://webflow.com/made-in-webflow/website/jodesign)

## Creative rule

Use the reference's editorial confidence, scale, pacing, and interaction language without copying its identity, text, illustrations, or exact layouts. Yash's version should feel like a technical product engineer's portfolio: bold typography, real product media, system diagrams, and proof-led storytelling.

## Visual direction

- Near-black canvas with off-white type and one electric green accent.
- Oversized uppercase display typography, including filled and outlined layers.
- Minimal chrome: fewer cards, borders, pills, and dashboard-style grids.
- Full-viewport compositions with deliberate empty space.
- Circular navigation and CTAs, asymmetric image placement, rotated labels, and oversized section numbers.
- Project imagery is the primary visual material; 3D remains an accent rather than the whole identity.
- Motion is direct and physical: masked reveals, skew correction, image parallax, text depth, circular expansion, and large transitions.

## Phase 1 — Rebuild the visual foundation

1. Replace the current glass/card-heavy theme with a restrained editorial token system.
2. Use `#1b1b1b`-like charcoal, warm white, muted gray, and Yash's emerald accent.
3. Establish responsive display sizes with `clamp()` and 900-weight uppercase type.
4. Add reusable filled/outlined headline layers.
5. Expand primary layouts to `80–90vw`; keep reading copy narrow.
6. Add global grain and very subtle background texture.
7. Remove decorative UI that competes with project imagery.

Acceptance criteria:

- The site reads as a creative portfolio before any animation plays.
- Mobile retains hierarchy without clipped display text.
- Text contrast remains WCAG AA.

## Phase 2 — Navigation, loader, and cursor

1. Replace the traditional navbar with:
   - compact monogram/name at top left;
   - fixed circular menu button at top right;
   - full-screen menu with oversized outline-to-fill links;
   - contact/social information anchored at the bottom.
2. Add a short first-load line animation—no forced multi-second wait.
3. Add a desktop-only 64–80px custom cursor with contextual labels such as `VIEW`, `OPEN`, and `DRAG`.
4. Add magnetic behavior to menu and circular CTAs.
5. Keep the native cursor and normal navigation on touch/reduced-motion devices.

React Bits candidates:

- Magnet
- CircularText
- SplitText

Acceptance criteria:

- Keyboard focus works throughout the full-screen menu.
- Escape closes the menu and returns focus.
- Custom cursor never blocks clicking or appears on touch devices.

## Phase 3 — Full-screen editorial hero

1. Replace the dashboard-style hero with a 100svh typographic composition.
2. Primary copy:
   - `I BUILD DIGITAL`
   - `SYSTEMS THAT`
   - `THINK & SCALE`
3. Duplicate the main headline into rear filled and front outlined layers.
4. Reveal each line through masks with GSAP.
5. Place a tilted product/video reel behind and between the text layers.
6. Add a rotated role label, availability status, and a vertical scroll indicator.
7. Add one circular `EXPLORE WORK` CTA.
8. Use a restrained Three.js object—an abstract Y/P monogram or connected system sculpture—behind the type. It should react to pointer and scroll but never reduce text legibility.

Acceptance criteria:

- Identity and role are understood within five seconds.
- The hero paints meaningful text before WebGL loads.
- Static fallback looks intentional on mobile and reduced motion.

## Phase 4 — Jomor-style selected work gallery

1. Replace stacked information panels with an asymmetric two-column gallery.
2. Alternate projects vertically so one column sits lower than the other.
3. Give every project a large image/video surface, minimal category label, project name, and index.
4. On hover:
   - image scales and corrects a subtle skew;
   - contextual circular `VIEW` cursor appears;
   - project name slides/reveals;
   - accent color changes per project.
5. On scroll:
   - media moves at a slightly different speed from its frame;
   - giant translucent project numbers move behind the gallery;
   - section title transitions between filled and outlined states.
6. Keep metrics and engineering details on the case-study pages instead of crowding the gallery.

Project order:

1. Ecometer
2. Krashaq AI
3. Rent Buddy
4. Additional experiments

Acceptance criteria:

- Every featured project can be opened using pointer, keyboard, or touch.
- Images remain optimized through `next/image` or the existing media component.
- Gallery becomes a clean single column on mobile.

## Phase 5 — Transform supporting sections

### Proof

- Oversized marquee of organizations/products.
- One large testimonial instead of several equal cards.
- Animated numeric proof with subdued motion.

### Process

- Large typographic statements with a scroll-following index.
- One step per viewport segment rather than four cards.
- Thin animated line connects the sequence.

### Journey

- Minimal vertical editorial timeline.
- Large years in the background, concise content in the foreground.
- No conventional card containers.

### GitHub and writing

- Convert to text-led lists with animated underlines and hover previews.
- Use terminal styling only as a small accent.

### About

- Large portrait or cutout paired with oversized personal statement.
- Expertise appears as flowing rows, not a card matrix.

### Contact

- Full-viewport closing scene with giant email text.
- Circular contact CTA and kinetic availability line.
- Integrate role/location information here.

Acceptance criteria:

- Every section has a distinct composition.
- No more than one repeating card grid remains on the homepage.
- The page feels progressively paced instead of uniformly stacked.

## Phase 6 — Case-study pages

1. Add full-screen project hero with title, role, year, and media.
2. Use sticky chapter navigation and large numbered sections.
3. Animate architecture diagrams using SVG line drawing.
4. Add full-bleed screenshots and before/after comparisons.
5. Keep Problem, Role, Outcome, Trade-offs, and Metrics readable and recruiter-friendly.
6. Add next-project transition using the following project's accent color.

Acceptance criteria:

- Case studies remain useful without animation.
- Deep links such as `#technical` still work.
- Existing project data remains the single source of truth.

## Phase 7 — Performance, accessibility, and final QA

1. Lazy-load Three.js and project videos.
2. Stop render loops when offscreen or when the tab is hidden.
3. Cap canvas DPR and remove WebGL on weak/touch/save-data devices.
4. Use `gsap.context()` cleanup for every timeline.
5. Provide reduced-motion variants for every masked, pinned, parallax, cursor, and marquee effect.
6. Test keyboard navigation, screen readers, focus order, and high zoom.
7. Test at 360px, 768px, 1280px, and 1600px.
8. Verify production build, route generation, and dependency audit.
9. Target LCP below 2.5s, CLS below 0.1, INP below 200ms, and smooth desktop scrolling.

## Implementation order

Complete and verify one phase before moving to the next:

1. Foundation
2. Navigation/cursor
3. Hero
4. Work gallery
5. Supporting sections
6. Case studies
7. QA and optimization

Do not attempt to reproduce every reference effect. Preserve the recognizable interaction grammar—scale, circles, outline type, asymmetric media, scroll depth—while giving it Yash's own engineering story and green system identity.
