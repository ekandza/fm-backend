const express = require('express');
const router = express.Router();
const Tresorerie = require('../models/Tresorerie');

router.post('/', async (req, res) => {
  const operation = new Tresorerie(req.body);
  await operation.save();
  res.status(201).json(operation);
});

router.get('/', async (req, res) => {
  const operations = await Tresorerie.find();
  res.json(operations);
});

router.get('/:id', async (req, res) => {
  const operation = await Tresorerie.findById(req.params.id);
  res.json(operation);
});

router.delete('/:id', async (req, res) => {
  await Tresorerie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Opération supprimée' });
});

module.exports = router;
