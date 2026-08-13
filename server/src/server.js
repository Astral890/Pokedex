import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../data/db.json');
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'pokedex-secret';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

async function readDb() {
  try {
    return JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  } catch {
    const initial = { users: [], collections: [] };
    await writeDb(initiRal);
    return initial;
  }
}

async function writeDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

function createToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '2h' });
}

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  console.log(req.headers.authorization);
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token requerido.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Sesión inválida o expirada.' });
  }
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'PokéDex API' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password || password.length < 6) {
    return res.status(400).json({ message: 'Nombre, correo y contraseña de al menos 6 caracteres son requeridos.' });
  }
  const normalizedEmail = email.trim().toLowerCase();
  const db = await readDb();
  if (db.users.some((user) => user.email === normalizedEmail)) {
    return res.status(409).json({ message: 'El correo ya está registrado.' });
  }
  const user = {
    id: uuid(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  await writeDb(db);
  res.status(201).json({ token: createToken(user), user: publicUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const db = await readDb();
  const user = db.users.find((item) => item.email === String(email || '').trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
  }
  res.json({ token: createToken(user), user: publicUser(user) });
});

app.get('/api/auth/me', auth, async (req, res) => {
  const db = await readDb();
  const user = db.users.find((item) => item.id === req.user.sub);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
  res.json({ user: publicUser(user) });
});

app.get('/api/collection', auth, async (req, res) => {
  const db = await readDb();
  res.json({ items: db.collections.filter((item) => item.userId === req.user.sub) });
});

app.post('/api/collection', auth, async (req, res) => {
  const { pokemonId, name, image, types, note = '', favorite = false } = req.body;
  if (!pokemonId || !name) return res.status(400).json({ message: 'pokemonId y name son requeridos.' });
  const db = await readDb();
  const existing = db.collections.find((item) => item.userId === req.user.sub && item.pokemonId === Number(pokemonId));
  if (existing) return res.status(409).json({ message: 'Ese Pokémon ya está en tu colección.' });
  const item = {
    id: uuid(), userId: req.user.sub, pokemonId: Number(pokemonId), name,
    image: image || '', types: Array.isArray(types) ? types : [],
    note: String(note).slice(0, 500), favorite: Boolean(favorite), createdAt: new Date().toISOString()
  };
  db.collections.push(item);
  await writeDb(db);
  res.status(201).json({ item });
});

app.put('/api/collection/:id', auth, async (req, res) => {
  const db = await readDb();
  const item = db.collections.find((entry) => entry.id === req.params.id && entry.userId === req.user.sub);
  if (!item) return res.status(404).json({ message: 'Elemento no encontrado.' });
  if (req.body.note !== undefined) item.note = String(req.body.note).slice(0, 500);
  if (req.body.favorite !== undefined) item.favorite = Boolean(req.body.favorite);
  await writeDb(db);
  res.json({ item });
});

app.delete('/api/collection/:id', auth, async (req, res) => {
  const db = await readDb();
  const before = db.collections.length;
  db.collections = db.collections.filter((item) => !(item.id === req.params.id && item.userId === req.user.sub));
  if (db.collections.length === before) return res.status(404).json({ message: 'Elemento no encontrado.' });
  await writeDb(db);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`PokéDex API: http://localhost:${PORT}`));
