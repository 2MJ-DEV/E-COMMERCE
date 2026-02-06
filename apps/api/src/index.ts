// Framework web principal
import express, { type Request, type Response } from "express";
// Middleware CORS pour les requêtes cross-origin
import cors from "cors";
// Librairie de signature JWT
import jwt from "jsonwebtoken";
// Charge les variables d’environnement depuis .env vers process.env
import "dotenv/config";
// Routeur de health check
import healthRouter from "./routes/health.js";
// Validation des rôles
import { isValidRole } from "./utils/roles.js";

// Crée l’instance Express
const app = express();
// Active CORS pour toutes les routes (à restreindre si besoin)
app.use(cors());
// Parse les corps JSON entrants
app.use(express.json());

// Configuration du port avec fallback
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
// Secret JWT pour signer les tokens (utiliser une valeur forte en prod)
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Monte les routes de santé sur /health
app.use("/health", healthRouter);

// Endpoint login simple qui émet un JWT
app.post("/auth/login", (req: Request, res: Response) => {
  // Extrait les champs attendus du body
  const { email, role } = req.body || {};
  // Validation basique des entrées
  if (!email || !role) {
    return res.status(400).json({ error: "email and role required" });
  }
  // Validation du rôle fourni
  if (!isValidRole(role)) {
    return res.status(401).json({ error: "invalid role" });
  }
  // Crée un JWT signé avec expiration 1h
  const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "1h" });
  // Retourne le token au client
  res.json({ token });
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
