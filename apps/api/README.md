# API (Auth & Routes protégées)

Base URL
- http://localhost:4000

## Variables d'environnement
- `JWT_SECRET` : secret JWT (par défaut `dev-secret` si non défini)

## Rôles
Le backend utilise ces rôles internes :
- `superadmin`
- `vendeur`
- `client`

Compatibilité frontend :
- `admin` ? `superadmin`
- `fournisseur` ? `vendeur`

---

## Auth

### POST /login
Crée un token JWT simple à partir d'un email + rôle.

Body (JSON)
```json
{
  "email": "admin@marketfresh.com",
  "role": "admin"
}
```

Réponse (200)
```json
{
  "token": "<jwt>"
}
```

Erreurs
- 400 si `email` ou `role` manquant
- 401 si `role` invalide

---

## Routes protégées
Toutes les routes protégées nécessitent l'en-tête :
```
Authorization: Bearer <token>
```

### GET /me
Retourne l'utilisateur authentifié.

Réponse (200)
```json
{
  "user": {
    "email": "admin@marketfresh.com",
    "role": "superadmin"
  }
}
```

### GET /admin (ou /superadmin)
Accessible uniquement au rôle `superadmin`.

Réponse (200)
```json
{
  "ok": true,
  "role": "superadmin"
}
```

### GET /seller (ou /fournisseur)
Accessible uniquement au rôle `vendeur`.

Réponse (200)
```json
{
  "ok": true,
  "role": "vendeur"
}
```

### GET /client
Accessible uniquement au rôle `client`.

Réponse (200)
```json
{
  "ok": true,
  "role": "client"
}
```

---

## Scénario complet (login ? route protégée)

1) Login
```bash
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@marketfresh.com","role":"admin"}'
```

2) Utiliser le token sur `/me`
```bash
curl http://localhost:4000/me \
  -H "Authorization: Bearer <token>"
```
