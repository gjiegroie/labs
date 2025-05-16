const express = require('express');
const path = require('path');
const { cities } = require('./server/cityData');
const { processCities } = require('./server/cityProcessor');

const app = express();
const publicPath = path.join(__dirname, 'public');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.use(express.static(publicPath));

app.get('/api/cities', (req, res) => {
  res.json({
    original: cities,
    processed: processCities(cities)
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
