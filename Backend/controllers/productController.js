const product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      brand,
      target,
      singleStock,
      shape,
      price,
      category,
    } = req.body;
    if (!title || !description || !brand || !price || !category) {
      return res
        .status(400)
        .json({ message: "Tous les champs obligatoires doivent être remplis" });
    }
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    let parsedVariants = [];
    if (req.body.variants) {
      try {
        // On transforme le texte JSON en véritable tableau d'objets JS
        parsedVariants = JSON.parse(req.body.variants);
      } catch (e) {
        return res
          .status(400)
          .json({ message: "Le format des variants est invalide" });
      }
    }

    const userId = req.user.id;

   const newProduct = new product({
      title,
      description,
      brand,
      target,
      singleStock: singleStock || 0, // Valeur par défaut si vide
      variants: parsedVariants,      // On utilise le tableau converti ici
      shape: shape || "N/A",
      price,
      images: imageUrls,
      category,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Produit créé avec succès", product: newProduct });
  } catch (error) {
    console.log("DETAILED ERROR:", error); // Regarde ton terminal VS Code, pas Postman
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
      details: error, // Cela affichera plus d'infos dans Postman
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await product
      .find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const productFound = await product
      .findById(productId);
    if (!productFound) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(productFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productToDelete = await product.findById(req.params.id);
    if (!productToDelete) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    //const isSameUser = productToDelete.owner.toString() === userId
    if (!productToDelete.owner.equals(userId)) {
      return res.status(404).json({ message: "Vous n'etes pas autorisé" });
    }
    await product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    let productToUpdate = await product.findById(req.params.id);
    if (!productToUpdate)
      return res.status(404).json({ message: "Produit non trouvé" });

    if (!productToUpdate.owner.equals(userId)) {
      return res.status(403).json({ message: "Non autorisé" });
    }
    productToUpdate = await product
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    res.status(200).json(productToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductByCat = async (req, res) => {
  try {
    const { category } = req.params;

    const productsFound = await product.find({
      category: category,
    });

    if (!productsFound || productsFound.length === 0) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    return res.status(200).json(productsFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
