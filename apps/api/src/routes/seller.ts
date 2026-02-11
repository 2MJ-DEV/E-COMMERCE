import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import { getSeller } from "../controllers/test-protected.controller.js";
import { createSellerProduct, listSellerProducts } from "../controllers/seller.controller.js";

const router = Router();

router.get("/seller", auth, requireRole("fournisseur"), getSeller);
router.get("/fournisseur", auth, requireRole("fournisseur"), getSeller);
router.get("/seller/products", auth, requireRole("fournisseur"), listSellerProducts);
router.post("/seller/products", auth, requireRole("fournisseur"), createSellerProduct);
router.get("/fournisseur/produits", auth, requireRole("fournisseur"), listSellerProducts);
router.post("/fournisseur/produits", auth, requireRole("fournisseur"), createSellerProduct);

export default router;
