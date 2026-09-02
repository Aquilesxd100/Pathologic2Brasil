---
description: Refactor a page's CSS and JS to fit its already-rewritten HTML, following the project's 2026 refactor conventions
argument-hint: "@pagename.html"
---

# Refactor page: $1

The HTML of `$1` has already been rewritten by hand. The page is broken because its
CSS and JS still target the **old** structure.

**Your job:** adapt and reorganize that page's CSS and JS so the page works again, with
**identical visuals and identical behavior** to the pre-rewrite version. Then mirror the
result on the EN version of the page.

---

## 1. Resolve the target files

From `$1`, work out:

| Thing | How to find it |
|---|---|
| PT page | `$1` (repo root) |
| Page CSS | the `_css/*.css` the page links, other than `main.css` |
| Page JS | the `_js/*.js` the page loads, other than `globalVariables.js` / `utils.js` |
| EN page | same page under `en/` — the filename is translated |
| Old HTML | `git show master:$1` — diff it against the new HTML to see exactly what changed |

EN filename map: `index`→`index`, `mapa`→`map`, `tudo`→`all`, `comida`→`food`,
`dinheiro`→`money`, `receitas`→`recipes`, `combate`→`combat`, `podinzins`→`shmowders`,
`trocas`→`trading`, `resultados`→`results`.

Also pull the **old** CSS/JS for the page so you know what visuals you must reproduce:
`git show master:_css/<page>.css`, `git show master:_js/<page>.js`, and — for the
deprecated click-animation system — `git show master:_css/estrutura.css` and
`git show master:_js/index.js`.

## 2. Read before writing anything

- `README.md` — the compatibility reminder list. **Mandatory.**
- `CLAUDE.md` — tells you which pages are already refactored and therefore usable as references.
- Commit `32185b6` (`git show 32185b6`) — the **primary** template for file organization,
  section ordering, banner comment style, and naming. If a reference page disagrees with
  this commit, the commit wins.
- Already-refactored pages as secondary references (per `CLAUDE.md`): `index.html`
  (`_css/home.css`, `_js/home.js`), `tudo.html` / `resultados.html`
  (`_css/guideCardListing.css`, `_js/guideCardListing.js`), and `mapa.html`
  (`_css/mapa.css`, `_js/mapa.js`).
- Shared code you must reuse, never edit: `_css/main.css`, `_js/utils.js`,
  `_js/globalVariables.js`.
- `P2B-Template/P2B-Template.js` and `P2B-Template/Styles.css` — the shared shell.

## 3. Hard rules

1. **English everywhere** — function names, variable names, CSS class names, comments.
   The only exception is file names, which keep their current (Portuguese) names.
2. **Quotes:** `'single quotes'` for strings, in CSS, JS and HTML attributes alike. Use
   `"double quotes"` only when the string content itself contains a single quote —
   e.g. `"click('option2')"`. Never touch double quotes inside visible page text.
3. **Compatibility:** the page must run on an old TV browser. Everything listed as
   unsupported in `README.md` is off-limits:
   - JS — no `let`, template literals, `class`, arrow functions, `replaceAll`,
     `contains`, `async`/`await`, `fetch`, `["…"]` property names, `!!`, `?.`, `.find()`.
     `const`, `var`, `function`, `switch`, `querySelectorAll`, `classList` are fine.
   - CSS — no `display: flex`. `filter` is the one allowed exception, and only with a
     `-webkit-filter` copy **directly below** the standard declaration. Do the same for
     `transform` / `-webkit-transform`.
4. **Shared files are read-only.** Never edit `_css/main.css`, `_js/utils.js`,
   `_js/globalVariables.js`. If something you wrote genuinely belongs in one of them,
   leave it in the page file and **name it in your final report** — the user adds it themselves.
5. **Never edit the reference pages** (`index.html`, `tudo.html`, `resultados.html`,
   `mapa.html`) or their CSS/JS. Read only.
6. **Do not modify the HTML**, with exactly one exception: applying rule 2. Almost every
   element already has an `id` or `class` you can target. If you think you need an extra
   hook, a renamed handler, or any other HTML change — **ask first**, do not just do it.
7. **LF line endings.** Repo blobs are LF and `core.autocrlf=true`. After any `sed -i`,
   confirm with `file <path>` that no CRLF crept in, and normalize if it did — otherwise
   the diff explodes into hundreds of phantom lines.
8. **Mobile support goes down to 320px.** 320px viewport width is a supported target, not
   an edge case. Nothing may overflow its container or break the layout at that size, so
   check the fit at 320px — not only at 360/375/414.

## 4. Order of work

1. Refactor the page's CSS file.
2. Refactor the page's JS file.
3. Apply the quote rule to `$1` (the only permitted HTML edit).
4. Adapt the EN version of the page — its HTML file — to match.

