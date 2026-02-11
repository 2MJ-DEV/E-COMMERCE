import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import { getClient } from "../controllers/test-protected.controller.js";
import { getClientHistory } from "../controllers/client.controller.js";

const router = Router();

router.get("/client", auth, requireRole("client"), getClient);
router.get("/client/history", auth, requireRole("client"), getClientHistory);

export default router;
