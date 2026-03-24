const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.register = async (req, res) => {
    try {
    const { username, email, password } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer un nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;
    res
    .status(201)
    .json({ message: "Utilisateur créé avec succès", user: userResponse });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

exports.generateAccessToken = (user) => {
  return jwt.sign({ id: user._id.toString() }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1h",
  });
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id.toString() },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: "7d" }, // Long
  );
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body; // Le refresh token envoyé par React
  if (!token) return res.status(401).json("Non authentifié");

  const foundUser = await User.findOne({ refreshToken: token });
  if (!foundUser) return res.status(403).json("Token invalide");

  jwt.verify(token, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(403).json("Token expiré");

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "15m" },
    );

    res.json({ accessToken });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res.status(400).json({ message: "identifiant invalides" });
  }
  const passwordValid = await bcrypt.compare(password, userFound.password);
  if (!passwordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const accessToken = exports.generateAccessToken(userFound);
  const refreshToken = exports.generateRefreshToken(userFound);
    userFound.refreshToken = refreshToken;
    await userFound.save();
    const userResponse = userFound.toObject();
        delete userResponse.password;
        delete userResponse.refreshToken;

    res.status(200).json({
      accessToken,
      refreshToken,userResponse});

};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: "Non autorisé, token manquant" });
    }

    const foundUser = await User.findOne({ refreshToken: token });

    if (!foundUser) {
      return res.status(204).json({ message: "Déjà déconnecté" });
    }

    foundUser.refreshToken = undefined;
    await foundUser.save();

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la déconnexion", error: error.message });
  }
};
