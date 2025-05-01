const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');

router.post('/', async (req, res) => {
  try {
    const utilisateur = new Utilisateur(req.body);
    await utilisateur.save();
    res.status(201).json(utilisateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const utilisateurs = await Utilisateur.find();
  res.json(utilisateurs);
});

router.get('/:id', async (req, res) => {
  const utilisateur = await Utilisateur.findById(req.params.id);
  res.json(utilisateur);
});

router.put('/:id', async (req, res) => {
  const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(utilisateur);
});

router.delete('/:id', async (req, res) => {
  await Utilisateur.findByIdAndDelete(req.params.id);
  res.json({ message: 'Utilisateur supprimé' });
});

module.exports = router;
