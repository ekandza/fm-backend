const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  id_utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  nom: String,
  telephone: String,
  adresse: String,
  solde: { type: Number, default: 0 },
  date_ajout: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema);
