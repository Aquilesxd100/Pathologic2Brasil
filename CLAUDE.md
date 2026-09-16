# Pathologic 2 Brasil

Bilingual (PT-BR / EN) static site about the game Pathologic 2. Plain HTML/CSS/JS, no build
step, no framework. Every page exists twice: the PT version at the repo root and the EN
version under `en/`, both served by the same CSS and JS files.

## ⚠️ Project status: mid-refactor

This project is in the middle of a large refactoring effort. Most pages in the repo
still use the **old** structure/style and have not been migrated yet. Do not use them
as a reference for how new or refactored code should look.

**Pages that reflect the current, correct structure and style:**

- `index.html` / `en/index.html` — `_css/home.css`, `_js/home.js`
- `resultados.html` / `en/results.html` and `tudo.html` / `en/all.html` — `_css/guideCardListing.css`, `_js/guideCardListing.js`
- `mapa.html` / `en/map.html` — `_css/mapa.css`, `_js/mapa.js` *(most recent; being finished on the current branch)*

All of them use the shared `_css/main.css`, `_js/globalVariables.js`, `_js/utils.js` and the
template component in `P2B-Template/`.

Commit `32185b6` (`git show 32185b6`, the index refactor) is the **primary** template for
file organization, section ordering, banner comment style and naming. If a reference page
disagrees with that commit, the commit wins.

Do **not** copy patterns from the not-yet-refactored pages (`dinheiro.html`, `comida.html`,
`receitas.html`, `combate.html`, `podinzins.html`, `trocas.html`, etc.) or their CSS/JS —
they are the old style and are pending migration.

`.claude/commands/refactor-page.md` holds the full step-by-step procedure for migrating a
page; this file holds the conventions that apply to all work in the repo.

---

## Hard rules

1. **English everywhere** — function names, variable names, CSS class names, comments. The
   only exception is file names, which keep their current Portuguese names.
2. **Quotes:** `'single quotes'` for strings in CSS, JS and HTML attributes alike. Use
   `"double quotes"` only when the string content itself contains a single quote — e.g.
   `"click('option2')"`. Never touch double quotes inside visible page text.
3. **The site must run on an old TV browser.** Everything listed under Reminders in
   `README.md` is off-limits:
   - **JS** — no `let`, template literals, `class`, arrow functions, `replaceAll`,
     `contains`, `async`/`await`, `fetch`, `["…"]` property names, `!!`, `?.`, `.find()`.
     `const`, `var`, `function`, `switch`, `querySelectorAll`, `classList` are fine.
   - **CSS** — no `display: flex`. `filter` is the one allowed exception, and only with a
     `-webkit-filter` copy **directly below** the standard declaration. Same for
     `transform` / `-webkit-transform`.
4. **Shared files are read-only:** `_css/main.css`, `_js/utils.js`, `_js/globalVariables.js`.
   Reuse them, never edit them. If something genuinely belongs in one of them, leave it in
   the page file and say so in the final report — the user moves it themselves.
5. **Never edit the already-refactored reference pages** or their CSS/JS. Read only.
6. **Do not modify HTML during a refactor**, except to apply the quote rule. Almost every
   element already has an `id` or `class` to target. If an extra hook or a renamed handler
   seems necessary — **ask first**.
7. **LF line endings.** Repo blobs are LF and `core.autocrlf=true`. After any `sed -i`,
   confirm with `file <path>` that no CRLF crept in — otherwise the diff explodes into
   hundreds of phantom lines.
8. **Mobile support goes down to 320px.** 320px is a supported target, not an edge case.
   Nothing may overflow or break there; check 320 as well as 360/375/414/800.

---

## CSS conventions

### Organization

Two top-level blocks, in this order, with the banner art copied verbatim from
`_css/home.css` or `_css/mapa.css` and only the label swapped:

```
/* ========================================================================================================
   | 📑 Page Content [DESKTOP] | ==========================================================================
   ========================================================================================================  */

/* |-----------------------------| 🗺️ Section Name 🗺️ |------------------------------|💻|  */
```

…then the same for `[MOBILE]`, with `📱` instead of `💻` and each section wrapped in its own
`@media screen and (max-width: 800px) { … }`. Mobile sections mirror the desktop sections in
the same order, plus any mobile-only sections (fullscreen views, landscape variants) at the
end. Rules are indented one level under their banner.

### Comments

**Section banners only.** No explanatory comments on individual rules or declarations — no
"this replaces the old image", no notes about why a technique was chosen. That goes in the
report to the user, not in the file.

### Units — no `vw`, ever

`main.css` sets `html { font-size: 0.05vw }`, so **1rem = 0.05vw** and everything scales with
the viewport.

