const service = require('../services/categories.service');


exports.index = async (req, res) => {
  try {
    const categories = await service.all();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.show = async (req, res) => {
  try {
    const category = await service.getById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.store = async (req, res) => {
  try {
    const result = await service.create(req.body);
    const category = await service.getById(result.insertId);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    const result = await service.update(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    const category = await service.getById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const result = await service.delete(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.json({ message: 'Catégorie supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
