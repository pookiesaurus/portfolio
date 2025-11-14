# Ryan Pham Portfolio

A personal portfolio website with a Y2K NewJeans aesthetic, featuring a clean design with light blues, off-white backgrounds, and interactive elements.

## Project Structure

```
/workspace/
├── css/                    # Stylesheets
│   ├── main.css           # Shared styles (variables, layout, typography, components)
│   ├── cursor.css         # Custom cursor styles
│   ├── home.css           # Home page specific styles
│   ├── about.css          # About page specific styles (including polaroid carousel)
│   ├── work.css           # Work page specific styles
│   └── project.css        # Individual project page styles
├── js/                     # JavaScript files
│   ├── cursor.js          # Custom cursor functionality
│   └── carousel.js        # Infinite polaroid carousel for about page
├── assets/                 # Images and other assets (currently empty)
├── index.html             # Home page
├── about.html             # About me page with skills and polaroid carousel
├── work.html              # Projects overview page
├── project-1.html         # Sweet Mayada Cakes redesign
├── project-2.html         # UniMelb Library evaluation
└── project-3.html         # AI Portfolio Builder

```

## CSS Architecture

### main.css
Core styles shared across all pages:
- CSS variables and color palette
- Font definitions (Geist, Noto Serif)
- Reset and base styles
- ASCII background graphics
- Header and navigation
- Typography (headings, paragraphs)
- Buttons and tags
- Cards (project cards, skill categories)
- Footer
- Responsive breakpoints

### cursor.css
Custom cursor that:
- Follows mouse smoothly with easing
- Transforms into a squircle with "see project →" text on project hover

### Page-specific CSS
- **home.css**: Hero section, featured projects grid
- **about.css**: Bio section, polaroid carousel with realistic effects, skills grid
- **work.css**: Full projects listing
- **project.css**: Individual project detail pages

## JavaScript

### cursor.js
- Smooth cursor following with easing animation
- Project hover detection and text display
- Used on: index.html, work.html, project pages

### carousel.js
- Infinite draggable polaroid carousel
- Touch and mouse support
- Auto-scroll with manual override
- Seamless looping using triple-set technique
- Used on: about.html

## Design System

### Colors
- **Base**: `#fafaf8` (off-white)
- **Blues**: `#dbeafe` to `#2563eb` (light to dark)
- **Text**: `#0f172a` (primary), `#475569` (secondary), `#94a3b8` (muted)

### Fonts
- **Body**: Geist (sans-serif)
- **Headings**: Noto Serif (italic for titles)
- **ASCII art**: Courier New (monospace)

### Key Features
- ASCII text art background (tech-themed: `*`, `{}`, `</>`, `+`)
- Custom cursor with project hover states
- Realistic polaroid cards with tape, paper texture, and film overlay
- Responsive design with mobile breakpoints
- Consistent lowercasing for aesthetic

## Making Updates

### To update colors across the entire site:
Edit CSS variables in `css/main.css` (`:root` section)

### To update fonts:
Edit font-face declarations in `css/main.css`

### To modify the header/footer:
Edit `css/main.css` (Header & Footer sections)

### To change the cursor behavior:
Edit `css/cursor.css` and `js/cursor.js`

### To modify the polaroid carousel:
Edit `css/about.css` (Polaroid Carousel section) and `js/carousel.js`

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled for cursor and carousel features
- Responsive down to 320px mobile width
