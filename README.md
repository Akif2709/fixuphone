This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🔒 Security First!

**Before you start**, please read [SECURITY.md](./SECURITY.md) for important security guidelines.

### Quick Setup

1. Copy the environment variables example:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual credentials in `.env.local`

3. **NEVER commit `.env.local` to version control!**

## Admin Tools

### Initialize Contact Information

Run this script to create the initial contact information in your database (required for first deployment):

```bash
node scripts/init-contact-info.mjs
```

### Reset Admin Password

If you forgot your admin password or need to reset it:

```bash
node scripts/reset-admin-password.mjs
```

The script will prompt you for:

- Admin username (default: `admin`)
- New password
- Password confirmation

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
