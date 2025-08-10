import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from './auth/passport.js';
import authRoutes from '../src/routes/auth.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://inventory-manag-app.netlify.app'],
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());

app.get('/', (_req, res) => res.send('Server is up'));

app.use('/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
