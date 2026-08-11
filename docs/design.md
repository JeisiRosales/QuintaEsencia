# Design System

This document defines the visual design language for this project. Use these guidelines when building any user interface. The goal is a cohesive, polished look across every screen and component.

## Colors

### Primary Palette

- **primary-brand-1**: `#FFDA8E` -- Buttons, icons, details
- **primary-brand-2**: `#FFAD04` -- Links, CTAs, hovers
- **primary-light-1**: `#FEFAF3` -- Headings, BGs, buttons
- **primary-light-2**: `#FDF2E2` -- Body text, BGs
- **primary-light-3**: `#F3E1C5` -- Borders, fine details
- **primary-dark-1**: `#362D1B` -- Headings, BGs
- **primary-dark-2**: `#534831` -- Body text, BGs
- **primary-dark-3**: `#6C624D` -- Borders, fine details

### How to Use Colors

- **Brand colors** (`#FFDA8E`, `#FFAD04`) are the signature of the design. Use them for buttons, links, active states, and anywhere the interface needs to feel intentional and branded.
- **Light colors** (`#FEFAF3`, `#FDF2E2`, `#F3E1C5`) serve as backgrounds and surfaces. The lightest shade is for primary page backgrounds, the mid shade works well for alternate sections or card fills, and the deepest light shade is ideal for borders and subtle dividers.
- **Dark colors** (`#362D1B`, `#534831`, `#6C624D`) are for text and dark surfaces. The deepest dark is for headings and high-emphasis text. The mid dark works for body text and supporting copy. The lightest dark is for borders, muted text, and fine details on dark backgrounds.
- **Headings on light backgrounds** always use `#362D1B`. **Headings on dark backgrounds** always use `#FEFAF3`.
- **Body text on light backgrounds** always uses `#534831`. **Body text on dark backgrounds** always uses `#FDF2E2`.
- Always ensure text has strong contrast against its background.

## Typography

**heading-font:** Poppins, weight 600
**body-font:** Poppins, weight 400

Use "Poppins" for all headings, hero text, and display elements. Use "Poppins" for paragraphs, labels, navigation, form fields, and all other interface text. Load both from Google Fonts.

### Type Scale

The type scale uses fluid sizing that adapts smoothly between mobile and desktop viewports:

- **title-size-1** -- `clamp(2.625rem, 2.2993rem + 1.4474vw, 3.3125rem)`, Semi Bold, Poppins. Use for hero headlines and major page titles.
- **title-size-2** -- `clamp(2.1875rem, 1.9507rem + 1.0526vw, 2.6875rem)`, Semi Bold, Poppins. Use for section headings.
- **title-size-3** -- `clamp(1.8125rem, 1.6645rem + 0.6579vw, 2.125rem)`, Semi Bold, Poppins. Use for card titles and subsection headings.
- **title-size-4** -- `clamp(1.5rem, 1.4112rem + 0.3947vw, 1.6875rem)`, Semi Bold, Poppins. Use for smaller headings, labels, or group titles.
- **title-size-5** -- `clamp(1.25rem, 1.1908rem + 0.2632vw, 1.375rem)`, Semi Bold, Poppins. Use for fine headings or emphasized labels.
- **title-size-6** -- `clamp(1.0625rem, 1.0329rem + 0.1316vw, 1.125rem)`, Semi Bold, Poppins. Use for the smallest headings or captions.
- **sub-title** -- `0.75rem`, Semi Bold, Poppins. Use for labels, overlines, and category tags. Displayed uppercase with wide letter-spacing.
- **Body Size L** -- `1rem`, Regular, Poppins. Use for lead paragraphs, introductions, or featured body text.
- **Body Size M** -- `0.875rem`, Regular, Poppins. The default size for paragraphs and general reading.
- **Body Size S** -- `0.75rem`, Regular, Poppins. Use for captions, footnotes, helper text, and secondary information.

Sizes use CSS clamp() for fluid scaling. Paste the clamp values directly into your size fields -- no additional math needed.

### CSS Variables

Store font families and weights as variables so they stay consistent across the system:

```css
:root {
  --font-family-heading: "Poppins";
  --font-family-body: "Poppins";
}
```

## Backgrounds and Sections

The overall tone is light. Most sections should use light backgrounds with dark text.

- For light sections, use `#FEFAF3` or `#FDF2E2` as the background, with `#362D1B` or `#534831` for text.
- For dark sections, use `#362D1B` or `#534831` as the background, with `#FEFAF3` or `#FDF2E2` for text.
- Use `#F3E1C5` for subtle borders and dividers on light backgrounds, and `#6C624D` for the same on dark backgrounds.
- Alternate background tones between consecutive sections so they feel visually distinct without competing.

## Buttons

**Primary buttons** use a `#FFDA8E` background with dark text and rounded corners. They should feel solid and confident. Add a subtle hover effect -- a gentle scale, brightness shift, or shadow -- to make them feel interactive.

**Secondary buttons** are outlined or ghost-style. They have a transparent background with a visible border and text that matches the brand or dark palette. Use them for less prominent actions alongside a primary button.

**button-font:** Poppins, weight 500
**button-radius:** 16px

**Button sizes:**
- Small: 8px vertical · 16px horizontal · 13px font
- Medium: 12px vertical · 24px horizontal · 15px font
- Large: 16px vertical · 32px horizontal · 17px font
- Default size: md

**Tags** are used for labels like "Popular", "New", or category chips. They use noticeably tighter padding than buttons so they read as labels, not actions.
- Variant: soft (tinted brand background with brand text)
- Size: md
- Radius: 999px

## Borders, Cards, and Details

Use `#F3E1C5` for card borders, input outlines, and dividers on light surfaces. On dark surfaces, use `#6C624D`. Keep borders subtle -- they should organize the layout without drawing attention.

Cards and elevated surfaces should use soft shadows or a thin border to create a sense of layering. Avoid heavy drop shadows.

## General Guidance

- Maintain generous whitespace. Let the content breathe.
- Use consistent spacing throughout. Pick an 8px base unit and stick with it.
- Headings should feel bold and prominent. Body text should be comfortable to read at length.
- Interactive elements (links, buttons, toggles) should always use brand colors so they are immediately recognizable.
- Keep the design clean and intentional. Every color, font choice, and spacing decision in this system exists for a reason -- follow it consistently.