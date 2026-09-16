# 4ruple redesign QC — 16 September 2026

## Changed
- Removed the decorative lock component and its orbit/glow CSS.
- Replaced the hero visual with a full-width real product preview using the existing fictional demo assets. Three manually selected screens, keyboard tabs, original-image links and a contained mobile pan viewport.
- Put the four-step workflow before local positioning. Shows typical human roles and each 4ruple-assisted output; does not claim that nobody else personalises email.
- Reduced local positioning to three functional icons and short copy, with the connected-service boundary retained.
- Reworked installation as You bring / We handle. Commands, dependencies and troubleshooting remain in an expandable guide.
- Added copy success announcement and manual-copy fallback when clipboard access fails.

## Verified
- Next.js production build and TypeScript passed; lint passed.
- All 25 payment/region regression tests passed. No payment backend changes.
- Browser visual inspections at 320, 390, 768, 1280 and 1440 CSS pixels. No document horizontal overflow at any inspected width, including the expanded guide at 320.
- Screenshot tabs: mouse selection; keyboard Arrow navigation and Enter activation. Leads, Review and Outreach content inspected.
- Screenshot assets loaded; full-size destinations point to the matching original image. Fictional-demo labels retained.
- Mobile screenshot starts at the relevant content, scrolls inside its own viewport and includes an explicit swipe hint.
- Setup disclosure opens; command button displays Copied and announces success. Failure fallback implemented; permission-denial case not forced in the browser.
- India ₹9,999 visible on the local preview; international US$100 visible in the production build using the server preview-country setting. Production-mode CTA uses the existing Calendly destination.
- No browser JavaScript errors in the production-build inspection.
- Motion source checked: tab transition only uses transform/opacity and only runs with no reduced-motion preference; existing Reveal uses useReducedMotion. No autoplay or continuously looping animation remains on this product page.

## Scope
No real payment was made. Live checkout remains disabled. Windows application compatibility and license issuance belong to the separate app/service and were not certified by website QC.

## Visual icon pass — 16 September 2026
- Added a consistent custom SVG sales icon family to the workflow, preview tabs and laptop setup.
- Added a four-stage sales journey and a local laptop diagram showing leads, drafts and decks on the device, with Claude/Gmail shown separately as connected services.
- Reused the existing Claude asset. Gmail icon sourced from Google: https://ssl.gstatic.com/ui/v1/icons/mail/logo_loading_2x.png (official Workspace icon refresh: https://workspaceupdates.googleblog.com/2026/05/introducing-fresh-visual-identity-for-Google-Workspace-app-icons.html). Logos identify services, not endorsements.
- Lint and TypeScript passed. Desktop, 320px, 390px and 768px browser review found no horizontal document overflow. New icons are hidden from assistive technology where adjacent text provides the label. No animation or payment code added.
