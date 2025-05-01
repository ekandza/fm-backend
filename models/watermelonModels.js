// watermelonModels.js
import { tableSchema } from '@nozbe/watermelondb';

export const utilisateurSchema = tableSchema({
  name: 'utilisateurs',
  columns: [
    { name: 'nom', type: 'string' },
    { name: 'prenom', type: 'string' },
    { name: 'email', type: 'string', isIndexed: true },
    { name: 'mot_de_passe', type: 'string' },
    { name: 'role', type: 'string' }, // admin, user, etc
    { name: 'statut', type: 'string' }, // actif/inactif
  ],
});

export const produitSchema = tableSchema({
  name: 'produits',
  columns: [
    { name: 'nom', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'prix', type: 'number' },
    { name: 'stock', type: 'number' },
    { name: 'categorie', type: 'string' },
  ],
});

export const clientSchema = tableSchema({
  name: 'clients',
  columns: [
    { name: 'nom', type: 'string' },
    { name: 'telephone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'adresse', type: 'string' },
  ],
});

export const tresorerieSchema = tableSchema({
  name: 'tresoreries',
  columns: [
    { name: 'date', type: 'string' },
    { name: 'montant', type: 'number' },
    { name: 'type', type: 'string' }, // entree ou sortie
    { name: 'description', type: 'string' },
  ],
});