| Old value | New value |
|---|---|
| Desktop `Xvw` | `X * 20` rem |
| Desktop `Xpx` | `X * 1.042` rem (1920px reference) |
| Mobile `Npx` (fonts, spacing) | `calc(0.7N px + 1.8N rem)` (N = old px size at a ~400px viewport) |
| Mobile sizes that were proportional | plain rem (e.g. `1700rem` = 85vw) |
| Mobile borders, shadows, small offsets | plain `px` |
| Viewport-height-relative sizing | `vh` is allowed and useful for fullscreen overlays |

### Selectors

The first time an element is styled inside the desktop block, and again the first time
inside the mobile block, prefix the selector with its element type — `div#foodCard`,
`section#map-main-section`, `div.tip-div`. Immediately following rules for that same element
may omit the type (`#foodCard p`, `.tip-div p b`).

One CSS file serves both the PT and the EN version of a page, and Portuguese strings usually
run longer than their English ones. When a rule should apply to one language only, scope it
with the root `lang` attribute — `html[lang='pt-br'] …` / `html[lang='en'] …` — instead of
duplicating the stylesheet.

### Old per-element rules

Before dropping a narrow rule from the old CSS — a smaller font on one label, a margin fix
for a single element — work out what constraint it was solving. They routinely look cosmetic
and are not: a per-label font size may be the only thing keeping that label from overflowing
its container. If the new HTML has no hook to reproduce it, say so explicitly rather than
dropping it quietly and meeting it again later as a bug.

### Techniques that replace banned features

- **`display: flex`** → `display: inline-block` + `vertical-align: middle`;
  `text-align: center` on the parent to center-and-wrap a row; `font-size: 0` on the parent
  to kill inline whitespace gaps; `white-space: nowrap` to keep two blocks side by side
  (reset to `normal` on the children).
- **Icon beside text inside a `<button>`** → `position: absolute` on the icon plus a matching
  `padding-left` on the button. **Never `float`** — a float inside a button is ignored by
  shrink-to-fit width, so the button comes out too narrow and the label overflows the plaque.
- **`::before` / `::after` on an `<img>`** → does not render; `<img>` is a replaced element.
  Put the pseudo-element on the **parent** and position it absolutely.
- **Decorative `<img>`s the new HTML dropped** (border strips, arrow bullets) → recreate as
  `::before` / `::after` with `background-image` + `background-size: 100% 100%`.
- **`<ol>` / `<ul>` markers** → not styleable on the TV. Use `list-style: none` +
  `counter-reset` on the list and `content: counter(name) '.'; counter-increment: name` on
  `li::before`.
- **`flex-direction: column-reverse`** → impossible without flex. Keep DOM order, flag the
  ordering change, and offer to swap the elements in the HTML.
- **Show + fade a hidden block** → you cannot transition out of `display: none`: both class
  changes land in the same style recalculation, so the browser never sees a starting state.
  Use two classes — one setting `display: block`, one setting `opacity: 1` — and call
  `forceElementStylesUpdate(element)` between them:

  ```js
  article.classList.add('selected-marker-summary');   // display: block

  forceElementStylesUpdate(article);

  article.classList.add('showing-marker-summary');    // opacity: 1 — transition runs
  ```

  Never reach for a `setTimeout` here, and do not fall back to `@keyframes` because the
  transition "does not fire" — that is this bug, and this is its fix. `P2B-Template/Script.js`
  uses the same helper the other way round, paired with `.disable-transition`, to change
  state *without* animating.

### Transitions vs. animations

Use a `transition` for anything that moves between two states — fades, reveals, slides,
hovers, a panel opening. Reserve `@keyframes` / `animation` for **button click feedback**, a
one-shot effect with no resting state. Keyframes for something that is not a click is almost
certainly a transition instead.

Click animations are defined in the page's own CSS file, following commit `32185b6`:

```css
    .<thing>-click-animation {
        animation: <thing>-click-animation 0.20s none;
    }

    @keyframes <thing>-click-animation {
        0% { transform:scale(1); }
        50% { transform:scale(0.95); }
        100% { transform:scale(1); }
    }
```

### Reuse from `main.css`

Check before writing anything new: `.hide`, `.hide-on-desktop`, `.hide-on-mobile`,
`.border-bottom`, `.underlined`, `.disable-transition`, and the shared `section` / `article`
/ `header` / `h1` / `h2` base styles.

---

## JS conventions

### Organization

Banner comments in the same style, one per functional area:

```js
// |--------------------------| 🔍 Fullscreen Map Modal 🔍 |-------------------------|
```

Keep inline comments to a minimum — only where the code would otherwise read as a bug (e.g.
why a `setTimeout` exists). No narration.

