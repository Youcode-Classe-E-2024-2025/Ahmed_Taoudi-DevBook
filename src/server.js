const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const booksRoutes = require('./routes/books.routes');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/categories.routes');
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Bienvenue sur DevBook API');
});

app.use('/api/books', booksRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Serveur en cours sur http://127.0.0.1:${PORT}`);
});
