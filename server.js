const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Pour éviter les problèmes de CORS
 
                         

require('dotenv').config();
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

 
const app = express(); 
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Active CORS
app.use(express.json()); // Permet de parser le body JSON 

// Configurer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081'); // Remplacez localhost:8080 par votre domaine réel
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
  
   

// Remplacez newpassword123 par votre nouveau mot de passe
//const uri = 'mongodb+srv://ebpekandzabilapeniel:nMVN3eKMhxi3bHsN@cluster0.ggmdpbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb+srv://ebpekandzabilapeniel:nMVN3eKMhxi3bHsN@cluster0.ggmdpbw.mongodb.net/fast_manager';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});



 

// Routes
app.use('/api/utilisateurs', require('./routes/utilisateurs'));
app.use('/api/produits', require('./routes/produits'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/ventes', require('./routes/ventes'));
app.use('/api/tresoreries', require('./routes/tresoreries'));
app.use('/api/export', require('./routes/export'));





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
