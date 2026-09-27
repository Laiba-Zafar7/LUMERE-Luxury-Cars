# CLAUDE.md

## Project: Premium Car Marketplace

You are working on a premium static car-selling marketplace website.

The visual reference for this project is the **LEVRIX luxury automotive Framer template**:

https://www.framer.com/marketplace/templates/levrix/

The developer has also provided a **screen-recorded video of the reference website**. Treat that video as the primary visual and interaction reference.

The goal is to reproduce the same **level of visual quality, hierarchy, spacing, cinematic automotive presentation, typography scale, transitions, scrolling behavior, and overall premium feeling** using our own code and assets.

Do not copy proprietary source code or third-party assets. Recreate the visual experience and interaction patterns using the project's own implementation and media.

---

# 1. PRIMARY OBJECTIVE

Build a polished, premium, cinematic **static car marketplace/showroom**.

The website should feel like:

* luxury automotive
* dark cinematic showroom
* editorial
* sophisticated
* expensive
* minimal
* image-led
* modern
* highly polished

It must NOT feel like:

* a generic car dealership template
* a normal ecommerce grid
* a Bootstrap website
* an AI-generated landing page
* a generic SaaS dashboard
* an over-animated portfolio
* a collection of random cards

The website should make the cars themselves feel like the primary product.

The reference video is the visual source of truth.

When implementing a section, first ask:

> "How does this section behave and feel in the reference?"

Then reproduce that experience using our own components and assets.

---

# 2. IMPORTANT: REFERENCE VIDEO

A recorded video of the LEVRIX reference website is available to the project.

Before making major UI decisions:

1. Inspect the reference video.
2. Identify:

   * section order
   * viewport composition
   * navigation behavior
   * hero composition
   * typography scale
   * spacing
   * image cropping
   * scrolling behavior
   * hover states
   * transitions
   * card proportions
   * buttons
   * section entrances
   * sticky sections
   * footer structure
3. Recreate those patterns with our own implementation.

Do NOT blindly invent a different design.

If the video and this document conflict:

**Reference video > this CLAUDE.md > developer assumptions.**

---

# 3. TECHNOLOGY

Use the existing project stack.

Preferred stack:

* Next.js
* React
* TypeScript
* Tailwind CSS
* GSAP
* GSAP ScrollTrigger
* Lenis for smooth scrolling
* Lucide icons where icons are required

Do not introduce another animation library unless there is a strong technical reason.

Do not install unnecessary dependencies.

Keep the implementation maintainable.

---

# 4. STATIC WEBSITE REQUIREMENT

This is currently a STATIC marketplace.

There is no requirement for:

* database
* authentication
* CMS
* backend
* payment system
* seller dashboard
* real-time inventory
* API integration

Use local/static data.

For example:

```ts
export const vehicles = [
  {
    id: "01",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2025,
    price: "$128,000",
    mileage: "4,200 mi",
    transmission: "Automatic",
    fuel: "Petrol",
    image: "/assets/images/cars/porsche.jpg",
  },
];
```

Keep vehicle data separated from presentation components.

---

# 5. ASSETS

The project's own assets are located inside:

```text
/public/assets
```

Inspect the assets before designing components.

Important rule:

**Use the provided images and videos wherever possible.**

Do not replace provided automotive photography with random Unsplash images.

Do not generate fake placeholder graphics if a suitable local asset already exists.

If an asset clearly corresponds to a section in the reference video, use it.

Organize assets logically if needed:

```text
public/
  assets/
    images/
      cars/
      brands/
      sections/
    videos/
```

Existing asset naming and paths should be respected whenever possible.

---

# 6. VISUAL DIRECTION

The reference uses a:

**dark + cinematic + premium automotive aesthetic.**

The dominant visual language should be:

* black / near-black surfaces
* warm/off-white typography
* subtle grey secondary text
* muted borders
* large automotive photography
* cinematic video
* strong contrast
* generous negative space
* oversized typography
* restrained accent color
* minimal UI chrome

Avoid excessive gradients.

Avoid excessive glow.

Avoid neon effects.

Avoid glassmorphism everywhere.

Avoid purple/blue SaaS-style gradients.

Avoid excessive rounded cards.

Avoid decorative blobs.

Avoid random floating shapes.

Avoid AI-looking visual effects.

---

# 7. COLOR SYSTEM

IMPORTANT:

The colors from the previous MODISCH design system are NOT the color system for this project.

Do NOT use:

```text
#101215
#2a2d31
#6e7377
#f5f5f3
#fffcf6
```

as the primary visual system.

