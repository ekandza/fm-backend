const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');

router.post('/', async (req, res) => {
  const produit = new Produit(req.body);
  await produit.save();
  res.status(201).json(produit);
});

router.get('/', async (req, res) => {
  const produits = await Produit.find();
  res.json(produits);
});

router.get('/:id', async (req, res) => {
  const produit = await Produit.findById(req.params.id);
  res.json(produit);
});

router.put('/:id', async (req, res) => {
  const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(produit);
});

router.delete('/:id', async (req, res) => {
  await Produit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Produit supprimé' });
});

module.exports = router;
