# Portfolio site

A plain static site: no build step, no framework. Open `index.html` through any static host (GitHub Pages, Netlify drop, Vercel) or locally with `python3 -m http.server` inside this folder.

## Where things go

| What | Where |
|---|---|
| Your name, tagline, school, email, links, about text | `content/site.js` |
| Which projects appear on Physical / Digital, and their order | `content/site.js` → `tabs` |
| One project's text, images, Figma link | `content/projects/<project>.js` |
| Physical images | `assets/physical/` |
| Digital images and screenshots | `assets/digital/` |
| Portrait and resume | `assets/portrait.jpg`, `assets/resume.pdf` |
| Colors and fonts | top of `css/style.css` |

## Adding content

- **Replace text:** anything in `[brackets]` is a placeholder. Placeholder text shows in grey on the site so it's easy to spot.
- **Add an image:** drop the file in `assets/...` using the file name the project file already lists (the grey boxes on the site show the exact path they expect), or change `src` to your file's name. If a file is missing, the site shows a labeled placeholder box instead of a broken image.
- **Change an image's shape:** set `ratio`, e.g. `"4/3"`, `"1/1"`, `"9/19"` for phone screens.
- **Add a Figma prototype:** in Figma, Share → Copy link, then paste it into the `figma` section's `url`.
- **Add a project:** copy `content/projects/bridge.js` to a new name, change `slug` to match the file name, and add that name to the right list in `content/site.js`.

## Section types

`text`, `image`, `gallery` (2 or 3 columns), `stats`, `figma`, `video`. See `content/projects/bridge.js` for examples of each.
