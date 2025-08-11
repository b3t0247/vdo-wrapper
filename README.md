# VDO Wrapper 🎥

A wrapper for [VDO.Ninja](https://vdo.ninja), built with Next.js, Tailwind CSS, and TypeScript.  
This is a work in progress and currently in beta testing.

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

Then visit http://localhost:3000/[locale]/dashboard to access the dashboard.

## 📁 Project Structure ()

```bash
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                      # Root layout with ThemeProvider
│   └── [locale]/                       # Locale-based routing (i18n)
│       ├── api/                        # Placeholder for API routes (future use)
│       ├── dashboard/
│       │   └── page.tsx                # Main dashboard UI
│       ├── layout.tsx                  # Shared layout for locale routes
│       ├── page.tsx                    # Login page
│       ├── room/
│       │   └── [id]/
│       │       └── page.tsx            # Dynamic room viewer using VDO.Ninja iframe
│       └── tailwind-preview/
│           └── page.tsx                Tailwind style sandbox (not VDO-related)
├── components/
│   ├── RoomControls.tsx                # Host/guest controls (layout, overlays, mock guests)
│   ├── SceneLayout.tsx                 # Layout manager for stream scenes (grid/solo)
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx                # Dark/light mode toggle
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── language-switcher.tsx       # Locale switcher
│   └── VdoEmbed.tsx                    # VDO.Ninja iframe wrapper component
├── i18n/
│   ├── config.ts                       # next-intl configuration
│   ├── navigation.ts                   # Localized navigation labels
│   ├── request.ts                      # i18n helper utilities
│   └── routing.ts                      # Locale-aware routing logic
├── lib/
│   ├── useClipboard.ts                 # Clipboard utility for copying VDO links
│   ├── utils.ts                        # General-purpose utilities
│   ├── vdoConfig.ts                    # VDO.Ninja URL builder (push/view links)
│   ├── vdoLanguageMap.ts               # Language mapping for VDO labels
│   └── vdoParams.ts                    # Optional: builds VDO.Ninja URLs with custom params
├── locales/
│   ├── en.json                         # English translations (includes VDO labels)
│   └── es.json                         # Spanish translations
├── middleware.ts                       # Middleware for locale routing
└── types/
    └── vdo.d.ts                        # Optional: types for VDO peers, roles, and config
```
