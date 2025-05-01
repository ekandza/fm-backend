const express = require('express');
const router = express.Router();
const Vente = require('../models/Vente');
const Produit = require('../models/Produit');
const Client = require('../models/Client');
const Tresorerie = require('../models/Tresorerie');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const path = require('path');

// 📄 Helper pour générer des dates
const buildDateFilter = (req) => {
  const { date_debut, date_fin } = req.query;
  if (date_debut && date_fin) {
    return { $gte: new Date(date_debut), $lte: new Date(date_fin) };
  }
  return {}; // Aucun filtre
};

// 🧾 Export VENTES en PDF
router.get('/ventes/pdf', async (req, res) => {
  try {
    const dateFilter = buildDateFilter(req);
    const ventes = await Vente.find({ date_vente: dateFilter }).populate('produits.id_produit');

    const doc = new PDFDocument({ margin: 30 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ventes.pdf');
    doc.pipe(res);

    // Ajouter un logo
    const logoPath = path.join(__dirname, '../public/logo.png');
    doc.image(logoPath, { fit: [100, 100], align: 'center' }).moveDown(1);

    doc.fontSize(18).fillColor('#333').text('Liste des Ventes', { align: 'center' }).moveDown(2);

    ventes.forEach((vente, i) => {
      doc.fontSize(12).fillColor('black').text(`Vente #${i + 1} - ${vente.date_vente.toLocaleDateString()}`, { underline: true });
      vente.produits.forEach(p => {
        doc.text(`- ${p.id_produit.nom_produit} x ${p.quantite} @ ${p.prix_unitaire} = ${p.quantite * p.prix_unitaire} FCFA`);
      });
      doc.text(`Total: ${vente.montant_total} FCFA\n`).moveDown();
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📊 Export VENTES en EXCEL
router.get('/ventes/excel', async (req, res) => {
  try {
    const dateFilter = buildDateFilter(req);
    const ventes = await Vente.find({ date_vente: dateFilter }).populate('produits.id_produit');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ventes');

    worksheet.columns = [
      { header: 'Date Vente', key: 'date', width: 20 },
      { header: 'Produit', key: 'produit', width: 30 },
      { header: 'Quantité', key: 'quantite', width: 10 },
      { header: 'Prix Unitaire', key: 'prix_unitaire', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
    ];

    ventes.forEach(v => {
      v.produits.forEach(p => {
        worksheet.addRow({
          date: v.date_vente.toISOString().split('T')[0],
          produit: p.id_produit.nom_produit,
          quantite: p.quantite,
          prix_unitaire: p.prix_unitaire,
          total: p.quantite * p.prix_unitaire,
        });
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=ventes.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------------------------------------------
// 🛒 Export PRODUITS
router.get('/produits/excel', async (req, res) => {
  try {
    const produits = await Produit.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Produits');

    worksheet.columns = [
      { header: 'Nom', key: 'nom', width: 30 },
      { header: 'Prix Vente', key: 'prix_vente', width: 15 },
      { header: 'Stock', key: 'stock', width: 10 },
    ];

    produits.forEach(p => {
      worksheet.addRow({
        nom: p.nom_produit,
        prix_vente: p.prix_vente,
        stock: p.stock,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=produits.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------------------------------------------
// 🧑 Export CLIENTS
router.get('/clients/excel', async (req, res) => {
  try {
    const clients = await Client.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Clients');

    worksheet.columns = [
      { header: 'Nom Client', key: 'nom', width: 30 },
      { header: 'Téléphone', key: 'telephone', width: 20 },
      { header: 'Adresse', key: 'adresse', width: 30 },
    ];

    clients.forEach(c => {
      worksheet.addRow({
        nom: c.nom_client,
        telephone: c.telephone,
        adresse: c.adresse,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=clients.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------------------------------------------
// 💵 Export TRESORERIE
router.get('/tresorerie/excel', async (req, res) => {
  try {
    const treso = await Tresorerie.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tresorerie');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Montant', key: 'montant', width: 15 },
      { header: 'Motif', key: 'motif', width: 30 },
    ];

    treso.forEach(t => {
      worksheet.addRow({
        date: t.date_operation.toISOString().split('T')[0],
        type: t.type_operation,
        montant: t.montant,
        motif: t.motif,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=tresorerie.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
