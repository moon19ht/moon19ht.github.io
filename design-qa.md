# Design QA

## Evidence

- Source visual truth: `/workspace/scratch/0aff2fc6f85d/generated_images/call_whnvrrZJxGNFKnR0cK7lMUnS.png`
- Latest implementation: `/workspace/scratch/moon19ht-implementation-desktop-final.jpg`
- Interaction evidence: `/workspace/scratch/moon19ht-project-interaction-final.jpg`
- Comparison viewport: 1363 × 936 CSS pixels at device scale factor 1
- Source normalization: 1536 × 1024 source fitted and centered on a 1363 × 936 canvas
- Compared state: page top, GrantForge selected, desktop navigation visible

## Fidelity ledger

| Area | Source target | Implementation | Result |
| --- | --- | --- | --- |
| Composition | Fixed progress rail, quiet header, split hero, stacked editorial sections | Same rail/header/hero split and section order; all sections fit the reference's single-screen command-center rhythm | Pass |
| Typography | Condensed geometric display with monospaced system labels | Space Grotesk display plus IBM Plex Mono labels; weight, case, hierarchy, and density closely match | Pass |
| Palette | Near-black canvas with acid lime, violet, and pink signals | `#050709` canvas with matching lime/violet/pink tokens and restrained hairline borders | Pass |
| Hero asset | Scanned `MOON / 19HT` typographic artwork with violet/pink bloom | Purpose-built raster artwork matches the lettering, crop, scan texture, and glow direction | Pass |
| Project system | Four-item selector driving a dense detail matrix | Four real projects drive an animated, accessible tab panel with preserved Korean portfolio content | Pass |
| Above-fold copy | `MOON19HT`, `Builds in motion`, nav, two CTAs, system metadata | Matches the approved labels and hierarchy without added eyebrow copy | Pass |
| Interaction | Selected project row and related content should change together | VideoForge selection updates `aria-selected` and the complete project panel, then restores to GrantForge | Pass |

## Iteration record

1. First comparison found a hero that was too tall, a title/status collision, and an incomplete full-page rhythm.
2. The hero artwork crop, header spacing, project panel height, and section density were corrected.
3. The final comparison found no P0, P1, or P2 visual drift. The only intentional content differences are the repository's real Korean copy and the two links actually available for each project, instead of invented reference content/actions.

## Functional and technical checks

- `npm run build`: passed
- Project selector: GrantForge → VideoForge → GrantForge passed
- Accessibility state: selected project exposes `aria-selected="true"` and an updated `tabpanel`
- Top-of-page rail state: Home active, progress `00%`
- Relevant application console errors: none observed
- Browser extension metadata noise was excluded because it does not originate from the application
- Responsive CSS includes dedicated 1180 px, 920 px, and 680 px breakpoints plus reduced-motion handling

## Residual P3 note

The selected visual target is desktop. The available cloud browser stayed at 1363 × 936, so responsive behavior was verified through breakpoint implementation and semantic controls rather than a second native mobile screenshot.

## Final result

passed
