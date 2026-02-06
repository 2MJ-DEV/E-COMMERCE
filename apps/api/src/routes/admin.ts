import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import { getAdmin } from "../controllers/test-protected.controller.js";

const router = Router();

router.get("/admin", auth, requireRole("superadmin"), getAdmin);

export default router;
