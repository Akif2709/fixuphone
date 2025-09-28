# FixUphone Deployment Guide - Vercel

## 🚀 Deploy to Vercel (Recommended)

Vercel is the company behind Next.js and offers the best integration for Next.js applications.

### Steps:

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Configure Environment Variables** (if using EmailJS):
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add your EmailJS keys:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_79rn7rj
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```

4. **Custom Domain** (Optional):
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### Benefits:

- ✅ Automatic deployments from GitHub
- ✅ Free tier with generous limits
- ✅ Built-in CDN and performance optimization
- ✅ Easy custom domain setup
- ✅ Automatic HTTPS

---

## 🔧 Pre-Deployment Checklist

### 1. Update EmailJS Configuration

```typescript
// src/lib/email-service.ts
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_79rn7rj";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";
```

### 2. Create Environment Variables File

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_79rn7rj
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Test Production Build

```bash
npm run build
npm start
```

### 4. Update Contact Information

Make sure all contact details are correct in:

- `src/lib/contact-data.ts`
- `src/app/contact/page.tsx`
- `src/app/book/page.tsx`

---

## 🌐 Domain Setup

### 1. Buy a Domain

Popular registrars:

- Namecheap
- GoDaddy
- Google Domains
- Cloudflare
- DirectNode

### 2. Configure DNS

For Vercel/Netlify:

- Add CNAME record: `www` → `your-app.vercel.app`
- Add A record: `@` → Vercel IP (provided in dashboard)

### 3. SSL Certificate

- Automatically provided by Vercel/Netlify
- Free and auto-renewing

---

## 📱 Mobile Optimization

Your site is already mobile-optimized with:

- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Mobile-first approach
- ✅ Fast loading

---

## 🔍 SEO Optimization

### 1. Update Metadata

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: "FixUphone - Professional Phone & Device Repair in Hilversum",
  description:
    "Expert phone, tablet, and device repair services in Hilversum. Same-day repairs, 1-year warranty, original parts. Book your repair today!",
  keywords: "phone repair, tablet repair, device repair, Hilversum, screen replacement, battery repair",
  openGraph: {
    title: "FixUphone - Professional Device Repair",
    description: "Expert repair services in Hilversum",
    url: "https://your-domain.com",
    siteName: "FixUphone",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FixUphone - Device Repair Services",
      },
    ],
  },
};
```

### 2. Add Google Analytics

```bash
npm install @next/third-parties
```

```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

---

## 🚀 Quick Start Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to vercel.com and import repository
# 3. Add environment variables in Vercel dashboard
# 4. Deploy!
```

---

## 📊 Post-Deployment

### 1. Test Everything

- [ ] Form submission works
- [ ] Email confirmation sends
- [ ] All pages load correctly
- [ ] Mobile responsiveness
- [ ] Contact information is correct

### 2. Set Up Monitoring

- Google Analytics
- Vercel Analytics (if using Vercel)
- Uptime monitoring

### 3. SEO Submission

- Google Search Console
- Bing Webmaster Tools
- Submit sitemap

---

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check for TypeScript errors
   - Ensure all imports are correct
   - Run `npm run build` locally first

2. **Email Not Sending**:
   - Verify EmailJS configuration
   - Check environment variables
   - Test with console logs

3. **Images Not Loading**:
   - Ensure images are in `public` folder
   - Check image paths are correct
   - For static export, use `unoptimized: true`

4. **Styling Issues**:
   - Clear browser cache
   - Check Tailwind CSS is building correctly
   - Verify all CSS imports

### Support:

- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
