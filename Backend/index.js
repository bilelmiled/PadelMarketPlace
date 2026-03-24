const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI );
    console.log("✅ MongoDB Connecté avec succès !");
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB:", err.message);
    process.exit(1); // Arrête le serveur en cas d'échec
  }
};
connectDB();
// Middlewares
app.use(cors());
app.use(express.json()); // Pour lire le JSON dans les requêtes POST

// Route de test
app.get('/', (req, res) => {
  res.send('L’API Marketplace est en ligne !');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

const authRoutes = require('./routes/authRoute');
app.use('/auth', authRoutes);
const productRoutes = require('./routes/productRoute');
app.use('/products', productRoutes);