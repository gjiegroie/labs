import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const dataDir = path.resolve('data');
const files = {
  original: path.join(dataDir, 'cities_original.json'),
  fixed: path.join(dataDir, 'cities_fixed.json'),
};

await fs.mkdir(dataDir, { recursive: true });

app.put('/api/cities/original', async (req, res) => {
  try {
    await fs.writeFile(files.original, JSON.stringify(req.body, null, 2));
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/cities/fix', async (req, res) => {
  try {
    const fixed = req.body.map((c) =>
      c.trim().replace(/^./, (ch) => ch.toUpperCase())
    ).sort((a, b) => a.localeCompare(b, 'ru'));
    await fs.writeFile(files.fixed, JSON.stringify(fixed, null, 2));
    res.json(fixed);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/cities/:type', async (req, res) => {
  try {
    const f = files[req.params.type];
    if (!f) return res.sendStatus(404);
    const content = await fs.readFile(f, 'utf-8').catch(() => '[]');
    res.json(JSON.parse(content || '[]'));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () =>
  console.log(`✓ Сервер запущен на http://localhost:${PORT}`)
);
