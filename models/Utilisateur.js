const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  telephone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  mot_de_passe: String,
  entreprise: String,
  date_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
