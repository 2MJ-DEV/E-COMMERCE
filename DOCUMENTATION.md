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

