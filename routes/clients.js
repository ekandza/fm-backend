const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.post('/', async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.status(201).json(client);
});

router.get('/', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

router.get('/:id', async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.json(client);
});

router.put('/:id', async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(client);
});

router.delete('/:id', async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: 'Client supprimé' });
});

module.exports = router;
