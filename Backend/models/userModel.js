const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : { type: String, required: true, trim: true },
    email : { type: String, required: true, unique: true }, // 'unique' est important ici !
    password : { type: String, required: true },
    refreshToken: { type: String },
    role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' // Par défaut, tout le monde est un client normal
  }
}, { timestamps: true }); // Ajouté ici

const User = mongoose.model('User', userSchema);
module.exports = User;