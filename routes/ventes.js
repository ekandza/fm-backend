const express = require('express');
const router = express.Router();
const Vente = require('../models/Vente');

router.post('/', async (req, res) => {
  const vente = new Vente(req.body);
  await vente.save();
  res.status(201).json(vente);
});

router.get('/', async (req, res) => {
  const ventes = await Vente.find().populate('produits.id_produit').populate('id_client');
  res.json(ventes);
});

router.get('/:id', async (req, res) => {
  const vente = await Vente.findById(req.params.id).populate('produits.id_produit');
  res.json(vente);
});

router.delete('/:id', async (req, res) => {
  await Vente.findByIdAndDelete(req.params.id);
  res.json({ message: 'Vente supprimée' });
});

module.exports = router;