---

## 5. CSS specification

### Organization

Two top-level blocks in this order, copying the banner art from `_css/home.css` or
`_css/mapa.css` verbatim and only swapping the label:

```
/* ========================================================================================================
   | 📑 Page Content [DESKTOP] | ==========================================================================
   ========================================================================================================  */

/* |-----------------------------| 🗺️ Section Name 🗺️ |------------------------------|💻|  */
```

…then the same for `[MOBILE]`, with `📱` instead of `💻` and each section wrapped in its
own `@media screen and (max-width: 800px) { … }` block. Mobile sections mirror the desktop
sections in the same order, plus any mobile-only sections (fullscreen views, landscape
variants) at the end. Rules are indented one level under their banner.

### Comments

**Section banners only.** Do not write explanatory comments about individual rules or
declarations — no "this replaces the old image", no "room for the icon", no notes about
why a technique was chosen. Those belong in your final report to the user, not in the file.

### Units — no `vw`, ever

`main.css` sets `html { font-size: 0.05vw }`, so **1rem = 0.05vw** and everything scales
with the viewport. Convert:

| Old value | New value |
|---|---|
| Desktop `Xvw` | `X * 20` rem |
| Desktop `Xpx` | `X * 1.042` rem (1920px reference) |
| Mobile `Npx` (fonts, spacing) | `calc(0.7N px + 1.8N rem)` (N = the old px size at a ~400px viewport) |
| Mobile sizes that were proportional | plain rem (e.g. `1700rem` = 85vw) |
| Mobile borders, shadows, small offsets | plain `px` |
| Viewport-height-relative sizing | `vh` is allowed and useful for fullscreen overlays |

### Selector convention

The first time an element is styled inside the desktop block or inside the mobile block,
prefix the selector with its element type — `div#foodCard`, `section#map-main-section`,
`div.tip-div`. Immediately following rules for that same element may omit the type
(`#foodCard p`, `.tip-div p b`). The desktop and mobile blocks each get their own "first time".

One CSS file serves both the PT and the EN version of a page, and Portuguese strings usually
run longer than their English counterparts. When a rule should apply to one language only,
scope it with the root `lang` attribute — `html[lang='pt-br'] …` or `html[lang='en'] …` —
rather than duplicating the stylesheet.

### Old per-element rules

Before dropping a narrow rule from the old CSS — a smaller font on one label, a margin fix
for a single element — work out what constraint it was solving. They routinely look
cosmetic and are not: a per-label font size may be the only thing keeping that label from
overflowing its container. If the new HTML has no hook to reproduce it, say so explicitly
rather than dropping it quietly and meeting it again later as a bug.

### Techniques that replace banned features

- **`display: flex`** → `display: inline-block` + `vertical-align: middle`;
  `text-align: center` on the parent to center-and-wrap a row of items; `font-size: 0` on
  the parent to kill inline whitespace gaps; `white-space: nowrap` to keep two blocks side
  by side (reset to `normal` on the children).
- **Icon beside text inside a `<button>`** → `position: absolute` on the icon plus a
  matching `padding-left` on the button. **Never `float`** — a float inside a button is
  ignored by shrink-to-fit width, so the button comes out too narrow and the label
  overflows the plaque background.
- **`::before` / `::after` on an `<img>`** → does not render; `<img>` is a replaced
  element. Put the pseudo-element on the **parent** and position it absolutely.
- **Decorative `<img>` elements the new HTML dropped** (border strips, arrow bullets) →
  recreate them as `::before` / `::after` with `background-image` + `background-size: 100% 100%`.
- **`<ol>` / `<ul>` markers** → not styleable on the TV. Use
  `list-style: none` + `counter-reset` on the list and
  `content: counter(name) '.'; counter-increment: name` on `li::before`.
- **`flex-direction: column-reverse`** → impossible without flex. Keep DOM order and flag
  the ordering change in your report; offer to swap the elements in the HTML.
- **Show + fade a hidden block** → you cannot transition out of `display: none`. Use two
  classes: one that sets `display: block`, one that sets `opacity: 1`, and let the JS add
  the second on a short `setTimeout` after the first.

### Click animations

Define the page's click animation keyframes in **this page's** CSS file, following the
pattern in commit `32185b6`:

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
`.border-bottom`, `.underlined`, `.disable-transition`, and the shared `section` /
`article` / `header` / `h1` / `h2` base styles.

---

## 6. JS specification

### Organization

Banner comments in the same style, one per functional area:

```js
// |--------------------------| 🔍 Fullscreen Map Modal 🔍 |-------------------------|
```

