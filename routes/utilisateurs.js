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



// Connexion
router.post('/login', async (req, res) => {
    try {
        const { nom, password } = req.body;

       
        const user = await Utilisateur.findOne({ nom });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Identifiants incorrects.' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, userId: user._id, nom: user.nom });
    } catch (error) {
        console.error('Erreur de connexion :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
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
