// Fabrique de routeur Express
import { Router, type Request, type Response } from "express";

// Crée une instance de routeur pour le health check
const router = Router();

// Endpoint de vie basique
router.get("/", (_req: Request, res: Response) => {
  // Répond avec un payload OK simple
  res.json({ ok: true });
});

// Exporte le routeur pour montage dans l’app principale
export default router;
