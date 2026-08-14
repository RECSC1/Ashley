# Content (placeholder)

This folder is reserved for editable site content. **It is intentionally empty for the initial launch.**

The Resources section (blog, guides) currently sources its starter cards from
`lib/content/articles.js` and `lib/content/guides.js` — plain JS modules so the
Resources page UI can stay unchanged regardless of where the data lives.

## When Decap CMS is added later

Decap CMS (with Netlify Identity) is **not** installed in this build. If the
client opts into self-managed content as a future upgrade, the planned layout is:

```
content/
  blog/        # one markdown file per post,  frontmatter -> shape in lib/content/articles.js
  guides/      # one markdown file per guide, frontmatter -> shape in lib/content/guides.js
  market/      # optional monthly market-update entries
public/admin/  # Decap CMS bundle (admin/index.html + admin/config.yml)
```

At that point, `lib/content/articles.js` and `lib/content/guides.js` would be
replaced with a markdown loader (e.g. `gray-matter` + `fs.readdirSync`) that
returns the same array shapes the Resources page already consumes. No changes
to `pages/resources.js` would be required.

Until then, Ashley's monthly-managed content is updated by editing those two JS
modules directly.

## Blog posts

The public blog index reads post metadata from `lib/content/blog.js`. New posts
use `components/BlogPostLayout.js` for the shared title, publication details,
author byline, featured image, readable article width, calls to action, FAQ
styling, related links, and post footer structure.
