# Documentation — Suivi des Issues

Ce fichier résume ce qui est réalisé après chaque issue et sert de journal de progression.

---

## Issue 1 — Setup API Express (base)
**Statut :** Terminé

**Ce qui a été fait :**
- Initialisation de l’API Express avec CORS et JSON.
- Route de santé `GET /health` mise en place.
- Déplacement de la route de santé dans un routeur dédié.
- Ajout de commentaires en français dans le code.

**Fichiers modifiés/créés :**
- `apps/api/src/index.js`
- `apps/api/src/routes/health.js`
- `apps/api/.env.example`

**Comment tester :**
```bash
cd apps/api
pnpm dev
```
Puis :
- `GET http://localhost:4000/health` → `{ "ok": true }`

---

## Issue 2 — Modèle User + rôles (PostgreSQL via Prisma)
**Statut :** Terminé

**Ce qui a été fait :**
- Ajout de Prisma `6.19.2` et `@prisma/client`.
- Création du schéma Prisma avec le modèle `User`.
- Ajout d’une utilitaire de rôles (`isValidRole`).
- Ajout de `DATABASE_URL` dans `.env.example`.
- Ajout de la migration initiale Prisma.
- Ajout de scripts Prisma dans `apps/api/package.json`.

**Fichiers modifiés/créés :**
- `apps/api/package.json`
- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/migrations/migration_lock.toml`
- `apps/api/prisma/migrations/20260206160000_init/migration.sql`
- `apps/api/src/utils/roles.js`
- `apps/api/.env.example`

**Comment appliquer la migration :**
```bash
cd apps/api
pnpm install
pnpm prisma:migrate --name init
```

---

## Migration TypeScript (API)
**Statut :** Terminé

**Ce qui a été fait :**
- Conversion des fichiers API en TypeScript.
- Ajout de `tsconfig.json`.
- Mise à jour des scripts (`dev`, `build`, `start`) pour TypeScript.
- Ajout des types et dépendances Prisma.

**Fichiers modifiés/créés :**
- `apps/api/src/index.ts`
- `apps/api/src/routes/health.ts`
- `apps/api/src/utils/roles.ts`
- `apps/api/tsconfig.json`
- `apps/api/package.json`
- `apps/api/.gitignore`

**Comment lancer :**
```bash
cd apps/api
pnpm install
pnpm dev
```

---

## Modèle Marketplace (v2 minimal + extensions)
**Statut :** Terminé (schéma Prisma, migration à appliquer)

**Ce qui a été fait :**
- Extension du schéma Prisma pour la marketplace (produits, panier, commandes).
- Ajout des entités avancées : adresses, paiements, livraison, images produit, avis.
- Ajout des enums : `ProductCategory`, `ProductUnit`, `OrderStatus`, `PaymentStatus`, `PaymentProvider`, `ShipmentStatus`, `AddressType`, `Currency`.

**Fichiers modifiés/créés :**
- `apps/api/prisma/schema.prisma`

**Comment appliquer la migration :**
```bash
cd apps/api
pnpm prisma migrate dev --name marketplace_full
pnpm prisma generate
```
