// Le flux est un peu différent d'une requête classique :

// Le front-end envoie un formulaire avec une image.

// Multer intercepte le fichier.

// Le fichier est envoyé vers Cloudinary.

// Cloudinary te répond avec une URL sécurisée (ex: https://res.cloudinary.com/...).

// Toi, tu enregistres cette URL dans ton productSchema.

const multer = require ("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'vinted', // Le dossier dans lequel tes images seront stockées sur Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Les formats d'images autorisés
    },
});
const upload = multer({ storage: storage });
module.exports = upload;