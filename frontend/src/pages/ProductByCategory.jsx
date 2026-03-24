import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import api from "../api/axios";

const ProductByCategory = () => {
  const { cat } = useParams();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/productByCat/${cat}`);
        const data = response.data;
        console.log(data)
        if (data.length > 0) {
          const prices = data.map((p) => Number(p.price));
          const maxPrice = Math.max(...prices);
          setMaxPrice(maxPrice);
          setPriceRange([0, maxPrice]);
        }     
        setProducts(data);
      } catch (error) {
        console.error("Erreur fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [cat]);

  return (
    <div className="max-w-[1800px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-black uppercase mb-8 border-b-4 border-[#09B1BA]">
        {cat}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 space-y-8">
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4 uppercase tracking-tight">
              Filtrer par
            </h2>

            <div className="space-y-10">
              <section>
                <h3 className="font-bold text-sm uppercase mb-4 text-gray-400">
                  Marque
                </h3>
                <div className="text-xs text-gray-400">
                  Chargement des marques...
                </div>
              </section>

              <section className="bg-white p-4 border-t border-gray-100">
                <h3 className="font-extrabold text-sm uppercase mb-6 text-[#001e2b] tracking-tight">
                  Prix
                </h3>

                <div className="px-2">
                  <Slider
                    range
                    min={0}
                    max={maxPrice}
                    defaultValue={priceRange}
                    onChange={(value) => setPriceRange(value)}
                    trackStyle={{ backgroundColor: "#09B1BA", height: 4 }}
                    handleStyle={{
                      borderColor: "#09B1BA",
                      height: 18,
                      width: 18,
                      backgroundColor: "#fff",
                      opacity: 1,
                      boxShadow: "none",
                    }}
                    railStyle={{ backgroundColor: "#e5e7eb", height: 4 }}
                  />

                  <div className="flex justify-between mt-4 text-sm font-bold text-[#001e2b]">
                    <span>{priceRange[0]} DT</span>
                    <span>{priceRange[1]} DT</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-sm">
            <span className="text-sm text-gray-500">12 produits trouvés</span>

            <select className="bg-white border border-gray-200 text-sm p-2 outline-none focus:ring-1 focus:ring-[#009688]">
              <option>Nouveautés</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const isOutOfStock = product.isAvailable;

              return (
                <div key={product.id} className="group flex flex-col">
                  <div className="relative h-80 bg-gray-100 rounded-sm overflow-hidden flex items-center justify-center p-6">
                    {isOutOfStock && (
                      <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        Épuisé
                      </span>
                    )}

                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className={`h-full object-contain transition-transform duration-500 group-hover:scale-110 
            ${isOutOfStock ? "grayscale opacity-50" : ""}`}
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-1">
                    <h3 className="text-s font-bold text-gray-800 uppercase truncate">
                      {product.title}
                    </h3>
                    <p className="text-[#09B1BA] font-black text-lg">
                      {product.price} DT
                    </p>
                  </div>
                </div>
              );
            })}
            {/* <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductByCategory;
