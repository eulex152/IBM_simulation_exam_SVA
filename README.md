# C1000-171 Assessment Simulator — IBM Security Verify Access V10.0

A practice exam simulator that mimics a professional certification testing
platform: a timed 61-question exam drawn from a weighted question pool,
flagging, pause, per-question comments, a review grid, and a full post-exam
analytics dashboard.

## Requirements

- **Node.js 18 or later** (tested with Node v24.18.0)
- **npm 9 or later** (tested with npm 11.16.0)
- A modern browser (Chrome, Edge, or Firefox)

Check your versions with:

```
node --version
npm --version
```

If you don't have Node installed, get it from https://nodejs.org (the LTS
version is fine).

## Setup (first time only)

From the project folder, install dependencies:

```
cd "D:\Users\jacqu\Downloads\projects claudio\IBM_simulation_exam_SVA"
npm install
```

## Running the simulator

Start the dev server:

```
npm run dev
```

This prints a local URL, typically:

```
http://localhost:5173/
```

Open that URL in your browser. Press `Ctrl+C` in the terminal to stop the
server when you're done.

If port 5173 is already in use, start on a different port:

```
npm run dev -- --port 5174
```

Every time you reload the page and click **Begin Exam**, a new set of 61
questions is randomly sampled from the question pool (weighted by section)
and the answer order is reshuffled.

## Other commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Type-check and produce a static production build in `dist/` |
| `npm run preview` | Serve the production build from `dist/` locally |
| `npm run lint` | Run ESLint over the project |

## Project structure

```
src/
  data/          Question pool and section/blueprint definitions
  hooks/         Countdown timer and exam-state engine
  utils/         Session randomization and scoring logic
  components/    UI screens (intro, exam, results) and widgets
```

## Exam details

- **61 questions** total, sampled from a larger pool per the official
  blueprint weighting across 7 sections (Planning, Architecture and Design,
  Installation, Configuration, System Integration, Advanced Customization,
  Testing/Troubleshooting/Maintenance).
- **90-minute timer**, pausable.
- **Passing score:** 37/61 (~60.6%).
- Results include a pass/fail badge, section-by-section performance
  breakdown, and an itemized review of every question with your answer, the
  correct answer, and an explanation.