Keep inline comments to a minimum — only where the code would otherwise read as a bug
(e.g. why a `setTimeout` exists). No narration.

### Rules

- **Use the function names already referenced in the HTML.** They were chosen
  deliberately; renaming one requires an HTML edit, so **ask first**.
- **Replace the deprecated click-animation system.** The old pattern
  (`botaoTipo2Discreto('some-id')` → `_js/index.js` → `_css/estrutura.css`) must not be
  reproduced. Use `animateElementClick(element, 'animation-class-name')` from
  `_js/utils.js`, exactly as commit `32185b6` and `_js/home.js` do. Visual result unchanged.
- **The old prefix-handling function is obsolete — ignore it entirely.**
- **Page state lives in DOM classes, not in JS variables.** Which item is open, selected or
  active is already recorded by the classes you toggle — read it back with
  `querySelector('… .the-class')` instead of mirroring it in a variable.
- **Avoid globals.** Wrap page scope in `(function () { … })()`. Functions invoked from
  inline `onclick` handlers, and enums those handlers reference, genuinely cannot be
  scoped — leave those global, as `_js/home.js` does.
- **Enums** go next to the code that uses them, `PascalCase` keys, and their numeric
  values follow the on-page order of the things they name. Only truly cross-page enums
  belong in `globalVariables.js` (which you may not edit — report instead).
- **Bilingual text** produced by JS: branch on
  `getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR`.

### Shared helpers to reuse (`_js/utils.js`)

- `getCurrentPageLanguageCode()`
- `getIsMobileScreen()` — `window.innerWidth <= 800`
- `animateElementClick(element, animationClassName)`

`globalVariables.js` provides `LanguageEnum`, `PageTypeEnum`, `registeredGuidesList`,
`registeredPagesList`. Note these are top-level `const`s: they are **not** on `window`,
but inline `onclick` handlers still resolve them. An IDE warning about a helper being
"not found" across files is a false positive — that is how every refactored page works.

---

## 7. HTML (step 3)

Only the quote rule. Convert attribute delimiters from `"` to `'`; leave double quotes
that appear inside visible text alone. A regex like
`sed -i "s/=\"\([^\"]*\)\"/='\1'/g"` handles it, but re-check the file afterwards for
attributes whose value legitimately contains a single quote, and for CRLF damage.

## 8. EN page (step 4)

The EN page must use **the same ids and classes as the PT page** so that one CSS file and
one JS file serve both. Rebuild it to mirror the new PT structure exactly, then:

- `lang='en'`, English `<title>` and meta content
- `../` prefix on every asset, stylesheet, script and image path
- reuse the existing English copy from the old EN page verbatim — do not retranslate
- single quotes throughout

Verify afterwards that every `id` your JS looks up exists in both pages.

## 9. Verify before reporting

```bash
# Banned JS constructs — must return nothing
grep -nE '\blet\b|=>|`|\bclass\b|replaceAll|\.contains\(|\basync\b|\bawait\b|\bfetch\(|!!|\?\.|\.find\(' _js/<page>.js
node --check _js/<page>.js

# Banned CSS — must return nothing
grep -nE 'display:\s*flex|[0-9]vw' _css/<page>.css

# filter always paired with -webkit-filter directly below
grep -n -A1 'filter:' _css/<page>.css

# line endings
file $1 _css/<page>.css _js/<page>.js en/<enpage>.html

# every referenced image actually exists
grep -oE "url\('[^']+'\)|src='[^']+'" _css/<page>.css $1
```

Then check it in a browser. `P2B-Template.js` XHRs its markup from
`window.location.origin + '/P2B-Template'`, so the page **must be served from the repo
root** — a `file://` open will not render the shell. Start a small static server on a spare
port, load the page, and confirm: template shell loads, each interactive control responds,
the click animation fires, dynamic titles/text switch language correctly.

For mobile, window resizing through the browser tools is unreliable here. Instead, drop a
throwaway HTML file at the repo root containing an `<iframe>` of the page — media queries
respond to the iframe viewport — and inspect inside it, sweeping the iframe's width across
the supported range (320, 360, 375, 414, 800) rather than checking a single size. **Delete the
throwaway file and stop the server when you are done**, and confirm `git status --short`
lists only the four intended files.

## 10. Final report

Tell the user, concisely:

- the four files changed and what each got
- **every visual or behavioral deviation** from the old page, with the reason and an offer
  to fix it if it matters (dropped transitions, dropped narrow-viewport tweaks, reordered
  elements, dropped per-element font sizes with no class hook in the new HTML)
- anything that arguably belongs in `main.css` / `utils.js` / `globalVariables.js`, since
  you were not allowed to put it there
- any Portuguese classes still sitting in the HTML that your new CSS deliberately does not
  target