Use the **LEVRIX-inspired dark automotive palette observed in the reference**.

Create the project palette around:

```css
:root {
  --color-black: #050505;
  --color-black-soft: #0a0a0a;
  --color-charcoal: #111111;
  --color-surface: #171717;

  --color-white: #f5f5f2;
  --color-white-soft: #d8d8d3;

  --color-grey: #92928d;
  --color-grey-dark: #5f5f5b;

  --color-border: rgba(245, 245, 242, 0.14);

  --color-accent: #c7a46a;
}
```

The accent should be used sparingly.

Accent usage:

* small labels
* active states
* tiny UI details
* selected filters
* subtle hover states
* small decorative rules

Do NOT make the whole website gold.

The majority of the website should remain:

**black + off-white + grey + automotive imagery.**

If the reference video clearly shows a different exact shade for a specific component, match the reference visually rather than forcing the generic token.

---

# 8. TYPOGRAPHY

Use the typography scale and philosophy from the existing design system.

The typography should feel editorial and premium.

Use:

* large display typography
* compact metadata
* restrained body text
* strong hierarchy
* generous line-height where appropriate
* tight display headings

Preferred structure:

```css
--text-hero: clamp(4.5rem, 17vw, 17rem);
--text-display: clamp(2.75rem, 6vw, 5.5rem);
--text-h2: clamp(1.75rem, 3vw, 2.75rem);
--text-h3: clamp(1.25rem, 1.6vw, 1.5rem);
--text-lead: clamp(1.125rem, 1.4vw, 1.375rem);
--text-body: 1rem;
--text-meta: 0.8125rem;
```

Do not make every heading enormous.

Use oversized typography primarily for:

* hero
* major section introductions
* featured vehicle names
* major numbers

Use smaller typography for:

* vehicle metadata
* navigation
* filters
* prices
* labels
* supporting copy

---

# 9. FONT STYLE

The existing project typography should be retained where appropriate.

Primary sans-serif:

```css
font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
```

The final typography should have:

* clean geometric structure
* tight headings
* sophisticated spacing
* minimal font weights

Avoid:

* playful fonts
* cartoon fonts
* overly futuristic fonts
* excessive italic text
* excessive font-weight changes

---

# 10. SPACING SYSTEM

Use the existing 4px spacing philosophy.

Preferred spacing:

```text
4
8
12
16
24
32
48
64
96
128
160
224
```

Do not randomly create:

```text
37px
53px
71px
113px
```

unless the reference absolutely requires it.

Create consistent section rhythm.

Large sections should have generous vertical breathing room.

---

# 11. LAYOUT

Use a large desktop canvas.

Preferred:

```css
--page-margin: clamp(20px, 5vw, 88px);
--max-content: 1440px;
```

The website should feel spacious.

Do not constrain the entire website into a narrow 1200px marketing container.

Automotive photography should be allowed to become large.

Use:

* full-width imagery
* large editorial grids
* asymmetric layouts
* two-column compositions
* horizontal media sections
* large featured vehicles

where supported by the reference.

---

# 12. NAVIGATION

The navigation should feel minimal and premium.

Do NOT create a standard SaaS navbar.

Avoid:

```text
Home | About | Services | Contact | Login
```

with a large colored button.

Instead use the reference's visual approach.

Navigation should have:

* restrained height
* minimal links
* strong typography
* subtle border/separator
* transparent or dark background depending on section
* smooth transition over hero media

If the reference uses a floating navigation treatment, reproduce that behavior.

Navigation must remain highly usable on mobile.

---

# 13. HERO

The hero is the most important section.

It should immediately communicate:

**premium automotive marketplace.**

Use the provided hero image/video from:

```text
/public/assets
```

if available.

Hero requirements:

* large cinematic vehicle imagery/video
* very large typography
* strong contrast
* minimal copy
* premium CTA
* carefully positioned metadata
* subtle entrance animation
* cinematic overlay
* no unnecessary UI

The hero should NOT look like:

```text
CAR DEALERSHIP
Buy your dream car today!
[SHOP NOW]
```

Instead, use short editorial messaging.

Example style:

```text
DRIVE
WHAT
MOVES YOU.
```

or equivalent project-specific copy.

Do not copy the exact reference text.

---

# 14. HERO MEDIA

Hero video must:

* autoplay when possible
* be muted
* loop
* use `playsInline`
* cover the hero
* avoid visible playback controls
* preserve visual quality
* have a poster/fallback image

