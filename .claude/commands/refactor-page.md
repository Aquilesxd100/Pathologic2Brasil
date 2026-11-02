---
description: Refactor a page end to end, HTML structure, stylesheet and script first, then its files and EN version, following the project's 2026 refactor conventions
argument-hint: "@pagename.html"
---

# Refactor page: $1

`$1` still uses the **old** structure and style. The refactor starts from its HTML: rewrite
the PT page's markup into the new structure, create the page's stylesheet and script for
it, and get them approved; then move the page's files into place, mirror the result on the
EN page, and finally strip every id and class nothing targets and delete every file the
refactor left unused.

**Your job:** end with a page that has **identical visuals and identical behavior** to the
old version, built on the new structure and conventions. Then mirror the result on the EN
version of the page.

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
  (`assets/pages/index/index.css`, `assets/pages/index/index.js`), `tudo.html` /
  `resultados.html` (`assets/shared/css/guide-card-listing.css`,
  `assets/shared/js/guide-card-listing.js`), `mapa.html` (`assets/pages/map/map.css`,
  `assets/pages/map/map.js`), `dinheiro.html` (`assets/pages/money/money.css`, the
  reference for the shared content components), `podinzins.html`
  (`assets/pages/shmowders/shmowders.css`, the reference for `table.npc-trade-table` and
  section headers with a day box) and `comida.html` (`assets/pages/food/food.css`). Their content uses `<article>`s containing `<section>`s — see
  "Page structure" in `CLAUDE.md`.
- Shared code you must reuse (edit only on request, hard rule 4): `assets/shared/css/main.css`, `assets/shared/js/utils.js`,
  `assets/shared/js/globalVariables.js`.
- `assets/shared/P2B-Template/P2B-Template.js` and `assets/shared/P2B-Template/Styles.css` — the shared shell.

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
4. **Shared files change only on request.** Edit `assets/shared/css/main.css`,
   `assets/shared/js/utils.js` and `assets/shared/js/globalVariables.js` only when the user
   asks — for example to add or adjust a shared component. If something you wrote on your
   own initiative belongs in one of them, leave it in the page file and **name it in your
   final report**.
5. **Never edit the reference pages** (`index.html`, `tudo.html`, `resultados.html`,
   `mapa.html`, `dinheiro.html`, `podinzins.html`, `comida.html` and their EN versions) or
   their CSS/JS.
   Read only — except the path updates for files moved to `assets/shared/` (item
   images and any file used by more than one page; section 6).
6. **The HTML can still change after step 1.** Step 1 (section 5) defines the PT markup,
   its stylesheet and its script, but later steps may adjust it whenever the work needs it: a hook for an old narrow
   rule, a wrapper the CSS needs, an element order that can only be fixed in the markup.
   Keep each adjustment small, apply the same change to the EN page, and list it in the
   final report. Renaming classes, ids or handlers the user approved in step 1 is the
   user's call — **ask first**.
7. **Line endings.** Repo blobs are LF and `core.autocrlf=true`, so the working copies are
   CRLF and git converts them on commit. After a `sed -i` or a script edit, check with
   `file <path>` that the file still has CRLF endings like the rest of the working copy, with
   no mixed endings, and that `git diff --stat` counts only the lines you changed.
8. **Mobile support goes down to 320px.** 320px viewport width is a supported target, not
   an edge case. Nothing may overflow its container or break the layout at that size, so
   check the fit at 320px — not only at 360/375/414.
9. **Relative paths in the HTML:** `./` in the PT page, `../` in the EN page, never
   root-relative `/assets/...` (hard rule 8 in `CLAUDE.md`).
10. **Inline `<svg>` closes with `</ svg>`**, with a space, one child per line and an
    explicit closing tag on every child (hard rule 9 in `CLAUDE.md`).
11. **No accented characters in `batukapur` text.** The font has no accented glyphs, so
    the article `h1`s, the section header `h2`s (day box included) and any other text set
    in `batukapur` use the unaccented letter: `Atuacao sobre Fome`, not `Atuação sobre Fome`
    (hard rule 11 in `CLAUDE.md`). `alt`, `title` and text in other fonts keep their accents.

## 4. Order of work

1. Refactor the PT page's HTML, define its structure, and create the page's stylesheet and
   — if the page has behaviour — its script (section 5), then **stop for the user's
   approval**.
2. Move the page's files to their place in the project structure (section 6).
3. Adapt the EN version of the page — its HTML file — to match (section 9).
4. Remove every id and class that no stylesheet or script targets, from both pages, then
   delete every file the refactor left unused (section 10).

## 5. Refactor the PT page's HTML and create its stylesheet and script (step 1)

Everything else hangs off the HTML: the CSS targets its ids and classes, the JS looks them
up, and the EN page mirrors it. So the PT page is rewritten first, and its stylesheet and
script are written right after, against the new markup. Only these files change in this
step: the PT page, `assets/pages/<page>/<page>.css` and, when the page has behaviour,
`assets/pages/<page>/<page>.js`. Everything else stays untouched.

### Starting point

- Old version: `git show master:$1`. Current version: `$1`. The current file may already be
  half-migrated (site shell removed, `<p2b-template>` added) while its content is still the
  old markup. Read both in full before writing anything.
- Read `mapa.html`, `index.html`, `dinheiro.html`, `podinzins.html` and `comida.html` as the
  structural reference, and
  `main.css` for the components that already exist.
