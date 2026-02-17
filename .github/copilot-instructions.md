# UrgentCare Indy Rebuild Project Instructions

## 🏗️ Core Tech Stack
- Framework: Next.js 15 (App Router)
- CMS: Payload CMS 3.0 (Integrated into Next.js)
- Database: Neon Postgres
- UI: Tailwind CSS v4, shadcn/ui, Lucide React icons
- Deployment: Vercel

## 🏥 Clinical & Marketing Pipeline
- Lead Nurturing: Any partial form data (Name/Email) must sync to Mailchimp via a Payload 'afterChange' hook.
- Clinical Data: Full patient intake must sync to iSalus (OfficeEMR) via a Next.js Server Action.
- Security: PHI (Protected Health Information) must never be logged or stored in cleartext. Use server-side fetch only for iSalus keys.

## ✍️ Coding Standards
- Use TypeScript for all files.
- Use 'server-only' for EMR integration logic.
- Follow shadcn/ui patterns for forms and accessibility (WCAG 2.1).
- Prioritize Incremental Static Regeneration (ISR) for pages like "Wait Times."
