# Pathologic 2 Brasil

## ⚠️ Project status: mid-refactor

This project is in the middle of a large refactoring effort. Most pages in the repo
still use the **old** structure/style and have not been migrated yet. Do not use them
as a reference for how new or refactored code should look.

**The only pages that reflect the current, correct structure and style are:**

- `index.html` — with `_css/main.css`, `_css/home.css`, `_js/globalVariables.js`, `_js/utils.js`, `_js/home.js`
- `resultados.html` — with `_css/main.css`, `_css/guideCardListing.css`, `_js/globalVariables.js`, `_js/utils.js`, `_js/guideCardListing.js`

Both also rely on the shared template component `P2B-Template/P2B-Template.js`.

When creating new pages, refactoring an existing page, or writing/adjusting CSS or JS,
use `index.html` and `resultados.html` (and their associated CSS/JS files above) as the
pattern to follow — markup structure, class naming, CSS organization, and JS conventions.
Do **not** copy patterns from other, not-yet-refactored `.html` files in the repo (e.g.
`dinheiro.html`, `comida.html`, `mapa.html`, `receitas.html`, `combate.html`,
`podinzins.html`, `apptrocas.html`, etc.) or their corresponding CSS/JS — they represent
the old style and are pending migration.
