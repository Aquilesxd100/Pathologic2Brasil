# Pathologic 2 Brasil

Bilingual (PT-BR / EN) static site about the game Pathologic 2. Plain HTML/CSS/JS, no build
step, no framework. Every page exists twice: the PT version at the repo root and the EN
version under `en/`, both served by the same CSS and JS files.

## ⚠️ Project status: mid-refactor

This project is in the middle of a large refactoring effort. Most pages in the repo
still use the **old** structure/style and have not been migrated yet. Do not use them
as a reference for how new or refactored code should look.

**Pages that reflect the current, correct structure and style:**

- `index.html` / `en/index.html` — `assets/pages/index/index.css`, `assets/pages/index/index.js`
- `resultados.html` / `en/results.html` and `tudo.html` / `en/all.html` — `assets/shared/css/guide-card-listing.css`, `assets/shared/js/guide-card-listing.js`
- `mapa.html` / `en/map.html` — `assets/pages/map/map.css`, `assets/pages/map/map.js`
- `dinheiro.html` / `en/money.html` — `assets/pages/money/money.css`, no page JS *(most recent;
  the reference for the shared content components below)*

All of them use the shared `assets/shared/css/main.css`, `assets/shared/js/globalVariables.js`,
`assets/shared/js/utils.js` and the template component in `assets/shared/P2B-Template/`.

**Page structure:** each content block is an `<article>` (with its `<header>`, and an optional
`<footer>`) that holds one or more `<section>`s — never the other way round. `main.css` styles
`article` as the bordered card with the numbered header background and `section` as the inner
content area. Ids follow the element: `#quick-access-article`, `#night-merchant-section`.

Commit `32185b6` (`git show 32185b6`, the index refactor) is the **primary** template for
file organization, section ordering, banner comment style and naming. If a reference page
disagrees with that commit, the commit wins.

