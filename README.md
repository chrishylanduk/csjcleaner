# CSJCleaner.com

A simple tool for converting long Civil Service Jobs URLs into short, shareable ones.

Built with Vite and TypeScript. Hosted on Cloudflare Pages.

## How it works

Civil Service Jobs search result URLs encode session data in a Base64 `SID` parameter. This tool decodes that parameter, extracts the job ID (`joblist_view_vac`), and constructs the canonical job URL. Everything runs in the browser — nothing is transmitted.

## Development

```
npm install
npm run dev
```

## Deployment

```
npm run build
```

Output is in `dist/`. On Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`
