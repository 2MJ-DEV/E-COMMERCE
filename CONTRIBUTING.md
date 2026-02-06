# Contributing Guide

Merci de contribuer a MarchéLocal. Ce guide explique comment travailler proprement dans ce repo.

## Prerequis
- Node.js 20+
- pnpm 9+
- Python 3.11+ (pour apps/ai)
- PostgreSQL local ou distant

## Installation
```bash
pnpm install
```

## Environnement
Creer un fichier `apps/api/.env` avec :
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
PORT=4000
JWT_SECRET="change_me"
```

## Lancer en local
```bash
pnpm dev
```

## Prisma (API)
Le schema est dans `apps/api/prisma/schema.prisma`.

Generer le client Prisma :
```bash
cd apps/api
pnpm prisma generate
```

Appliquer une migration locale :
```bash
cd apps/api
pnpm prisma migrate dev --name <nom>
```

## Conventions de code
- TypeScript pour l'API.
- Preferer des commentaires courts et utiles.
- Garder les noms explicites et coherents en francais ou anglais, mais pas un melange dans le meme fichier.
- Ne pas commiter de secrets.

## Commits
Format conseille :
```
type(scope): message
```
Exemples :
- `feat(api): add cart endpoints`
- `fix(api): handle invalid role`
- `docs: update prisma instructions`

## Tests
Il n'y a pas encore de suite de tests. Si tu ajoutes une fonctionnalite critique, ajoute des tests ou note le besoin dans la doc.

## Pull Requests
- Decrire clairement le changement.
- Ajouter les etapes de verification (commandes et resultats attendus).
- Si migration Prisma, mentionner le nom de migration.
