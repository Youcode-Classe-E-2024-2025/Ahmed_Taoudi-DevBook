const express = require('express');
const router = express.Router();
const controller = require('../controllers/books.controller');
const upload = require('../middleware/upload');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.post('/', upload.single('image'), controller.store);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;