Example:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
>
```

Do not load huge videos unnecessarily.

Optimize performance.

If the provided video is too large, use appropriate loading strategies.

---

# 15. VEHICLE PRESENTATION

Cars are the primary content.

Every vehicle card should feel like an editorial product presentation rather than a generic ecommerce card.

Vehicle cards should prioritize:

1. image
2. brand/model
3. year
4. price
5. key specification
6. subtle interaction

Example:

```text
PORSCHE

911 Carrera GTS

2025
4,200 MI
AUTOMATIC

$128,000
```

Avoid putting ten badges on every card.

Do not use:

```text
Featured
Hot Deal
Best Seller
New
Premium
Verified
Limited
```

all at once.

Keep metadata restrained.

---

# 16. VEHICLE GRID

The inventory section should have strong visual hierarchy.

Possible structure:

```text
Section label
Large heading
Supporting text

Featured vehicle
────────────────────────

Vehicle grid
```

Featured vehicles can use larger image areas.

Regular inventory can use a two-column or three-column layout depending on viewport.

Do not make every card visually identical if the reference uses editorial variation.

---

# 17. FEATURED VEHICLE SECTION

Create a strong featured vehicle section.

Use:

* large image
* large vehicle name
* price
* key specifications
* CTA
* subtle parallax
* image scale interaction

Example structure:

```text
[ LARGE CAR IMAGE ]

PORSCHE
911 TURBO S

2025 · AUTOMATIC · 3,200 MI

$215,000

VIEW VEHICLE →
```

The image should remain the dominant visual element.

---

# 18. FILTERS

Because this is a marketplace, users should be able to browse inventory.

For the static version, filters can operate entirely on local data.

Possible filters:

* Make
* Model
* Price
* Year
* Body type
* Fuel
* Transmission

Do not build a huge ecommerce filter sidebar unless the reference requires it.

Prefer a refined filter bar / compact controls.

---

# 19. VEHICLE DETAIL PAGE

Vehicle detail pages should feel like a luxury editorial product page.

Structure:

```text
Navigation

Large vehicle hero
Vehicle name
Price
Primary CTA

Image gallery

Vehicle specifications

Description

Highlights

Additional gallery

Inquiry CTA

Footer
```

The vehicle image gallery should be large and immersive.

Specifications should remain clean.

Example:

```text
YEAR
2025

MILEAGE
4,200 MI

ENGINE
3.0L TURBO

TRANSMISSION
AUTOMATIC

