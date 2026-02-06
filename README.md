# MarchéLocal Monorepo

Monorepo pnpm workspaces :
- apps/web (Next.js)
- apps/api (Node.js + Express)
- apps/ai (FastAPI, recommandations mock)

## Requirements
- Node.js 20+
- pnpm 9+
- Python 3.11+

## Install
```bash
pnpm install
```

## Dev
```bash
pnpm dev
```

## Services
- Web: http://localhost:3000
- API: http://localhost:4000
- AI: http://localhost:8000
```

## Auth
JWT avec rôles: superadmin, vendeur, client. OAuth (Google/GitHub) prévu ultérieurement.
