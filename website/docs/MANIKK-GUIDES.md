# Guides by Manikk.ai

## Published routes
- `/guides`: searchable guide library.
- `/guides/sayopen-jev`: first article, adapted from the owner's four-page PDF.
- `/guides/sayopen-jev/SayOpen_Jev_Guide.pdf`: original PDF, unchanged.

## Editing
- `lib/guides.ts`: guide metadata and typed article blocks (text, lists, steps, tables, code).
- `components/guides/library.tsx`: search and library presentation.
- `app/guides/[slug]/page.tsx`: article template. The hero, command diagram and source footer currently reflect the first SayOpen guide; adapt these when adding a guide about another build.
- `app/manikk-guides.css`: scoped reading and library styles.
- `public/guides/sayopen-jev/`: source PDF and a WebP preview rendered from its first page.

Only owner-supplied guides should be published. Keep measured results attributed to their source, link official documentation, and distinguish a downloadable guide from a downloadable app. Do not silently refresh benchmark values or use speculative app/model names.

The catalog automatically supplies the guide sitemap entries and route generation. Each published guide must have its own slug, accurate metadata and complete body. The existing article template's build-specific framing must match it. Keep downloads public and readable without lead capture.

## Verification — 27 September 2026
- Production build, lint and TypeScript build validation passed.
- Desktop and 390px mobile layouts inspected; no document-level horizontal overflow.
- Search no-results and Show all guides reset worked; article navigation and contents links checked.
- Independent content review verified reported test results, limitations, original PDF hash and main-landmark fix.
- Original PDF SHA-256 is preserved; 4 pages, 711387 bytes.
- Article/collection metadata, breadcrumbs, canonical URLs, social image and sitemap are implemented.
- Applied visual extension retains the existing carbon/ice/blue palette, Geist fonts and thin rules. No site-wide redesign.

Unpublished SayOpen product-page and SME draft changes in the separate standalone working copy were not included in this deployment. Guide publishing does not establish a public app download or independent benchmark validation.
