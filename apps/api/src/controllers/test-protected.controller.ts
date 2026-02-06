import { type Request, type Response } from "express";

export function getMe(req: Request, res: Response) {
  return res.json({ user: req.user });
}

export function getAdmin(_req: Request, res: Response) {
  return res.json({ ok: true, role: "superadmin" });
}

export function getSeller(_req: Request, res: Response) {
  return res.json({ ok: true, role: "vendeur" });
}

export function getClient(_req: Request, res: Response) {
  return res.json({ ok: true, role: "client" });
}
