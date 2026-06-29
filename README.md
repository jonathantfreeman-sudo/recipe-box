# Recipe Box 🍴

Save any online recipe by URL, tag it, and use cook mode to follow along step by step.

## Features

- **Add recipes by URL** — paste any recipe link and Claude extracts the full recipe automatically
- **Tags & filtering** — tag recipes (asian, spicy, vegetarian, quick, etc.) and filter your collection
- **Notes** — add personal tips, substitutions, or reminders to any recipe
- **Cook mode** — distraction-free step-by-step walkthrough with progress tracking
- **Grocery list** — all ingredients from all your recipes in one checkable list
- **PWA** — installable on mobile via "Add to Home Screen"

## Deploy to Vercel

### 1. Fork / clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/recipe-box.git
cd recipe-box
```

### 2. Install Vercel CLI (optional, for local dev)

```bash
npm i -g vercel
vercel dev
```

### 3. Deploy

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new).

### 4. Set environment variable

In your Vercel project settings → **Environment Variables**, add:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |

Redeploy after adding the key.

## Project structure

```
recipe-box/
├── api/
│   └── extract.js        # Serverless function — calls Anthropic API securely
├── public/
│   ├── index.html        # The full app (vanilla JS, no build step)
│   └── manifest.json     # PWA manifest
├── vercel.json           # Routing config
└── README.md
```

## Local development

```bash
npm i -g vercel
vercel dev
```

Then open [http://localhost:3000](http://localhost:3000). You'll need a `.env.local` file:

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Get an Anthropic API key

Sign up at [console.anthropic.com](https://console.anthropic.com) and create an API key under **API Keys**.
