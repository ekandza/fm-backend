const mongoose = require('mongoose');

const tresorerieSchema = new mongoose.Schema({
  id_utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  type: { type: String, enum: ['entrée', 'sortie'], required: true },
  montant: Number,
  motif: String,
  date_operation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tresorerie', tresorerieSchema);
