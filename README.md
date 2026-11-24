# AIxLearn

Website for collecting the conversations Technion students have with AI tools while studying. Built by the LALD Lab. Students register once and upload conversations as `.txt` files; researchers manage everything from a dashboard.

**Status: front-end prototype.** Mock data only, nothing is saved, and a reload resets everything. Backend (Azure Static Web Apps + Functions, PostgreSQL, Blob Storage, Communication Services Email, Key Vault) is not started.

## Run it

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Layout

```
index.html            page shell + the ordered list of scripts
css/
  fonts.css           self-hosted IBM Plex (files in fonts/)
  tokens.css          colors, fonts, light/dark theme
  base.css            reset, typography, layout primitives
  layout.css          prototype strip, header band, language switch, sub-header
  forms.css           fields, invalid + shake states, checkboxes
  components.css      buttons, notes, chips, tickets, tables, toast, modal
  student.css         welcome, file section, how-to, withdrawal
  researcher.css      tabs, stats, bars, transcript, question editor
js/
  config.js           ADMINS, CONTACT, DEMO_CODE
  i18n/               he.js, ar.js, en.js (student text), labels.js (dropdown labels), core.js (t())
  data/               option lists, questions, small selectors
  mock/               MOCK DATA (courses, rounds, participants, submissions, samples)
  lib/                prompt.js (transcription prompt students paste into their AI tool; its markers must match validate.js), validate.js (email + file checks)
  ui/                 DOM helpers, icons, form helpers, copy-to-clipboard
  state.js            mutable app state
  student/            signin, register (+ profile edit), home (upload, submissions, withdrawal)
  researcher/         signin, dashboard shell, one file per tab, csv
  app.js              render() and language switching; loaded last
```

Everything is plain scripts sharing globals, so **the order of the `<script>` tags in `index.html` matters**. A new file goes in after the files it uses.

## Where to change things

| To change | Edit |
|---|---|
| Student-facing wording | `js/i18n/he.js`, `ar.js` **and** `en.js` |
| A dropdown's option labels | `js/i18n/labels.js` and the question's options in `js/data/questions.js` |
| The file checks | `validate()` in `js/lib/validate.js` |
| The transcription prompt | `js/lib/prompt.js` (keep its markers in sync with `validate()`) |
| Colors / dark mode | `css/tokens.css` |
| A dashboard tab | its file in `js/researcher/` |
| Mock data | `js/mock/` (this folder goes away when the database arrives) |
