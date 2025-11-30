# AnikeBrands Portfolio Website

A modern, clean Astro-based portfolio website for a designer portfolio called "AnikeBrands".

## 🚀 Tech Stack

- **Astro** - Core framework for static site generation
- **Tailwind CSS** - Utility-first CSS framework
- **React** - For interactive components (islands architecture)
- **Framer Motion** - Smooth animations
- **EmailJS** - Contact form handling
- **Cloudinary** - Image optimization and delivery

## 🎨 Brand Colors

- **Primary**: `#8b5cf6` (Violet)
- **Accent Pink**: `#ec4899`
- **Gradient**: Linear gradient from `#8b5cf6` to `#ec4899`

## 📁 Project Structure

```
/
├── src/
│   ├── components/          # Astro components
│   │   └── react/          # React islands
│   ├── layouts/            # Layout components
│   ├── pages/              # Route pages
│   ├── styles/             # Global CSS
│   ├── data/               # Data files (services, portfolio, testimonials)
│   ├── utils/              # Utility functions (Cloudinary helper)
│   └── assets/             # Static assets
├── public/                 # Public assets
└── dist/                   # Build output (for Hostinger deployment)
```

## 🛠️ Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📝 Configuration

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update `src/components/ContactForm.astro` with your:
   - Service ID
   - Template ID
   - Public Key

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Update `src/utils/cloudinary.js` with your Cloud Name
3. Use the helper functions to optimize images

## 🚢 Deployment

This project is configured for static deployment on **Hostinger Business Web Hosting**.

1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your hosting root directory
3. Ensure your hosting supports static file serving

## 📄 Pages

- `/` - Home page with hero, services, and featured portfolio
- `/about` - About page
- `/services` - Services listing page
- `/portfolio` - Portfolio grid with filtering
- `/portfolio/[slug]` - Individual portfolio project pages
- `/testimonials` - Client testimonials with carousel
- `/contact` - Contact form page

## 🎯 Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized
- ✅ Smooth animations with Framer Motion
- ✅ Portfolio filtering
- ✅ Testimonials carousel
- ✅ Contact form with EmailJS
- ✅ Image optimization ready (Cloudinary)
- ✅ Sticky header navigation
- ✅ Gradient brand styling
- ✅ Modern, clean UI

## 📦 Dependencies

See `package.json` for the complete list of dependencies.

## 🔧 Customization

- **Colors**: Update CSS variables in `src/styles/global.css`
- **Content**: Edit data files in `src/data/`
- **Components**: Modify components in `src/components/`
- **Styling**: Adjust Tailwind config in `tailwind.config.mjs`

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Astro


