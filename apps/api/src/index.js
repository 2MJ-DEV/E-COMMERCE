import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/auth/login", (req, res) => {
  const { email, role } = req.body || {};
  if (!email || !role) {
    return res.status(400).json({ error: "email and role required" });
  }
  const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