### Rules

- **Use the function names already referenced in the HTML.** Renaming one requires an HTML
  edit, so **ask first**.
- **The deprecated click-animation system is gone.** Do not reproduce the old
  `botaoTipo2Discreto('some-id')` → `_js/index.js` → `_css/estrutura.css` pattern. Use
  `animateElementClick(element, 'animation-class-name')` from `_js/utils.js`, as commit
  `32185b6` and `_js/home.js` do. Visual result unchanged. The old prefix-handling function
  is obsolete — ignore it entirely.
- **Page state lives in DOM classes, not in JS variables.** Which item is open, selected or
  active is already recorded by the classes you toggle — read it back with
  `querySelector('… .the-class')` instead of mirroring it in a variable.
- **Never act on an element without naming it first.** Every element reached through a query
  — `getElementById`, `querySelector`, `querySelectorAll`, or an index into a collection —
  gets its own `const` before you read or change anything on it. Never chain off the query:

  ```js
  // Wrong
  document.getElementById('map-fullscreen-wrapper-mobile')
      .classList.remove('showing-fullscreen-map');

  // Right
  const mapFullscreenWrapper = document.getElementById('map-fullscreen-wrapper-mobile');

  mapFullscreenWrapper.classList.remove('showing-fullscreen-map');
  ```

  The only exceptions are `document` and `document.documentElement`, which are already named
  and may be used inline.
- **Avoid globals.** Wrap page scope in `(function () { … })()`. Functions invoked from inline
  `onclick` handlers, and enums those handlers reference, genuinely cannot be scoped — leave
  those global, as `_js/home.js` does.
- **Enums** go next to the code that uses them, `PascalCase` keys, numeric values following
  the on-page order of the things they name. Only truly cross-page enums belong in
  `globalVariables.js`.
- **Bilingual text produced by JS** branches on
  `getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR`.

### Shared helpers to reuse (`_js/utils.js`)

- `getCurrentPageLanguageCode()`
- `getIsMobileScreen()` — `window.innerWidth <= 800`
- `animateElementClick(element, animationClassName)`
- `forceElementStylesUpdate(element)` — flushes pending styles so a transition can start from
  an element that was `display: none` (see the show + fade technique above)

`_js/globalVariables.js` provides `LanguageEnum`, `PageTypeEnum`, `registeredGuidesList`,
`registeredPagesList`. These are top-level `const`s: they are **not** on `window`, but inline
`onclick` handlers still resolve them. An IDE warning about a helper being "not found" across
files is a false positive — that is how every refactored page works.

---

## Bilingual pages

The EN page must use **the same ids and classes as the PT page**, so one CSS file and one JS
file serve both. It also gets `lang='en'`, an English `<title>` and meta content, a `../`
prefix on every asset/stylesheet/script/image path, and single quotes throughout. Reuse the
existing English copy from the old EN page verbatim — do not retranslate. Verify that every
`id` the JS looks up exists in both pages.

Filename map: `index`→`index`, `mapa`→`map`, `tudo`→`all`, `comida`→`food`,
`dinheiro`→`money`, `receitas`→`recipes`, `combate`→`combat`, `podinzins`→`shmowders`,
`trocas`→`trading`, `resultados`→`results`.

---

## Verifying a page

```bash
# Banned JS constructs — must return nothing
grep -nE '\blet\b|=>|`|\bclass\b|replaceAll|\.contains\(|\basync\b|\bawait\b|\bfetch\(|!!|\?\.|\.find\(' _js/<page>.js
node --check _js/<page>.js

# Banned CSS — must return nothing
grep -nE 'display:\s*flex|[0-9]vw' _css/<page>.css

# filter always paired with -webkit-filter directly below
grep -n -A1 'filter:' _css/<page>.css

# line endings
file <page>.html _css/<page>.css _js/<page>.js en/<enpage>.html

# every referenced image actually exists
grep -oE "url\('[^']+'\)|src='[^']+'" _css/<page>.css <page>.html
```

`P2B-Template.js` XHRs its markup from `window.location.origin + '/P2B-Template'`, so a page
**must be served from the repo root** — a `file://` open will not render the shell. Start a
small static server on a spare port and confirm: template shell loads, each interactive
control responds, the click animation fires, dynamic titles/text switch language correctly.

For mobile, resizing through the browser tools is unreliable here. Drop a throwaway HTML file
at the repo root with an `<iframe>` of the page — media queries respond to the iframe
viewport — and sweep the iframe's width across 320, 360, 375, 414 and 800. **Delete the
throwaway file and stop the server when done**, and confirm `git status --short` lists only
the intended files.
