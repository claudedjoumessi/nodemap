<img width="1455" height="265" alt="tagline" src="https://github.com/user-attachments/assets/936a97f5-800e-4b70-8e71-5a06f434ee6f" />

# <div style="text-align: center">nodemap (v0.1)</div>

Interactive node-based graph editor built with React, TypeScript and Vite.

## Overview

`nodemap` is a canvas-based editor for creating and visualizing math functions built with node graphs. It provides a pluggable node registry and contextual UI for adding nodes.

## Features

- Canvas with resizable panels and contextual menu for adding a node
- Bezier connection rendering between nodes
- Node registry and schema-driven node types
- React + TypeScript + Vite development setup
- Real-Time Grpah powered by [chart.js](https://www.chartjs.org/)

## Quickstart

First clone the repository into your local machine with:

```bash
git clone https://github.com/claude-jr/nodemap.git
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

- `src/` — application source
	- `App.tsx` — app shell and routing
	- `main.tsx` — app entry
	- `components/` — canvas and UI components
		- `Canvas.tsx`, `BezierLayer.tsx`, `GraphPlot.tsx`, `Node.tsx`
	- `context/` — React contexts (e.g. `NodeContext.tsx`)
	- `hooks/` — reusable hooks (e.g. `useEvaluate.ts`)
	- `lib/` — node registry, schemas, utilities and types

See the source for implementation details.

## Scripts

Key npm scripts (from `package.json`):

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck and build for production
- `npm run preview` — preview production build

## Features in developement

- Saving the nodes structures (in localStorage)
- Creating connections upon intersection of a node with an edge
- Adding menus to ease editing
- Much more ...

---
Made with 🔥 by claude-jr.
