# PostFeito Landing - Effects & Patterns Reference for RFG

Source: PostFeito src/app/(marketing)/ | Date: 2026-05-05

## 1. Animation Libraries (Package Versions)

Library         | Version  | Use Case
GSAP            | ^3.14    | Core scroll/timeline animations
@gsap/react     | ^2       | React hook (useGSAP)
Framer Motion   | 12.38.0  | Installed but NOT used

Key: PostFeito uses GSAP + ScrollTrigger exclusively.

## 2. Core Animation Patterns (Top 8 Effects)

### 1. Hero Text Reveal (Word-by-Word Stagger)
- Where: HeroAnimated.tsx
- Concept: Each word fades in & slides up with 80ms stagger
- Duration: 0.6s | Easing: power2.out
- RFG: Perfect for consultancy tone - staggered reveal builds authority

### 2. Card Grid Stagger (Scroll-Triggered)
- Where: PainCardsAnimated.tsx, FeaturesShowcaseAnimated.tsx, SocialProofAnimated.tsx
- Concept: Cards enter on scroll at viewport 80%; 150ms stagger between
- Duration: 0.7s | Easing: power2.out
- RFG: Direct transplant for professional layouts

### 3. Scroll-Pinned Section (Desktop)
- Where: HowItWorksAnimated.tsx
- Concept: ScrollTrigger.create with pin: true; steps slide in (x: 50px)
- Duration: 0.5s | Easing: power2.out
- RFG: Excellent for underwriting workflow steps

### 4. Clip-Path Curve Swipe Divider
- Where: CurveSwipeDivider.tsx
- Concept: CSS clip-path polygon animates on scroll (scrub: 1)
- GPU-Optimized: clipPath is composited layer
- RFG: Smooth section transitions; replace mustard/navy colors

### 5. Counter/Number Tween (Dynamic Values)
- Where: FeaturesShowcaseAnimated.tsx, ComparisonAnimated.tsx
- Concept: Numbers animate X to Y via gsap.to() with onUpdate()
- Example: 120 min to 3 min; 97 reais counter
- RFG: Perfect for insurance metrics - ROI, savings, coverage %

### 6. Icon Scale-In Burst (Stagger + Elastic)
- Where: FeaturesShowcaseAnimated.tsx
- Concept: Icons scale 0 to 1 with 150ms stagger; back.out(1.7) easing
- RFG: Replace social icons with financial/security icons

### 7. Bento Grid Scrubbed Timeline (Multi-Phase)
- Where: TeamGridAnimated.tsx
- Concept: Single timeline mapped to scroll range; phases enter differently
- Phases: 5 (Identity, Ideas, Writing, Review, Publish)
- RFG: Map to insurance claim workflow with corporate colors

### 8. Marquee (Infinite Scroll)
- Where: SocialProofAnimated.tsx
- Concept: CSS @keyframes marquee (30s linear infinite)
- Respects: prefers-reduced-motion: reduce
- RFG: Use for case studies/testimonial carousel

## 3. Key Layout Patterns

- Bento Grid: 4 cols x 4 rows with CSS Grid Areas; mobile: 1 col
- Contrast Table: 2-column comparison with stagger animation
- Feature Card Trio: 3-column with internal micro-animations

## 4. Color Tokens

navy: #1E3456 (primary text/bg)
mustard: #E5A019 (CTAs, accents)
cream: #FDF6EC (light bg)
success: #2A9D6E (positive)
error: #E53E3E (negative)

RFG palette: Deep blue/slate, Gold/bronze, Green/red, Off-white

## 5. Responsive Strategy

GSAP MatchMedia:
- Desktop: pin sections, scrubbed timelines, clip-path curves
- Mobile: simple stagger, no pin, static SVG curves
- Respects: prefers-reduced-motion: reduce

## 6. Reimplementation Path

Direct transplants: hero text reveal, card stagger, counters, bento, comparison table, marquee
Adapt tone: scroll-pinned sections, curve dividers, icon sets
Skip: Framer Motion, Lenis, chatbot tone

## 7. Performance

- GSAP dynamic import (lazy-load in marketing routes only)
- Post-hydration ScrollTrigger.sort() + refresh()
- GPU layers: willChange + clip-path
- Reduced motion support
- No external smooth-scroll lib

## 8. Key Utilities

useGSAP - @gsap/react (GSAP lifecycle)
useCursorTilt - src/hooks/useCursorTilt.ts (3D card tilt)
gsap.matchMedia() - responsive rules
ScrollTrigger - scroll-triggered animations

## Summary: Top 5-8 Effects for RFG

1. Hero text reveal - Trust-building entrance
2. Card grid stagger - Service showcase
3. Counter tweens - Metrics (ROI, premiums, %)
4. Scroll-pinned process - Workflow steps
5. Bento grid - Team/service ecosystem
6. Comparison table - "Why RFG" narrative
7. Curve divider - Section transitions
8. Icon animations - CTA emphasis

Architecture: GSAP 3.14 + ScrollTrigger, dynamic import in marketing layout.