Do **not** copy patterns from the not-yet-refactored pages (`comida.html`, `receitas.html`,
`combate.html`, `podinzins.html`, `trocas.html`, etc.) or their CSS/JS —
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
4. **Shared files change only on request:** `assets/shared/css/main.css`,
   `assets/shared/js/utils.js`, `assets/shared/js/globalVariables.js`. Reuse them; edit them
   only when the user asks — for example to add or adjust a shared component (see "Shared
   content components" below). If something you wrote on your own initiative belongs in
   one of them, leave it in the page file and say so in the final report.
5. **Never edit the already-refactored reference pages** or their CSS/JS. Read only.
6. **Line endings.** Repo blobs are LF and `core.autocrlf=true`, so the working copies are
   CRLF and git converts them on commit. After a `sed -i` or a script edit, check with
   `file <path>` that the file still has CRLF endings like the rest of the working copy, with
   no mixed endings, and that `git diff --stat` counts only the lines you changed.
7. **Mobile support goes down to 320px.** 320px is a supported target, not an edge case.
   Nothing may overflow or break there; check 320 as well as 360/375/414/800.
8. **Always use relative paths in the HTML.** Every local `src`, `href` and `srcset` in a
   PT-BR page (repo root) starts with `./` — `./assets/shared/css/main.css` — and every one
   in an EN page (`en/`) starts with `../`. Never root-relative `/assets/...`: the site is
   served under `/Pathologic2Brasil/` on GitHub Pages, where those paths 404.
9. **Inline `<svg>` closes with `</ svg>`** — with a space, on **every** svg, because the
    live server bugs out on a plain `</svg>`. An svg written directly in the HTML follows the
    close button in `mapa.html` (`#map-fullscreen-wrapper-mobile`): one child per line, each
    nesting level indented one tab deeper, and an explicit closing tag on every child
    (`></path>`, `></g>`), never a self-closing `/>`:

    ```html
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    	<g stroke-width='0'></g>
    	<g stroke-linecap='round' stroke-linejoin='round'></g>
    	<g>
    		<path d='M18 6L6 18' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'></path>
    		<path d='M6 6L18 18' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'></path>
    	</g>
    </ svg>
    ```

---

## CSS conventions

### Organization

Two top-level blocks, in this order, with the banner art copied verbatim from
`assets/pages/index/index.css` or `assets/pages/map/map.css` and only the label swapped:

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
| `%` margins and paddings | rem (`1%` of a full-width container ≈ `20rem`) |

No `%` in `margin` or `padding`. A percentage there resolves against the containing block's
width, not the viewport, so the same value spaces differently depending on how deeply the
element is nested. Use rem — or the mobile `calc()` / `px` forms above — instead.

**At most one decimal digit in any value.** The conversions above produce long decimals
(`24 * 1.042 = 25.008rem`, `1.8 * 12.5 = 22.5rem` is fine, `0.7 * 12.5 = 8.75px` is not); round every number in a property value — inside a
`calc()` too — to one decimal digit, up or down as appropriate: `25.39rem` → `25.4rem`,
`25.34rem` → `25.3rem`.

**Desktop font sizes are `calc()` of px + rem.** Every `font-size` in the desktop block is a
`calc()` combining a `px` part and a `rem` part (`font-size: calc(12px + 22rem);`), never a
plain rem or px value, matching the `calc()` form already used for mobile fonts.

### Selectors

The first time an element is styled inside the desktop block, and again the first time
inside the mobile block, prefix the selector with its element type — `div#foodCard`,
`article#map-main-article`, `div.tip-div`. Immediately following rules for that same element
may omit the type (`#foodCard p`, `.tip-div p b`).

One CSS file serves both the PT and the EN version of a page, and Portuguese strings usually
run longer than their English ones. When a rule should apply to one language only, scope it
with the root `lang` attribute — `html[lang='pt-br'] …` / `html[lang='en'] …` — instead of
duplicating the stylesheet.

**Text styles go on the text element, not on its container.** When text sits inside a
container — a `p`, `h2`, `li` or `span` inside a `div` — put colour, font, size, letter
spacing and text shadow on the text element itself (`.subtitle-div h2 { color: … }`), never
on the container (`div.subtitle-div { color: … }`). The container keeps only box styles:
border, background, padding, width. When a colour utility class has to beat a
component's text rule, add the component-scoped selector to the utility rule
(`.<colour-class>, .subtitle-div .<colour-class> { … }`) instead of moving the colour back to
the container.

**Spacing around a lone text element is padding on its container.** When a container holds
only a text element — a `div` around a single `h2` or `p` — give the container `padding`
(`div.subtitle-div { padding: … }`) instead of a `margin` on the text. Margins on the text
stay for containers that hold several elements, where they space the elements apart.

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
- **Decorative `<img>`s the new HTML dropped** (border strips) → recreate as
  `::before` / `::after` with `background-image` + `background-size: 100% 100%`.
- **YouTube `<iframe>` embeds** → replaced by a local video inside a wrapper:
  `<div class='video-wrapper'><video src='videos/<name>.mp4' title='…' preload='metadata' controls></video></div>`.
  `main.css` already styles `div.video-wrapper` and its `<video>`; page CSS adds layout only.
  No `<iframe>` in page content (the throwaway mobile-test harness is the one exception).
- **`flecha_texto*.png` arrow bullets** → the inline arrow `<svg>` from `mapa.html` (header of
  `#selected-marker-summary-article`). Its first `<path>` `fill` is the arrow colour and must
  match the old PNG it replaces (`flecha_texto_verde` → `#00D900`; sample the rest from the
  image); the second path is the black outline. Inside `ol.step-list` plaques there is no arrow in the HTML at all: `main.css` draws it on
  `li::before` from `assets/shared/img/step-arrow.svg`, so the old `<img>` is just dropped.
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
  section.classList.add('selected-marker-summary');   // display: block

  forceElementStylesUpdate(section);

  section.classList.add('showing-marker-summary');    // opacity: 1 — transition runs
  ```

  Never reach for a `setTimeout` here, and do not fall back to `@keyframes` because the
  transition "does not fire" — that is this bug, and this is its fix. `assets/shared/P2B-Template/Script.js`
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
`.padded-container`, `.border-top`, `.border-bottom`, `.margin-bottom`, `.underlined`,
`.font-bug-fix`, `.disable-transition`, and the shared `section` / `article`
/ `header` / `h1` / `h2` base styles.

### Shared content components (`main.css`)

Use these for any page that has the matching content; do not restyle them in page CSS
beyond page-specific layout.

- **Tip — `div.tip-div > p > b`.** Replaces `div.dica-padrao`. A light-blue tip bar with
  black top/bottom borders; the `b` is the underlined `DICA:` / `TIP:` label. Consecutive
  tips share one border, and a tip that ends a `section` drops its bottom border.

- **Warning — `div.beware-div > p > span`.** Replaces `div.atencao-padrao`. A centred,
  justified paragraph; the `span` is the yellow `ATENÇÃO:` / `BEWARE:` label.

- **Observation — `p.observation`.** Replaces `p.observacao`. A small light-blue footnote;
  right after a `table.items-table` it sits close to the table.

- **Video — `div.video-wrapper > video`.** The local video that replaces a YouTube embed
  (see "Techniques that replace banned features" above); page CSS adds layout only.

- **Section images — `section picture` / `section figure`.** An image placed in a section
  goes inside a `<picture>` (with a `<source>` for the mobile version, when there is one),
  or inside a `<figure>` when it has a `<figcaption>`. `main.css` gives the `img` a black
  border and a drop shadow and spaces consecutive pictures and figures apart (no space
  above the first child of the section or below the last). Page CSS sets only the image
  width, through the wrapper's id — see `#organ-merchant-location-wrapper` in
  `assets/pages/money/money.css`. The `figcaption` is styled on mobile only so far.

  ```html
  <div id='<name>-wrapper' class='padded-container'>
  	<picture>
  		<source media='(max-width: 800px)' srcset='./assets/pages/<page>/img/<image>-mobile.jpg'>
  		<img src='./assets/pages/<page>/img/<image>.jpg'>
  	</picture>
  </div>
  ```

- **Subtitle — `div.subtitle-div > h2`.** A dark-textured bar with black top/bottom
  borders, the `h2` in green `frizquadrata`. It replaces the old `div.sub-titulo` /
  `div.sub-titulo2`. Sits directly inside a `section`, before the content it titles.

  ```html
  <div class='subtitle-div'>
  	<h2>Itens Necessários</h2>
  </div>
  ```

- **Step-by-step list — `ol.step-list`.** One `li` per step, holding a `header > h2` with
  the step title, a `ul` of tip plaques, and an optional `div.video-wrapper`. The step
  number is **not** in the HTML: a CSS counter draws it on `header::before` over the
  `fundo_numeros.png` plaque, and `h2::before` adds the ` - ` separator. Each inner `li` is
  a text plaque (`step-list-note-upper-part` / `-middle-part` / `-lower-part.png`) with the arrow icon on
  `li::before`. On desktop the plaques and the video sit side by side; on mobile they
  stack.

  ```html
  <ol class='step-list'>
  	<li>
  		<header>
  			<h2>Prepare-se!</h2>
  		</header>
  		<ul>
  			<li>Escolha um bom local de caça…</li>
  		</ul>
  		<div class='video-wrapper'>
  			<video src='./assets/pages/<page>/videos/step-1-prepare.mp4' title='Prepare-se' preload='metadata' controls></video>
  		</div>
  	</li>
  </ol>
  ```

- **Items table — `table.items-table`.** For item lists and item combinations. Rules:
  - `<td>` only — no `<th>`, no `<thead>`; each item icon is an `<img>` with `alt` set to
    the item's name.
  - Two cell classes only: `td.quantity-cell` (the `1x` / `2+` counter, larger text) and
    `td.equal-cell` (the `=` of a combination row). Icon and name cells take no class.
  - Item-list row: `quantity-cell` + icon + name. Combination row: icons + `equal-cell` +
    result icon.
  - Never duplicate a table for desktop and mobile. When the desktop layout shows two
    tables side by side, write two `table.items-table`s; the shared CSS centres and
    stacks them, and the page CSS puts them side by side on desktop
    (`display: inline-block` in a `min-width: 801px` query) and, if wanted, merges them
    into one block on mobile — see `assets/pages/money/money.css`.
  - Vertical spacing between consecutive tables is in `main.css` (zeroed on the first and
    last child); a `p.observation` right after a table sits close to it.
  - On mobile the table is `table-layout: fixed`, full width up to `500px`, and icons
    are `width: 100%` of their cell, so they scale with the number of cells in the row.

  ```html
  <table class='items-table'>
  	<tr>
  		<td class='quantity-cell'>1x</td>
  		<td><img src='./_imagens/_icones/revolver.jpg' alt='Arma de Fogo'></td>
  		<td>Arma de Fogo</td>
  	</tr>
  </table>
  <table class='items-table'>
  	<tr>
  		<td><img src='./_imagens/_icones/twyre.jpg' alt='Twyre Marrom'></td>
  		<td><img src='./_imagens/_icones/garrafa_agua.jpg' alt='Garrafa de Água'></td>
  		<td class='equal-cell'>=</td>
  		<td><img src='./_imagens/_icones/yas.jpg' alt='Infusão "Yas"'></td>
  	</tr>
  </table>
  ```

- **Text beside an image — `div.text-with-image-wrapper`.** Replaces the old
  `div.texto-com-imagem`. The `<img>` comes **before** the `<p>`, so the text wraps around
  it. On desktop the first image floats left and a second one, if present, floats right;
  on mobile the image stacks above the text, centred. The image has a fixed width only,
  never a fixed height.

  ```html
  <div class='text-with-image-wrapper padded-container'>
  	<img src='./assets/pages/<page>/img/<image>.jpg'>
  	<p>…</p>
  </div>
  ```

**Links** are styled globally by the `a {}` rule in `main.css` (green `#00FF00`). Write a
plain `<a href='./<page>.html'>text</a>`: no inner `<span>` (inside a `beware-div` it would
turn yellow), no old `.link` class, and no link colour in the page CSS.

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
  `botaoTipo2Discreto('some-id')` → `_js/index.js` → `_css/estrutura.css` pattern (old files,
  only on `master`). Use `animateElementClick(element, 'animation-class-name')` from
  `assets/shared/js/utils.js`, as commit `32185b6` and `assets/pages/index/index.js` do. Visual result unchanged. The old prefix-handling function
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
  those global, as `assets/pages/index/index.js` does.
- **Enums** go next to the code that uses them, `PascalCase` keys, numeric values following
  the on-page order of the things they name. Only truly cross-page enums belong in
  `globalVariables.js`.
- **Bilingual text produced by JS** branches on
  `getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR`.

### Shared helpers to reuse (`assets/shared/js/utils.js`)

- `getCurrentPageLanguageCode()`
- `getIsMobileScreen()` — `window.innerWidth <= 800`
- `animateElementClick(element, animationClassName)`
- `forceElementStylesUpdate(element)` — flushes pending styles so a transition can start from
  an element that was `display: none` (see the show + fade technique above)

`assets/shared/js/globalVariables.js` provides `LanguageEnum`, `PageTypeEnum`, `registeredGuidesList`,
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
grep -nE '\blet\b|=>|`|\bclass\b|replaceAll|\.contains\(|\basync\b|\bawait\b|\bfetch\(|!!|\?\.|\.find\(' assets/pages/<page>/<page>.js
node --check assets/pages/<page>/<page>.js

# Banned CSS — must return nothing
grep -nE 'display:\s*flex|[0-9]vw' assets/pages/<page>/<page>.css

# filter always paired with -webkit-filter directly below
grep -n -A1 'filter:' assets/pages/<page>/<page>.css

# line endings
file <ptpage>.html assets/pages/<page>/<page>.css assets/pages/<page>/<page>.js en/<enpage>.html

# every referenced image actually exists
grep -oE "url\('[^']+'\)|src='[^']+'" assets/pages/<page>/<page>.css <ptpage>.html
```

`P2B-Template.js` XHRs its markup from `window.location.origin + '/assets/shared/P2B-Template'`
(with the repo name in between on GitHub Pages), so a page
**must be served from the repo root** — a `file://` open will not render the shell. Start a
small static server on a spare port and confirm: template shell loads, each interactive
control responds, the click animation fires, dynamic titles/text switch language correctly.

For mobile, resizing through the browser tools is unreliable here. Drop a throwaway HTML file
at the repo root with an `<iframe>` of the page — media queries respond to the iframe
viewport — and sweep the iframe's width across 320, 360, 375, 414 and 800. **Delete the
throwaway file and stop the server when done**, and confirm `git status --short` lists only
the intended files.
