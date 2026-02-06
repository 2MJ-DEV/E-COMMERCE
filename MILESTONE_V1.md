# Milestone v1 — Auth JWT (API)

Ce document décrit les issues v1, les étapes et les livrables attendus. Le frontend sera connecté ensuite par une autre personne. L’objectif v1 est **uniquement l’auth JWT et la sécurisation d’API**.

## Portée v1 (in-scope)
- API Node.js + Express
- Auth JWT (login)
- Middleware d’auth et de rôles
- Routes protégées de test
- Documentation + Postman

## Hors portée v1 (out-of-scope)
- Base de données
- Inscription utilisateur
- Paiement, panier, produits
- OAuth Google/GitHub (préparé mais pas implémenté)

---

## Issue 1 — Setup API Express (base)
**Objectif :** Initialiser l’API `apps/api` avec les middlewares et la route santé.

**Étapes :**
1. Créer la structure `apps/api/src`.
2. Ajouter Express + CORS + JSON body parser.
3. Créer `GET /health` qui retourne `{ ok: true }`.
4. Charger `.env` et exposer `PORT`.

**Livrables :**
- `apps/api/src/index.js`
- `apps/api/.env.example`

**Critères d’acceptation :**
- L’API démarre sur `http://localhost:4000`.
- `GET /health` retourne `{ ok: true }`.
- `.env.example` contient `PORT` et `JWT_SECRET`.

---

## Issue 2 — Modèle User + rôles (PostgreSQL via Prisma)
**Objectif :** Mettre en place un modèle utilisateur persistant avec Prisma (PostgreSQL) et la gestion des rôles.

**Étapes :**
1. Ajouter Prisma `6.19.2` dans `apps/api` et configurer la connexion PostgreSQL.
2. Définir le modèle `User` (id, email, role, createdAt, updatedAt).
3. Valider les rôles autorisés: `superadmin`, `vendeur`, `client`.
4. Préparer une fonction utilitaire `isValidRole(role)`.
5. Préparer une migration initiale.

**Livrables :**
- `apps/api/prisma/schema.prisma`
- `apps/api/src/utils/roles.js`
- Migration Prisma initiale

**Critères d’acceptation :**
- Prisma `6.19.2` installé et opérationnel.
- Base PostgreSQL configurée via `DATABASE_URL`.
- Le modèle `User` existe dans la DB.
- Les rôles sont limités aux 3 valeurs définies.
- Une fonction de validation est utilisée par les endpoints.

---

## Issue 3 — Endpoint login JWT
**Objectif :** Implémenter l’authentification via JWT.

**Étapes :**
1. Créer `POST /auth/login`.
2. Valider `email` et `role` dans le body.
3. Générer un JWT signé avec `JWT_SECRET`, expiration 1h.
4. Retourner `{ token }` en cas de succès.

**Livrables :**
- Route `POST /auth/login`
- Validation d’inputs

**Critères d’acceptation :**
- 400 si `email` ou `role` manquant.
- 401 si `role` invalide.
- Token JWT valide avec expiration 1h.

---

## Issue 4 — Middleware JWT + Guard de rôles
**Objectif :** Protéger des routes via un middleware d’auth et un guard de rôle.

**Étapes :**
1. Créer middleware `auth` qui lit `Authorization: Bearer <token>`.
2. Vérifier le JWT et attacher l’utilisateur au `req.user`.
3. Créer `requireRole(...roles)` pour filtrer l’accès.

**Livrables :**
- `apps/api/src/middleware/auth.js`
- `apps/api/src/middleware/requireRole.js`

**Critères d’acceptation :**
- 401 si token absent ou invalide.
- 403 si rôle insuffisant.
- Middleware réutilisable.

---

## Issue 5 — Routes protégées de test
**Objectif :** Fournir des routes simples pour tester la sécurité.

**Étapes :**
1. Créer `GET /me` (auth requise).
2. Créer `GET /admin` (superadmin uniquement).
3. Créer `GET /seller` (vendeur uniquement).
4. Créer `GET /client` (client uniquement).

**Livrables :**
- Routes protégées dans `apps/api/src/index.js` ou routes séparées.

**Critères d’acceptation :**
- `/me` retourne l’utilisateur authentifié.
- `/admin` accessible seulement superadmin.
- `/seller` accessible seulement vendeur.
- `/client` accessible seulement client.

---

## Issue 6 — Documentation + Postman
**Objectif :** Documenter l’API d’auth et fournir un fichier Postman.

**Étapes :**
1. Rédiger un README API avec exemples de requêtes.
2. Créer une collection Postman (JSON) : login + routes protégées.
3. Ajouter les variables d’environnement (host, token).

**Livrables :**
- `apps/api/README.md`
- `apps/api/docs/postman_collection.json`

