import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [target,setTarget] = useState("Unisexe");
  const [files, setFiles] = useState([]);

  // Champs spécifiques
  const [singleStock, setSingleStock] = useState(0);
  const [shape, setShape] = useState("N/A");
  const [variants,setVariants] = useState([{ size: "", stock: 0 }]);

  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const savedToken = localStorage.getItem("token");

  const addVariant = () => {
    setVariants([...variants,{ size: "", stock: 0 }])
  }

  const updateVariant = (index,field,value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  }

  const handleSubmit = async (e) => {
    if(!isAdmin) return;
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("target", target);
      formData.append("singleStock", singleStock);
      formData.append("shape", shape);
      formData.append("variants", JSON.stringify(variants));
      for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
      await api.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${savedToken}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">📦 Ajouter un produit Padel</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold uppercase mb-1">Titre du produit</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-black outline-none transition" placeholder="ex: Wilson Bela Pro V2" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold uppercase mb-1">Marque</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl" placeholder="Bullpadel..." required />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase mb-1">Prix (€)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Description</label>
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-black outline-none transition" placeholder="ex: Wilson Bela Pro V2" required />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Public cible</label>
            <select value={target} onChange={(e) => setTarget(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl" required>
              <option value="Unisexe">Unisexe</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Enfant">Enfant</option>
            </select>

          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Catégorie</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl" required>
              <option value="">Choisir...</option>
              <option value="Raquettes">Raquettes</option>
              <option value="Chaussures">Chaussures</option>
              <option value="Vêtements">Vêtements</option>
              <option value="Accessoires">Accessoires</option>
            </select>
          </div>
        </div>

        {/* Section Spécifique & Stock */}
        <div className="space-y-4">
          {category === "Raquettes" ? (
            <div>
              <label className="block text-sm font-bold uppercase mb-1">Forme de la raquette</label>
              <select value={shape} onChange={(e) => setShape(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl">
                <option value="Ronde">Ronde</option>
                <option value="Goutte d'eau">Goutte d'eau</option>
                <option value="Diamant">Diamant</option>
              </select>
              <label className="block text-sm font-bold uppercase mt-4 mb-1">Stock disponible</label>
              <input type="number" value={singleStock} onChange={(e) => setSingleStock(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl" />
            </div>
          ) : (category === "Chaussures" || category === "Vêtements") && (
            <div>
              <label className="block text-sm font-bold uppercase mb-2">Tailles & Stocks</label>
              {variants.map((v, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input type="text" placeholder="Taille" value={v.size} onChange={(e) => updateVariant(index, "size", e.target.value)} className="w-1/2 border-2 border-gray-100 p-2 rounded-lg" />
                  <input type="number" placeholder="Qté" value={v.quantity} onChange={(e) => updateVariant(index, "quantity", e.target.value)} className="w-1/2 border-2 border-gray-100 p-2 rounded-lg" />
                </div>
              ))}
              <button type="button" onClick={addVariant} className="text-sm font-bold text-blue-600 hover:underline">+ Ajouter une taille</button>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Photos</label>
            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer" />
          </div>
        </div>

        <button type="submit" className="md:col-span-2 w-full bg-[#00acc1] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg mt-4">
          Mettre en vente sur le magasin 🎾
        </button>
      </form>
    </div>
  );
};

export default Publish;