- Read the old CSS rules behind every class the page uses (for pages on the shared old
  stylesheet, that is `_css/padrao.css`) so you know what each block looked like and which
  narrow per-element rules exist.
- Read the old page JS (`git show master:_js/<page>.js`) and every inline handler in the old
  HTML (`onclick`, `onchange`…), so you know every behaviour the new markup has to support
  and which ids and classes the script will need.

### Head and shell

Copy the head of `mapa.html`, with single quotes throughout:

- `<html lang='pt-br'>` and the page's own `<meta>` tags and `<title>`, text unchanged.
- The favicon, then `./assets/shared/css/main.css`, then the page stylesheet at its final
  path `./assets/pages/<page>/<page>.css` (it may not exist yet — it is created later in
  this step, see "Writing the stylesheet").
- `globalVariables.js` and `utils.js` in the `<head>`.
- `<body>` (no id), all page content inside `<p2b-template>`, then
  `./assets/shared/P2B-Template/P2B-Template.js`, then the page JS at its final path
  `./assets/pages/<page>/<page>.js` **only if the page has behaviour** (see "Writing the
  script"). A page with no interaction gets no page JS.
- Remove every old stylesheet (`_css/*.css`), the old `_js/index.js`, and any inline
  `<style>` block. Note what the inline block did; its rules move into the page CSS.

### Sections and articles

- Each old `<picture class='banner'>` + `<h1 class='titulo'>` + `<section>` becomes one
  `<article>` with `<header><h1>Title</h1></header>` first, then its
  content in one or more `<section>`s (see "Page structure" in `CLAUDE.md`). The banner
  images are dropped: `main.css` draws article headers by `nth-of-type`.
- One `<section>` per topic inside the article. A section header or a subtitle
  (`div.subtitle-div`) opens a topic, so it usually starts a new section — see "Section
  header or subtitle?" below for which one to use. A short intro paragraph on its own is
  `<section class='padded-container'>`.
- **A section with its own title opens with a section header** — `<header>` as the
  section's first child, holding the title `h2` and, optionally, a day box before it
  (`div > h2`, e.g. `Dia 1`). No classes: `main.css` styles every `section > header`.
  The title is green `batukapur` on the dark bar, so it takes no accents (hard rule 11).
  On desktop and mobile the day box and title are table cells: the black divider between
  them always reaches the top and bottom borders and both texts are vertically centred.

  ```html
  <section>
  	<header>
  		<div>
  			<h2>Dia 1</h2>
  		</div>
  		<h2>Atuacao sobre Fome</h2>
  	</header>
  	…
  </section>
  ```

  Without a day box the header holds just the `h2`.
- **Section header or subtitle? Decide by the old title's font, not its class name.** Look
  up the old title's rule in the old CSS (including any page-specific override) and see
  which `font-family` actually renders:
  - green **`batukapur`** (old `div.sub-titulo`, the `combate.html` title bars) →
    **section header** `section > header > h2`, accents removed (hard rule 11);
  - green **`frizquadrata`** (old `div.sub-titulo2`) → **subtitle** `div.subtitle-div > h2`,
    accents kept.

  The two look alike — both are a green title on the dark textured bar — so the font is
  the only reliable tell. The section header always opens its section; a subtitle can also
  sit further down, as a heading inside a section's content. A `batukapur` title that is
  not at the start of a topic still becomes a section header: start a new section there.
  If you can't tell which font renders, ask in the checkpoint.
- **A step-by-step guide is one `ol.step-list` inside a single section**, one `li` per step
  (see the shared components in `CLAUDE.md`). Never one article or section per step.
  Any other run of parts that share one structure is a `div` per part with a shared class
  inside one section.
- Text and its image go together in a `div.padded-container`. A separator `<hr>` becomes a
  `border-top` / `border-bottom` utility class on the wrapper that follows or precedes it.
- Give an `id` to every article or wrapper the CSS will need to size or position
  something in, in English kebab-case (`#terrain-section`,
  `#organ-merchant-location-wrapper`). Give classes to repeated structures.
- **No unused ids or classes.** Every `id` and `class` in the HTML must be used by
  `main.css`, the page CSS, the page JS or the template. Do not add one for readability or
  "for later": an article or section nothing targets stays a plain `<article>` /
  `<section>`. Step 4 (section 10) checks this again once both pages are final.
- **Visible text stays exactly as it is.** Do not fix accents, typos or wording, do not
  retranslate, and keep double quotes inside visible text. The one exception is text set in
  `batukapur` (article `h1`, section header `h2`s), which drops its accents (hard rule 11).

### Old markup → new components

Reuse what exists before inventing anything. The components marked *shared* live in
`main.css` and are described under "Shared content components" in `CLAUDE.md`; reuse their
class names and markup exactly.

| Old markup | New markup |
|---|---|
| `div.dica-padrao > p > span.sublinhado` | `div.tip-div > p > b` *(shared)* |
| `div.atencao-padrao > p > span` | `div.beware-div > p > span` *(shared)* |
| `p.observacao` | `p.observation` *(shared)* |
| `div.sub-titulo > h2` / `h3` — green **`batukapur`** in `_css/padrao.css` | `section > header > h2` *(shared)* as the section's first child, no class; accents removed (hard rule 11). **Not** `div.subtitle-div` |
| `div.sub-titulo2 > h2` / `h3` — green **`frizquadrata`** (no font of its own in `padrao.css`) | `div.subtitle-div > h2` *(shared)* — `h3` for a heading nested under another subtitle |
| `div.sub-titulo` inside `article.passo-com-iframe` — yellow `frizquadrata` step title with a number plaque | an `ol.step-list` step (see the numbered steps row below) |
| any other section title bar in green `batukapur` (`div.titulo-energia-infinita`, `div.titulo-get-back-here`, `div.titulo-como-fugir`, `div.titulo-temido-chute` in `combate.html`) | `section > header > h2` *(shared)* as the section's first child, no class; accents removed (hard rule 11) |
| `div.sub-titulo-info > h2.info + h2.titulo` (a `Dia 1` box beside the title) | `section > header` with the day box `div > h2` before the title `h2` *(shared)*; drop the `<br class='modo-mobile'>`s — the box wraps on its own on mobile |
| numbered steps (step title `h2 > span` number plaque + `div.dicas` plaques + video) | `ol.step-list > li` with `header > h2` (title only — the number is a CSS counter), `ul > li` plaques and `div.video-wrapper` *(shared)* |
| `div.dicas > p > img(flecha_texto)` (text plaques outside a step) | `ul > li` plaques as in `ol.step-list`; the plaque background stretches with the text, so no size class is needed |
| item / combination `<table>` | `table.items-table` *(shared)*: `<td>` only, `td.quantity-cell` for the counter, `td.equal-cell` for `=`, no class on icon and name cells, `alt` = item name on every icon |
| NPC trade table (`div.troca-resumida > table.tabela-primaria` with nested `table.tabela-secundaria`s, portrait + "tem interesse em" + "pode ter") | `table.npc-trade-table` *(shared)*: one table per NPC, `thead` with three `th scope='col'` (`colspan='6'` / `colspan='3'`), the portrait in a `th scope='rowgroup' rowspan='N'` opening the first body row, **nine `<td>`s per row** (empty slots as `<td></td>`, never omitted), `td.item-value-range` on range values (`1-35`), no other cell classes |
| `div.texto-com-imagem` (image floated beside text) | `div.text-with-image-wrapper` *(shared)* |
| `span.simbolo` | `span.font-bug-fix` *(shared utility)* |
| `picture.imagem`, `img.mapa-imagem`, `picture.mini-mapa`, `picture.introducao-img` | a plain `<picture>` *(shared)* (wrap a bare `<img>` in one), or a `<figure>` with a `<figcaption>` when the image has a caption; `main.css` adds the border, shadow and spacing, and the page CSS only sizes the image from the wrapper id |
| `modo-desktop` / `modo-mobile` | `hide-on-mobile` / `hide-on-desktop` — or, better, remove the duplicated markup and let the CSS reflow one copy |
| colour spans (`#menku`, `span.amarelo`…) | a colour utility class — `.cyan-color` *(shared utility, `#BFEDEF`, colour only)*; any size or spacing goes in a page class next to it |
| numbered `<p><span>1.</span>…` lines | `<ol><li>` |
| YouTube `<iframe>` | `<div class='video-wrapper'><video src='./assets/pages/<page>/videos/<english-kebab-name>.mp4' title='…' preload='metadata' controls></video></div>`, with the title in the page's language |
| `flecha_texto*.png` arrow `<img>` | inside `ol.step-list` plaques: nothing — `main.css` draws the arrow on `li::before`; anywhere else: the inline arrow `<svg>` from `mapa.html` (see the arrow bullet technique in section 7) |
| links (`a.link`, `<a><span>…</span></a>`) | a plain `<a href='./<page>.html'>text</a>` — no inner `<span>`, no class; `main.css` styles every `a` |

Never duplicate a table for desktop and mobile — write it once, split into several
`table.items-table` elements if the desktop layout shows them side by side, and let the
CSS stack them on mobile (side-by-side layout and any mobile merge go in the page CSS).
The same goes for the NPC tables: the old `modo-desktop` / `modo-mobile` rows inside them
are dropped, because `table.npc-trade-table` reflows the one copy into a grid on mobile.
Mobile shows at most three "pode ter" items per NPC; if an old table offers more, list it
in the checkpoint report.

### Hooks for the old narrow rules

Decide the hooks now, while the structure is being defined. For every narrow per-element rule in
the old CSS (a `menor` font on one table cell, a per-label margin), decide now: either give
the element an English modifier class (`long-name`) or leave it out and list it in the
checkpoint report as a planned deviation. The old `medio` / `grande` / `gigante` plaque
sizes need no hook: the `ol.step-list` plaque background stretches with its text.

### Arrow colour

Sample the fill from the old PNG instead of guessing. `python` may not be available; a
small Node script that inflates the PNG's `IDAT` chunks with `zlib`, undoes the row
filters, and counts opaque pixels finds the dominant colour. Calibrate it on
`flecha_texto_verde.png` (it must come out as `#00D900`). Known values:
`flecha_texto` → `#FFFF99`, `flecha_texto_verde` → `#00D900`.

### Writing the file

- Write the HTML with the file-writing tool, not a shell heredoc — long heredocs full of
  quotes get truncated.
- Outside `ol.step-list`, the arrow `<svg>` is long and repeats once per bullet. Write a placeholder line such as
  `{{ARROW}}` in its place and inject the `<svg>` from `mapa.html` with a short Node script
  that keeps the indentation and swaps the fill.
- Image paths keep their current location with a `./` prefix (`./_imagens/...`) in this
  step; step 2 moves the files and updates the paths.

### Writing the stylesheet

Once the HTML is written, create the page CSS at its final path
`assets/pages/<page>/<page>.css`, following the CSS specification in section 7: the
two-block banner layout, rem units with no `vw`, `calc()` desktop fonts, at most one
decimal digit, no banned features, and banner comments only.

- Target only the ids and classes the new HTML defines, plus the shared components from
  `main.css`. Reproduce the old visuals: go through the old page CSS (and the old shared
  rules behind every class the page used) block by block, and convert each value that
  still matters on the new markup. Do not restyle anything `main.css` already handles.
- Rules in the desktop block apply at every width, so a desktop override (a font size, an
  indent) must be reset in the mobile block whenever the old mobile value differs.
- Size every `picture` and wrapper image so it fits at 320px: the image plus its 6px
  border must fit inside the article border and the `padded-container` padding.
- Images have not moved yet. Any `url()` to an image still points at its current location
  through a relative path from the stylesheet (`../../../_imagens/...`); step 2 updates it
  together with the HTML paths.
- After writing it, check that the file has CRLF endings and that the banned-CSS check from
  section 11 returns nothing.

### Writing the script

If the page has behaviour — an old `_js/<page>.js`, inline handlers, or anything the old
page did on click, scroll or load — create the page JS at its final path
`assets/pages/<page>/<page>.js`, following the JS specification in section 8. A page with
no behaviour gets no script; say so in the checkpoint.

- Rebuild every behaviour of the old script against the new markup: same result for the
  user, new ids and classes, the conventions of section 8 (banner comments, page scope in
  an IIFE, a named `const` for every queried element, state kept in DOM classes).
- Inline handlers in the new HTML call functions in English. Keep the old function name
  only when it is already English; otherwise pick an English name now and list the
  renames in the checkpoint, since step 1 is where they get approved.
- Drop the deprecated click-animation system (`botaoTipo2Discreto` and friends) and the
  old prefix-handling function; use `animateElementClick` from `utils.js` instead.
- Any click-animation keyframes the script triggers go in the page CSS written above.
- Bilingual text produced by the script branches on `getCurrentPageLanguageCode()`, so the
  same file serves the EN page later.
- Image paths the script builds point at the images' current location for now; step 2
  updates them together with the HTML paths.
- After writing it, run the banned-JS check and `node --check` from section 11 and check
  that the file has CRLF endings.

### Check before the checkpoint

```bash
# single quotes on every attribute — must return nothing
grep -nE '=\"' $1

# no old markup left — must return nothing
grep -nE '<iframe|flecha_texto|modo-(mobile|desktop)|_css/|_js/index\.js|<style' $1

# line endings
file $1

# no accents in batukapur text — must return nothing for h1s; check every section header h2 by eye
grep -nE "<h1>[^<]*[ÀÁÂÃÇÉÊÍÓÔÕÚàáâãçéêíóôõú]" $1

# every local src / srcset / href resolves (the videos may be missing at this point —
# list them in the checkpoint)
grep -oE "(src|srcset|href)='\./[^']+'" $1

# page CSS: banned features and line endings — the grep must return nothing
grep -nE 'display:\s*flex|[0-9]vw' assets/pages/<page>/<page>.css
grep -n -A1 'filter:' assets/pages/<page>/<page>.css
file assets/pages/<page>/<page>.css

# page JS (only when the page has one): banned constructs, syntax, line endings
grep -nE '\blet\b|=>|`|\bclass\b|replaceAll|\.contains\(|\basync\b|\bawait\b|\bfetch\(|!!|\?\.|\.find\(' assets/pages/<page>/<page>.js
node --check assets/pages/<page>/<page>.js
file assets/pages/<page>/<page>.js
```

Also check that every tag is closed and nested correctly: a short Node script that walks
the tags with a regex and a stack, skipping void elements, is enough. Check, too, that
every id the script looks up and every function an inline handler calls exists.

### Checkpoint — stop here

Do not move on to step 2 on your own. Report the new structure, the stylesheet and the
script to the user and wait for approval:

- the sections and articles, with the ids and classes you created
- how each old component was mapped, and each new component or class name you introduced
- the hooks added for old narrow rules, and the old rules the stylesheet drops
- what the stylesheet covers, section by section, and every visual deviation from the old
  page it leaves (for example a vertical centring a float cannot reproduce)
- what the script does, area by area, every handler renamed to English, and every
  behaviour of the old page it does not reproduce — or that the page has no behaviour and
  gets no script
- open questions where more than one structure made sense (for example `h2` or `h3` for a
  nested subtitle)
- missing files the new HTML points to (videos)

The user's answers here can change class names and structure. Later steps can still adjust
the HTML when the work needs it (hard rule 6).

---

## 6. Move the page's files to their place (step 2)

Every file that belongs to the page moves into the project structure introduced by commit
`62fe620` (`git show 62fe620 --stat -M` shows how `index` and `map` were moved):

```
assets/
  shared/              used by more than one page — css/, js/, img/, fonts/, P2B-Template/
    img/items/         every item image on the site, for all pages and the trade app
    img/required-items/  required-item icons used by more than one page
    img/portraits/     NPC portraits used by more than one page
    img/conclusao.jpg  the guides' closing picture (+ conclusao-mobile.jpg), shared by all pages
  pages/<page>/        used only by this page; <page> is the EN filename (money, food, map…)
    <page>.css
    <page>.js
    img/               the page's images; NPC portraits go in img/portraits/
      maps/            labelled game-map images only (see "Map images" below)
      icons/           real icons only (see "Icons" below)
      required-items/  icons of the items a task requires (see "Required items" below)
    videos/            the local videos that replace the old YouTube embeds
```

- **Item images go to `assets/shared/img/items/`** — see "Item images" in `CLAUDE.md`.
  Every item image the page uses (trade table icons, combination icons, trade items) moves
  there in this step, **even when no other page uses it**: unlike the rule below, an item
  image is always shared. Required items are the exception (next bullet). Old sources: `_imagens/_icones/`,
  `_imagens/_icones/itens_catalogados/` and, for the trade app, `_imagens/app_trocas/itens/`.
  - If the item is already in `items/`, point at that file instead of moving a second
    copy. If two old copies of the same item differ (size, crop, artwork), ask which one
    to keep.
  - Update every reference to the moved image in the same step — every page, refactored or
    not, PT and EN, CSS and JS. Path-only edits to the reference pages are allowed here
    (the one exception to hard rule 5).
  - A script that builds item paths from a folder prefix (`_js/receitas.js`,
    `_js/trocas.js`) cannot point at two folders: leave the images that script needs where
    they are, list them in the final report, and move them when that page is refactored.

- **Required items go to the page's `img/required-items/`.** The icons of the items a task
  requires — the item-list rows of a `table.items-table` (`quantity-cell` + icon + name) —
  do not go to `items/`. They go in the page's own `img/required-items/`, like the money
  page's `assets/pages/money/img/required-items/`. When more than one page uses the same
  required-item image, it goes in `assets/shared/img/required-items/` instead (same
  search-by-full-path rule as below).

- **The conclusion picture is shared: `assets/shared/img/conclusao.jpg`** (desktop) and
  `assets/shared/img/conclusao-mobile.jpg`. Every page that closes with the conclusion
  picture points at these two files. Never move a copy into the page's `img/` folder. If
  the old page uses its own copy (`_imagens/_guias/conclusao*.jpg`,
  `_imagens/_guias/<page>/conclusao*.jpg`), compare it with the shared file (`md5sum`). If
  it is identical, `git rm` the old copy and repoint the page. If it differs, ask.

- **Files used by more than one page go to `assets/shared/`.** Before moving a file, search
  every `.html`, `.css`, `.js` and `.json` in the repo for its **full old path** (in its
  `./`, `../` and CSS-relative forms), not just its basename: a file with the same name in
  another folder is a different file. Also check JS that builds image paths dynamically.
  The PT page, the EN page and the page's own CSS/JS count as "this page".
  - Only this page uses it → `assets/pages/<page>/` (`img/`, `img/maps/`, `img/portraits/`, `img/icons/`, `img/required-items/`, `videos/`).
  - Another page uses it too, refactored or not → move it to the matching folder under
    `assets/shared/` (`img/`, `fonts/`, …), and update every reference in the same step:
    every page, PT and EN, CSS and JS. Path-only edits to the reference pages are allowed
    here (hard rule 5).
  - If the file is already in `assets/shared/`, point at it instead of moving a second
    copy. If the old copy is byte-identical (`md5sum`), `git rm` it. If it differs, ask.
  - Leave the file where it is, point to it with a relative path, and list it in the final
    report only when moving it would mean editing something you must not touch: a shared
    file (`main.css`, `utils.js`, `globalVariables.js`, `P2B-Template/`; hard rule 4) or an
    old script that builds the path from a folder prefix.
  - Language variants of an image (`*_en.jpg`) move together with it.
- **`git mv`, never copy + delete**, so history follows the file. `git status --short` must
  list each move as a rename (`R`).
- **Map images go to `img/maps/` only when they match one format:** a picture of the
  game map with a text label drawn inside the image, usually together with a red marker
  around an area (for example `maps/mapa-sacrificio.jpg` on the food page or
  `maps/parquinho-area.jpg` on the Shmowders page). Language variants (`-en`) and mobile
  versions (`-mobile`) go with it. Any other map picture stays directly in `img/`, even
  when its name starts with `mapa-`: full or zoomed town maps (`mapa-completo.png`), maps
  with only markers or icons and no label (`mapa-criancas.jpg`), and screenshots that
  combine a map crop with game footage (`cache-1.jpg`). Look at each image before moving
  it, and ask when unsure.
- **Icons go to `img/icons/` only when they really are icons:** small symbols with a
  transparent background, like the map marker icons in the map page's option buttons
  (`assets/pages/map/img/icons/noite-mercador.png`, `ervas.png`, about 75px). Item images
  go to `assets/shared/img/items/`, NPC portraits to `img/portraits/`, and screenshots,
  photos and map pictures stay in `img/` (or `img/maps/`), however small they are or
  whatever the old folder they came from was called (`_imagens/_icones/`). A page with
  no real icons has no `icons/` folder.
- **Kebab-case file names.** Underscores become hyphens and the Portuguese name stays
  (hard rule 1): `mesa_mobile.jpg` → `img/mesa-mobile.jpg`,
  `garrafa_vazia.jpg` → `assets/shared/img/items/garrafa-vazia.jpg`.
- **Page CSS / JS.** They live at `assets/pages/<page>/<page>.css` and `<page>.js`. Both
  were already created there in step 1; only the CSS `url()` paths and the image paths the
  script builds change here. If the old
  page used a stylesheet or script that other pages still load (`_css/padrao.css`), do not
  move or edit it: the new file holds only what this page needs, and the old one stays as it is.
- **Videos.** The `.mp4` files replacing YouTube embeds go in `videos/` with English
  kebab-case names that match the `<video src>` in the HTML. If the user drops the
  downloads somewhere else in the repo (for example at the root), match each one to its
  step through the YouTube id in the file name and the old embed URL, then move it there.
- **Update every reference** to a moved file: `./assets/pages/<page>/…` in the PT page,
  `../assets/pages/<page>/…` in the EN page, and paths relative to the stylesheet
  (`img/…`) inside the page CSS. Update the EN page's image paths in the same step, even
  when its refactor comes later, so it never points at a file that no longer exists. These
  path updates are part of this step.

---

## 7. CSS specification

### Organization

Two top-level blocks in this order, copying the banner art from `assets/pages/index/index.css` or
`assets/pages/map/map.css` verbatim and only swapping the label:

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
| `%` margins and paddings | rem (`1%` of a full-width container ≈ `20rem`) |

No `%` in `margin` or `padding`. A percentage there resolves against the containing block's
width, not the viewport, so the same value spaces differently depending on how deeply the
element is nested. Use rem — or the mobile `calc()` / `px` forms above — instead.

**At most one decimal digit in any value**, inside a `calc()` too: round `25.39rem` to
`25.4rem` and `8.75px` to `8.8px`.

**Desktop font sizes are `calc()` of px + rem** (`font-size: calc(12px + 22rem);`), never a
plain rem or px value.

### Selector convention

The first time an element is styled inside the desktop block or inside the mobile block,
prefix the selector with its element type — `div#foodCard`, `article#map-main-article`,
`div.tip-div`. Immediately following rules for that same element may omit the type
(`#foodCard p`, `.tip-div p b`). The desktop and mobile blocks each get their own "first time".

One CSS file serves both the PT and the EN version of a page, and Portuguese strings usually
run longer than their English counterparts. When a rule should apply to one language only,
scope it with the root `lang` attribute — `html[lang='pt-br'] …` or `html[lang='en'] …` —
rather than duplicating the stylesheet.

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
for a single element — work out what constraint it was solving. They routinely look
cosmetic and are not: a per-label font size may be the only thing keeping that label from
overflowing its container. If the new HTML has no hook to reproduce it, add a modifier class
to the element (hard rule 6) and mention it in the final report, rather than dropping the
rule quietly and meeting it again later as a bug.

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
- **Decorative `<img>` elements the new HTML dropped** (border strips) →
  recreate them as `::before` / `::after` with `background-image` + `background-size: 100% 100%`.
- **YouTube `<iframe>` embeds** → gone. The new HTML replaces each one with a local video:
  `<div class='video-wrapper'><video src='videos/<name>.mp4' title='…' preload='metadata' controls></video></div>`.
  `main.css` already gives `div.video-wrapper` its width, margin, border and shadow and
  makes the `<video>` fill it, so drop every old `iframe` / `.video` rule (fixed sizes,
  aspect-ratio padding hacks) and only add page-specific layout on
  `#<container> div.video-wrapper` — see `#feeding-roots-wrapper` in `assets/pages/map/map.css`. If
  the new HTML still contains an `<iframe>`, or the `.mp4` it points to is missing from
  `videos/`, do not restyle the iframe — flag it in your final report.
- **`flecha_texto*.png` arrow bullets** (the `<img>` placed before a line of text) → replaced
  in the HTML by the inline arrow `<svg>` from `mapa.html` (the header of
  `#selected-marker-summary-article`). Its first `<path>`'s `fill` is the arrow colour and
  the second is the black outline. The fill should match the old PNG it replaces
  (`flecha_texto_verde` → `#00D900`; sample the others — `flecha_texto`,
  `flecha_texto_branca`, `flecha_texto_queimada` — from the image rather than guessing);
  if it does not, or an arrow `<img>` is still in the HTML, flag it in your final report.
  Inside `ol.step-list` plaques there is no arrow in the HTML at all: `main.css` draws it on
  `li::before` from `assets/shared/img/step-arrow.svg`, so the old `<img>` is just dropped.
  Style any other `<svg>` like `#selected-marker-summary-article header svg` in
  `assets/pages/map/map.css`: `display: inline-block`, explicit `width`/`height` converted from the
  old `<img>` size, and `vertical-align` instead of the old `position: relative; top`.
- **`<ol>` / `<ul>` markers** → not styleable on the TV. Use
  `list-style: none` + `counter-reset` on the list and
  `content: counter(name) '.'; counter-increment: name` on `li::before`.
- **`flex-direction: column-reverse`** → impossible without flex. Keep DOM order and flag
  the ordering change in your report; offer to swap the elements in the HTML.
- **Show + fade a hidden block** → you cannot transition out of `display: none`, because
  both class changes land in the same style recalculation and the browser never sees a
  starting state. Use two classes — one that sets `display: block`, one that sets
  `opacity: 1` — and between them call `forceElementStylesUpdate(element)` from
  `assets/shared/js/utils.js`, which flushes the pending styles so the transition has something to run
  from:

  ```js
  section.classList.add('selected-marker-summary');   // display: block

  forceElementStylesUpdate(section);

  section.classList.add('showing-marker-summary');    // opacity: 1 — transition runs
  ```

  Never reach for a `setTimeout` here, and do not fall back to a `@keyframes` animation
  just because the transition "does not fire" — that is this bug, and this is its fix.
  `assets/shared/P2B-Template/Script.js` uses the same helper the other way round, pairing it with
  `.disable-transition` to change state *without* animating.

### Transitions and animations

Use a `transition` for anything that moves between two states — fades, reveals, slides,
hovers, a panel opening. Reserve `@keyframes` / `animation` for **button click feedback**,
which is a one-shot effect with no resting state to hold. If you find yourself writing
keyframes for something that is not a click, it is almost certainly a transition.

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
`.padded-container`, `.border-top`, `.border-bottom`, `.margin-bottom`, `.underlined`,
`.font-bug-fix`, `.cyan-color`, `.disable-transition`, the shared `section` / `article` / `header` / `h1` / `h2` base styles,
and the shared content components listed in `CLAUDE.md`.

**Links** are styled globally by the `a {}` rule in `main.css` (green `#00FF00`). Write a
plain `<a href='./<page>.html'>text</a>`: no inner `<span>` (inside a `beware-div` it would
turn yellow), no old `.link` class, and no link colour in the page CSS.

---

## 8. JS specification

### Organization

Banner comments in the same style, one per functional area:

```js
// |--------------------------| 🔍 Fullscreen Map Modal 🔍 |-------------------------|
```

Keep inline comments to a minimum — only where the code would otherwise read as a bug
(e.g. why a `setTimeout` exists). No narration.

### Rules

- **Handler names are settled in step 1.** The HTML and the script are written together
  there, and every renamed handler is listed in the checkpoint. Once the user approves
  them, keep the names the HTML references; renaming one later requires an HTML edit, so
  **ask first**.
- **Replace the deprecated click-animation system.** The old pattern
  (`botaoTipo2Discreto('some-id')` → `_js/index.js` → `_css/estrutura.css`, old files only on
  `master`) must not be reproduced. Use `animateElementClick(element, 'animation-class-name')`
  from `assets/shared/js/utils.js`, exactly as commit `32185b6` and
  `assets/pages/index/index.js` do. Visual result unchanged.
- **The old prefix-handling function is obsolete — ignore it entirely.**
- **Page state lives in DOM classes, not in JS variables.** Which item is open, selected or
  active is already recorded by the classes you toggle — read it back with
  `querySelector('… .the-class')` instead of mirroring it in a variable.
- **Never act on an element without naming it first.** Every element reached through a
  query — `getElementById`, `querySelector`, `querySelectorAll`, or an index into a
  collection — gets its own `const` before you read or change anything on it. Never chain
  off the query itself:

  ```js
  // Wrong
  document.getElementById('map-fullscreen-wrapper-mobile')
      .classList.remove('showing-fullscreen-map');

  // Right
  const mapFullscreenWrapper = document.getElementById('map-fullscreen-wrapper-mobile');

  mapFullscreenWrapper.classList.remove('showing-fullscreen-map');
  ```

  The only exceptions are `document` and `document.documentElement`, which are already
  named and may be used inline — `document.documentElement.classList.add('scroll-lock')`
  is fine as it stands.
- **Avoid globals.** Wrap page scope in `(function () { … })()`. Functions invoked from
  inline `onclick` handlers, and enums those handlers reference, genuinely cannot be
  scoped — leave those global, as `assets/pages/index/index.js` does.
- **Enums** go next to the code that uses them, `PascalCase` keys, and their numeric
  values follow the on-page order of the things they name. Only truly cross-page enums
  belong in `globalVariables.js` (edit it only on request — otherwise report instead).
- **Bilingual text** produced by JS: branch on
  `getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR`.

### Shared helpers to reuse (`assets/shared/js/utils.js`)

- `getCurrentPageLanguageCode()`
- `getIsMobileScreen()` — `window.innerWidth <= 800`
- `animateElementClick(element, animationClassName)`
- `forceElementStylesUpdate(element)` — flushes pending styles so a transition can start
  from an element that was `display: none`; see the show + fade technique above

`globalVariables.js` provides `LanguageEnum`, `PageTypeEnum`, `registeredGuidesList`,
`registeredPagesList`. Note these are top-level `const`s: they are **not** on `window`,
but inline `onclick` handlers still resolve them. An IDE warning about a helper being
"not found" across files is a false positive — that is how every refactored page works.

---

## 9. EN page (step 3)

The EN page must use **the same ids and classes as the PT page** so that one CSS file and
one JS file serve both. Rebuild it to mirror the new PT structure exactly, then:

- `lang='en'`, English `<title>` and meta content
- `../` prefix on every asset, stylesheet, script and image path
- reuse the existing English copy from the old EN page verbatim — do not retranslate
- single quotes throughout

Verify afterwards that every `id` your JS looks up exists in both pages.

## 10. Remove unused ids, classes and files (step 4)

Once the PT page, the EN page, the page CSS and the page JS are all final, go through every
`id` and every `class` in both HTML files and check that something targets it:
`assets/shared/css/main.css`, the page CSS, `assets/shared/js/utils.js`,
`assets/shared/js/globalVariables.js`, the page JS, or the template files in
`assets/shared/P2B-Template/`. A name counts as targeted when a selector uses it
(`.name` / `#name`, not just as the prefix of a longer name such as `.name-wrapper`) or a
script refers to it in a string (`getElementById('name')`, `classList.add('name')`).

```bash
for name in $(grep -ohE "(id|class)='[^']+'" $1 en/<enpage>.html | sed -E "s/.*='([^']+)'/\1/" | tr ' ' '\n' | sort -u); do
  grep -rqP "[.#]$name(?![\w-])|['\"]$name['\"]" assets/shared/css assets/shared/js assets/shared/P2B-Template assets/pages/<page> || echo "unused: $name"
done
```

Remove every name the check reports from **both** pages: drop the class from the `class`
list, and drop the whole attribute when nothing is left in it. There are no exceptions —
`<body>` takes no id either. Re-run the check until it prints nothing, confirm the files
still have CRLF endings, and list every removed name in the final report.

### Delete the files the refactor left unused

Only once **both** the PT and the EN page are refactored — never earlier, because until the
EN page is rebuilt the old one still loads the old files — delete every file the refactor
made unused. Candidates are everything the old pages pulled in: each file referenced by
`git show master:$1`, by `git show master:en/<enpage>.html`, by the old page CSS/JS from
section 1, and the old page CSS/JS themselves (`_css/<page>.css`, `_js/<page>.js`), plus
the `url()` targets inside that old CSS.

- A candidate is unused when no `.html`, `.css`, `.js` or `.json` file in the repo — any
  page, refactored or not, and any shared file — references it by path or basename, and no
  script builds its path dynamically (check for its stem in quoted strings and template
  literals). A match on the stem alone that is clearly something else — a guide id or a
  search tag in `globalVariables.js` — does not count; check each match by eye.
- Never delete anything under `assets/shared/`, and never a file another page still uses —
  the old arrow PNGs, for example, stay as long as any old page loads them.
- Delete with `git rm`, so `git status --short` lists each one as `D`. Remove any folder
  the deletions leave empty.
- Files that were already unused before this refactor (nothing referenced them on
  `master` either) are not part of this step: list them in the final report and let the
  user decide.
- List every deleted file in the final report.

## 11. Verify before reporting

```bash
# Banned JS constructs — must return nothing
grep -nE '\blet\b|=>|`|\bclass\b|replaceAll|\.contains\(|\basync\b|\bawait\b|\bfetch\(|!!|\?\.|\.find\(' assets/pages/<page>/<page>.js
node --check assets/pages/<page>/<page>.js

# Banned CSS — must return nothing
grep -nE 'display:\s*flex|[0-9]vw' assets/pages/<page>/<page>.css

# filter always paired with -webkit-filter directly below
grep -n -A1 'filter:' assets/pages/<page>/<page>.css

# line endings
file $1 assets/pages/<page>/<page>.css assets/pages/<page>/<page>.js en/<enpage>.html

# every referenced image and video actually exists, and moved files show as renames (R)
grep -oE "url\('[^']+'\)|src='[^']+'" assets/pages/<page>/<page>.css $1

# no leftover YouTube embeds or arrow-bullet images — must return nothing
grep -nE '<iframe|flecha_texto' $1 en/<enpage>.html assets/pages/<page>/<page>.css
```

Then check it in a browser. `P2B-Template.js` XHRs its markup from
`window.location.origin + '/assets/shared/P2B-Template'` (with the repo name in between on
GitHub Pages), so the page **must be served from the repo root** — a `file://` open will not render the shell. Start a small static server on a spare
port, load the page, and confirm: template shell loads, each interactive control responds,
the click animation fires, dynamic titles/text switch language correctly, every video
loads and plays, and every arrow `<svg>` sits on its text line in the right colour.

For mobile, window resizing through the browser tools is unreliable here. Instead, drop a
throwaway HTML file at the repo root containing an `<iframe>` of the page (a test harness
only — unrelated to the ban on `<iframe>` content above) — media queries
respond to the iframe viewport — and inspect inside it, sweeping the iframe's width across
the supported range (320, 360, 375, 414, 800) rather than checking a single size. **Delete the
throwaway file and stop the server when you are done**, and confirm `git status --short`
lists only the intended files: the page CSS/JS, both HTML pages, the
moved images and videos (as renames), and the deleted files (as `D`).

## 12. Final report

Tell the user, concisely:

- the files changed and what each got, plus every file moved and its new path
- every file moved to `assets/shared/` because other pages use it too, with the other
  pages whose paths were updated for it, and any file left in its old location (a shared
  file or an old script still points at it)
- every item image moved to `assets/shared/img/items/`, the other pages whose paths were
  updated for it, and any item image left behind because an old script builds its path
- every file deleted because the refactor left it unused, and any file that was already
  unused before the refactor (not deleted — the user decides)
- every HTML adjustment made after step 1, and why it was needed, including the ids and
  classes removed because nothing used them
- **every visual or behavioral deviation** from the old page, with the reason and an offer
  to fix it if it matters (dropped transitions, dropped narrow-viewport tweaks, reordered
  elements, dropped per-element font sizes with no class hook in the new HTML)
- anything that arguably belongs in `main.css` / `utils.js` / `globalVariables.js`, since
  you did not put it there without a request
- any Portuguese classes still sitting in the HTML that your new CSS deliberately does not
  target
- any leftover `<iframe>`, missing `videos/*.mp4`, or arrow `<svg>` whose fill does not
  match the old `flecha_texto*.png`
