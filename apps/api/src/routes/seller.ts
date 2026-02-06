import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import { getSeller } from "../controllers/test-protected.controller.js";

const router = Router();

router.get("/seller", auth, requireRole("vendeur"), getSeller);

export default router;
