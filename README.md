This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Issue
We're encountering a problem where the expires value passed into the Gumlet Player component is not being respected. Despite explicitly setting a custom expires value (e.g., 1), the player still defaults to an expiration time of 1 hour. As a result, any DRM token or session that should expire sooner remains valid for the full hour.

Below is a simplified example showing how we're passing the expires prop and setting a custom value (1 second in this case), yet the player still defaults to a 1-hour expiry: