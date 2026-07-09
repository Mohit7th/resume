# Resume Website Modernization Proposal

## Goal

Modernize the site without replacing its original character. The blue palette,
developer illustration, résumé-as-a-web-app idea, and editable data model can
remain. The redesign should make the strongest information obvious within the
first few seconds and give recruiters a clear path through the page.

The target experience is:

- calm rather than decorative;
- easy to scan before it is read in detail;
- credible and personal rather than template-like;
- usable on mobile, with a keyboard, and with reduced motion;
- focused on the two main actions: reviewing work and making contact.

## What the Current Design Already Gets Right

- The page has a recognizable blue visual identity.
- The developer illustration makes it more personal than a standard résumé.
- Work history, skills, and projects are all represented.
- The résumé PDF and contact action are available immediately.
- Project categories communicate a useful range: web applications, browser
  extensions, and business intelligence.
- Content is data-driven, so layout changes do not require rewriting the
  résumé model.

These are the parts to preserve. The redesign should refine the presentation,
not turn the site into a generic portfolio template.

## Main UX Problems

### 1. The first screen lacks a clear reading order

The hero contains the name, title, email, summary, illustration, three actions,
translucent background, and fixed app bar. These elements compete rather than
forming a clear sequence.

Recommended reading order:

1. Name
2. Specific professional value proposition
3. Short proof statement
4. Primary actions
5. Supporting illustration

For example:

> Mohit Uniyal  
> Full-stack engineer building scalable web apps, browser extensions, and
> data products.  
> 8+ years in software delivery · 5+ years with the MEAN stack

### 2. The background competes with the content

The full-page `liquid-cheese.svg`, fixed background attachment, transparent
cards, and several similar blue tones reduce separation between sections.
The background is memorable, but it should become an accent rather than the
main visual surface.

Use a warm off-white or very pale blue page background. Keep the existing
pattern in one of these places:

- a low-opacity shape inside the hero;
- a narrow band between major sections;
- a subtle footer treatment.

### 3. Important actions look like metadata

`Download CV`, `Contact`, and `Rate` are rendered as outlined chips. Chips
normally indicate filters, status, or categories, so they do not clearly read
as actions.

Use:

- one filled primary button: **View / Download résumé**;
- one outlined secondary button: **Contact me**;
- icon links for GitHub and LinkedIn;
- move website rating out of the hero, or remove it from the public résumé.

Rating the website is not part of a recruiter's main journey and currently
competes with contact and résumé download.

### 4. The content hierarchy is incomplete

`Summary` has a visible label, while work history, skills, and projects rely
mostly on their component layout to explain themselves. Add consistent section
headers and short introductions:

- About
- Selected work
- Experience
- Capabilities
- Contact

This also enables useful in-page navigation.

### 5. Details are hidden too early

All work-history entries start collapsed. This makes the page shorter, but it
also hides the strongest evidence of experience. Show the most recent role
expanded by default, or replace the accordion with a timeline containing the
top three achievements for each role and an optional **Show more** action.

Projects should prioritize outcomes and ownership over screenshots alone.
Each featured project should answer:

- What problem did it solve?
- What did Mohit own?
- What was the technical challenge?
- What changed as a result?

If an exact metric is unavailable, use concrete scope rather than inventing
one, for example: “Automated white-label extension builds for multiple client
brands.”

### 6. The navigation exposes an internal concern

The fixed app bar contains only an avatar and `Admin`. Admin access is useful
to the owner but irrelevant to visitors. It makes the public experience feel
like an application control panel.

Replace it with a compact public header:

- `MU` or the full name on the left;
- Work, Experience, Skills, Contact anchor links;
- a résumé button on the right.

Move admin access to a direct `/admin` route with no public navigation link.

## Proposed Information Architecture

```text
Header
├── Name / monogram
├── Work
├── Experience
├── Skills
├── Contact
└── Résumé button

Hero
├── Role and value proposition
├── Proof line: experience and specializations
├── Résumé + Contact actions
├── GitHub + LinkedIn
└── Existing developer illustration

Selected Work
├── 3 featured case-study cards
└── Filter or "View all projects"

Experience
└── Reverse-chronological timeline

Capabilities
├── Web applications
├── Browser extensions
└── Data / BI

About
└── Short professional narrative

Contact CTA
└── Email + social links

Minimal Footer
```

This order leads with proof. The detailed summary can move below selected work
or become a shorter paragraph in the hero.

## Visual Direction

### Preserve the palette, improve its roles

The current colors can be reorganized into clearer design tokens:

| Role | Suggested value | Use |
| --- | --- | --- |
| Ink | `#17204A` | Headings and high-emphasis text |
| Brand | `#2D336B` | Primary actions and strong accents |
| Brand soft | `#7886C7` | Tags, borders, and illustration accents |
| Surface tint | `#EEF1FA` | Alternate section backgrounds |
| Canvas | `#FCFBFA` | Main page background |
| Text | `#252A3A` | Body copy |
| Muted text | `#62697A` | Dates and supporting metadata |
| Border | `#DCE1EE` | Card and section borders |

Validate final foreground/background combinations against WCAG AA rather than
relying on transparency over an image.

### Typography

Use one deliberately loaded type family. The theme currently declares
`Poppins`, while the package includes Roboto; this can lead to an unintended
fallback. A strong combination would be:

- headings: Poppins, 600–700;
- body: Inter or system UI, 400–500.

Alternatively, use only a system UI stack for faster loading. Keep body text at
least 16px on mobile. The current mobile body size reaches 12px, which is
unnecessarily difficult to read.

Suggested scale:

- hero name: `clamp(2.5rem, 7vw, 5rem)`;
- section title: `clamp(1.75rem, 3vw, 2.5rem)`;
- card title: `1.125rem`;
- body: `1rem`, line-height `1.6`;
- small metadata: `0.875rem`.

### Spacing and width

- Use a content width around `1120px`.
- Give major sections `80–112px` vertical spacing on desktop and `56–72px` on
  mobile.
- Keep paragraphs near `60–70ch`.
- Use a consistent 8px spacing system.
- Prefer borders and background contrast over heavy shadows.
- Use one corner-radius family, such as 12px for controls and 20px for cards.

### Motion

Use restrained motion only to communicate interaction:

- card hover: 2–4px lift, not 5px plus a large shadow;
- button and link transitions: 150–200ms;
- optional one-time hero entrance;
- no parallax or fixed decorative background on mobile;
- honor `prefers-reduced-motion`.

## Component-Level Recommendations

### Header

- Change the fixed bar to a sticky, semi-opaque surface with a subtle bottom
  border.
- Add section anchors and an active-section indicator.
- Collapse links into a simple menu on small screens.
- Keep the header height compact so it does not dominate the viewport.
- Give the logo/name a real button or link instead of a clickable
  `Typography` wrapper.

### Hero

- Use a two-column layout on desktop and a single-column layout on mobile.
- Put content first in DOM order, even if the illustration appears first
  visually on some breakpoints.
- Replace the raw email line with an intentional contact action.
- Use the real profile image only if it supports the desired personal tone;
  otherwise retain `programming.svg` as the signature visual.
- Rename downloaded files predictably, such as
  `Mohit_Uniyal_Resume.pdf`; avoid using the full JavaScript date string.

### Selected Work

- Show three strongest projects first: one web platform, one browser extension,
  and one data/BI project.
- Make the entire card accessible without relying only on `window.open`.
- Add a clear external-link icon and visible destination label.
- Disable or label projects with no public URL instead of opening an empty
  location.
- Replace generic stack labels with 2–4 concise technology tags.
- Use a consistent image ratio and `object-fit: cover`.
- Add `loading="lazy"` and explicit dimensions to below-the-fold images.

Suggested card anatomy:

```text
[Project image]
Category · Year
Project name                         ↗
One-sentence problem and outcome
[Angular] [Node.js] [MongoDB]
Role: Lead full-stack developer
```

### Experience

- Prefer a timeline or stacked role cards over fully collapsed accordions.
- Display company, role, date range, and duration in a stable grid.
- Show 3–5 high-value achievements; hide repetitive tool/process bullets.
- Link company names where appropriate.
- Use actual heading elements so assistive technology can navigate roles.
- If accordions remain, give each panel unique `id` and
  `aria-controls` values.

### Skills

- Rename the section from a generic skill inventory to **Capabilities**.
- Group skills by what can be delivered, not only by technology category.
- Remove low-signal tools such as editors unless they are relevant to the role.
- Avoid treating years as a precise proficiency score.
- Keep technologies as compact tags beneath each capability.

Example:

```text
Web application delivery
Angular · TypeScript · Node.js · Express · MongoDB
Architecture, REST APIs, third-party integrations, mentoring
```

On mobile, make tabs horizontally scrollable or replace them with stacked
sections. Centered tabs with long labels are likely to crowd narrow screens.

### About / Summary

- Reduce the long summary to 3–4 sentences.
- Replace repeated years-of-experience statements with a single proof line.
- Emphasize specialization, ownership, and the kinds of problems solved.
- Keep line length constrained for comfortable reading.

### Contact and Footer

- Add a clear closing CTA before the footer: “Have a relevant role or project?
  Let’s talk.”
- Offer email, LinkedIn, and GitHub together.
- Add accessible names to icon-only links.
- Add `rel="noopener noreferrer"` to external links.
- Simplify the footer to name, current year, and social links. “Built with
  React” can remain as a small personal detail, but should not be the primary
  footer message.

## Accessibility and UX Requirements

Treat these as acceptance criteria, not optional polish:

- Use semantic landmarks: `header`, `nav`, `main`, `section`, and `footer`.
- Maintain one `h1`, then a logical heading order.
- Provide a skip-to-content link.
- Ensure every interactive element has a visible keyboard focus state.
- Ensure icon-only links have accessible names.
- Ensure tab panels use `role="tabpanel"` and are connected to their tabs.
- Use unique accordion control IDs.
- Never rely on hover to reveal essential information.
- Meet WCAG AA color contrast.
- Keep touch targets at least 44×44px where practical.
- Test at 320px width and at 200% browser zoom.
- Respect reduced-motion preferences.
- Do not reduce mobile body text below 16px for primary content.

## Content Improvements That Will Have More Impact Than Decoration

- Lead each project description with a strong verb and a result.
- Correct spelling and consistency issues before redesign:
  `responsibilities`, `real estate`, `maintenance`, `packages`, `multiple`,
  `QlikView`, `GitHub`, and singular/plural forms such as “1 year.”
- Use consistent punctuation in all achievement bullets.
- Update skill experience values that may age quickly, or calculate them from
  dates.
- Remove duplicate or low-signal skill entries.
- Verify every external project link and handle private/unavailable work
  explicitly.
- Add dates or project context where visitors may otherwise assume old work is
  current.
- Consider a small “Currently” line for the role, learning focus, or
  availability, but only if it will be maintained.

## Recommended Implementation Phases

### Phase 1 — High impact, low risk

1. Replace the busy page background with a calm canvas and retain the pattern
   only in the hero.
2. Redesign the hero hierarchy and convert action chips to buttons/links.
3. Remove Admin and Rate from the primary public journey.
4. Add consistent section headings and anchor navigation.
5. Fix typography loading, mobile font sizes, and color contrast.
6. Correct content and broken/empty project-link behavior.

### Phase 2 — Stronger portfolio narrative

1. Introduce a selected-work section with three featured projects.
2. Rewrite project cards around problem, ownership, and outcome.
3. Convert work history into an expanded timeline or role-card layout.
4. Reframe the skills inventory as capability groups.
5. Add the closing contact CTA.

### Phase 3 — Polish and validation

1. Add subtle motion with reduced-motion support.
2. Optimize images and remove unused assets/styles.
3. Test keyboard navigation, screen-reader labels, 200% zoom, and narrow mobile
   layouts.
4. Measure Lighthouse accessibility, performance, and layout shift.
5. Add lightweight tests for navigation, project links, résumé download, tabs,
   and accordions.

## Definition of Done

The redesign is successful when:

- a visitor can identify the role, experience level, and specializations from
  the first viewport;
- résumé download and contact are the two most obvious actions;
- three strong examples of work are discoverable without opening tabs or
  accordions;
- the page remains recognizable as the original blue, illustration-led idea;
- all core content is usable with keyboard navigation and at mobile widths;
- no public-facing control exposes internal administration;
- typography, spacing, colors, cards, and section headers use shared theme
  tokens instead of one-off styles.

