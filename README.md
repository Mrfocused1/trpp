# 1 HUNDRED - The Code. The Culture.

A high-performance Next.js website for 1 HUNDRED streetwear brand, featuring advanced animations and smooth scroll interactions.

## 🚀 Tech Stack

- **Next.js 16** (App Router) - React framework with built-in routing
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GSAP** - Professional animations and ScrollTrigger
- **Lenis** - Smooth scroll experience
- **Next/Image** - Optimized image loading

## 🎯 Features

- ✅ **Clean URLs** - No .html extensions (e.g., `/`, `/shop`, `/drop`)
- ✅ **Custom Cursor** - Interactive cursor that responds to hover states
- ✅ **Smooth Scrolling** - Buttery smooth page scrolling with Lenis
- ✅ **12 Animated Chapters** - Each with unique scroll-triggered animations
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Performance Optimized** - Image optimization, lazy loading
- ✅ **Future-Ready Architecture** - Prepared for Supabase, Stripe, and email integrations

## 📦 Project Structure

```
1hundred/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Chapter components (01-12)
│   ├── ui/                 # Reusable UI components
│   └── providers/          # Context providers
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
└── public/                 # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3001](http://localhost:3001) (or 3000 if available)

## 🎨 Key Components

### Chapter Sections

1. **Chapter 01 - The Stamp**: Glitch effect logo animation
2. **Chapter 02 - The Ends**: Circular mask reveal
3. **Chapter 03 - The Code**: Interactive hover states
4. **Chapter 04 - The Route**: Pinned map with animated path
5. **Chapter 05 - The Sound**: Waveform animation
6. **Chapter 06 - Archive**: Horizontal scroll gallery
7. **Chapter 07 - The Hoodie**: Product reveal with shine effect
8. **Chapter 08 - Craft**: Needle animation along seam path
9. **Chapter 09 - Community**: Team grid with hover effects
10. **Chapter 10 - Drop System**: Email capture form
11. **Chapter 11 - Shop**: Product page with size selector
12. **Chapter 12 - Sign Off**: Final CTA with social links

### UI Components

- **CustomCursor**: Follows mouse, expands on hover
- **HUD**: Fixed navigation with progress indicator
- **LoadingScreen**: Initial loading animation
- **SmoothScrollProvider**: Integrates Lenis with GSAP

## 🔮 Future Integrations

The architecture is designed to easily accommodate:

### Supabase Integration

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Stripe Integration

```typescript
// app/api/stripe/webhook/route.ts
export async function POST(req: Request) {
  // Handle Stripe webhooks
  // Update orders in Supabase
}
```

### Email Integration

```typescript
// app/api/email/subscribe/route.ts
export async function POST(req: Request) {
  // Add to mailing list
  // Send welcome email
}
```

## 🚀 Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Self-Hosted

```bash
# Build
npm run build

# Start with PM2
npm i -g pm2
pm2 start npm --name "1hundred" -- start
```

## 🎯 Adding New Pages

To add a new page (e.g., `/about`):

1. Create `app/about/page.tsx`:

```typescript
export default function AboutPage() {
  return <div>About content</div>
}
```

2. The URL will automatically be `/about` (clean URL)

## 🔧 Customization

### Update Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'hundred-black': '#0a0a0a',
  'hundred-red': '#cc1100',
  // Add more colors
}
```

### Add Animations

Use GSAP in components:

```typescript
useEffect(() => {
  gsap.to('.element', {
    x: 100,
    scrollTrigger: {
      trigger: '.element',
      start: 'top center',
    }
  })
}, [])
```

## 📝 Environment Variables

Create `.env.local` for future integrations:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# Email
EMAIL_API_KEY=your_email_api_key
```

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Build errors

```bash
# Clear cache
rm -rf .next
npm run dev
```

### Animation issues

- Ensure GSAP plugins are registered
- Check ScrollTrigger.refresh() after dynamic content

## 📄 License

ISC

## 🙏 Credits

- Design: 1 HUNDRED Brand
- Development: Built with Next.js, GSAP, Lenis
- Images: Unsplash (placeholder images)
