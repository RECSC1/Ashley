# Ashley Smith Website Publishing Guide

This guide explains how to update blog posts and neighborhood guides without editing code.

## Before You Start

Use the private content manager at `/admin`. Access is invitation-only. Do not share your password or invite other users unless Emily has approved them.

The content manager changes files in the website repository and asks Netlify to rebuild the site. It does not publish instantly like social media.

## Log In

1. Open the website preview or live domain and add `/admin` to the end of the address.
2. Enter the invited email address and password.
3. If this is your first login, open the invitation email and use its link to create a password.
4. If the invitation link has expired, ask for a new invitation. Do not create a separate account.

Registration is invite-only. A GitHub account is not required.

## Create a Blog Post

1. Log in at `/admin`.
2. Select **Blog Posts**.
3. Select **New Blog Post**.
4. Complete every required field. Use the hint below each field if you are unsure what belongs there.
5. Keep the URL slug lowercase with words separated by hyphens.
6. Use a featured image that is landscape-shaped and at least 1600 pixels wide when possible.
7. Write useful image alt text that describes what is visible.
8. Add frequently asked questions only when they genuinely help the reader.
9. Write the article in the body editor using clear section headings.
10. Save the entry as a draft before requesting review.

The published address follows this format: `/blog/your-url-slug`.

## Create a Neighborhood Guide

1. Log in at `/admin`.
2. Select **Neighborhood Guides**.
3. Select **New Neighborhood Guide**.
4. Add the community name, search description, featured image, excerpt, dates, canonical path, FAQs, and guide body.
5. Explain the area's feel, common housing styles, access, tradeoffs, and who may want to explore it.
6. Avoid promises about school assignment, commute time, future value, or guaranteed availability.
7. Save the guide as a draft for review.

Published neighborhood guides automatically appear on `/neighborhoods`, the sitemap, and relevant resource listings.

## Upload Images

1. Select the image field in the post or guide.
2. Upload a clear image you have permission to use.
3. Use a descriptive filename, such as `carrboro-downtown-homes.jpg`.
4. Avoid filenames such as `IMG_1048.jpg` or `final-final-2.jpg`.
5. Add accurate alt text in the separate alt-text field.
6. Do not upload client documents, private information, MLS data exports, or images without usage rights.

Uploads are stored in `public/images/uploads` and appear on the site under `/images/uploads`.

## Save a Draft

Decap uses an editorial workflow:

1. Select **Save** while working.
2. Keep unfinished work in **Draft**.
3. Move it to **In Review** when it is ready for Emily to check.
4. Do not select **Publish** until copy, links, images, dates, and claims have been reviewed.

Draft and review changes are stored separately from the live `main` branch.

## Get a Preview Link

1. Save the entry as a draft or move it to **In Review**.
2. Wait for Netlify to create the deploy preview.
3. Open the preview link shown in the editorial workflow entry when available.
4. Check the page on both a phone-sized screen and a desktop screen.
5. Confirm headings, links, images, tables, CTAs, FAQs, and spacing look correct.

If a preview link has not appeared, check the Netlify deploy status. A preview cannot appear until its build finishes successfully.

## Publish

1. Complete the browser preview review.
2. Confirm the SEO title, meta description, canonical path, dates, and image alt text.
3. Confirm every link opens the intended page.
4. Move the entry to **Ready** if another approval step is needed.
5. Select **Publish** only after approval.

Publishing merges the approved content change into the configured `main` branch and starts a production build.

## Edit a Published Entry

1. Open the correct collection.
2. Select the published post or guide.
3. Make the changes.
4. Update the **Updated Date** when the revision is meaningful.
5. Save, review the preview, and publish again.

Do not change a published URL slug or canonical path casually. Changing a URL can break links and search visibility unless a redirect is added by a developer.

## Unpublish or Delete an Entry

Deleting a published entry removes its page, card, sitemap entry, and feed entry after the next successful build.

Before deleting:

1. Confirm the page is no longer needed.
2. Check whether another page links to it.
3. Ask for a redirect if the page has been public or shared externally.
4. Use **Delete** only after those checks are complete.

If an entry should be temporarily hidden rather than permanently removed, leave it in the editorial workflow and ask for technical help before deleting the published version.

## How Long a Build Takes

Most content builds should finish within a few minutes. Image processing, platform traffic, or a Netlify queue can make a build take longer.

Do not repeatedly select Publish because the page has not appeared immediately. Check the deploy status first.

## If a Build Fails

1. Open the failed deploy in Netlify.
2. Read the first clear error near the end of the build log.
3. Check the most recently edited entry for a missing required field, malformed date, invalid URL path, broken image, or formatting mistake.
4. Correct the entry and save again.
5. If the error mentions code, dependencies, configuration, or an unfamiliar technical term, stop and send the build link to Emily's technical support contact.

Do not change Netlify build settings to make an error disappear.

## Password Recovery

1. Open `/admin`.
2. Choose the password recovery option.
3. Enter the invited email address.
4. Open the recovery email and use the link to set a new password.
5. Return to `/admin` and log in.

If no email arrives, check spam and promotions folders, confirm the exact invited address, and ask Emily to verify the Identity account before sending repeated requests.

## What Not to Touch

Do not change:

- The backend name, repository, or branch in the CMS configuration.
- Netlify Identity, Git Gateway, registration, or email settings.
- The `main` branch directly.
- Build commands, publish directories, environment variables, or deploy plugins.
- Existing URL slugs without a redirect plan.
- Canonical paths unless you understand the SEO impact.
- Files outside the Blog Posts and Neighborhood Guides collections.
- Claims about live MLS search, IDX, property alerts, valuations, school assignment, commute guarantees, or future investment returns.

When in doubt, save a draft and ask before publishing.

## Current Netlify Settings

- Base directory: repository root
- Build command: `npm run build`
- Publish directory: `.next`
- Netlify configuration: `netlify.toml` is required
- Forms: existing Netlify Forms remain configured separately from the CMS
- CMS authentication: Netlify Identity, invite-only
- CMS repository access: Git Gateway
- Production branch: `main`
- Media uploads: `public/images/uploads`
- Environment variables required for CMS publishing: none in the repository

## Known Limitations

- The CMS manages blog posts and neighborhood guides only.
- `/triangle-community-guide` remains a custom comparison landing page and is not editable in the CMS.
- A deploy preview must finish before a draft preview can be reviewed.
- Email delivery depends on Netlify Identity email delivery and the recipient's mail provider.
- The CMS does not provide live MLS, IDX, property alerts, client portals, or automated valuation features.

## Final Publishing Checklist

Before publishing, confirm:

- The title and URL are correct.
- The publish and updated dates are correct.
- The SEO title and description are complete.
- The featured image loads and has accurate alt text.
- The excerpt reads well on a card.
- Headings are easy to scan.
- Facts and local claims are supportable.
- Internal links work.
- FAQs are useful and accurate.
- The phone and desktop previews look correct.
- The Netlify preview build passed.
