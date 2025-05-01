const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  id_utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  nom_produit: String,
  categorie: String,
  prix_achat: Number,
  prix_vente: Number,
  stock_actuel: Number,
  seuil_alerte: Number,
  date_ajout: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produit', produitSchema);
