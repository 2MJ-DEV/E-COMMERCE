// Fabrique de routeur Express
import { Router } from "express";

// Crée une instance de routeur pour le health check
const router = Router();

// Endpoint de vie basique
router.get("/", (_req, res) => {
  // Répond avec un payload OK simple
  res.json({ ok: true });
});

// Exporte le routeur pour montage dans l’app principale
export default router;