**Critères d’acceptation :**
- README contient les endpoints et exemples.
- Collection Postman exécutable.
- Scénario complet : login → route protégée.

---

# Milestone v2 — Catalogue & Commandes (MVP)

Cette version apporte les premières fonctionnalités métier. Les issues sont volontairement petites et indépendantes.

## Portée v2 (in-scope)
- Catalogue légumes
- Panier basique
- Commandes simples
- Viande + chaîne du froid + poids variable

---

## Issue 1 — Modèle Produit (Légumes)
**Objectif :** Créer le modèle produit pour la catégorie légumes.

**Étapes :**
1. Ajouter un modèle `Product` (name, price, category, stock, unit).
2. Fixer `category = LEGUME` pour cette version.
3. Préparer la migration Prisma.

**Livrables :**
- `apps/api/prisma/schema.prisma`
- Migration Prisma

**Critères d’acceptation :**
- Le modèle `Product` existe dans la DB.
- Les produits légumes peuvent être créés via Prisma (seed ou script).

---

## Issue 2 — Endpoints Catalogue Légumes
**Objectif :** Exposer un catalogue public des légumes.

**Étapes :**
1. `GET /products?category=legume`
2. Pagination simple (limit/offset).

**Livrables :**
- Routes catalogue

**Critères d’acceptation :**
- La route retourne uniquement les légumes.
- Pagination fonctionnelle.

---

## Issue 3 — Modèle Panier (Basique)
**Objectif :** Modéliser un panier minimal par utilisateur.

**Étapes :**
1. Ajouter `Cart` et `CartItem` (userId, productId, quantity).
2. Migration Prisma.

**Livrables :**
- `apps/api/prisma/schema.prisma`
- Migration Prisma

**Critères d’acceptation :**
- Un user peut avoir un panier.
- Les items référencent un produit.

---

## Issue 4 — API Panier (Basique)
**Objectif :** Ajouter et lister des items du panier.

**Étapes :**
1. `POST /cart/items` (productId, quantity)
2. `GET /cart`
3. `DELETE /cart/items/:id`

**Livrables :**
- Routes panier

**Critères d’acceptation :**
- Ajout et suppression fonctionnels.
- Retourne le panier courant.

---

## Issue 5 — Modèle Commande (Simple)
**Objectif :** Créer un modèle de commande sans paiement.

**Étapes :**
1. `Order` (userId, total, status)
2. `OrderItem` (orderId, productId, quantity, price)
3. Migration Prisma.

**Livrables :**
- `apps/api/prisma/schema.prisma`
- Migration Prisma

**Critères d’acceptation :**
- Une commande peut être créée depuis le panier.
- `status` = `PENDING` par défaut.

---

## Issue 6 — Endpoint Commande Simple
**Objectif :** Créer une commande à partir du panier.

**Étapes :**
1. `POST /orders` (transforme le panier en commande)
2. `GET /orders` (liste par user)

**Livrables :**
- Routes commandes

**Critères d’acceptation :**
- La commande est persistée.
- Le panier est vidé après création.

---

## Issue 7 — Modèle Viande + Chaîne du froid + Poids variable
**Objectif :** Étendre le modèle produit pour la viande.

**Étapes :**
1. Ajouter `category = VIANDE`.
2. Ajouter `minWeight`, `maxWeight` (ex: 450g–550g).
3. Ajouter `coldChainRequired = true` et `maxTempC`.
4. Migration Prisma.

**Livrables :**
- `apps/api/prisma/schema.prisma`
- Migration Prisma

**Critères d’acceptation :**
- La viande supporte le poids variable.
- Les champs chaîne du froid sont stockés.

---

## Issue 8 — Catalogue Viande
**Objectif :** Exposer la viande dans le catalogue public.

**Étapes :**
1. Étendre `GET /products` pour `category=viande`.
2. Renvoyer `minWeight`, `maxWeight`, `maxTempC`.

**Livrables :**
- Routes catalogue mises à jour

**Critères d’acceptation :**
- La viande est listée séparément.
- Les infos chaîne du froid sont présentes.

---

## Issue 9 — FastAPI (IA Recommandation) — Service minimal
**Objectif :** Mettre en place un service IA minimal en FastAPI pour fournir des recommandations mock.

**Étapes :**
1. Créer le service `apps/ai` avec FastAPI.
2. Ajouter `GET /health`.
3. Ajouter `GET /recommendations?user_id=...` (réponse mock).
4. Documenter le lancement local (`uvicorn`).

**Livrables :**
- `apps/ai/app/main.py`
- `apps/ai/README.md`

**Critères d’acceptation :**
- `GET /health` retourne `{ ok: true }`.
- `GET /recommendations` retourne une liste mock cohérente.
