# CMS Content

Decap CMS manages published editorial content in two folders:

- `content/blog/*.md` for blog posts
- `content/neighborhoods/*.md` for individual neighborhood guides

The public pages, cards, structured data, sitemap, and RSS feed read these Markdown files at build time. Do not restore hard-coded editorial card arrays in `lib/content`.

The custom `/triangle-community-guide` comparison page remains JSX and is intentionally outside the CMS.
