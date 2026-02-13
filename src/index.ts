import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders';

const app = express();
app.use(cors());
app.use(express.json());

// Route principale des commandes
app.use('/orders', ordersRouter);

// Route de test
app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`✅ API démarrée sur http://localhost:${PORT}`));