POWER
443 HP
```

---

# 20. ANIMATION PHILOSOPHY

Animation should make the website feel expensive.

It should NOT make the website feel like a motion demo.

Use animation for:

* page entrances
* image reveals
* text reveals
* hover interactions
* image scale
* subtle parallax
* sticky storytelling
* navigation transitions
* section transitions

Do NOT animate everything.

Avoid:

* constant floating elements
* infinite decorative animations
* excessive particle effects
* spinning cars
* cursor trails
* random magnetic effects everywhere
* excessive blur

---

# 21. GSAP

Use GSAP for meaningful interactions.

Preferred:

```text
GSAP
ScrollTrigger
Lenis
```

Examples:

```ts
gsap.from(...)
gsap.to(...)
ScrollTrigger.create(...)
```

Use timelines when multiple elements need coordinated entrances.

Animations should be subtle.

Typical reveal:

```text
opacity: 0 → 1
y: 30 → 0
```

Typical image reveal:

```text
clip-path / scale
```

Typical image parallax:

```text
scale: 1.05 → 1
```

Do not overuse animation.

---

# 22. LENIS

Use Lenis for smooth scrolling if already configured.

Do not combine multiple smooth-scroll systems.

Do not use:

```css
scroll-behavior: smooth;
```

as a replacement for Lenis.

Respect:

```text
prefers-reduced-motion
```

---

# 23. SCROLL-TRIGGERED SECTIONS

Use ScrollTrigger for cinematic section entrances.

Preferred pattern:

```text
section enters viewport
↓
heading reveals
↓
supporting copy reveals
↓
image reveals
```

Do not make every element independently bounce into view.

Use coordinated timelines.

---

# 24. IMAGE REVEALS

Automotive imagery should frequently use premium reveals.

Possible effect:

```text
clip-path inset(0 100% 0 0)
→
clip-path inset(0 0% 0 0)
```

or:

```text
scale(1.08)
→
scale(1)
```

Keep transitions smooth.

Do not distort the vehicle.

---

# 25. HOVER INTERACTIONS

Hover should feel refined.

Examples:

```text
image scale 1 → 1.03
arrow moves slightly
metadata becomes brighter
border subtly changes
```

Do not use exaggerated hover animations.

Avoid:

```text
card spins
card jumps
card rotates 10 degrees
rainbow glow
```

---

# 26. BUTTONS

Buttons should be minimal.

Preferred style:

```text
VIEW INVENTORY →
EXPLORE VEHICLE →
REQUEST DETAILS →
```

Use dark/white contrast depending on section.

Buttons can use pill or restrained rectangular geometry according to the reference.

Do not create huge generic gradient buttons.

---

# 27. ICONS

Use Lucide icons only where they improve usability.

Do not replace every text label with an icon.

Arrows are useful:

```text
ArrowUpRight
ArrowRight
ChevronRight
```

Icons should remain small.

---

# 28. RESPONSIVE DESIGN

Desktop is important, but mobile must feel intentionally designed.

Do NOT simply stack the desktop layout.

Mobile should have:

* appropriate hero crop
* readable display typography
* simplified navigation
* comfortable touch targets
* reduced animation
* optimized image sizes
* clean vehicle cards
* no horizontal overflow

Breakpoints:

```text
640px
768px
1024px
1280px
1536px
```

Test at minimum:

```text
390px
768px
1024px
1440px
1920px
```

---

# 29. MOBILE HERO

On mobile:

* do not allow huge typography to overflow
* maintain cinematic composition
* keep the car visible
* ensure CTA remains accessible
* avoid excessive vertical whitespace
* preserve the premium feeling

If the desktop hero is video-heavy, use an appropriate poster/image fallback on mobile when performance requires it.

---

# 30. ACCESSIBILITY

Use semantic HTML.

Prefer:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Buttons must be actual buttons.

Links must be actual links.

Images require useful `alt`.

Decorative images may use:

```text
alt=""
```

Ensure keyboard focus states exist.

Respect:

```text
prefers-reduced-motion
```

---

# 31. PERFORMANCE

This is an image/video-heavy website.

Performance matters.

Optimize:

* video loading
* image sizes
* lazy loading
* responsive images
* animation count
* DOM complexity
* unnecessary JavaScript

Do not put expensive blur effects on every element.

Do not use `backdrop-filter` everywhere.

Do not continuously run animation loops unless necessary.

Use CSS transitions for simple hover states.

Use GSAP only where timeline/scroll control is actually required.

---

# 32. COMPONENT ARCHITECTURE

Keep components reusable.

Suggested structure:

```text
components/
  layout/
    Navbar.tsx
    Footer.tsx

  hero/
    Hero.tsx

  vehicles/
    VehicleCard.tsx
    VehicleGrid.tsx
    FeaturedVehicle.tsx
    VehicleSpecs.tsx
    VehicleGallery.tsx

  sections/
    FeaturedCollection.tsx
    BrowseInventory.tsx
    BrandShowcase.tsx
    TrustSection.tsx
    CTASection.tsx

  animations/
    ScrollReveal.tsx
    ImageReveal.tsx
```

Do not put the entire homepage into one giant component.

---

# 33. DATA ARCHITECTURE

Keep vehicle data separate.

Example:

```text
data/
  vehicles.ts
  brands.ts
  categories.ts
```

Components should receive data through props.

Avoid hardcoding repeated vehicle information inside JSX.

---

# 34. DESIGN SYSTEM

Create a small centralized design system.

Use CSS variables for:

* colors
* spacing
* typography
* radii
* transitions
* layout widths
* z-index

Do not randomly create values inside components.

For example:

```css
:root {
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;

  --transition-fast: 180ms;
  --transition-base: 320ms;
  --transition-slow: 700ms;
}
```

---

# 35. RADIUS

Use restrained rounding.

Preferred:

```text
8px
12px
16px
20px
24px
```

Large automotive images may use:

```text
16px
24px
```

depending on the reference.

Do not make every element `rounded-full`.

---

# 36. BORDERS

Borders should be subtle.

Preferred:

```css
border: 1px solid rgba(245, 245, 242, 0.12);
```

Do not create strong visible borders around every card.

Use spacing and contrast to separate content.

---

# 37. FOOTER

The footer should feel like a continuation of the premium experience.

Include:

* brand
* navigation
* inventory links
* contact
* social links if required
* legal
* copyright

Do not create an empty footer with massive blank space.

The footer should have intentional hierarchy.

---

# 38. WHAT NOT TO DO

Never introduce:

* purple SaaS gradients
* excessive glassmorphism
* neon borders
* random blobs
* excessive shadows
* excessive rounded cards
* stock business imagery
* generic dashboard UI
* cartoon illustrations
* AI-looking decorative elements
* excessive floating animation
* unnecessary 3D
* cursor trails
* particle backgrounds
* random glow circles

The website is about **cars**, not animation effects.

---

# 39. 3D

3D is optional.

Do NOT introduce Three.js/R3F simply because this is an automotive website.

Only use 3D if:

1. it clearly improves the experience,
2. it is supported by the reference,
3. performance remains acceptable.

High-quality photography/video is more important than unnecessary 3D.

---

# 40. COPYWRITING

Copy should be:

* concise
* premium
* confident
* editorial
* automotive-focused

Avoid generic AI phrases such as:

```text
Discover your dream car today.
Experience the future of automotive excellence.
Where innovation meets luxury.
Your journey starts here.
Unparalleled automotive experience.
```

Prefer short, specific language.

Example:

```text
CURATED MACHINES.
READY FOR THE ROAD.
```

or:

```text
FIND YOUR NEXT DRIVE.
```

Copy should match the actual marketplace.

---

# 41. STATIC MARKETPLACE INTERACTIONS

Even though the site is static, it should feel functional.

Implement client-side interactions where appropriate:

* vehicle filtering
* sorting
* navigation
* image galleries
* modal/lightbox
* mobile menu
* vehicle detail navigation
* favorite UI if required
* search UI if required

No backend is required.

---

# 42. ROUTING

Suggested routes:

```text
/
 /inventory
 /inventory/[slug]
 /about
 /contact
