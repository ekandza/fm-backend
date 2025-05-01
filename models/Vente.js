const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({
  id_utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  id_client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null },
  produits: [
    {
      id_produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
      quantite: Number,
      prix_unitaire: Number
    }
  ],
  montant_total: Number,
  moyen_paiement: { type: String, enum: ['cash', 'mobile money', 'carte'], default: 'cash' },
  date_vente: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vente', venteSchema);
