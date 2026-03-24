const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    images: { type: [String], default: [] },
    category: {
      type: String,
      required: true,
      enum: ["Raquettes", "Vêtements", "Chaussures", "Accessoires", "Autres"],
    },
    target: {
      type: String,
      enum: ["Homme", "Femme", "Enfant", "Unisexe"],
      default: "Unisexe",
    },
    singleStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    variants: [
      {
        size: { type: String }, // ex: "42" ou "M"
        quantity: { type: Number, default: 0 },
      },
    ],
    shape: {
      type: String,
      enum: ["Diamant", "Goutte d'eau", "Ronde", "N/A"],
      default: "N/A",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Indispensable pour voir les virtuals en JSON
    toObject: { virtuals: true },
  },
);

productSchema.virtual("totalStock").get(function () {
  return this.variants.reduce((total, variant) => total + variant.quantity, 0);
});

productSchema.virtual("isAvailable").get(function () {
  const hasSingleStock = this.singleStock > 0;
  const hasVariantStock = this.variants.some((v) => v.quantity > 0);
  return hasSingleStock || hasVariantStock;
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
