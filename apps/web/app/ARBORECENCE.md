```bash
web/
├─ app/
│  ├─ (public)/                     # Site public (SEO)
│  │  ├─ layout.tsx                  # Layout public (navbar + footer)
│  │  ├─ page.tsx                    # Home
│  │  ├─ marketplace/
│  │  │  ├─ page.tsx                 # Liste produits + filtres
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx              # Détail produit
│  │  ├─ fournisseurs/
│  │  │  ├─ page.tsx                 # Liste fournisseurs
│  │  │  └─ [id]/
│  │  │     └─ page.tsx              # Profil fournisseur public
│  │  ├─ comment-ca-marche/
│  │  │  └─ page.tsx
│  │  ├─ a-propos/
│  │  │  └─ page.tsx
│  │  └─ contact/
│  │     └─ page.tsx
│  │
│  ├─ (auth)/                       # Auth (accessible à tous)
│  │  ├─ layout.tsx                  # Layout auth (simple)
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  ├─ register/
│  │  │  └─ page.tsx
│  │  └─ forgot-password/
│  │     └─ page.tsx
│  │
│  ├─ (dash)/                       # Zone privée (après login)
│  │  ├─ layout.tsx                  # Layout commun dashboard (sidebar container)
│  │  │
│  │  ├─ client/                    # Dashboard Client
│  │  │  ├─ layout.tsx              # Sidebar client
│  │  │  ├─ page.tsx                # Overview
│  │  │  ├─ panier/
│  │  │  │  └─ page.tsx
│  │  │  ├─ commandes/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [id]/page.tsx
│  │  │  ├─ adresses/
│  │  │  │  └─ page.tsx
│  │  │  └─ profil/
│  │  │     └─ page.tsx
│  │  │
│  │  ├─ fournisseur/               # Dashboard Fournisseur
│  │  │  ├─ layout.tsx              # Sidebar fournisseur
│  │  │  ├─ page.tsx                # Overview
│  │  │  ├─ produits/
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ new/page.tsx
│  │  │  │  └─ [id]/edit/page.tsx
│  │  │  ├─ commandes/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [id]/page.tsx
│  │  │  ├─ stock/
│  │  │  │  └─ page.tsx
│  │  │  ├─ boutique/
│  │  │  │  └─ page.tsx
│  │  │  └─ profil/
│  │  │     └─ page.tsx
│  │  │
│  │  └─ admin/                     # Dashboard Admin
│  │     ├─ layout.tsx              # Sidebar admin
│  │     ├─ page.tsx                # Overview
│  │     ├─ utilisateurs/
│  │     │  └─ page.tsx
│  │     ├─ fournisseurs/
│  │     │  └─ page.tsx
│  │     ├─ produits/
│  │     │  └─ page.tsx
│  │     ├─ commandes/
│  │     │  └─ page.tsx
│  │     └─ settings/
│  │        └─ page.tsx
│  │
│  ├─ api/                          # Route handlers (Next API)
│  │  ├─ auth/
│  │  │  └─ route.ts
│  │  ├─ products/
│  │  │  └─ route.ts
│  │  └─ orders/
│  │     └─ route.ts
│  │
│  ├─ layout.tsx                    # Root layout (fonts, providers)
│  ├─ globals.css
│  └─ not-found.tsx
│
├─ components/
│  ├─ ui/                           # Buttons, inputs, cards...
│  ├─ shared/                       # Navbar, Footer, SearchBar...
│  ├─ marketplace/                  # ProductCard, Filters...
│  └─ dashboards/
│     ├─ client/
│     ├─ fournisseur/
│     └─ admin/
│
├─ lib/
│  ├─ auth/                         # getSession, permissions...
│  ├─ db/                           # prisma client (si tu utilises Prisma)
│  ├─ validations/                  # zod schemas
│  └─ utils.ts
│
├─ services/                        # appels API, fetchers (ex: productsService)
├─ types/
├─ public/
└─ middleware.ts                    # protection routes par role
```