# Ashley Smith Realtor Authority Website

## Project Overview

This repository contains the website build for Ashley Smith, a Compass real estate agent based in Chapel Hill, North Carolina.

The site is part of Emily Wyatt’s Realtor Authority Website System through Real Estate Concierge Services Company LLC.

The goal of this website is to position Ashley as a trusted Chapel Hill and Triangle real estate authority while supporting lead capture, local SEO, Google visibility, AI search visibility, and future marketing support.

## Client

**Client Name:** Ashley Smith  
**Brokerage:** Compass  
**Primary Market:** Chapel Hill, North Carolina  
**Extended Service Areas:** Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh, and the greater Triangle  
**Project Type:** Realtor Authority Website System  

## Business Goal

This website should help Ashley:

1. Build stronger online visibility
2. Establish local authority in Chapel Hill and the Triangle
3. Support buyer, seller, relocation, luxury, investor, UNC-related, and move-up client inquiries
4. Create clear consultation paths
5. Capture leads through working forms
6. Support future Google Business Profile and local SEO work
7. Present a polished, professional Compass-affiliated brand presence

## Important Project Rules

Before making client-specific edits, always check:

```text
CLIENT_STATUS.md
```

## Pre-Launch Safety Updates (May 2026)

The following client-safety updates were completed:

- Converted primary lead forms to Netlify-compatible forms with clear form names.
- Added hidden tracking fields: `page_name`, `form_type`, `lead_source`, and `client_name`.
- Added honeypot anti-spam fields on Netlify forms.
- Replaced placeholder `#` social links with safe contact fallbacks.
- Added stronger demo-only messaging on Client Portal/Admin preview areas.
- Marked demo pages (`/client-portal`, `/admin`) as `noindex` to keep them out of search results.
- Added a default Open Graph image in SEO metadata.

### Netlify Settings

- Base directory: `/`
- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: `netlify/functions`

### Manual QA Emily should run before client handoff

1. Submit each Netlify form once and confirm submissions appear in Netlify > Forms.
2. Confirm form notification emails are configured in Netlify.
3. Confirm contact fallback links behave as expected.
4. Confirm demo pages should remain public-preview or be hidden before launch.
5. Replace remaining compliance placeholders after Compass review.


### Netlify Next.js forms migration note

This project includes `public/netlify-forms.html` to register Netlify Forms at build time for the Netlify Next.js runtime. Keep this file in sync with live form names and fields.
