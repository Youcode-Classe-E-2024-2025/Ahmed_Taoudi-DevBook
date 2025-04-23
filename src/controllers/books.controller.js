const booksService = require('../services/books.service')

exports.index = async (req, res) => {
    try {
        const books = await booksService.all();
        res.json(books);
    } catch (error) {
        res.status(500).json({ 'error': error.message });
    }
}

exports.show = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await booksService.getById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé.' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.store = async (req, res) => {
    const { title, author, date_publication, category_id } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("controller : ",{ title, author, image, date_publication, category_id });
    try {
        const result = await booksService.create({ title, author, image,  date_publication, category_id });
        
        const book = await booksService.getById(result.insertId);
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, author, date_publication, category_id } = req.body;
    try {
        const result = await booksService.update(id, { title, author, date_publication, category_id });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Livre introuvable.' });
        }
        const updatedBook = await booksService.getById(id);
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await booksService.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Livre introuvable.' });
        }
        res.json({ message: 'Livre supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};