```

If the reference video shows additional pages, reproduce the equivalent experience using appropriate routes.

---

# 43. IMPLEMENTATION PROCESS

Before writing a large amount of code:

### Step 1

Inspect the existing repository.

### Step 2

Inspect:

```text
/public/assets
```

### Step 3

Inspect the provided reference video.

### Step 4

Identify the reference:

* sections
* spacing
* typography
* colors
* media
* navigation
* animation
* responsive behavior

### Step 5

Create/verify the design tokens.

### Step 6

Build the global layout.

### Step 7

Build navigation.

### Step 8

Build hero.

### Step 9

Build featured vehicles.

### Step 10

Build inventory.

### Step 11

Build vehicle detail.

### Step 12

Build supporting sections.

### Step 13

Build footer.

### Step 14

Add animation.

### Step 15

Test responsive behavior.

### Step 16

Polish spacing, typography and image cropping.

---

# 44. IMPORTANT CLAUDE CODE BEHAVIOR

Do not start by generating random components.

First inspect the project.

Use the existing architecture whenever possible.

Do not overwrite working components without understanding them.

Do not install dependencies unnecessarily.

Do not create duplicate components.

Do not create duplicate CSS systems.

Do not introduce a second design system.

Do not modify unrelated files.

---

# 45. REFERENCE-FIRST DEVELOPMENT

Whenever something looks different from the reference video, prioritize visual comparison.

Ask:

```text
Is the spacing correct?
Is the image crop correct?
Is the typography scale correct?
Is the section height correct?
Is the animation timing correct?
Is the content density correct?
Is the contrast correct?
Is the hierarchy correct?
```

The target is not simply:

> "A good car website."

The target is:

> "A premium automotive website with the same visual quality and interaction language as the supplied LEVRIX reference."

---

# 46. QUALITY BAR

Before considering a section finished, verify:

### Visual

* [ ] Typography feels premium
* [ ] Images are high quality
* [ ] Spacing is consistent
* [ ] Colors match the reference direction
* [ ] No unnecessary UI
* [ ] No generic template appearance

### Interaction

* [ ] Hover states feel intentional
* [ ] Scroll animations are smooth
* [ ] Navigation works
* [ ] Buttons work
* [ ] Vehicle interactions work

### Responsive

* [ ] 390px
* [ ] 768px
* [ ] 1024px
* [ ] 1440px
* [ ] 1920px

### Performance

* [ ] Images optimized
* [ ] Video optimized
* [ ] No excessive animation
* [ ] No unnecessary dependencies
* [ ] No console errors

### Accessibility

* [ ] Keyboard navigation
* [ ] Focus states
* [ ] Semantic HTML
* [ ] Image alt text
* [ ] Reduced-motion support

---

# 47. FINAL DESIGN PRINCIPLE

The most important rule:

**Make the cars feel expensive.**

Every design decision should support that.

Large imagery.

Strong typography.

Dark cinematic surfaces.

Minimal interface.

Smooth transitions.

Excellent spacing.

Restrained animation.

No visual clutter.

No generic AI aesthetic.

No unnecessary effects.

The final website should feel like a **premium digital automotive showroom**, not a normal static template.
