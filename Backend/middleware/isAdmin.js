const isAdmin = (req, res, next) => {
  // On vérifie si l'utilisateur est connecté et si son rôle est admin
  if (req.user && req.user.role === 'admin') {
    next(); // C'est un admin, on le laisse passer
  } else {
    res.status(403).json({ message: "Accès refusé. Réservé aux administrateurs." });
  }
};
module.exports = isAdmin;   