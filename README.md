# Sweet No. 13 - Cookie Marketing Site

A Next.js marketing site for Sweet No. 13, built with Sanity CMS, Tailwind CSS, and deployed on Vercel.

## Features

- **Home Page**: Hero section with customizable image, title, and subtitle
- **Price Section**: Two side-by-side rich text fields for pricing information
- **About Section**: Optional about us section
- **Contact Page**: Contact form with image upload, validation, and email integration
- **Sanity CMS**: Full content management through Sanity Studio
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Sanity account with project ID: `n2qqnp5j`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file based on `.env.local.example`:
```bash
cp .env.local.example .env.local
```

3. Fill in your environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID=n2qqnp5j`
- `NEXT_PUBLIC_SANITY_DATASET=production` (or `development`)
- `SANITY_API_TOKEN` (get from Sanity dashboard)
- `RESEND_API_KEY` (get from Resend dashboard)

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── studio/            # Sanity Studio
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
├── sanity/                # Sanity configuration
│   └── schema/           # Sanity schemas
└── public/               # Static assets
```

## Sanity Schemas

- **Site Settings**: Logo, social links, disclaimer text
- **Home Page**: Hero image, title, subtitle, price fields, about section
- **Contact Page**: Optional heading and content

## Contact Form

The contact form includes:
- Full Name
- Date cookies are needed
- Occasion
- Size selection (with auto-quantity for smaller sizes)
- Quantity
- Description
- Image upload (PNG/JPG, minimum 500KB)
- reCAPTCHA (commented out, ready for domain)

## Email Integration

Emails are sent via Resend. Update the recipient email in `app/api/contact/route.ts`.

## Deployment

Deploy to Vercel:
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Next Steps

1. Add actual logo PNG to Sanity
2. Configure reCAPTCHA with domain keys
3. Update Resend email addresses
4. Set up Sanity Studio authentication
5. Test form submission and email delivery
