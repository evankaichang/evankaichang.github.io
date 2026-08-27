# Evan Chang — Project Portfolio

A plain static website. No build step, no dependencies, no npm.
**Double-click `index.html`** to view it locally.

---

## Adding a project

Two steps.

### 1. Add the photos

Make a folder inside `images/` named after the project, and put the pictures in it:

```
images/
  my-new-project/
    hero.jpg
    detail-shot.jpg
```

Any name works — just use the same path in step 2. JPG and PNG are both fine.

### 2. Add the project to `js/projects.js`

Open `js/projects.js`, copy an existing project block, and paste it into the
`projects` list. Change the text and the image paths:

```js
{
  title: "My New Project",
  subtitle: "One line under the title",
  role: "Lead Designer",          // optional
  year: "2026",                   // optional
  status: "in-progress",          // optional — shows an "In progress" badge
  tags: ["CAD", "3D Printing"],   // optional — these become the filter buttons
  summary: "A sentence or two shown on the project card.",
  sections: [
    { heading: "System Overview", items: ["First bullet", "Second bullet"] },
    { heading: "My Contribution", items: ["What I did"] },
  ],
  images: [
    { src: "images/my-new-project/hero.jpg", caption: "The finished thing" },
    { src: "images/my-new-project/detail-shot.jpg", caption: "Close-up of the gearbox" },
  ],
},
```

Save the file, refresh the browser. That's it.

**Notes**

- Only `title` is required. Skip any other field and the site just won't render
  it — nothing breaks, no empty boxes.
- The **first image is the card's cover photo**, so lead with your best shot.
- Order in the list = order on the page. Move a block up to feature it.
- Watch the commas: every project block ends with `},` and every line inside
  ends with a comma.

### Adding photos to an existing project

Drop the file in that project's `images/` folder, then add one line to that
project's `images` list:

```js
{ src: "images/wind-up-car/gearbox.jpg", caption: "The shifting gearbox" },
```

---

## Changing your name, tagline, and links

Top of `js/projects.js`, in the `siteConfig` block. Set any link to `""` to
hide that button.

To add a resume: drop the PDF into a `files/` folder and set
`resumeUrl: "files/EvanChang-Resume.pdf"`.

> The site currently lists your email publicly in the header and footer. If you
> would rather not have it scraped, set `email: ""` in `siteConfig`.

---

## Changing colors

Every color lives in the two blocks at the top of `css/style.css` —
`:root` for light mode, `:root[data-theme="dark"]` for dark mode. Change
`--accent` to recolor the buttons, badges, and bullets in one shot.

---

## Publishing an update

The live site is hosted on **GitHub Pages**, served from the `main` branch of
this repo. To push a change (a new project, a new photo, a typo fix):

```bash
git add . && git commit -m "add the speaker project" && git push
```

GitHub rebuilds the page automatically — it goes live in about 30 seconds.
If you don't see the change, hard-refresh with `Ctrl+Shift+R`.

---

## Files

| File | What it is |
|---|---|
| `js/projects.js` | **Your content.** The only file you normally edit. |
| `index.html` | Page shell. |
| `css/style.css` | Styling and the color variables. |
| `js/main.js` | Renders the cards, filters, and detail view. |
| `images/` | Project photos, one folder per project. |

Photos in `images/` were pulled from `Evan Chang Portfolio8.5.26.pdf` and
resized for the web. Originals are still in the PDF if you need them larger.
