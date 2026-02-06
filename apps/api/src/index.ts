import express from "express";
import cors from "cors";
import "dotenv/config";
import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import adminRouter from "./routes/admin.js";
import sellerRouter from "./routes/seller.js";
import clientRouter from "./routes/client.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/", usersRouter);
app.use("/", adminRouter);
app.use("/", sellerRouter);
app.use("/", clientRouter);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
