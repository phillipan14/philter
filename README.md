# PhilTer

Monitor LinkedIn profiles for job changes, title updates, and headline rewrites. For market research purposes, obviously.

**Built by [Phillip An](https://linkedin.com/in/phillipan)**

## How it works

Add LinkedIn profiles to your watchlist. PhilTer tracks changes to their job title, company, and headline over time. When something changes, you get notified via email.

Ships with demo data so you can explore the UI immediately.

### Features

- **Profile watchlist** — add any LinkedIn profile by URL
- **Change detection** — tracks title, company, and headline updates
- **Visual timeline** — see every change with old/new diffs
- **Email notifications** — get alerted when someone updates their profile (via Resend)
- **Demo mode** — pre-loaded sample profiles with realistic change histories
- **Local storage** — all data stays in your browser, no database needed

## Tech stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Email:** [Resend](https://resend.com)
- **Data:** localStorage (no backend required)

## Run locally

```bash
git clone https://github.com/phillipan14/philter.git
cd philter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Demo profiles are pre-loaded.

### Optional: Email notifications

To enable email alerts, add a [Resend](https://resend.com) API key:

```bash
echo "RESEND_API_KEY=re_your_key_here" > .env.local
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/phillipan14/philter&env=RESEND_API_KEY&envDescription=Resend%20API%20key%20for%20email%20notifications&envLink=https://resend.com)

## License

MIT
