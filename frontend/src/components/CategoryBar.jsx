import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Raquettes Padel", sub: ["Puissance", "Contrôle", "Polyvalente", "Junior"] },
  { name: "Chaussures", sub: ["Terre Battue", "Toutes Surfaces"] },
  { name: "Vêtements", sub: ["T-shirts", "Shorts", "Jupes", "Survêtements"] },
  { name: "Accessoires", sub: ["Surgrips", "Poignets", "Casquettes"] },
  { name: "Autres", sub: [] },
];

const CategoryBar = () => {
  return (
    <div className="bg-white border-b-2 border-gray-100 hidden md:block w-full">
      <div className="max-w-[1400px] mx-auto">
        <ul className="flex items-stretch justify-center">
          {categories.map((cat, index) => (
            <li key={cat.name} className="relative group flex-1 border-r border-gray-100 last:border-r-0">
              <button className="w-full flex items-center justify-center gap-2 py-6 px-4 font-black text-[#001e2b] hover:text-[#009688] uppercase text-sm tracking-tighter transition-all duration-300">
                {cat.name}
                <span className="text-[10px] text-gray-400 group-hover:rotate-180 transition-transform duration-300">
                   ›
                </span>
              </button>

              <div className="absolute left-0 top-full w-full pt-0 hidden group-hover:block z-50">
                <div className="bg-white shadow-2xl border-t-4 border-[#009688] py-4 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-200">
                  {cat.sub.map((subItem) => (
                    <Link
                      key={subItem}
                      to={`/category/${cat.name.toLowerCase()}/${subItem.toLowerCase()}`}
                      className="block px-8 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-[#009688] uppercase tracking-widest"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
          
         
        </ul>
      </div>
      
      {/* Barre de promotion fine en dessous (Jaune comme l'image) */}
      
    </div>
  );
};

export default CategoryBar;