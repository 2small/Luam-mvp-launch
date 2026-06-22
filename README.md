# Luam-mvp-launch
Luam is a mental health and wellness platform created for a team of a psychiatrist and psychologists.
It provides a booking functionality that uses whatsapp's secure messaging to make the booking more convenient while reducing centralised data storage security concern of the sensitive data.
It includes symmetry, a self check-in , progress monitoring and cognitive offloading utility.
Symmetry uses a local-first architecture using indexDb.
It features a 12-word seed phrase and an anonymous id for data recovery
# Symmetry — Mindful Dashboard

A local-first mental wellness dashboard for the **Luam** platform. Symmetry is a single-page Progressive Web App (PWA) that lets clients track mood, sleep, and energy, journal their reflections, book therapy sessions, and work through cognitive tools — all stored privately on their own device.

The default theme is an off-black palette with sage-green (`#87A96B`) accents. Bilingual English / Kiswahili support is built into the consent flow.

---

## Features

### Profile & Identity
- **Symmetry Identity Card** modal with a 4-step onboarding:
  1. Preferred name + anonymous `SAGE-xxxx-xxxx` ID
  2. 12-word BIP39 recovery seed (display, download as `.txt`, or print to PDF)
  3. Seed verification (enter 3 random positions)
  4. Restore from existing seed or `.json` backup file
- All client documents are encrypted with **AES-GCM** (Web Crypto API), keyed via PBKDF2 (100k iterations) from the recovery seed before being written to the local PouchDB vault.
- Time-based greeting (English + Swahili) that fades in on load.

### Pattern Trends Chart
- Chart.js line chart with tabs: **Mood**, **Sleep**, **Energy**, **Momentum**, **All**.
- Reads the last 7 self check-ins from PouchDB and renders day labels dynamically.
- Falls back to a friendly empty-state call-to-action pointing to Self Check-In or Mind Hub when there is no data.

### Utilities Hub
Six expandable tiles:

1. **Self-Check-in** — opens the *Symmetry Pulse* modal, a 3-step flow:
   - Sliders for mood, energy, sleep (0–10)
   - Brief PHQ-2 + GAD-2 screening with a safety trigger (score > 6 surfaces a "Schedule a Session" prompt)
   - Context chips (Work, Family, Health, Sleep, Diet, Exercise, Relationships, Finances, Weather, Other) + optional notes
2. **Mind Learning** — links to `learn.html`.
3. **Reflection Space** — links to `reflection.html` and opens an in-page journal viewer.
4. **Care Plan** — medications, reminders, next appointment (currently under maintenance).
5. **Mind Hub** — daily momentum tracker (5 circles) plus three cognitive tools:
   - **Eisenhower (2-box)** — drag-and-drop task sorter with "Do now" / "Defer" zones, inline edit, and momentum rewards.
   - **The Fog Clearer** — a textarea that starts blurred and clears as the user writes 50+ characters.
   - **The Pulse** — 25-minute focus timer with momentum-point rewards.
   - **Recent Wins** list pulled from momentum history.
6. **Appointments** — scroll-to section anchor.

### Appointments & Booking
- 7-day date grid and time slots (9 AM – 5 PM) generated client-side.
- **Book Now** opens a modal with name, contact, date, time, and Virtual / Physical meeting type; validates that the slot is in the future, within one year, and between 8:30 AM – 7:00 PM.
- A confirmation modal reviews details before booking. On confirm, the transaction is stored in IndexedDB (`LuamPayments`) and a `mailto:` link is opened to the care team.
- **M-Pesa** STK push button is wired but currently disabled ("under maintenance").
- Upcoming sessions are rendered from stored booking transactions.

### Safety & Consent
- **Safe Harbor** floating button opens crisis-line numbers (Kenya Red Cross 1199, Befrienders Kenya +254 733 734 345).
- **Transparency & Consent** modal shown on first visit; consent flag persists in `localStorage`. Content toggles between English and Kiswahili.
- Idle timer locks the screen with a Welcome Back overlay after 2 minutes of inactivity.

### Theming
- `data-theme` attribute supports `light`, `dark`, and `offblack` (the page default).
- Off-black theme aggressively overrides inline styles for legibility on dark backgrounds.

---

## Data Storage (Local-First)

| Store | Purpose | Key |
| --- | --- | --- |
| `luam_local_vault` (PouchDB / IndexedDB) | Encrypted wellness documents — mood reflections, journal entries, momentum points & history, self check-ins, licenses | `_id` (`<sageId>_<type>_<timestamp>`) |
| `LuamPayments` (IndexedDB) | Booking & M-Pesa transactions | `id` |
| `localStorage` | `luam_client_prefs` (name, sageId, recovery seed), `userName`, `luam_consent_given`, `luamMood`, journal drafts, pulse history | string keys |

PouchDB's `put` / `get` / `allDocs` are monkey-patched to transparently encrypt and decrypt documents when a recovery seed exists. Live `changes()` feed keeps the overview metrics in sync.

---

## Dependencies (CDN)

- [Chart.js](https://www.chartjs.org/) — pattern trends chart.
- [PouchDB 8](https://pouchdb.com/) + `pouchdb-adapter-idb` — local encrypted vault.
- [@scure/bip39](https://github.com/paulmillr/scure-bip39) — mnemonic seed generation & validation. A 256-word fallback list is bundled for environments where the library fails to load.

Fonts: **Livvic** (headings) and **Inter** (body) via Google Fonts.

---

## Related Files (referenced, not bundled here)

- `modern-styles.css`, `design-tokens.css`, `profile.css` — styling.

---

## Disclaimer

Symmetry is a wellness utility, **not** a replacement for licensed clinical care. Always consult qualified healthcare providers for mental-health decisions. All personal data stays on the client device unless the user explicitly sends a booking email or initiates an M-Pesa payment.

